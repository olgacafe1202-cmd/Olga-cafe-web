import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Cafe Olga - Tempat Nongkrong Asik & Nyaman',
  description: 'Nikmati suasana outdoor yang cozy dengan lampu-lampu cantik, tanaman hijau, dan menu makanan & minuman yang lezat. Booking meja sekarang!',
  keywords: 'cafe, nongkrong, coffee, kopi, makan, minum, booking, olga cafe',
  openGraph: {
    title: 'Cafe Olga - Tempat Nongkrong Asik & Nyaman',
    description: 'Nikmati suasana outdoor yang cozy dengan lampu-lampu cantik, tanaman hijau, dan menu makanan & minuman yang lezat.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} ${poppins.variable}`}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
