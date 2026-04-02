'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UsageBar from '@/components/UsageBar';

const navItems = [
  { href: '/dashboard', icon: '📊', label: '대시보드' },
  { href: '/dashboard/products', icon: '📦', label: '상품 관리' },
  { href: '/dashboard/ai-studio', icon: '🎨', label: 'AI 스튜디오' },
  { href: '/dashboard/orders', icon: '🛒', label: '주문 관리' },
  { href: '/dashboard/design', icon: '🎨', label: '쇼핑몰 디자인' },
  { href: '/dashboard/domain', icon: '🔗', label: '도메인 설정' },
  { href: '/dashboard/analytics', icon: '📈', label: '분석' },
  { href: '/dashboard/settings', icon: '⚙️', label: '설정' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-[#E2DDD4] flex flex-col z-40">
      {/* Shop Header */}
      <div className="p-5 border-b border-[#E2DDD4]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#D4572A] to-[#BF4D24] flex items-center justify-center text-white text-sm font-bold">
            M
          </div>
          <div>
            <div className="text-sm font-bold text-[#2C2825]">MODERA</div>
            <div className="text-[11px] text-[#8C857B]">modera.visionshop.kr</div>
          </div>
        </div>
        <Link
          href="/shop/modera"
          className="text-[11px] font-medium text-[#D4572A] hover:underline"
        >
          내 쇼핑몰 보기 →
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
              isActive(item.href)
                ? 'text-[#D4572A] bg-[#FDF5F2] font-semibold'
                : 'text-[#8C857B] hover:text-[#2C2825] hover:bg-[#FAFAF8]'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-5 border-t border-[#E2DDD4] space-y-3">
        <Link
          href="/dashboard/referral"
          className="flex items-center gap-2 text-xs text-[#8C857B] hover:text-[#2C2825]"
        >
          🎁 추천 프로그램
        </Link>
        <div className="space-y-2">
          <UsageBar used={45} total={300} label="모델컷" />
          <UsageBar used={3} total={10} label="영상" />
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="px-1.5 py-0.5 rounded-sm bg-[#FDF5F2] text-[#D4572A] font-bold">그로스</span>
          <span className="text-[#8C857B]">요금제</span>
        </div>
      </div>
    </aside>
  );
}
