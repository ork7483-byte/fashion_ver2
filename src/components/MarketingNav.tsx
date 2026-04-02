'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-[#E2DDD4]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-[#D4572A] flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className={`font-bold text-base tracking-tight ${scrolled ? 'text-[#2C2825]' : 'text-white'}`}>SELECT AI</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className={`text-sm font-medium transition-colors ${scrolled ? 'text-[#8C857B] hover:text-[#2C2825]' : 'text-white/80 hover:text-white'}`}>
            요금제
          </Link>
          <Link href="/hub" className={`text-sm font-medium transition-colors ${scrolled ? 'text-[#8C857B] hover:text-[#2C2825]' : 'text-white/80 hover:text-white'}`}>
            허브
          </Link>
          <Link href="/app/model-cut" className="px-4 py-2 rounded-sm bg-[#D4572A] text-white text-sm font-semibold hover:bg-[#BF4D24] hover:-translate-y-0.5 transition-all duration-150">
            무료로 시작하기
          </Link>
        </div>
      </div>
    </nav>
  );
}
