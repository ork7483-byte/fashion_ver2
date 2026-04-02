'use client';

import { useState } from 'react';

const referralHistory = [
  { date: '2026-03-15', name: '박지영', status: 'completed', reward: 5000 },
  { date: '2026-03-22', name: '이수민', status: 'completed', reward: 5000 },
  { date: '2026-03-28', name: '최현우', status: 'completed', reward: 5000 },
  { date: '2026-04-01', name: '강민지', status: 'pending', reward: 5000 },
  { date: '2026-04-01', name: '윤서준', status: 'pending', reward: 5000 },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  completed: { label: '지급 완료', className: 'bg-green-50 text-green-700 border border-green-200' },
  pending: { label: '대기 중', className: 'bg-yellow-50 text-yellow-700 border border-yellow-200' },
};

const steps = [
  {
    number: '01',
    title: '링크 공유',
    description: '나만의 추천 링크를 친구나 지인에게 공유하세요.',
  },
  {
    number: '02',
    title: '친구 가입',
    description: '공유받은 링크로 비젼AI에 가입하고 쇼핑몰을 개설합니다.',
  },
  {
    number: '03',
    title: '보상 지급',
    description: '친구가 첫 결제를 완료하면 ₩5,000 포인트가 즉시 지급됩니다.',
  },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const referralLink = 'https://visionai.kr/r/modera-2026';
  const totalInvited = 5;
  const totalReward = 25000;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Referral</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">추천 프로그램</h1>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-[#D4572A] to-[#BF4D24] rounded-sm p-6 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70 mb-4">나의 추천 현황</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {totalInvited}
              <span className="text-xl font-normal text-white/80 ml-1">명</span>
            </p>
            <p className="text-sm text-white/70 mt-1">초대한 셀러</p>
          </div>
          <div>
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ₩{totalReward.toLocaleString()}
            </p>
            <p className="text-sm text-white/70 mt-1">적립 보상 (포인트)</p>
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">나의 추천 링크</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 px-4 py-3 bg-[#F4F1EB] rounded-sm border border-[#E2DDD4] overflow-hidden">
            <p
              className="text-sm text-[#2C2825] truncate"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {referralLink}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className={`flex-shrink-0 px-5 py-3 rounded-sm text-sm font-semibold transition-all ${
              copied
                ? 'bg-[#2E6B4F] text-white'
                : 'bg-[#D4572A] text-white hover:bg-[#BF4D24]'
            }`}
          >
            {copied ? '복사됨!' : '링크 복사'}
          </button>
        </div>
        <p className="text-xs text-[#8C857B] mt-3">
          이 링크를 통해 가입한 셀러가 첫 결제 시 ₩5,000 포인트가 자동 지급됩니다.
        </p>
      </div>

      {/* How it Works */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-5">이용 방법</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex gap-4 md:flex-col md:gap-3">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+20px)] right-0 h-px bg-[#E2DDD4]" />
              )}
              <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-[#FDF5F2] border border-[#F0D5CC] flex items-center justify-center md:mx-auto">
                <span
                  className="text-sm font-bold text-[#D4572A]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {step.number}
                </span>
              </div>
              <div className="flex-1 md:text-center">
                <p className="text-sm font-semibold text-[#2C2825] mb-1">{step.title}</p>
                <p className="text-xs text-[#8C857B] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral History */}
      <div className="bg-white rounded-sm border border-[#E2DDD4]">
        <div className="px-6 py-4 border-b border-[#E2DDD4]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">추천 내역</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2DDD4] bg-[#FAFAF8]">
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">날짜</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">이름</th>
                <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">상태</th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">보상금액</th>
              </tr>
            </thead>
            <tbody>
              {referralHistory.map((item, i) => {
                const s = statusConfig[item.status];
                return (
                  <tr key={i} className="border-b border-[#E2DDD4] last:border-0 hover:bg-[#FAFAF8] transition-colors">
                    <td className="px-6 py-4">
                      <span
                        className="text-xs text-[#8C857B]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {item.date}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#2C2825]">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-sm text-[11px] font-medium ${s.className}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`text-sm font-semibold ${item.status === 'completed' ? 'text-[#D4572A]' : 'text-[#8C857B]'}`}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.status === 'completed' ? `+₩${item.reward.toLocaleString()}` : '대기'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Total Row */}
        <div className="px-6 py-4 border-t border-[#E2DDD4] bg-[#FAFAF8] flex justify-between items-center">
          <span className="text-xs font-semibold text-[#4A4540]">총 지급 완료</span>
          <span
            className="text-base font-bold text-[#D4572A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ₩{referralHistory
              .filter((r) => r.status === 'completed')
              .reduce((s, r) => s + r.reward, 0)
              .toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
