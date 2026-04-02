'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shop, Category } from '@/types/ver3';

interface ShopHeaderProps {
  shop: Shop;
  categories: Category[];
  cartCount?: number;
}

export default function ShopHeader({ shop, categories, cartCount = 0 }: ShopHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const subdomain = shop.subdomain;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2DDD4]">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Top bar */}
        <div className="h-14 flex items-center justify-between">
          <Link href={`/shop/${subdomain}`} className="text-lg font-bold text-[#2C2825]">
            {shop.shopName}
          </Link>

          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="text-[#8C857B] hover:text-[#2C2825] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {/* Cart */}
            <Link href={`/shop/${subdomain}/cart`} className="relative text-[#8C857B] hover:text-[#2C2825] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#D4572A] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Mobile menu */}
            <button
              className="md:hidden w-6 h-6 flex flex-col items-center justify-center gap-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className={`w-4 h-0.5 bg-[#2C2825] transition-transform ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`w-4 h-0.5 bg-[#2C2825] transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-0.5 bg-[#2C2825] transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category nav - desktop */}
        <div className="hidden md:flex items-center gap-6 h-10 -mb-px">
          <Link
            href={`/shop/${subdomain}/products`}
            className="text-xs font-medium text-[#8C857B] hover:text-[#2C2825] transition-colors border-b-2 border-transparent hover:border-[#D4572A] pb-2"
          >
            전체
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${subdomain}/products?category=${cat.slug}`}
              className="text-xs font-medium text-[#8C857B] hover:text-[#2C2825] transition-colors border-b-2 border-transparent hover:border-[#D4572A] pb-2"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile categories */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2DDD4] px-6 py-3 bg-white space-y-2">
          <Link href={`/shop/${subdomain}/products`} className="block text-sm text-[#8C857B]" onClick={() => setMobileOpen(false)}>전체</Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/shop/${subdomain}/products?category=${cat.slug}`} className="block text-sm text-[#8C857B]" onClick={() => setMobileOpen(false)}>
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
