'use client';

import { useState } from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import CountUpAnimation from '@/components/CountUpAnimation';
import Ver3PricingTable from '@/components/ver3/Ver3PricingTable';

// ─── Data ────────────────────────────────────────────────────────────────────

const aiFeatures = [
  { icon: '🤖', title: 'AI 모델컷', desc: '제품 사진 한 장으로 전문 모델 착용컷 자동 생성' },
  { icon: '👗', title: '가상피팅', desc: '다양한 체형·포즈로 착용 시뮬레이션' },
  { icon: '🎬', title: '영상 변환', desc: '정지 이미지를 쇼핑몰용 짧은 영상으로 변환' },
  { icon: '📸', title: '연출컷', desc: '배경·소품·분위기를 AI가 자동 생성' },
  { icon: '📄', title: '상세페이지 AI', desc: '상품 설명, 사이즈표, 소재 정보를 자동으로 작성' },
];

const mallFeatures = [
  { icon: '⚡', title: '원클릭 개설', desc: '회원가입 후 1분 안에 나만의 쇼핑몰 URL 발급' },
  { icon: '📦', title: '상품 관리', desc: '대량 등록, 재고 추적, 카테고리 분류 자동화' },
  { icon: '💳', title: '주문 / 결제 / 배송', desc: '카드·무통장·간편결제, 택배사 연동 일괄 처리' },
  { icon: '🖼️', title: '호버 갤러리', desc: '마우스를 올리면 AI 모델컷으로 전환되는 독보적 기능' },
  { icon: '🌐', title: '커스텀 도메인', desc: '나만의 도메인 연결 — 브랜드 신뢰도 상승' },
];

const steps = [
  { no: '01', title: '가입 + 쇼핑몰명 입력', time: '1분', desc: '이메일로 가입하고 쇼핑몰 이름만 정하면 URL이 즉시 발급됩니다.' },
  { no: '02', title: '상품 사진 업로드', time: '3분', desc: '판매할 제품 사진을 드래그앤드롭으로 올리세요. 여러 장도 OK.' },
  { no: '03', title: 'AI 자동 생성', time: '2분', desc: 'AI가 모델컷·상세페이지·호버 갤러리를 자동으로 만들어 드립니다.' },
  { no: '04', title: '쇼핑몰 오픈!', time: '즉시', desc: '생성 완료 후 바로 공유 링크를 전달해 판매를 시작하세요.' },
];

const demoShops = [
  { label: '원피스 브랜드', from: 'from-rose-400', to: 'to-pink-600', count: '34개 상품' },
  { label: '스트릿 패션', from: 'from-slate-500', to: 'to-zinc-700', count: '127개 상품' },
  { label: '여성 액세서리', from: 'from-amber-400', to: 'to-orange-600', count: '58개 상품' },
  { label: '남성 캐주얼', from: 'from-sky-400', to: 'to-blue-600', count: '92개 상품' },
];

const testimonials = [
  {
    quote: '쇼핑몰 만드는 데 하루 종일 걸릴 줄 알았는데 10분도 안 걸렸어요. AI 모델컷이 진짜 실제 모델 같아서 고객들 반응이 완전 달라졌습니다.',
    author: '김지은',
    role: '동대문 여성의류 셀러 · 스타터 플랜',
    stars: 5,
  },
  {
    quote: '상세페이지를 직접 쓰는 게 제일 귀찮았는데, AI가 소재·사이즈·세탁법까지 다 써줘서 시간이 엄청 절약돼요. 결제까지 한 번에 되니까 너무 편합니다.',
    author: '박성호',
    role: '남성의류 브랜드 운영 · 그로스 플랜',
    stars: 5,
  },
  {
    quote: '커스텀 도메인 연결이 이렇게 쉬울 줄 몰랐어요. 호버하면 AI 모델로 바뀌는 갤러리 때문에 인스타 유입이 2배 올랐습니다.',
    author: '이소연',
    role: '잡화·소품 셀러 · 그로스 플랜',
    stars: 5,
  },
];

