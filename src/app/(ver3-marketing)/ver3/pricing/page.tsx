'use client';

import { useState } from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import Ver3PricingTable from '@/components/ver3/Ver3PricingTable';

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: '무료 체험 기간이 있나요?',
    a: '네, 모든 플랜은 가입 후 14일간 무료로 이용하실 수 있습니다. 체험 기간 중에는 카드 등록이 필요 없으며, 기간 종료 후 자동으로 과금되지 않습니다. 계속 이용을 원하실 때 직접 플랜을 선택하고 결제하시면 됩니다.',
  },
  {
    q: '쇼핑몰을 열려면 별도의 기술 지식이 필요한가요?',
    a: '전혀 필요 없습니다. 회원가입 → 쇼핑몰명 입력 → 상품 사진 업로드만 하면 AI가 모델컷, 상세페이지, 호버 갤러리까지 자동으로 완성합니다. 코딩이나 디자인 경험 없이도 10분 안에 오픈할 수 있도록 설계되었습니다.',
  },
  {
    q: 'AI 이미지 생성 횟수가 부족하면 추가 구매가 가능한가요?',
    a: '네, 월 할당량을 초과하면 10장 단위 추가 팩(5,000원)을 언제든지 구매하실 수 있습니다. 또는 그로스 플랜으로 업그레이드하시면 월 300장의 넉넉한 할당량을 사용하실 수 있습니다.',
  },
  {
    q: '커스텀 도메인은 어떻게 연결하나요?',
    a: '그로스 플랜 이상에서 사용 가능합니다. 도메인 등록 대행 사이트에서 구매한 도메인을 대시보드 설정 페이지에서 입력하면, DNS 레코드 설정 가이드가 제공됩니다. 평균 10분 이내에 연결이 완료되며, 어려우시면 카카오톡 문의를 통해 1:1 지원을 받을 수 있습니다.',
  },
  {
    q: '결제 및 배송 연동은 어떻게 되나요?',
    a: '카드 결제(국내 전 카드사), 무통장 입금, 카카오페이·네이버페이·토스 등 주요 간편결제가 기본으로 제공됩니다. 배송은 CJ대한통운, 우체국택배, 롯데택배 등 주요 택배사와 연동되며, 송장 번호를 입력하면 고객에게 자동 발송 알림이 전송됩니다.',
  },
];

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonRows = [
  { feature: '상품 등록', starter: '50개', growth: '300개', enterprise: '무제한' },
  { feature: 'AI 이미지 생성', starter: '월 50장', growth: '월 300장', enterprise: '무제한' },
  { feature: 'AI 상세페이지', starter: '✓', growth: '✓', enterprise: '✓' },
  { feature: '호버 갤러리', starter: '✓', growth: '✓', enterprise: '✓' },
  { feature: '주문 / 결제 / 배송', starter: '✓', growth: '✓', enterprise: '✓' },
  { feature: 'AI 영상 변환', starter: '—', growth: '월 10건', enterprise: '무제한' },
  { feature: '가상피팅', starter: '—', growth: '✓', enterprise: '✓' },
  { feature: '커스텀 도메인', starter: '—', growth: '✓', enterprise: '✓' },
  { feature: '전담 매니저', starter: '—', growth: '—', enterprise: '✓' },
  { feature: '브랜드 맞춤 디자인', starter: '—', growth: '—', enterprise: '✓' },
];

// ─── FAQ Item Component ───────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E2DDD4] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm sm:text-base font-semibold text-[#2C2825]">{q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full border border-[#E2DDD4] flex items-center justify-center text-[#D4572A] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm text-[#8C857B] leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Ver3PricingPage() {
  return (
    <div className="bg-[#F4F1EB]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#1E293B]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }}
        />
        <div className="relative z-10 max-w-[1120px] mx-auto text-center">
          <span className="text-[#D4572A] text-xs font-semibold uppercase tracking-widest mb-4 block">요금제</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            투명한 가격, 숨겨진 비용 없음
          </h1>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            월간·연간 자유롭게 선택하고 언제든 플랜을 변경하세요.<br />
            14일 무료 체험으로 부담 없이 시작할 수 있습니다.
          </p>
        </div>
      </section>

      {/* ── Pricing Table ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1120px] mx-auto">
          <Ver3PricingTable />
        </div>
      </section>

      {/* ── Feature Comparison ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeading
            label="플랜 비교"
            title="플랜별 기능 한눈에 보기"
          />
          <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-[#F4F1EB] border-b border-[#E2DDD4]">
              <div className="p-4 text-xs font-semibold text-[#8C857B] uppercase tracking-wider">기능</div>
              <div className="p-4 text-center text-sm font-bold text-[#2C2825]">스타터</div>
              <div className="p-4 text-center text-sm font-bold text-[#D4572A] bg-[#FDF5F2]">
                그로스
                <span className="ml-1 text-[9px] bg-[#D4572A] text-white px-1 py-0.5 rounded-sm">BEST</span>
              </div>
              <div className="p-4 text-center text-sm font-bold text-[#2C2825]">엔터프라이즈</div>
            </div>
            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 border-b border-[#E2DDD4] last:border-b-0 ${i % 2 === 0 ? '' : 'bg-[#FAFAF8]'}`}
              >
                <div className="p-4 text-sm text-[#2C2825] font-medium">{row.feature}</div>
                <div className="p-4 text-center text-sm text-[#8C857B]">{row.starter}</div>
                <div className="p-4 text-center text-sm text-[#2C2825] font-medium bg-[#FDF5F2]/50">{row.growth}</div>
                <div className="p-4 text-center text-sm text-[#8C857B]">{row.enterprise}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#B5AFA6] mt-4">
            — 은 해당 플랜에서 제공되지 않음을 의미합니다.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1120px] mx-auto">
          <SectionHeading
            label="자주 묻는 질문"
            title="궁금한 점이 있으신가요?"
            description="아래에서 답을 찾지 못하셨다면 카카오톡으로 바로 문의해주세요."
          />
          <div className="max-w-2xl mx-auto bg-[#F4F1EB] rounded-sm border border-[#E2DDD4] px-6">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }}
        />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            지금 14일 무료로 시작하세요
          </h2>
          <p className="text-white/60 mb-8">
            카드 등록 없이 바로 쇼핑몰을 열어볼 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 rounded-sm bg-[#D4572A] text-white font-semibold hover:bg-[#BF4D24] hover:-translate-y-0.5 transition-all duration-150"
            >
              무료로 쇼핑몰 만들기
            </Link>
            <button className="inline-block px-8 py-4 rounded-sm bg-[#F9E000] text-[#2C2825] font-semibold hover:-translate-y-0.5 transition-all duration-150">
              카카오톡으로 문의하기
            </button>
          </div>
          <p className="text-white/30 text-xs mt-6">
            평균 답변 시간: 2시간 이내 (영업일 기준)
          </p>
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
            <Link href="/ver3" className="hover:text-[#2C2825] transition-colors">홈</Link>
            <Link href="/contact" className="hover:text-[#2C2825] transition-colors">문의하기</Link>
            <Link href="/privacy" className="hover:text-[#2C2825] transition-colors">개인정보처리방침</Link>
          </div>
          <p className="text-xs text-[#B5AFA6]">&copy; 2026 비젼AI. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
