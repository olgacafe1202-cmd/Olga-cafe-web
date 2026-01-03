'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MenuItem, formatPriceShort } from '@/data/menu';
import { formatPrice, cafeInfo } from '@/data/cafe-info';

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onClear }: CartProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return '';

    let message = `Halo ${cafeInfo.name}! 👋\n\n`;
    message += `*Detail Pemesan:*\n`;
    message += `👤 Nama: ${customerName}\n`;
    message += `📞 No. HP: ${customerPhone}\n`;
    if (notes) message += `📝 Catatan: ${notes}\n`;
    message += `\n*Pesanan:*\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
    });

    message += `━━━━━━━━━━━━━━━━\n`;
    message += `*Total: ${formatPrice(total)}*\n\n`;
    message += `Mohon konfirmasi pesanan saya. Terima kasih! 🙏`;

    return encodeURIComponent(message);
  };

  const handleOrder = async () => {
    if (!customerName || !customerPhone) {
      alert('Mohon isi nama dan nomor HP');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'orders'), {
        customerName,
        customerPhone,
        notes,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      const whatsappUrl = `https://wa.me/${cafeInfo.whatsappFormatted}?text=${generateWhatsAppMessage()}`;
      window.open(whatsappUrl, '_blank');

      onClear();
      setCustomerName('');
      setCustomerPhone('');
      setNotes('');
      setShowForm(false);

      alert('Pesanan berhasil dikirim! Silakan lanjutkan di WhatsApp.');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (items.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#2E7D32]/20 flex items-center justify-center animate-float">
          <span className="text-4xl">🛒</span>
        </div>
        <p className="text-gray-300 font-medium">Keranjang masih kosong</p>
        <p className="text-gray-500 text-sm mt-2">Pilih menu favorit kamu!</p>
        <div className="mt-4 flex justify-center gap-1">
          {['☕', '🍜', '🧋', '🍛'].map((emoji, i) => (
            <span key={i} className="text-2xl opacity-50 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              {emoji}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#2E7D32]/20 p-4 border-b border-white/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🛒</span>
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
              Keranjang
            </h3>
            <span className="bg-[#D4AF37] text-[#1A1A1A] text-xs font-bold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <button 
            onClick={onClear} 
            className="text-red-400 text-sm hover:text-red-300 hover:bg-red-500/10 px-3 py-1 rounded-lg transition-all duration-300"
          >
            🗑️ Hapus
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="p-4 space-y-3 max-h-56 overflow-y-auto custom-scrollbar">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="group flex items-center justify-between py-3 px-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{item.name}</p>
              <p className="text-[#D4AF37] text-sm font-semibold">{formatPriceShort(item.price)}</p>
            </div>
            <div className="flex items-center gap-2 ml-3">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300 flex items-center justify-center font-bold"
              >
                −
              </button>
              <span className="w-8 text-center text-white font-semibold">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300 flex items-center justify-center font-bold"
              >
                +
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="ml-1 w-8 h-8 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Actions */}
      <div className="p-4 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Total Pembayaran</span>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
            {formatPrice(total)}
          </span>
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full relative overflow-hidden py-3 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#2E7D32]/30 transition-all duration-300 group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">📱</span>
              Pesan via WhatsApp
            </span>
          </button>
        ) : (
          <div className="space-y-3 animate-fade-in">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">👤</span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nama kamu *"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:outline-none transition-all duration-300"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">📞</span>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="No. WhatsApp *"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:outline-none transition-all duration-300"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">📝</span>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Catatan (opsional)"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:outline-none transition-all duration-300"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleOrder}
                disabled={isSubmitting}
                className="flex-1 relative overflow-hidden py-3 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#2E7D32]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Mengirim...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    📱 Kirim Pesanan
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