const enterpriseFeatures = [
  '브랜드 맞춤 디자인 (전용 테마 · 컬러 · 폰트 · 레이아웃 설계)',
  'AI 모델 커스텀 학습 (브랜드 전용 모델 · 체형 특화 파인튜닝)',
  '기존 쇼핑몰 데이터 마이그레이션 지원',
  '전담 매니저 배정 — 기획부터 런칭까지 동행',
  '런칭 후 3개월 운영 지원 → 이후 엔터프라이즈 플랜 유지보수',
];

// ─── Hero Demo Card ───────────────────────────────────────────────────────────
function HeroMockShop() {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = [
    { from: 'from-rose-300', to: 'to-pink-500' },
    { from: 'from-slate-300', to: 'to-slate-500' },
    { from: 'from-amber-300', to: 'to-orange-500' },
    { from: 'from-sky-300', to: 'to-blue-500' },
  ];
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-4 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <div className="h-5 flex-1 rounded-sm bg-white/10 mx-2 flex items-center px-2">
          <span className="text-white/40 text-[9px]">myshop.visionshop.kr</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative aspect-[3/4] rounded-sm overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.from} ${item.to} transition-opacity duration-300 ${hovered === i ? 'opacity-0' : 'opacity-100'} flex items-end p-2`}>
              <span className="text-white/70 text-[9px] bg-black/30 px-1.5 py-0.5 rounded-sm">제품</span>
            </div>
            <div className={`absolute inset-0 bg-gradient-to-br from-[#D4572A]/80 to-[#BF4D24] transition-opacity duration-300 ${hovered === i ? 'opacity-100' : 'opacity-0'} flex items-end p-2`}>
              <span className="text-white text-[9px] bg-white/20 px-1.5 py-0.5 rounded-sm">AI 모델컷</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 h-6 rounded-sm bg-[#D4572A]/80 flex items-center justify-center">
        <span className="text-white text-[10px] font-semibold">지금 구매하기</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Ver3LandingPage() {
  return (
    <div className="bg-[#F4F1EB]">

      {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }}
        />

        <div className="relative z-10 max-w-[1120px] mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="w-5 h-5 rounded-sm bg-[#D4572A] flex items-center justify-center text-white font-bold text-[10px]">V3</span>
              <span className="text-white/80 text-sm font-medium">VisionShop · AI 쇼핑몰 빌더</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6">
              AI가 내장된<br />
              패션 쇼핑몰,<br />
              <span className="text-[#D4572A]">10분이면 오픈.</span>
            </h1>
            <p className="text-lg text-white/70 mb-10 max-w-xl">
              모델 촬영, 상세페이지, 호버 갤러리까지<br />
              — 전부 AI가 해결합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/dashboard"
                className="inline-block px-8 py-4 rounded-sm bg-[#D4572A] text-white text-base font-semibold hover:bg-[#BF4D24] hover:-translate-y-0.5 transition-all duration-150"
              >
                무료로 내 쇼핑몰 만들기
              </Link>
              <Link
                href="/ver3/pricing"
                className="inline-block px-8 py-4 rounded-sm bg-white/10 text-white text-base font-semibold border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-150"
              >
                요금제 보기
              </Link>
            </div>
            <p className="text-white/40 text-sm mt-4">카드 등록 없이 바로 시작 · 14일 무료 체험</p>
          </div>

          {/* Hero Visual */}
          <div className="flex-shrink-0 w-full max-w-sm">
            <HeroMockShop />
            <p className="text-center text-white/40 text-xs mt-3">마우스를 올려보세요 — AI 모델컷으로 전환</p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Demo Showcase ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeading
            label="데모 쇼핑몰"
            title="이런 쇼핑몰이 10분 만에 만들어집니다"
            description="실제 셀러들이 VisionShop으로 오픈한 쇼핑몰 스타일"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {demoShops.map((shop, i) => (
              <div key={i} className="group rounded-sm overflow-hidden border border-[#E2DDD4] hover:-translate-y-0.5 transition-transform duration-150">
                {/* Mock browser bar */}
                <div className="bg-[#F4F1EB] px-3 py-2 flex items-center gap-1.5 border-b border-[#E2DDD4]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E2DDD4]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E2DDD4]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E2DDD4]" />
                </div>
                {/* Mock product grid */}
                <div className={`bg-gradient-to-br ${shop.from} ${shop.to} aspect-[4/3] grid grid-cols-2 gap-1 p-2`}>
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="bg-white/20 rounded-sm aspect-[3/4]" />
                  ))}
                </div>
                <div className="p-3 bg-white">
                  <p className="text-sm font-semibold text-[#2C2825]">{shop.label}</p>
                  <p className="text-xs text-[#8C857B] mt-0.5">{shop.count} · AI 모델컷 적용</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {['호버 갤러리 탑재', 'AI 모델컷 자동 생성', 'AI 상세페이지 완성', '즉시 결제 연동'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full bg-[#F4F1EB] border border-[#E2DDD4] text-sm text-[#8C857B]">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Features (Two Columns) ───────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeading
            label="전체 기능"
            title="AI 기능 + 쇼핑몰 기능, 하나로"
            description="개별 솔루션을 따로 구독할 필요 없습니다. VisionShop 하나면 충분합니다."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: AI Features */}
            <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-2.5 py-1 rounded-sm bg-[#D4572A] text-white text-xs font-bold">AI 기능</span>
                <span className="text-sm text-[#8C857B]">촬영 비용 90% 절감</span>
              </div>
              <ul className="space-y-4">
                {aiFeatures.map((f) => (
                  <li key={f.title} className="flex items-start gap-3 group">
                    <span className="text-xl mt-0.5">{f.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#2C2825]">{f.title}</p>
                      <p className="text-xs text-[#8C857B] mt-0.5">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Mall Features */}
            <div className="bg-[#F4F1EB] rounded-sm border border-[#E2DDD4] p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-2.5 py-1 rounded-sm bg-[#2C2825] text-white text-xs font-bold">쇼핑몰 기능</span>
                <span className="text-sm text-[#8C857B]">10분 개설, 즉시 판매</span>
              </div>
              <ul className="space-y-4">
                {mallFeatures.map((f) => (
                  <li key={f.title} className="flex items-start gap-3 group">
                    <span className="text-xl mt-0.5">{f.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#2C2825]">{f.title}</p>
                      <p className="text-xs text-[#8C857B] mt-0.5">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: How It Works ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeading
            label="작동 방식"
            title="4단계, 10분이면 내 쇼핑몰 완성"
            description="복잡한 설정 없이 누구나 바로 시작할 수 있습니다"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.no} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[#E2DDD4] z-0" style={{ width: 'calc(100% - 2rem)' }} />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F4F1EB] border-2 border-[#D4572A] flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-[#D4572A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {s.no}
                    </span>
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#FDF5F2] border border-[#D4572A]/30 text-[#D4572A] text-xs font-semibold mb-3">
                    {s.time}
                  </div>
                  <h3 className="text-base font-bold text-[#2C2825] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#8C857B] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 rounded-sm bg-[#D4572A] text-white font-semibold hover:bg-[#BF4D24] hover:-translate-y-0.5 transition-all duration-150"
            >
              지금 무료로 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 5: Pricing ───────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeading
            label="요금제"
            title="합리적인 가격, 무제한 가능성"
            description="월간 / 연간 선택 가능. 언제든지 업그레이드하거나 해지할 수 있습니다."
          />
          <Ver3PricingTable />
          <p className="text-center text-sm text-[#8C857B] mt-8">
            더 자세한 요금 안내가 필요하신가요?{' '}
            <Link href="/ver3/pricing" className="text-[#D4572A] underline underline-offset-2">
              요금제 상세 페이지 보기
            </Link>
          </p>
        </div>
      </section>

      {/* ── Section 6: Social Proof ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeading
            label="사용자 후기"
            title="셀러들이 증명한 숫자"
          />

          {/* Count-up Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
            <div>
              <CountUpAnimation end={1200} suffix="+" />
              <p className="text-sm text-[#8C857B] mt-2 text-center">셀러 사용 중</p>
            </div>
            <div>
              <CountUpAnimation end={50000} suffix="+" />
              <p className="text-sm text-[#8C857B] mt-2 text-center">AI 이미지 생성</p>
            </div>
            <div>
              <CountUpAnimation end={98} suffix="%" />
              <p className="text-sm text-[#8C857B] mt-2 text-center">만족도</p>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#F4F1EB] rounded-sm border border-[#E2DDD4] p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j} className="text-[#D4572A] text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-[#2C2825] leading-relaxed flex-1 mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-[#2C2825]">{t.author}</p>
                  <p className="text-xs text-[#8C857B] mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Final CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-[#D4572A] text-sm font-semibold uppercase tracking-widest mb-4">지금 시작하세요</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            지금 무료로<br />내 쇼핑몰을 만들어보세요
          </h2>
          <p className="text-white/60 mb-10">
            14일 무료 체험 · 카드 등록 없음 · 언제든 해지 가능
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-block px-10 py-4 rounded-sm bg-[#D4572A] text-white text-base font-semibold hover:bg-[#BF4D24] hover:-translate-y-0.5 transition-all duration-150"
            >
              무료로 쇼핑몰 만들기
            </Link>
            <button className="inline-block px-10 py-4 rounded-sm bg-[#F9E000] text-[#2C2825] text-base font-semibold hover:-translate-y-0.5 transition-all duration-150">
              카카오톡으로 문의하기
            </button>
          </div>
          <p className="text-white/30 text-xs mt-6">평균 답변 시간: 2시간 이내 (영업일 기준)</p>
        </div>
      </section>

      {/* ── Section 8: Enterprise ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1120px] mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3 block">Enterprise</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2825] mb-4">
              브랜드 맞춤 구축이 필요하신가요?
            </h2>
            <p className="text-[#8C857B] mb-3">
              대규모 브랜드를 위한 프리미엄 구축 서비스
            </p>
            <p className="text-sm text-[#8C857B] mb-10">
              전담 매니저가 브랜드에 맞는 AI 쇼핑몰을 구축해드립니다.<br />
              초기 구축비 500~2,000만원 · 월 유지보수 엔터프라이즈 플랜
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left">
              {enterpriseFeatures.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 p-4 rounded-sm bg-[#F4F1EB] border border-[#E2DDD4]">
                  <svg className="w-4 h-4 text-[#2E6B4F] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#2C2825]">{feat}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-[#F9E000] text-[#2C2825] font-semibold hover:-translate-y-0.5 transition-all duration-150">
                카카오톡으로 문의하기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <Link
                href="/ver3/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-[#EAE6DE] text-[#2C2825] font-semibold hover:bg-[#E2DDD4] hover:-translate-y-0.5 transition-all duration-150"
              >
                요금제 비교하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-[#E2DDD4] bg-[#F4F1EB]">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#2C2825]">VisionShop</p>
            <p className="text-xs text-[#B5AFA6] mt-0.5">AI 쇼핑몰 빌더 by 비젼AI</p>
          </div>
          <div className="flex gap-6 text-xs text-[#B5AFA6]">
            <Link href="/ver3/pricing" className="hover:text-[#2C2825] transition-colors">요금제</Link>
            <Link href="/contact" className="hover:text-[#2C2825] transition-colors">문의하기</Link>
            <Link href="/privacy" className="hover:text-[#2C2825] transition-colors">개인정보처리방침</Link>
          </div>
          <p className="text-xs text-[#B5AFA6]">&copy; 2026 비젼AI. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
