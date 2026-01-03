import Link from 'next/link';
import { cafeInfo } from '@/data/cafe-info';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
      
      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">☕</span>
                <span className="text-3xl font-black text-gold-gradient">{cafeInfo.name}</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">{cafeInfo.description}</p>
              <div className="flex gap-4">
                <a
                  href={`https://wa.me/${cafeInfo.whatsappFormatted}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href={cafeInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#4285F4] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[#D4AF37] font-bold text-lg mb-6">Menu Cepat</h3>
              <ul className="space-y-3">
                {[
                  { href: '/menu', label: 'Lihat Menu' },
                  { href: '/booking', label: 'Booking Meja' },
                  { href: '/tentang', label: 'Tentang Kami' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-4"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-[#D4AF37] font-bold text-lg mb-6">Kontak</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37]">📍</span>
                  <span>{cafeInfo.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#D4AF37]">📞</span>
                  <a href={`https://wa.me/${cafeInfo.whatsappFormatted}`} className="hover:text-[#D4AF37] transition-colors">
                    {cafeInfo.whatsapp}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#D4AF37]">🕐</span>
                  <span>{cafeInfo.operatingHours.open} - {cafeInfo.operatingHours.close} WIB</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} {cafeInfo.name}. All rights reserved.
              </p>
              <p className="text-gray-600 text-sm">
                Made with ☕ & ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
