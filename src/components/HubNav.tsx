'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/hub', label: '홈' },
  { href: '/hub/services', label: '서비스' },
  { href: '/hub/stack', label: '스택' },
];

export default function HubNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2DDD4]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/hub" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-[#D4572A] flex items-center justify-center">
            <span className="text-white font-bold text-xs">V</span>
          </div>
          <span className="text-[#2C2825] font-bold text-base tracking-tight">비젼AI</span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.href === '/hub' ? pathname === '/hub' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-[#FDF5F2] text-[#D4572A]' : 'text-[#8C857B] hover:text-[#2C2825] hover:bg-[#F4F1EB]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
