'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToImgBB } from '@/lib/imgbb';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isVisible: boolean;
  order?: number;
  isStatic?: boolean;
  createdAt?: { seconds: number } | Date;
}

// Static images that are already in public folder
const staticImages: GalleryImage[] = [
  { id: 'static-1', url: '/images/PHOTO-2026-01-02-18-30-27.jpg', alt: 'Suasana Cafe Olga malam hari', isVisible: true, isStatic: true, order: 0 },
  { id: 'static-2', url: '/images/PHOTO-2026-01-02-18-30-29.jpg', alt: 'Area outdoor dengan lampu string', isVisible: true, isStatic: true, order: 1 },
  { id: 'static-3', url: '/images/PHOTO-2026-01-02-18-30-29 (1).jpg', alt: 'Tempat duduk nyaman', isVisible: true, isStatic: true, order: 2 },
  { id: 'static-4', url: '/images/PHOTO-2026-01-02-18-30-30.jpg', alt: 'Suasana nongkrong', isVisible: true, isStatic: true, order: 3 },
  { id: 'static-5', url: '/images/PHOTO-2026-01-02-18-30-30 (1).jpg', alt: 'Area cafe', isVisible: true, isStatic: true, order: 4 },
  { id: 'static-6', url: '/images/PHOTO-2026-01-02-18-30-30 (2).jpg', alt: 'Pemandangan cafe', isVisible: true, isStatic: true, order: 5 },
  { id: 'static-7', url: '/images/PHOTO-2026-01-02-18-30-31.jpg', alt: 'Suasana sore hari', isVisible: true, isStatic: true, order: 6 },
  { id: 'static-8', url: '/images/PHOTO-2026-01-02-17-55-19.jpg', alt: 'Es Teler Creamy', isVisible: true, isStatic: true, order: 7 },
];

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newAlt, setNewAlt] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState('');
  const [editCaption, setEditCaption] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery'));
      const firestoreImages: GalleryImage[] = [];
      const firestoreIds = new Set<string>();
      
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        firestoreIds.add(docSnap.id);
        firestoreImages.push({ 
          id: docSnap.id, 
          url: data.url,
          alt: data.alt || '',
          caption: data.caption || '',
          isVisible: data.isVisible !== false,
          order: data.order || 0,
          isStatic: data.isStatic || false,
          createdAt: data.createdAt
        });
      });

      // Combine with static images that aren't in Firestore yet
      const combinedImages: GalleryImage[] = [...firestoreImages];
      
      for (const staticImg of staticImages) {
        // Check if this static image is already in Firestore
        const existsInFirestore = firestoreImages.some(
          img => img.url === staticImg.url || img.id === staticImg.id
        );
        
        if (!existsInFirestore) {
          combinedImages.push(staticImg);
        }
      }

      // Sort by order
      combinedImages.sort((a, b) => (a.order || 0) - (b.order || 0));
      setImages(combinedImages);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      // On error, show static images
      setImages(staticImages);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToImgBB(file);

      await addDoc(collection(db, 'gallery'), {
        url: imageUrl,
        alt: newAlt || 'Foto Cafe Olga',
        caption: newCaption || '',
        isVisible: true,
        isStatic: false,
        order: images.length,
        createdAt: new Date(),
      });

      setNewAlt('');
      setNewCaption('');
      await fetchImages();
      e.target.value = '';
      alert('✅ Foto berhasil diupload!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Gagal upload gambar. Pastikan API key ImgBB sudah diset.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: GalleryImage) => {
    if (image.isStatic && !image.id.startsWith('static-') === false) {
      alert('Foto static tidak bisa dihapus, tapi bisa disembunyikan.');
      return;
    }
    
    if (!confirm('Yakin mau hapus foto ini?')) return;

    try {
      if (image.id.startsWith('static-')) {
        // For static images, save to Firestore with isVisible: false (mark as deleted)
        await setDoc(doc(db, 'gallery', image.id), {
          ...image,
          isVisible: false,
          deletedAt: new Date()
        });
      } else {
        await deleteDoc(doc(db, 'gallery', image.id));
      }
      await fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Gagal menghapus foto');
    }
  };

  const handleToggleVisibility = async (image: GalleryImage) => {
    try {
      if (image.id.startsWith('static-')) {
        // For static images, save to Firestore
        await setDoc(doc(db, 'gallery', image.id), {
          url: image.url,
          alt: image.alt,
          caption: image.caption || '',
          isVisible: !image.isVisible,
          isStatic: true,
          order: image.order || 0,
          updatedAt: new Date()
        });
      } else {
        await updateDoc(doc(db, 'gallery', image.id), {
          isVisible: !image.isVisible
        });
      }
      await fetchImages();
    } catch (error) {
      console.error('Error updating visibility:', error);
      alert('Gagal mengubah status tampilan');
    }
  };

  const startEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setEditAlt(image.alt);
    setEditCaption(image.caption || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditAlt('');
    setEditCaption('');
  };

  const saveEdit = async (image: GalleryImage) => {
    try {
      if (image.id.startsWith('static-')) {
        // For static images, save to Firestore
        await setDoc(doc(db, 'gallery', image.id), {
          url: image.url,
          alt: editAlt,
          caption: editCaption,
          isVisible: image.isVisible,
          isStatic: true,
          order: image.order || 0,
          updatedAt: new Date()
        });
      } else {
        await updateDoc(doc(db, 'gallery', image.id), {
          alt: editAlt,
          caption: editCaption
        });
      }
      await fetchImages();
      cancelEdit();
      alert('✅ Perubahan disimpan!');
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Gagal menyimpan perubahan');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">⏳ Loading gallery...</div>;
  }

  const visibleCount = images.filter(img => img.isVisible).length;
  const hiddenCount = images.filter(img => !img.isVisible).length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#D4AF37]">📸 Kelola Galeri</h2>
        <div className="flex gap-3 text-sm">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
            👁️ Tampil: {visibleCount}
          </span>
          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full">
            🙈 Sembunyi: {hiddenCount}
          </span>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-[#2D2D2D] p-5 rounded-xl mb-6 border border-gray-700">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-xl">➕</span> Upload Foto Baru
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1">Judul/Alt Text</label>
            <input
              type="text"
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              placeholder="Contoh: Suasana Cafe Malam Hari"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white text-sm focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">Keterangan (opsional)</label>
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="Contoh: Nongkrong asik bareng teman"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white text-sm focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
        </div>
        <label className={`block w-full py-3 text-center rounded-lg cursor-pointer transition-all ${uploading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:shadow-lg hover:shadow-[#D4AF37]/30'}`}>
          <span className="text-[#1A1A1A] font-semibold">
            {uploading ? '⏳ Uploading...' : '📤 Pilih & Upload Foto'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <p className="text-gray-500 text-xs mt-3">💡 Foto akan diupload ke ImgBB (gratis & permanen)</p>
      </div>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-[#2D2D2D] rounded-xl">
          <span className="text-5xl block mb-4">📷</span>
          <p className="font-medium">Belum ada foto di galeri.</p>
          <p className="text-sm mt-2">Upload foto untuk menambahkan ke galeri website.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className={`bg-[#2D2D2D] rounded-xl overflow-hidden border transition-all ${
                image.isVisible ? 'border-gray-700' : 'border-red-500/30 opacity-60'
              }`}
            >
              {/* Image */}
              <div className="aspect-video relative">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Static badge */}
                {image.isStatic && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
                      📁 Lokal
                    </span>
                  </div>
                )}
                {!image.isVisible && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      🙈 Disembunyikan
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {editingId === image.id ? (
                  /* Edit Mode */
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Judul</label>
                      <input
                        type="text"
                        value={editAlt}
                        onChange={(e) => setEditAlt(e.target.value)}
                        className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Keterangan</label>
                      <input
                        type="text"
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        placeholder="Tambah keterangan..."
                        className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(image)}
                        className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500 transition-colors"
                      >
                        ✅ Simpan
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-500 transition-colors"
                      >
                        ❌ Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <>
                    <h4 className="font-semibold text-white truncate">{image.alt}</h4>
                    {image.caption && (
                      <p className="text-gray-400 text-sm mt-1 truncate">{image.caption}</p>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => startEdit(image)}
                        className="flex-1 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30 transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(image)}
                        className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                          image.isVisible 
                            ? 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30' 
                            : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                        }`}
                      >
                        {image.isVisible ? '🙈 Sembunyi' : '👁️ Tampilkan'}
                      </button>
                      {!image.isStatic && (
                        <button
                          onClick={() => handleDelete(image)}
                          className="py-2 px-3 bg-red-600/20 text-red-400 rounded-lg text-sm hover:bg-red-600/30 transition-colors"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
