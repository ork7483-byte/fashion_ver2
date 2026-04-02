'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';

type ProductCategory = 'PERFUME' | 'FASHION' | 'SHOES' | 'BAG';

const PRODUCT_CATEGORIES: ProductCategory[] = ['PERFUME', 'FASHION', 'SHOES', 'BAG'];

const STYLE_PRESETS = [
  { id: 's1', label: '미니멀 화이트', desc: '깨끗하고 모던한 연출', gradient: 'from-slate-50 to-slate-100' },
  { id: 's2', label: '내추럴', desc: '자연소재와 따뜻한 감성', gradient: 'from-amber-50 to-stone-100' },
  { id: 's3', label: '럭셔리', desc: '고급스럽고 품격있는', gradient: 'from-yellow-50 to-amber-100' },
  { id: 's4', label: '빈티지', desc: '레트로한 필름 감성', gradient: 'from-orange-50 to-amber-50' },
  { id: 's5', label: '스트리트', desc: '도시적이고 힙한 감성', gradient: 'from-zinc-100 to-zinc-200' },
  { id: 's6', label: '스튜디오', desc: '전문적인 상업 촬영 스타일', gradient: 'from-sky-50 to-blue-50' },
];

export default function ProductCutPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('FASHION');
  const [selectedStyle, setSelectedStyle] = useState('s1');
  const [showBefore, setShowBefore] = useState(false);
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
        <h1 className="text-2xl font-bold text-[#2C2825]">연출컷 생성</h1>
      </div>

      <div className="flex gap-6">
        {/* Left Panel */}
        <div className="w-[320px] shrink-0 space-y-4">

          {/* Image Upload */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">상품 이미지</p>
            <ImageUploader />
          </div>

          {/* Category */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">카테고리</p>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-2 text-xs font-semibold rounded-sm border transition-colors ${
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

          {/* Style Presets */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">스타일 프리셋</p>
            <div className="grid grid-cols-2 gap-3">
              {STYLE_PRESETS.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`relative rounded-sm border-2 text-left overflow-hidden transition-all hover:-translate-y-0.5 ${
                    selectedStyle === style.id
                      ? 'border-[#D4572A]'
                      : 'border-[#E2DDD4] hover:border-[#8C857B]'
                  }`}
                >
                  <div className={`w-full h-16 bg-gradient-to-br ${style.gradient}`} />
                  <div className="p-2">
                    <p className="text-xs font-semibold text-[#2C2825]">{style.label}</p>
                    <p className="text-[10px] text-[#8C857B] mt-0.5 leading-tight">{style.desc}</p>
                  </div>
                  {selectedStyle === style.id && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#D4572A] flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Generate */}
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
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6 flex flex-col h-full">
            {/* Before/After Toggle */}
            {hasResult && (
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">결과 미리보기</p>
                <div className="flex gap-1 bg-[#EAE6DE] p-1 rounded-sm">
                  <button
                    onClick={() => setShowBefore(false)}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                      !showBefore ? 'bg-white text-[#2C2825] shadow-sm' : 'text-[#8C857B] hover:text-[#2C2825]'
                    }`}
                  >
                    After
                  </button>
                  <button
                    onClick={() => setShowBefore(true)}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                      showBefore ? 'bg-white text-[#2C2825] shadow-sm' : 'text-[#8C857B] hover:text-[#2C2825]'
                    }`}
                  >
                    Before
                  </button>
                </div>
              </div>
            )}
            {!hasResult && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">결과 미리보기</p>
            )}

            <div className="flex-1 flex flex-col">
              {isGenerating ? (
                <div className="flex-1 bg-[#F4F1EB] rounded-sm flex flex-col items-center justify-center gap-3 min-h-[400px]">
                  <div className="w-8 h-8 border-2 border-[#D4572A] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-[#8C857B]">AI가 연출컷을 생성하고 있습니다...</p>
                  <p className="text-xs text-[#B5AFA6]">카테고리: {selectedCategory}</p>
                </div>
              ) : hasResult ? (
                <div className="flex-1 flex flex-col gap-4">
                  {showBefore ? (
                    <div className="flex-1 bg-gradient-to-br from-stone-100 to-stone-200 rounded-sm flex items-center justify-center min-h-[400px]">
                      <div className="text-center">
                        <p className="text-sm text-[#4A4540] font-medium">원본 이미지 (Before)</p>
                        <p className="text-xs text-[#8C857B] mt-1">업로드된 원본 상품 이미지</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 bg-gradient-to-br from-amber-50 to-amber-100 rounded-sm flex items-center justify-center min-h-[400px]">
                      <div className="text-center">
                        <p className="text-sm text-[#4A4540] font-medium">연출컷 생성 완료 (After)</p>
                        <p className="text-xs text-[#8C857B] mt-1">
                          {STYLE_PRESETS.find((s) => s.id === selectedStyle)?.label} 스타일
                        </p>
                      </div>
                    </div>
                  )}
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
                  <p className="text-sm text-[#8C857B]">연출컷 결과가 여기에 표시됩니다</p>
                  <p className="text-xs text-[#B5AFA6]">상품 이미지를 업로드하고 스타일을 선택하세요</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
