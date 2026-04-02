import { Ver3PricingPlan } from '@/types/ver3';

export const ver3PricingPlans: Ver3PricingPlan[] = [
  {
    name: '스타터',
    monthlyPrice: 49000,
    yearlyPrice: 490000,
    features: [
      { name: '상품 등록', included: true, detail: '50개' },
      { name: 'AI 이미지', included: true, detail: '월 50장' },
      { name: 'AI 영상', included: false },
      { name: '가상피팅', included: false },
      { name: '커스텀 도메인', included: false },
      { name: '호버 갤러리', included: true },
      { name: '상세페이지 AI', included: true },
      { name: '주문 관리', included: true },
      { name: '전담 매니저', included: false },
    ],
  },
  {
    name: '그로스',
    monthlyPrice: 149000,
    yearlyPrice: 1490000,
    highlighted: true,
    badge: 'BEST',
    features: [
      { name: '상품 등록', included: true, detail: '300개' },
      { name: 'AI 이미지', included: true, detail: '월 300장' },
      { name: 'AI 영상', included: true, detail: '월 10건' },
      { name: '가상피팅', included: true },
      { name: '커스텀 도메인', included: true },
      { name: '호버 갤러리', included: true },
      { name: '상세페이지 AI', included: true },
      { name: '주문 관리', included: true },
      { name: '전담 매니저', included: false },
    ],
  },
  {
    name: '엔터프라이즈',
    monthlyPrice: 399000,
    yearlyPrice: 3990000,
    features: [
      { name: '상품 등록', included: true, detail: '무제한' },
      { name: 'AI 이미지', included: true, detail: '무제한' },
      { name: 'AI 영상', included: true, detail: '무제한' },
      { name: '가상피팅', included: true },
      { name: '커스텀 도메인', included: true },
      { name: '호버 갤러리', included: true },
      { name: '상세페이지 AI', included: true },
      { name: '주문 관리', included: true },
      { name: '전담 매니저', included: true },
    ],
  },
];
