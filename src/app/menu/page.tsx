'use client';

import { useState } from 'react';
import { categories, MenuItem } from '@/data/menu';
import { useMenu } from '@/hooks/useMenu';
import MenuCard from '@/components/MenuCard';
import Cart, { CartItem } from '@/components/Cart';

export default function MenuPage() {
  const { menuItems, loading } = useMenu();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setShowCart(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(i => i.id !== id));
    } else {
      setCart(prev => prev.map(i => 
        i.id === id ? { ...i, quantity } : i
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#2E7D32]/20 flex items-center justify-center animate-pulse">
            <span className="text-4xl animate-bounce">🍽️</span>
          </div>
          <p className="text-[#D4AF37] text-xl font-semibold">Loading menu...</p>
          <p className="text-gray-500 text-sm mt-2">Menyiapkan menu terbaik untuk kamu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2E7D32]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full mb-4">
            <span className="animate-bounce">🍽️</span>
            <span className="text-[#D4AF37] text-sm font-medium">Menu Lengkap</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]">
              Menu Kami
            </span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Pilih menu favorit kamu dan pesan langsung via WhatsApp
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 overflow-x-auto pb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex gap-3 min-w-max justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-[#1A1A1A] shadow-lg shadow-[#D4AF37]/30'
                  : 'glass-card text-gray-300 hover:text-white hover:border-[#D4AF37]/50'
              }`}
            >
              ✨ Semua
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-[#1A1A1A] shadow-lg shadow-[#D4AF37]/30'
                    : 'glass-card text-gray-300 hover:text-white hover:border-[#D4AF37]/50'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredItems.map((item, index) => (
                <div key={item.id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <MenuCard item={item} onAddToCart={addToCart} />
                </div>
              ))}
            </div>
            {filteredItems.length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-5xl opacity-50">🍽️</span>
                </div>
                <p className="text-gray-400 text-lg">Tidak ada menu di kategori ini</p>
                <p className="text-gray-500 text-sm mt-2">Coba pilih kategori lain</p>
              </div>
            )}
          </div>

          {/* Cart Sidebar - Desktop */}
          <div className="hidden lg:block w-96">
            <div className="sticky top-24">
              <Cart
                items={cart}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onClear={clearCart}
              />
            </div>
          </div>
        </div>

        {/* Mobile Cart Button */}
        <button
          onClick={() => setShowCart(!showCart)}
          className="lg:hidden fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 z-40 hover:scale-110 transition-transform duration-300"
        >
          <span className="text-2xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-white text-sm font-bold flex items-center justify-center animate-bounce">
              {totalItems}
            </span>
          )}
        </button>

        {/* Mobile Cart Modal */}
        {showCart && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowCart(false)}>
            <div 
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-gradient-to-t from-[#1A1A1A] to-[#2D2D2D] rounded-t-3xl p-4 animate-slide-up"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4" />
              <Cart
                items={cart}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onClear={clearCart}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
