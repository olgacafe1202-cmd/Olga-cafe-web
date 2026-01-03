import { cafeInfo } from '@/data/cafe-info';

export default function Location() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D5A27]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-4 block">Temukan Kami</span>
          <h2 className="text-4xl md:text-5xl font-black text-gold-gradient mb-4">📍 Lokasi Cafe</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Kunjungi kami dan nikmati suasana nongkrong yang cozy</p>
          <div className="divider-gradient max-w-xs mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="glass-card overflow-hidden aspect-video lg:aspect-square">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d498.60226483549013!2d101.1928985!3d1.2829624!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d37b9afce6f50d%3A0xd4d3b01a7edb60dc!2sCafe%20Olga%20..tempat%20ABG%20nongkrong!5e0!3m2!1sid!2sid!4v1767363951078!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Cafe Olga"
            />
          </div>

          {/* Info */}
          <div className="glass-card p-8 flex flex-col justify-center">
            <h3 className="text-3xl font-black text-gold-gradient mb-8">{cafeInfo.name}</h3>
            
            <div className="space-y-6">
              {[
                { icon: '📍', label: 'Alamat', value: cafeInfo.address },
                { icon: '🕐', label: 'Jam Operasional', value: `Setiap Hari: ${cafeInfo.operatingHours.open} - ${cafeInfo.operatingHours.close} ${cafeInfo.operatingHours.timezone}` },
                { icon: '📞', label: 'WhatsApp', value: cafeInfo.whatsapp, isLink: true },
                { icon: '🪑', label: 'Kapasitas', value: `${cafeInfo.tables} meja tersedia` },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#D4AF37]/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                    {item.isLink ? (
                      <a 
                        href={`https://wa.me/${cafeInfo.whatsappFormatted}`}
                        className="text-[#D4AF37] hover:text-[#F4E4BC] font-semibold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={cafeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-center flex-1"
              >
                🗺️ Buka di Maps
              </a>
              <a
                href={`https://wa.me/${cafeInfo.whatsappFormatted}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green text-center flex-1"
              >
                💬 Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
