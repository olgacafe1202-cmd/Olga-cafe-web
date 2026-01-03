'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cafeInfo } from '@/data/cafe-info';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/PHOTO-2026-01-02-18-30-27.jpg"
          alt="Cafe Olga"
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        
        {/* Animated particles/glow effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2D5A27]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo/Icon */}
          <div className="mb-6 animate-float">
            <span className="text-7xl md:text-8xl drop-shadow-2xl">☕</span>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
            <span className="text-gold-gradient text-glow">{cafeInfo.name}</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-gray-200 mb-3 font-light tracking-wide">
            {cafeInfo.tagline}
          </p>
          
          {/* Description */}
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            {cafeInfo.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/menu" className="btn-gold group">
              <span className="flex items-center gap-2">
                🍽️ Lihat Menu
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link href="/booking" className="btn-green group">
              <span className="flex items-center gap-2">
                📅 Booking Meja
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Info badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { icon: '🕐', text: `${cafeInfo.operatingHours.open} - ${cafeInfo.operatingHours.close} WIB` },
              { icon: '📍', text: 'Jl. Jendral Sudirman' },
              { icon: '🪑', text: `${cafeInfo.tables} Meja Tersedia` },
            ].map((item, index) => (
              <div 
                key={index}
                className="glass-card px-5 py-3 flex items-center gap-3"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-200 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-400 text-sm uppercase tracking-widest">Scroll</span>
          <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
