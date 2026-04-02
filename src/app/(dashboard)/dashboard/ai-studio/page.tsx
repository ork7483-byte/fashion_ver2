'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import UsageBar from '@/components/UsageBar';

type Tab = 'modelCut' | 'fitting' | 'video' | 'styled';

const tabs: { id: Tab; label: string }[] = [
  { id: 'modelCut', label: '모델컷' },
  { id: 'fitting', label: '가상피팅' },
  { id: 'video', label: '영상변환' },
  { id: 'styled', label: '연출컷' },
];

const usageData: Record<Tab, { used: number; total: number; label: string }> = {
  modelCut: { used: 45, total: 300, label: '모델컷' },
  fitting: { used: 12, total: 300, label: '가상피팅' },
  video: { used: 3, total: 10, label: '영상변환' },
  styled: { used: 28, total: 300, label: '연출컷' },
};

const modelOptions = ['미리 1호 (한국인, 20대)', '미리 2호 (한국인, 30대)', '미리 3호 (아시안, 20대)', '커스텀 모델'];
const bgOptions = ['스튜디오 화이트', '그라데이션 베이지', '야외 자연광', '도심 거리', '카페 인테리어'];

const tabDescriptions: Record<Tab, { title: string; description: string }> = {
  modelCut: {
    title: 'AI 모델컷 생성',
    description: '상품 이미지를 업로드하면 AI 모델이 착용한 이미지를 자동 생성합니다.',
  },
  fitting: {
    title: '가상 피팅',
    description: '모델 이미지와 상품 이미지를 합성해 자연스러운 착용 결과물을 만듭니다.',
  },
  video: {
    title: 'AI 영상 변환',
    description: '정지 이미지를 자연스럽게 움직이는 숏폼 영상으로 변환합니다.',
  },
  styled: {
    title: '연출컷 생성',
    description: '상품을 활용한 라이프스타일 연출 이미지를 AI로 생성합니다.',
  },
};

export default function AIStudioPage() {
  const [activeTab, setActiveTab] = useState<Tab>('modelCut');
  const [selectedModel, setSelectedModel] = useState(modelOptions[0]);
  const [selectedBg, setSelectedBg] = useState(bgOptions[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const usage = usageData[activeTab];
  const tabInfo = tabDescriptions[activeTab];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasResult(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">AI Studio</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">AI 스튜디오</h1>
      </div>

      {/* Usage Stats */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">이번 달 AI 사용량</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
          {Object.values(usageData).map((u) => (
            <UsageBar key={u.label} used={u.used} total={u.total} label={u.label} />
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-[#EAE6DE] p-1 rounded-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setHasResult(false); }}
            className={`flex-1 py-2 text-sm font-medium rounded-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-[#2C2825] shadow-sm'
                : 'text-[#8C857B] hover:text-[#2C2825]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Controls */}
        <div className="space-y-5">
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">{tabInfo.title}</p>
            <p className="text-xs text-[#8C857B] mb-5">{tabInfo.description}</p>

            {/* Image Upload */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-[#4A4540] mb-2">
                {activeTab === 'fitting' ? '착용 모델 이미지' : '상품 이미지'}
              </label>
              <ImageUploader />
            </div>

            {activeTab === 'fitting' && (
              <div className="mb-5">
                <label className="block text-xs font-medium text-[#4A4540] mb-2">상품 이미지</label>
                <ImageUploader />
              </div>
            )}

            {/* Model Selector (only for modelCut) */}
            {activeTab === 'modelCut' && (
              <div className="mb-5">
                <label className="block text-xs font-medium text-[#4A4540] mb-2">AI 모델 선택</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] bg-white focus:outline-none focus:border-[#D4572A]"
                >
                  {modelOptions.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Background Selector */}
            {(activeTab === 'modelCut' || activeTab === 'styled') && (
              <div className="mb-5">
                <label className="block text-xs font-medium text-[#4A4540] mb-2">배경 스타일</label>
                <div className="grid grid-cols-1 gap-2">
                  {bgOptions.map((bg) => (
                    <button
                      key={bg}
                      onClick={() => setSelectedBg(bg)}
                      className={`px-3 py-2 rounded-sm text-xs text-left transition-colors border ${
                        selectedBg === bg
                          ? 'border-[#D4572A] bg-[#FDF5F2] text-[#D4572A] font-medium'
                          : 'border-[#E2DDD4] text-[#4A4540] hover:border-[#8C857B]'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Video Options */}
            {activeTab === 'video' && (
              <div className="mb-5 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#4A4540] mb-2">영상 길이</label>
                  <select className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] bg-white focus:outline-none focus:border-[#D4572A]">
                    <option>5초</option>
                    <option>10초</option>
                    <option>15초</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4A4540] mb-2">움직임 스타일</label>
                  <select className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] bg-white focus:outline-none focus:border-[#D4572A]">
                    <option>자연스러운 흔들림</option>
                    <option>줌인 효과</option>
                    <option>패닝 효과</option>
                  </select>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-[#D4572A] text-white text-sm font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGenerating ? '생성 중...' : 'AI 생성하기'}
            </button>

            {/* Usage warning */}
            <p className="text-[11px] text-[#8C857B] text-center mt-3">
              {usage.label} 사용량: {usage.used}/{usage.total}회 사용
            </p>
          </div>
        </div>

        {/* Right Panel: Result */}
        <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">결과 미리보기</p>

          {isGenerating ? (
            <div className="aspect-square bg-[#F4F1EB] rounded-sm flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-[#D4572A] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[#8C857B]">AI가 이미지를 생성하고 있습니다...</p>
            </div>
          ) : hasResult ? (
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-[#EAE6DE] to-[#D4CFC6] rounded-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">✨</div>
                  <p className="text-sm text-[#4A4540] font-medium">생성 완료</p>
                  <p className="text-xs text-[#8C857B] mt-1">{tabInfo.title} 결과물</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-[#D4572A] text-white text-xs font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors">
                  다운로드
                </button>
                <button className="flex-1 py-2 bg-[#EAE6DE] text-[#2C2825] text-xs font-semibold rounded-sm hover:bg-[#D4CFC6] transition-colors">
                  상품에 적용
                </button>
                <button
                  onClick={() => setHasResult(false)}
                  className="py-2 px-3 bg-[#EAE6DE] text-[#2C2825] text-xs font-semibold rounded-sm hover:bg-[#D4CFC6] transition-colors"
                >
                  다시 생성
                </button>
              </div>
            </div>
          ) : (
            <div className="aspect-square bg-[#F4F1EB] rounded-sm flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E2DDD4]">
              <div className="text-3xl text-[#B5AFA6]">🎨</div>
              <p className="text-sm text-[#8C857B]">생성 결과가 여기에 표시됩니다</p>
              <p className="text-xs text-[#B5AFA6]">이미지를 업로드하고 AI 생성하기를 클릭하세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
