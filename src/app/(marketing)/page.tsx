'use client';

import { useState } from 'react';
import Link from 'next/link';
import BeforeAfterHover from '@/components/BeforeAfterHover';
import PricingTable from '@/components/PricingTable';
import CountUpAnimation from '@/components/CountUpAnimation';
import SectionHeading from '@/components/SectionHeading';
import { galleryItems, galleryCategories } from '@/data/mock/gallery';
import { testimonials } from '@/data/mock/testimonials';
import { appFeatures } from '@/data/mock/features';

export default function LandingPage() {
  const [galleryCat, setGalleryCat] = useState<string>('ALL');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const filteredGallery = galleryCat === 'ALL' ? galleryItems : galleryItems.filter((g) => g.category === galleryCat);

  return (
    <div className="bg-[#F4F1EB]">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C2825] via-[#3a3532] to-[#1a1816]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="w-5 h-5 rounded-sm bg-[#D4572A] flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">S</span>
            </div>
            <span className="text-white/80 text-sm font-medium">SELECT AI</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            모델 촬영 없이,<br />
            <span className="text-[#D4572A]">AI로 10초</span>만에.
          </h1>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
            제품 사진 한 장이면 스튜디오급 모델컷이 완성됩니다.<br />
            동대문 셀러부터 자사몰까지, 촬영 비용을 90% 절감하세요.
          </p>
          <Link
            href="/app/model-cut"
            className="inline-block px-8 py-4 rounded-sm bg-[#D4572A] text-white text-lg font-semibold hover:bg-[#BF4D24] hover:-translate-y-0.5 transition-all duration-150"
          >
            무료로 3장 만들어보기
          </Link>
          <p className="text-white/40 text-sm mt-4">카드 등록 없이 바로 시작</p>
        </div>
      </section>

      {/* Section 2: Before/After Gallery */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Before & After"
            title="호버하면 AI 모델컷으로 전환"
            description="제품 사진 위에 마우스를 올려보세요"
          />
          <div className="flex justify-center gap-2 mb-8">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryCat(cat)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                  galleryCat === cat ? 'bg-[#D4572A] text-white' : 'bg-white text-[#8C857B] border border-[#E2DDD4] hover:text-[#2C2825]'
                }`}
              >
                {cat === 'ALL' ? '전체' : cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredGallery.map((item, i) => (
              <BeforeAfterHover key={i} {...item} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/app/model-cut" className="inline-block px-6 py-3 rounded-sm bg-[#D4572A] text-white text-sm font-semibold hover:bg-[#BF4D24] transition-colors">
              나도 만들어보기
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="핵심 기능" title="AI가 할 수 있는 4가지" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {appFeatures.map((f) => (
              <div key={f.title} className="p-6 rounded-sm border border-[#E2DDD4] bg-[#F4F1EB] hover:-translate-y-0.5 transition-transform duration-150">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-lg font-bold text-[#2C2825] mb-2">{f.title}</h3>
                <p className="text-sm text-[#8C857B] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="작동 방식" title="3단계, 10초면 완성" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: '사진 업로드', desc: '제품 사진을 드래그앤드롭', time: '2초' },
              { step: '02', title: 'AI 생성', desc: '모델, 포즈, 배경을 선택하고 생성', time: '3초' },
              { step: '03', title: '완성!', desc: '스튜디오급 모델컷 다운로드', time: '5초' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E2DDD4] flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#D4572A]" style={{ fontFamily: "'Playfair Display', serif" }}>{s.step}</span>
                </div>
                <h3 className="text-base font-bold text-[#2C2825] mb-1">{s.title}</h3>
                <p className="text-sm text-[#8C857B] mb-2">{s.desc}</p>
                <span className="text-xs font-mono text-[#D4572A]">{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Result Gallery */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="결과물" title="AI가 만든 모델컷 갤러리" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-sm bg-gradient-to-br from-[#D4572A]/40 to-[#BF4D24]/60 border border-[#E2DDD4] flex items-center justify-center">
                <span className="text-white/60 text-xs font-medium">결과물 {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Social Proof */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="사회적 증거" title="셀러들이 인정한 결과" />
          <div className="grid grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <CountUpAnimation end={1200} suffix="+" />
              <p className="text-sm text-[#8C857B] mt-2">셀러 사용 중</p>
            </div>
            <div className="text-center">
              <CountUpAnimation end={50000} suffix="+" />
              <p className="text-sm text-[#8C857B] mt-2">이미지 생성</p>
            </div>
            <div className="text-center">
              <CountUpAnimation end={98} suffix="%" />
              <p className="text-sm text-[#8C857B] mt-2">만족도</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-sm border border-[#E2DDD4] p-8 text-center">
              <p className="text-base text-[#2C2825] leading-relaxed mb-6">
                &ldquo;{testimonials[testimonialIdx].quote}&rdquo;
              </p>
              <p className="text-sm font-semibold text-[#2C2825]">{testimonials[testimonialIdx].author}</p>
              <p className="text-xs text-[#8C857B]">{testimonials[testimonialIdx].role}</p>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === testimonialIdx ? 'bg-[#D4572A]' : 'bg-[#E2DDD4]'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Pricing */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="요금제" title="합리적인 가격, 무제한 가능성" />
          <PricingTable />
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#2C2825] mb-4">
            지금 무료로 3장 만들어보세요
          </h2>
          <p className="text-[#8C857B] mb-8">카드 등록 없이 바로 시작</p>
          <Link
            href="/app/model-cut"
            className="inline-block px-10 py-4 rounded-sm bg-[#D4572A] text-white text-lg font-semibold hover:bg-[#BF4D24] hover:-translate-y-0.5 transition-all duration-150 mb-6"
          >
            무료로 시작하기
          </Link>
          <div className="mt-8 pt-8 border-t border-[#E2DDD4]">
            <p className="text-sm text-[#8C857B] mb-3">궁금한 점이 있으신가요?</p>
            <button className="px-6 py-3 rounded-sm bg-[#F9E000] text-[#2C2825] text-sm font-semibold hover:-translate-y-0.5 transition-transform">
              카카오톡으로 문의하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#E2DDD4]">
        <div className="max-w-5xl mx-auto text-center text-xs text-[#B5AFA6]">
          &copy; 2026 SELECT AI by 비젼AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
