'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UsageBar from './UsageBar';

const navItems = [
  { href: '/app/model-cut', icon: '📸', label: '모델컷' },
  { href: '/app/fitting', icon: '👗', label: '가상피팅' },
  { href: '/app/video', icon: '🎬', label: '영상 변환' },
  { href: '/app/product-cut', icon: '🖼️', label: '연출컷' },
  { href: '/app/gallery', icon: '📁', label: '내 갤러리' },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r border-[#E2DDD4] flex flex-col min-h-screen shrink-0">
      {/* Logo */}
      <div className="px-5 h-16 flex items-center border-b border-[#E2DDD4]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-[#D4572A] flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="text-[#2C2825] font-bold text-sm tracking-tight">SELECT AI</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-150 ${
                  isActive ? 'bg-[#FDF5F2] text-[#D4572A]' : 'text-[#8C857B] hover:text-[#2C2825] hover:bg-[#F4F1EB]'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-[#E2DDD4] mt-4 pt-4">
          <Link
            href="/pricing"
            className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium text-[#8C857B] hover:text-[#2C2825] hover:bg-[#F4F1EB] transition-all"
          >
            <span className="text-base">💳</span>
            요금제
          </Link>
        </div>
      </nav>

      {/* Usage */}
      <div className="p-4 border-t border-[#E2DDD4]">
        <UsageBar used={2} total={3} label="남은 무료 횟수" />
        <Link
          href="/pricing"
          className="block mt-3 text-center py-2 rounded-sm bg-[#FDF5F2] text-[#D4572A] text-xs font-semibold hover:bg-[#D4572A] hover:text-white transition-colors"
        >
          업그레이드
        </Link>
      </div>
    </aside>
  );
}
