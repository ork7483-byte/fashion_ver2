'use client';

import { useState } from 'react';
import { ver3PricingPlans } from '@/data/mock/ver3-pricing';

export default function Ver3PricingTable() {
  const [isYearly, setIsYearly] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ko-KR').format(price);

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className={`text-sm font-medium ${!isYearly ? 'text-[#2C2825]' : 'text-[#8C857B]'}`}>월간</span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="relative w-12 h-6 rounded-full bg-[#EAE6DE] transition-colors"
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-[#D4572A] transition-transform duration-200 ${isYearly ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${isYearly ? 'text-[#2C2825]' : 'text-[#8C857B]'}`}>
          연간
          <span className="ml-1 px-1.5 py-0.5 rounded-sm text-[10px] font-bold bg-[#FDF5F2] text-[#D4572A]">2개월 무료</span>
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {ver3PricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-sm border p-6 transition-transform duration-150 hover:-translate-y-0.5 ${
              plan.highlighted
                ? 'border-[#D4572A] shadow-sm md:scale-105 md:py-8'
                : 'border-[#E2DDD4]'
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-sm text-[11px] font-bold bg-[#D4572A] text-white">
                {plan.badge}
              </span>
            )}

            <h3 className="text-lg font-bold text-[#2C2825] mb-1">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold text-[#2C2825]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {formatPrice(isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice)}
              </span>
              <span className="text-sm text-[#8C857B] ml-1">원/월</span>
              {isYearly && (
                <div className="text-xs text-[#8C857B] mt-1">
                  연 {formatPrice(plan.yearlyPrice)}원
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((f) => (
                <li key={f.name} className="flex items-center gap-2 text-sm">
                  {f.included ? (
                    <svg className="w-4 h-4 text-[#2E6B4F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-[#B5AFA6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span className={f.included ? 'text-[#2C2825]' : 'text-[#B5AFA6]'}>
                    {f.name}
                    {f.detail && <span className="text-[#8C857B] ml-1">({f.detail})</span>}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2.5 rounded-sm text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5 ${
                plan.highlighted
                  ? 'bg-[#D4572A] text-white hover:bg-[#BF4D24]'
                  : 'bg-[#EAE6DE] text-[#2C2825] hover:bg-[#E2DDD4]'
              }`}
            >
              {plan.highlighted ? '그로스 시작하기' : `${plan.name} 시작하기`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
