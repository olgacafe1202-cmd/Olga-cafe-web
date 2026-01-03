'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToImgBB } from '@/lib/imgbb';
import { categories } from '@/data/menu';
import Image from 'next/image';

interface MenuItem {
  id?: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  isBestSeller?: boolean;
}

export default function MenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<MenuItem>({
    name: '',
    price: 0,
    category: 'coffee',
    description: '',
    image: '',
    isBestSeller: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'menu'));
      const items: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MenuItem);
      });
      setMenuItems(items);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Gagal upload gambar. Pastikan API key ImgBB sudah diset.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const dataToSave = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        description: formData.description || '',
        image: formData.image || '',
        isBestSeller: formData.isBestSeller || false,
      };

      if (editingItem?.id) {
        await updateDoc(doc(db, 'menu', editingItem.id), dataToSave);
      } else {
        await addDoc(collection(db, 'menu'), dataToSave);
      }
      
      await fetchMenuItems();
      resetForm();
    } catch (error) {
      console.error('Error saving menu:', error);
      alert('Gagal menyimpan menu');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin mau hapus menu ini?')) return;
    
    try {
      await deleteDoc(doc(db, 'menu', id));
      await fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu:', error);
      alert('Gagal menghapus menu');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      category: 'coffee',
      description: '',
      image: '',
      isBestSeller: false,
    });
    setEditingItem(null);
    setIsAdding(false);
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">⏳ Loading menu...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#D4AF37]">🍽️ Kelola Menu</h2>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-gold text-sm">
            + Tambah Menu
          </button>
        )}
      </div>

      {/* Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-[#2D2D2D] p-4 rounded-lg mb-6 space-y-4">
          <h3 className="font-semibold text-white">
            {editingItem ? '✏️ Edit Menu' : '➕ Tambah Menu Baru'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Nama Menu *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded text-white text-sm"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">Harga (Rp) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                required
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded text-white text-sm"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">Kategori *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded text-white text-sm"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">Deskripsi</label>
              <input
                type="text"
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded text-white text-sm"
                placeholder="Contoh: Hot/Ice, +Float 4K"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">Foto Menu</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded text-white text-sm"
              />
              {uploading && <p className="text-yellow-400 text-xs mt-1">⏳ Uploading ke ImgBB...</p>}
              {formData.image && (
                <div className="mt-2 relative w-16 h-16">
                  <Image src={formData.image} alt="Preview" fill className="object-cover rounded" sizes="64px" />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isBestSeller"
                checked={formData.isBestSeller || false}
                onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                className="w-4 h-4"
              />
              <label htmlFor="isBestSeller" className="text-gray-300 text-sm">⭐ Best Seller</label>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button type="submit" disabled={saving || uploading} className="btn-gold text-sm disabled:opacity-50">
              {saving ? '⏳ Menyimpan...' : editingItem ? '💾 Update' : '➕ Simpan'}
            </button>
            <button type="button" onClick={resetForm} disabled={saving} className="btn-green text-sm disabled:opacity-50">
              ❌ Batal
            </button>
          </div>
        </form>
      )}

      {/* Menu List */}
      {menuItems.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>Belum ada menu di database.</p>
          <p className="text-sm mt-2">Klik "Tambah Menu" untuk mulai menambahkan.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Foto</th>
                <th className="text-left py-2 text-gray-400">Nama</th>
                <th className="text-left py-2 text-gray-400">Kategori</th>
                <th className="text-left py-2 text-gray-400">Harga</th>
                <th className="text-left py-2 text-gray-400">Status</th>
                <th className="text-left py-2 text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-800">
                  <td className="py-2">
                    <div className="w-10 h-10 bg-[#3D3D3D] rounded relative overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
                      ) : (
                        <span className="flex items-center justify-center h-full">☕</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 text-white">{item.name}</td>
                  <td className="py-2 text-gray-400">{item.category}</td>
                  <td className="py-2 text-[#D4AF37]">Rp {item.price.toLocaleString()}</td>
                  <td className="py-2">
                    {item.isBestSeller && <span className="badge-bestseller">Best Seller</span>}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-400 hover:text-blue-300 mr-2"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item.id!)}
                      className="text-red-400 hover:text-red-300"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
