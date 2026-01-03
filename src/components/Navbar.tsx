'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cafeInfo } from '@/data/cafe-info';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/menu', label: 'Menu' },
    { href: '/booking', label: 'Booking Meja' },
    { href: '/tentang', label: 'Tentang Kami' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <span className="text-xl font-bold text-gold-gradient">{cafeInfo.name}</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${cafeInfo.whatsappFormatted}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm"
            >
              💬 WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-[#D4AF37]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#D4AF37]/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-300 hover:text-[#D4AF37] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${cafeInfo.whatsappFormatted}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 btn-gold text-sm"
            >
              💬 WhatsApp
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
