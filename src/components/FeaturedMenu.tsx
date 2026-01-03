'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPriceShort } from '@/data/menu';
import { useMenu } from '@/hooks/useMenu';

export default function FeaturedMenu() {
  const { menuItems, loading } = useMenu();
  const featuredItems = menuItems.filter(item => item.isBestSeller);

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredItems.length === 0) return null;

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2D5A27]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-4 block">Favorit Pelanggan</span>
          <h2 className="text-4xl md:text-5xl font-black text-gold-gradient mb-4">Menu Best Seller</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Pilihan terbaik yang paling disukai pelanggan kami</p>
          <div className="divider-gradient max-w-xs mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="glass-card p-5 text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#2D5A27]/20 rounded-full animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#2D2D2D] border-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-300">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="112px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl group-hover:scale-110 transition-transform">☕</span>
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="font-bold text-white mb-2 text-sm leading-tight group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
              <span className="badge-bestseller mb-3 inline-block">⭐ Best Seller</span>
              <p className="text-[#D4AF37] font-black text-xl">{formatPriceShort(item.price)}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/menu" className="btn-gold inline-flex items-center gap-2 group">
            🍽️ Lihat Semua Menu
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
