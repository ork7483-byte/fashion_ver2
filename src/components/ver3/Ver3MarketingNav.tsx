'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Ver3MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#E2DDD4]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-[#2C2825]">
          VisionShop
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/ver3/pricing" className="text-sm text-[#8C857B] hover:text-[#2C2825] transition-colors">
            요금제
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-sm bg-[#D4572A] text-white text-sm font-semibold hover:bg-[#BF4D24] hover:-translate-y-0.5 transition-all duration-150"
          >
            무료로 내 쇼핑몰 만들기
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`w-5 h-0.5 bg-[#2C2825] transition-transform ${mobileOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`w-5 h-0.5 bg-[#2C2825] transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-[#2C2825] transition-transform ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E2DDD4] px-6 py-4 space-y-3">
          <Link href="/ver3/pricing" className="block text-sm text-[#8C857B]" onClick={() => setMobileOpen(false)}>
            요금제
          </Link>
          <Link
            href="/dashboard"
            className="block w-full text-center px-4 py-2.5 rounded-sm bg-[#D4572A] text-white text-sm font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            무료로 내 쇼핑몰 만들기
          </Link>
        </div>
      )}
    </nav>
  );
}
