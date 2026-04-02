import { PricingPlan } from '@/types';

export const pricingPlans: PricingPlan[] = [
  {
    name: '기본',
    monthlyPrice: 29900,
    yearlyPrice: 299000,
    features: [
      { name: '모델컷 생성', included: true, detail: '월 20장' },
      { name: '가상피팅', included: false },
      { name: '영상 변환', included: false },
      { name: '연출컷', included: true, detail: '월 10장' },
      { name: '고해상도', included: false },
      { name: '워터마크', included: true, detail: '있음' },
    ],
  },
  {
    name: '프로',
    monthlyPrice: 79900,
    yearlyPrice: 799000,
    highlighted: true,
    badge: 'BEST',
    features: [
      { name: '모델컷 생성', included: true, detail: '월 100장' },
      { name: '가상피팅', included: true },
      { name: '영상 변환', included: true, detail: '월 5건' },
      { name: '연출컷', included: true, detail: '월 50장' },
      { name: '고해상도', included: true },
      { name: '워터마크', included: true, detail: '없음' },
    ],
  },
  {
    name: '프리미엄',
    monthlyPrice: 199000,
    yearlyPrice: 1990000,
    features: [
      { name: '모델컷 생성', included: true, detail: '무제한' },
      { name: '가상피팅', included: true },
      { name: '영상 변환', included: true, detail: '월 30건' },
      { name: '연출컷', included: true, detail: '무제한' },
      { name: '고해상도', included: true },
      { name: '워터마크', included: true, detail: '없음' },
    ],
  },
];
