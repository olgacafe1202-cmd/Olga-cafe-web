'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cafeInfo } from '@/data/cafe-info';

interface BookingData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: number;
  notes: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    tableNumber: 1,
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const timeSlots = [];
  for (let hour = 11; hour <= 22; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 22) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' || name === 'tableNumber' ? parseInt(value) : value,
    }));
  };

  const generateWhatsAppMessage = () => {
    const message = `Halo ${cafeInfo.name}! 👋

Saya ingin booking meja:

📋 *Detail Booking*
━━━━━━━━━━━━━━━━
👤 Nama: ${formData.name}
📞 No. HP: ${formData.phone}
📅 Tanggal: ${formData.date}
🕐 Jam: ${formData.time} WIB
👥 Jumlah Tamu: ${formData.guests} orang
🪑 Meja No: ${formData.tableNumber}
${formData.notes ? `📝 Catatan: ${formData.notes}` : ''}

Mohon konfirmasi booking saya. Terima kasih! 🙏`;

    return encodeURIComponent(message);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'pending',
      });

      setSubmitStatus('success');
      
      const whatsappUrl = `https://wa.me/${cafeInfo.whatsappFormatted}?text=${generateWhatsAppMessage()}`;
      window.open(whatsappUrl, '_blank');

      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        tableNumber: 1,
        notes: '',
      });
    } catch (error) {
      console.error('Error saving booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none transition-all duration-300";
  const labelClass = "block text-gray-300 text-sm font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#2E7D32]/20 p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center animate-float">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
              Form Booking Meja
            </h2>
            <p className="text-gray-400 text-sm">Reservasi tempat nongkrong kamu</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div className="group">
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">👤 Nama Lengkap</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Masukkan nama"
            />
          </div>

          {/* Phone */}
          <div className="group">
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">📞 No. WhatsApp</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="08xxxxxxxxxx"
            />
          </div>

          {/* Date */}
          <div className="group">
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">📆 Tanggal</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              required
              className={inputClass}
            />
          </div>

          {/* Time */}
          <div className="group">
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">🕐 Jam</span>
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="" className="bg-[#1A1A1A]">Pilih jam</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot} className="bg-[#1A1A1A]">{slot} WIB</option>
              ))}
            </select>
          </div>

          {/* Guests */}
          <div className="group">
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">👥 Jumlah Tamu</span>
            </label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className={inputClass}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50].map(num => (
                <option key={num} value={num} className="bg-[#1A1A1A]">{num} orang</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="group">
            <label className={labelClass}>
              <span className="inline-flex items-center gap-2">🪑 Pilih Meja</span>
            </label>
            <select
              name="tableNumber"
              value={formData.tableNumber}
              onChange={handleChange}
              required
              className={inputClass}
            >
              {Array.from({ length: cafeInfo.tables }, (_, i) => i + 1).map(num => (
                <option key={num} value={num} className="bg-[#1A1A1A]">Meja {num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="group">
          <label className={labelClass}>
            <span className="inline-flex items-center gap-2">📝 Catatan (opsional)</span>
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Contoh: Mau tempat yang dekat colokan, dll"
          />
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm flex items-center gap-3 animate-fade-in">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold">Booking berhasil disimpan!</p>
              <p className="text-green-400/70">Silakan konfirmasi via WhatsApp.</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-3 animate-fade-in">
            <span className="text-2xl">❌</span>
            <div>
              <p className="font-semibold">Terjadi kesalahan</p>
              <p className="text-red-400/70">Silakan coba lagi atau hubungi kami langsung via WhatsApp.</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative overflow-hidden py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-[#1A1A1A] font-bold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                Memproses...
              </>
            ) : (
              <>
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">📱</span>
                Booking & Kirim ke WhatsApp
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <p className="text-gray-500 text-xs text-center">
          ⏰ Jam operasional: {cafeInfo.operatingHours.open} - {cafeInfo.operatingHours.close} WIB
        </p>
      </div>
    </form>
  );
}
