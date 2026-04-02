import Link from 'next/link';

const sections = [
  {
    label: 'Ver.1 — AI 패션 이미지 SaaS',
    color: 'from-[#D4572A] to-[#BF4D24]',
    links: [
      { href: '/app/model-cut', name: '모델컷 변환' },
      { href: '/app/fitting', name: '가상피팅' },
      { href: '/app/video', name: '영상 변환' },
      { href: '/app/product-cut', name: '연출컷 생성' },
      { href: '/app/gallery', name: '내 갤러리' },
      { href: '/pricing', name: '요금제' },
    ],
  },
  {
    label: 'Ver.3 — AI 쇼핑몰 빌더 (VisionShop)',
    color: 'from-[#2C2825] to-[#3a3532]',
    links: [
      { href: '/ver3', name: '마케팅 랜딩' },
      { href: '/ver3/pricing', name: '요금제' },
    ],
  },
  {
    label: '셀러 대시보드',
    color: 'from-[#2E6B4F] to-[#1a4a35]',
    links: [
      { href: '/dashboard', name: '대시보드 홈' },
      { href: '/dashboard/products', name: '상품 관리' },
      { href: '/dashboard/products/new', name: '상품 등록 (AI 파이프라인)' },
      { href: '/dashboard/orders', name: '주문 관리' },
      { href: '/dashboard/ai-studio', name: 'AI 스튜디오' },
      { href: '/dashboard/ai-studio/model-cut', name: 'AI 스튜디오 — 모델컷' },
      { href: '/dashboard/ai-studio/fitting', name: 'AI 스튜디오 — 가상피팅' },
      { href: '/dashboard/ai-studio/video', name: 'AI 스튜디오 — 영상' },
      { href: '/dashboard/ai-studio/product-cut', name: 'AI 스튜디오 — 연출컷' },
      { href: '/dashboard/design', name: '쇼핑몰 디자인' },
      { href: '/dashboard/domain', name: '도메인 설정' },
      { href: '/dashboard/analytics', name: '분석' },
      { href: '/dashboard/settings', name: '설정' },
      { href: '/dashboard/referral', name: '추천 프로그램' },
    ],
  },
  {
    label: '쇼핑몰 프론트 (MODERA 데모)',
    color: 'from-[#3A6B96] to-[#1e4a6e]',
    links: [
      { href: '/shop/modera', name: '쇼핑몰 메인' },
      { href: '/shop/modera/products', name: '상품 목록' },
      { href: '/shop/modera/products/prod-1', name: '상품 상세 (오버사이즈 린넨 블라우스)' },
      { href: '/shop/modera/products/prod-3', name: '상품 상세 (플리츠 롱 원피스)' },
      { href: '/shop/modera/cart', name: '장바구니' },
      { href: '/shop/modera/checkout', name: '결제' },
    ],
  },
  {
    label: '내부 허브',
    color: 'from-[#8C857B] to-[#6B6560]',
    links: [
      { href: '/hub', name: '허브 홈' },
      { href: '/hub/services', name: '서비스 관리' },
      { href: '/hub/stack', name: '기술 스택' },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#F4F1EB] min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white border border-[#E2DDD4]">
            <div className="w-5 h-5 rounded-sm bg-[#D4572A] flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">V</span>
            </div>
            <span className="text-[#2C2825] text-sm font-medium">비젼AI · 사이트맵</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C2825] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            VisionAI Platform
          </h1>
          <p className="text-[#8C857B] text-base">전체 서비스 페이지 바로가기</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.label} className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
              {/* Section Header */}
              <div className={`bg-gradient-to-r ${section.color} px-6 py-4`}>
                <h2 className="text-white font-semibold text-sm">{section.label}</h2>
              </div>
              {/* Links Grid */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-sm border border-[#E2DDD4] hover:border-[#D4572A] hover:bg-[#FDF5F2] hover:-translate-y-0.5 transition-all duration-150 group"
                  >
                    <svg className="w-4 h-4 text-[#B5AFA6] group-hover:text-[#D4572A] transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#2C2825] truncate">{link.name}</p>
                      <p className="text-[11px] text-[#B5AFA6] truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{link.href}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#B5AFA6]">&copy; 2026 비젼AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
