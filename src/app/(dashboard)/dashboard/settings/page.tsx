'use client';

import { useState } from 'react';

interface Toggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const [shopName, setShopName] = useState('MODERA');
  const [description, setDescription] = useState('모던한 감성의 여성 패션 브랜드');
  const [contact, setContact] = useState('010-1234-5678');
  const [shippingFee, setShippingFee] = useState('3000');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('50000');
  const [returnPolicy, setReturnPolicy] = useState('7일 이내 교환/반품 가능합니다. 단, 착용 및 세탁 후에는 교환/반품이 불가능합니다.');
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState<Toggle[]>([
    {
      id: 'newOrder',
      label: '새 주문 알림',
      description: '새로운 주문이 들어오면 이메일로 알림을 받습니다.',
      enabled: true,
    },
    {
      id: 'lowStock',
      label: '재고 부족 알림',
      description: '상품 재고가 10개 미만으로 떨어지면 알림을 받습니다.',
      enabled: true,
    },
    {
      id: 'review',
      label: '상품 리뷰 알림',
      description: '고객이 상품 리뷰를 작성하면 알림을 받습니다.',
      enabled: false,
    },
    {
      id: 'marketing',
      label: '마케팅 정보 수신',
      description: '비젼AI의 업데이트 및 프로모션 정보를 이메일로 받습니다.',
      enabled: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setToggles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Configuration</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">설정</h1>
      </div>

      {/* 1. 기본 정보 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-5">기본 정보</p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#4A4540] mb-1.5">쇼핑몰명</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] focus:outline-none focus:border-[#D4572A] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4A4540] mb-1.5">쇼핑몰 설명</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] focus:outline-none focus:border-[#D4572A] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4A4540] mb-1.5">연락처</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] focus:outline-none focus:border-[#D4572A] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 2. 배송 설정 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-5">배송 설정</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#4A4540] mb-1.5">기본 배송비 (원)</label>
            <input
              type="number"
              value={shippingFee}
              onChange={(e) => setShippingFee(e.target.value)}
              className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] focus:outline-none focus:border-[#D4572A] transition-colors"
            />
            <p className="text-[11px] text-[#8C857B] mt-1">현재: ₩{Number(shippingFee).toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4A4540] mb-1.5">무료배송 기준금액 (원)</label>
            <input
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(e.target.value)}
              className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] focus:outline-none focus:border-[#D4572A] transition-colors"
            />
            <p className="text-[11px] text-[#8C857B] mt-1">현재: ₩{Number(freeShippingThreshold).toLocaleString()} 이상 무료</p>
          </div>
        </div>
      </div>

      {/* 3. 정책 설정 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-5">정책 설정</p>
        <div>
          <label className="block text-xs font-medium text-[#4A4540] mb-1.5">교환/반품 정책</label>
          <textarea
            value={returnPolicy}
            onChange={(e) => setReturnPolicy(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] focus:outline-none focus:border-[#D4572A] transition-colors resize-none"
          />
          <p className="text-[11px] text-[#8C857B] mt-1">쇼핑몰 하단 정책 페이지에 표시됩니다.</p>
        </div>
      </div>

      {/* 4. 알림 설정 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-5">알림 설정</p>
        <div className="space-y-5">
          {toggles.map((toggle) => (
            <div key={toggle.id} className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2C2825]">{toggle.label}</p>
                <p className="text-xs text-[#8C857B] mt-0.5">{toggle.description}</p>
              </div>
              <button
                onClick={() => handleToggle(toggle.id)}
                className="relative flex-shrink-0 w-12 h-6 rounded-full transition-colors duration-200"
                style={{ backgroundColor: toggle.enabled ? '#D4572A' : '#EAE6DE' }}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    toggle.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 계정 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-5">계정</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-[#E2DDD4]">
            <div>
              <p className="text-sm font-medium text-[#2C2825]">이메일</p>
              <p className="text-xs text-[#8C857B] mt-0.5">seller@modera.kr</p>
            </div>
            <button className="text-xs text-[#D4572A] font-medium hover:underline">변경</button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-[#2C2825]">비밀번호</p>
              <p className="text-xs text-[#8C857B] mt-0.5">마지막 변경: 30일 전</p>
            </div>
            <button className="text-xs text-[#D4572A] font-medium hover:underline">변경</button>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-[#E2DDD4]">
          <p className="text-xs text-[#8C857B] mb-3">위험 구역</p>
          <button className="px-4 py-2 border border-red-200 text-red-600 text-xs font-medium rounded-sm hover:bg-red-50 transition-colors">
            계정 탈퇴
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pb-4">
        <button
          onClick={handleSave}
          className={`px-8 py-3 rounded-sm text-sm font-semibold transition-all hover:-translate-y-0.5 ${
            saved
              ? 'bg-[#2E6B4F] text-white'
              : 'bg-[#D4572A] text-white hover:bg-[#BF4D24]'
          }`}
        >
          {saved ? '저장 완료!' : '저장하기'}
        </button>
      </div>
    </div>
  );
}
