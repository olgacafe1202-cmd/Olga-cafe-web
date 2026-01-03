import BookingForm from '@/components/BookingForm';
import { cafeInfo } from '@/data/cafe-info';

export default function BookingPage() {
  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#2E7D32]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full mb-4">
            <span className="animate-bounce">📅</span>
            <span className="text-[#D4AF37] text-sm font-medium">Reservasi Meja</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]">
              Booking Meja
            </span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Reservasi tempat untuk pengalaman nongkrong yang lebih nyaman
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {[
            { icon: '🕐', label: 'Jam Buka', value: cafeInfo.operatingHours.open },
            { icon: '🕙', label: 'Jam Tutup', value: cafeInfo.operatingHours.close },
            { icon: '🪑', label: 'Total Meja', value: `${cafeInfo.tables} Meja` },
            { icon: '📍', label: 'Lokasi', value: 'Jl. Sudirman' },
          ].map((item, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-5 text-center group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#2E7D32]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <p className="text-gray-500 text-xs mb-1">{item.label}</p>
              <p className="text-white font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <BookingForm />
        </div>

        {/* Additional Info */}
        <div className="mt-10 glass-card rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#2E7D32]/10 p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-2xl">ℹ️</span>
              <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
                Informasi Penting
              </h3>
            </div>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              {[
                'Booking akan dikonfirmasi via WhatsApp oleh tim kami',
                'Mohon datang tepat waktu sesuai jam booking',
                'Meja akan ditahan maksimal 15 menit dari jam booking',
                'Untuk grup besar (>50 orang), silakan hubungi kami langsung',
              ].map((text, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-400 text-sm group">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/30 transition-colors duration-300">
                    <span className="text-[#D4AF37] text-xs">✓</span>
                  </span>
                  <span className="group-hover:text-gray-300 transition-colors duration-300">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
