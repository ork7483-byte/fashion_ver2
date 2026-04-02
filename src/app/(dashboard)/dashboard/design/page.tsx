'use client';

import { useState } from 'react';

const themes = [
  {
    id: 'modern',
    name: '모던',
    gradient: 'from-[#2C2825] to-[#4A4540]',
    accentColor: '#D4572A',
  },
  {
    id: 'minimal',
    name: '미니멀',
    gradient: 'from-[#F4F1EB] to-[#EAE6DE]',
    accentColor: '#2C2825',
  },
  {
    id: 'classic',
    name: '클래식',
    gradient: 'from-[#1A3A2A] to-[#2E6B4F]',
    accentColor: '#C9A84C',
  },
  {
    id: 'bold',
    name: '볼드',
    gradient: 'from-[#D4572A] to-[#BF4D24]',
    accentColor: '#FFFFFF',
  },
];

const presetColors = [
  { name: '테라코타', value: '#D4572A' },
  { name: '딥그린', value: '#2E6B4F' },
  { name: '네이비', value: '#1B3A6B' },
  { name: '버건디', value: '#7B2D3F' },
  { name: '골드', value: '#C9A84C' },
  { name: '슬레이트', value: '#4A5568' },
];

const fontPairs = [
  { id: 'pair1', heading: 'Playfair Display', body: 'Pretendard', label: '클래식 & 모던' },
  { id: 'pair2', heading: 'Noto Serif KR', body: 'Noto Sans KR', label: '세리프 & 산세리프' },
  { id: 'pair3', heading: 'Pretendard', body: 'JetBrains Mono', label: '심플 & 기술적' },
];

const MAX_BANNERS = 5;

export default function DesignPage() {
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [selectedColor, setSelectedColor] = useState('#D4572A');
  const [selectedFont, setSelectedFont] = useState('pair1');
  const [bannerCount, setBannerCount] = useState(2);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Customization</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">쇼핑몰 디자인</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Settings */}
        <div className="xl:col-span-2 space-y-6">

          {/* Theme Selection */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">테마 선택</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`relative rounded-sm overflow-hidden border-2 transition-all hover:-translate-y-0.5 ${
                    selectedTheme === theme.id
                      ? 'border-[#D4572A] shadow-sm'
                      : 'border-[#E2DDD4] hover:border-[#8C857B]'
                  }`}
                >
                  <div className={`h-20 bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                    <div
                      className="w-6 h-1.5 rounded-full"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                  </div>
                  <div className="px-2 py-2 bg-white">
                    <p className="text-xs font-medium text-[#2C2825] text-center">{theme.name}</p>
                  </div>
                  {selectedTheme === theme.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#D4572A] flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Logo Upload */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">로고 업로드</p>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-sm border-2 border-dashed border-[#E2DDD4] bg-[#F4F1EB] flex flex-col items-center justify-center flex-shrink-0 cursor-pointer hover:border-[#8C857B] transition-colors">
                <span className="text-2xl text-[#B5AFA6]">+</span>
                <span className="text-[10px] text-[#8C857B] mt-1">업로드</span>
              </div>
              <div>
                <p className="text-sm text-[#2C2825] font-medium">현재 로고: 기본 텍스트 로고</p>
                <p className="text-xs text-[#8C857B] mt-1">PNG, SVG 형식 권장 · 최대 2MB</p>
                <button className="mt-2 text-xs text-[#D4572A] underline">로고 삭제</button>
              </div>
            </div>
          </div>

          {/* Banner Management */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">배너 관리</p>
              <span className="text-xs text-[#8C857B]">{bannerCount}/{MAX_BANNERS} 슬롯 사용 중</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Array.from({ length: MAX_BANNERS }).map((_, i) => (
                <div key={i} className="relative">
                  {i < bannerCount ? (
                    <div className="aspect-video rounded-sm bg-gradient-to-br from-[#EAE6DE] to-[#D4CFC6] border border-[#E2DDD4] flex items-center justify-center relative group cursor-pointer hover:-translate-y-0.5 transition-transform">
                      <span className="text-[10px] text-[#8C857B]">배너 {i + 1}</span>
                      <button
                        onClick={() => setBannerCount(bannerCount - 1)}
                        className="absolute top-1 right-1 w-4 h-4 bg-[#2C2825]/60 text-white rounded-sm text-[8px] hidden group-hover:flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => bannerCount < MAX_BANNERS && setBannerCount(bannerCount + 1)}
                      className="w-full aspect-video rounded-sm border-2 border-dashed border-[#E2DDD4] flex items-center justify-center hover:border-[#8C857B] transition-colors"
                    >
                      <span className="text-lg text-[#B5AFA6]">+</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Color Customization */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">메인 컬러</p>
            <div className="flex items-center gap-3 flex-wrap">
              {presetColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  title={color.name}
                  className={`w-10 h-10 rounded-sm border-2 transition-all hover:-translate-y-0.5 ${
                    selectedColor === color.value ? 'border-[#2C2825] scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
              <div className="flex items-center gap-2 ml-2">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: selectedColor }}
                />
                <span className="text-xs text-[#8C857B]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {selectedColor}
                </span>
              </div>
            </div>
          </div>

          {/* Font Selection */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">폰트 설정</p>
            <div className="space-y-2">
              {fontPairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => setSelectedFont(pair.id)}
                  className={`w-full p-4 rounded-sm border-2 text-left transition-all hover:-translate-y-0.5 ${
                    selectedFont === pair.id
                      ? 'border-[#D4572A] bg-[#FDF5F2]'
                      : 'border-[#E2DDD4] hover:border-[#8C857B]'
                  }`}
                >
                  <p className="text-xs text-[#8C857B] mb-1">{pair.label}</p>
                  <p className="text-sm font-medium text-[#2C2825]">{pair.heading}</p>
                  <p className="text-xs text-[#4A4540]">{pair.body}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-4 sticky top-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">미리보기</p>
            <div
              className={`rounded-sm overflow-hidden border border-[#E2DDD4] bg-gradient-to-br ${
                themes.find((t) => t.id === selectedTheme)?.gradient ?? 'from-[#2C2825] to-[#4A4540]'
              }`}
            >
              {/* Mock shop preview */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white text-sm font-bold">MODERA</span>
                  <div className="flex gap-2">
                    {['상의', '하의', '원피스'].map((cat) => (
                      <span key={cat} className="text-white/70 text-[10px]">{cat}</span>
                    ))}
                  </div>
                </div>
                {/* Banner placeholder */}
                <div
                  className="h-16 rounded-sm mb-3 flex items-center justify-center"
                  style={{ backgroundColor: selectedColor + '33' }}
                >
                  <span className="text-[10px]" style={{ color: selectedColor }}>배너 영역</span>
                </div>
                {/* Product grid */}
                <div className="grid grid-cols-3 gap-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-sm bg-white/10" />
                  ))}
                </div>
              </div>
              <div className="px-4 py-3 bg-white/10">
                <div
                  className="h-1.5 rounded-full w-20 mb-1"
                  style={{ backgroundColor: selectedColor }}
                />
                <div className="h-1 rounded-full bg-white/30 w-12" />
              </div>
            </div>
            <p className="text-[10px] text-[#B5AFA6] text-center mt-2">간략한 미리보기입니다</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
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
