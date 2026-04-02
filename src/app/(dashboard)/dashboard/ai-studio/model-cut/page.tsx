'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import UsageBar from '@/components/UsageBar';

const CATEGORIES = ['상의', '하의', '원피스', '가방', '신발', '액세서리'];

const MODEL_PRESETS = [
  { id: 'm1', label: '여성 A', gradient: 'from-rose-100 to-rose-200' },
  { id: 'm2', label: '여성 B', gradient: 'from-pink-100 to-pink-200' },
  { id: 'm3', label: '여성 C', gradient: 'from-fuchsia-100 to-fuchsia-200' },
  { id: 'm4', label: '남성 A', gradient: 'from-slate-100 to-slate-200' },
  { id: 'm5', label: '남성 B', gradient: 'from-zinc-100 to-zinc-200' },
  { id: 'm6', label: '남성 C', gradient: 'from-stone-100 to-stone-200' },
];

export default function ModelCutPage() {
  const [selectedCategory, setSelectedCategory] = useState('상의');
  const [selectedModel, setSelectedModel] = useState('m1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setHasResult(false);
    setTimeout(() => {
      setIsGenerating(false);
      setHasResult(true);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">AI Studio</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">모델컷 생성</h1>
      </div>

      {/* Usage */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
        <div className="max-w-xs">
          <UsageBar used={45} total={300} label="모델컷 사용량" />
        </div>
      </div>

      {/* Workspace */}
      <div className="flex gap-6">
        {/* Left Panel */}
        <div className="w-[320px] shrink-0 space-y-5">
          {/* Image Upload */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">상품 이미지</p>
            <ImageUploader />
          </div>

          {/* Category Selector */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">카테고리</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors ${
                    selectedCategory === cat
                      ? 'border-[#D4572A] bg-[#FDF5F2] text-[#D4572A]'
                      : 'border-[#E2DDD4] text-[#4A4540] hover:border-[#8C857B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selector */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">모델 선택</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {MODEL_PRESETS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`relative rounded-sm overflow-hidden border-2 transition-all hover:-translate-y-0.5 ${
                    selectedModel === model.id
                      ? 'border-[#D4572A]'
                      : 'border-[#E2DDD4] hover:border-[#8C857B]'
                  }`}
                >
                  <div
                    className={`w-full aspect-[3/4] bg-gradient-to-br ${model.gradient} flex items-end justify-center pb-2`}
                  >
                    <span className="text-[10px] font-medium text-[#4A4540] bg-white/70 px-1.5 py-0.5 rounded-sm">
                      {model.label}
                    </span>
                  </div>
                  {selectedModel === model.id && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4572A] flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button className="w-full py-2 text-xs font-medium border border-dashed border-[#E2DDD4] rounded-sm text-[#8C857B] hover:border-[#D4572A] hover:text-[#D4572A] transition-colors">
              + 내 이미지 첨부
            </button>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-[#D4572A] text-white text-sm font-bold rounded-sm hover:bg-[#BF4D24] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                생성 중...
              </>
            ) : (
              '생성하기'
            )}
          </button>
        </div>

        {/* Right Panel */}
        <div className="flex-1">
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6 h-full flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">결과 미리보기</p>

            <div className="flex-1 flex flex-col">
              {isGenerating ? (
                <div className="flex-1 bg-[#F4F1EB] rounded-sm flex flex-col items-center justify-center gap-3 min-h-[400px]">
                  <div className="w-8 h-8 border-2 border-[#D4572A] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-[#8C857B]">AI가 모델컷을 생성하고 있습니다...</p>
                  <p className="text-xs text-[#B5AFA6]">약 10~30초 소요됩니다</p>
                </div>
              ) : hasResult ? (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex-1 bg-gradient-to-br from-rose-50 to-rose-100 rounded-sm flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                      <p className="text-sm text-[#4A4540] font-medium">모델컷 생성 완료</p>
                      <p className="text-xs text-[#8C857B] mt-1">실제 서비스에서는 AI 생성 이미지가 표시됩니다</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-[#D4572A] text-white text-xs font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors">
                      다운로드
                    </button>
                    <button className="flex-1 py-2.5 bg-[#EAE6DE] text-[#2C2825] text-xs font-semibold rounded-sm hover:bg-[#D4CFC6] transition-colors">
                      갤러리에 저장
                    </button>
                    <button className="flex-1 py-2.5 bg-[#EAE6DE] text-[#2C2825] text-xs font-semibold rounded-sm hover:bg-[#D4CFC6] transition-colors">
                      상품에 적용
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 bg-[#F4F1EB] rounded-sm flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E2DDD4] min-h-[400px]">
                  <p className="text-sm text-[#8C857B]">생성 결과가 여기에 표시됩니다</p>
                  <p className="text-xs text-[#B5AFA6]">상품 이미지를 업로드하고 생성하기를 클릭하세요</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
