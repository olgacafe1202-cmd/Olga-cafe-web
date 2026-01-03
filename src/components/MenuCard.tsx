'use client';

import { MenuItem, formatPriceShort } from '@/data/menu';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAddToCart }: MenuCardProps) {
  return (
    <div className="group relative glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 animate-fade-in overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#2E7D32]/0 group-hover:from-[#D4AF37]/10 group-hover:to-[#2E7D32]/10 transition-all duration-500 rounded-2xl" />
      
      {/* Best Seller Badge */}
      {item.isBestSeller && (
        <div className="absolute -top-1 -right-1 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] blur-sm animate-pulse-glow" />
            <span className="relative bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#1A1A1A] text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl shadow-lg">
              ⭐ Best Seller
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-4">
            <h3 className="font-bold text-white text-lg group-hover:text-[#D4AF37] transition-colors duration-300">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {item.isHot && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
              🔥 Hot
            </span>
          )}
          {item.isCold && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
              ❄️ Ice
            </span>
          )}
        </div>

        {/* Toppings */}
        {item.toppings && item.toppings.length > 0 && (
          <div className="text-xs text-gray-500 mb-3 p-2 bg-white/5 rounded-lg">
            <span className="text-[#D4AF37]">+ Topping:</span>{' '}
            {item.toppings.map(t => `${t.name} (+${formatPriceShort(t.price)})`).join(', ')}
          </div>
        )}

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Harga</span>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
              {formatPriceShort(item.price)}
            </span>
          </div>
          <button
            onClick={() => onAddToCart(item)}
            className="relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-[#1A1A1A] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 group/btn"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="group-hover/btn:rotate-12 transition-transform duration-300">🛒</span>
              Tambah
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
