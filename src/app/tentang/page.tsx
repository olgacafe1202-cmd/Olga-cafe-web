import { cafeInfo } from '@/data/cafe-info';
import Location from '@/components/Location';

export default function TentangPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-[#2E7D32]/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#2E7D32]/20 flex items-center justify-center animate-float">
            <span className="text-5xl">☕</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-[#D4AF37] text-sm font-medium">Tentang Kami</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]">
              {cafeInfo.name}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{cafeInfo.tagline}</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#2E7D32]/10 p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌟</span>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
                  Cerita Kami
                </h2>
              </div>
            </div>
            <div className="p-8 space-y-5 text-gray-300 leading-relaxed">
              <p>
                <span className="text-[#D4AF37] font-semibold">{cafeInfo.name}</span> hadir sebagai tempat nongkrong yang nyaman untuk semua kalangan. 
                Dengan suasana outdoor yang asri, dihiasi lampu-lampu cantik dan tanaman hijau, 
                kami menciptakan atmosfer yang sempurna untuk bersantai.
              </p>
              <p>
                Kami menyajikan berbagai menu makanan dan minuman dengan harga terjangkau tanpa 
                mengorbankan kualitas. Dari kopi signature hingga makanan berat seperti nasi goreng 
                dan mie, semua disiapkan dengan penuh cinta.
              </p>
              <p>
                Baik untuk nongkrong bareng teman, quality time dengan keluarga, atau sekadar 
                me-time sambil menikmati secangkir kopi, <span className="text-[#D4AF37] font-semibold">{cafeInfo.name}</span> adalah pilihan yang tepat!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full mb-4">
              <span>✨</span>
              <span className="text-[#D4AF37] text-sm font-medium">Keunggulan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]">
              Kenapa Pilih Kami?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: 'Suasana Asri', desc: 'Area outdoor dengan tanaman hijau dan lampu string yang aesthetic' },
              { icon: '💰', title: 'Harga Terjangkau', desc: 'Menu mulai dari 7K, cocok untuk kantong pelajar dan mahasiswa' },
              { icon: '🍽️', title: 'Menu Lengkap', desc: 'Dari kopi, minuman segar, hingga makanan berat tersedia' },
              { icon: '📶', title: 'WiFi Gratis', desc: 'Koneksi internet cepat untuk kerja atau browsing' },
              { icon: '🔌', title: 'Stop Kontak', desc: 'Tersedia colokan listrik untuk charge gadget' },
              { icon: '🏍️', title: 'Parkir Motor', desc: 'Tersedia area parkir khusus untuk motor' },
            ].map((item, index) => (
              <div 
                key={index}
                className="group glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#2E7D32]/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <Location />

      {/* CTA */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="glass-card rounded-3xl p-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#2E7D32]/20 flex items-center justify-center animate-float">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Yuk, Mampir ke <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">{cafeInfo.name}</span>!
            </h2>
            <p className="text-gray-400 mb-8">
              Kami tunggu kehadiranmu untuk nongkrong bareng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${cafeInfo.whatsappFormatted}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-[#1A1A1A] font-bold rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl">💬</span>
                Chat WhatsApp
              </a>
              <a
                href={cafeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#2E7D32]/30 hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl">🗺️</span>
                Lihat di Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
