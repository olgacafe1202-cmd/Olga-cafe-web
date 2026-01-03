'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useGallery } from '@/hooks/useGallery';

export default function Gallery() {
  const { images, loading } = useGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#1A1A1A]/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#1A1A1A]/50 to-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-4 block">Suasana Cafe</span>
          <h2 className="text-4xl md:text-5xl font-black text-gold-gradient mb-4">📸 Galeri Kami</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Intip suasana cozy dan aesthetic di Cafe Olga</p>
          <div className="divider-gradient max-w-xs mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group animate-fade-in-up ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image.url)}
            >
              <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-square'}`}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes={index === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-medium">{image.alt}</p>
                    {image.caption && (
                      <p className="text-gray-300 text-sm mt-1">{image.caption}</p>
                    )}
                  </div>
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 rounded-2xl transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in-up"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all hover:rotate-90"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="relative max-w-5xl max-h-[85vh] w-full h-full animate-scale-in">
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
