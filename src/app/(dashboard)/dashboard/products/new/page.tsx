'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { mockCategories } from '@/data/mock/ver3-products';

type AIPipeline = {
  productCut: boolean;
  modelCut: boolean;
  styledCut: boolean;
  detailPage: boolean;
};

type AIResultTab = 'productCut' | 'modelCut' | 'styledCut' | 'detailPage';

const AI_RESULT_TABS: { key: AIResultTab; label: string }[] = [
  { key: 'productCut', label: '누끼' },
  { key: 'modelCut', label: '모델컷' },
  { key: 'styledCut', label: '연출컷' },
  { key: 'detailPage', label: '상세페이지' },
];

const MODEL_OPTIONS = [
  { value: 'model-f-01', label: '여성 모델 A (20대)' },
  { value: 'model-f-02', label: '여성 모델 B (30대)' },
  { value: 'model-m-01', label: '남성 모델 A (20대)' },
  { value: 'model-m-02', label: '남성 모델 B (30대)' },
];

const GRADIENT_PLACEHOLDERS: Record<AIResultTab, string> = {
  productCut: 'from-slate-100 to-slate-200',
  modelCut: 'from-rose-50 to-rose-100',
  styledCut: 'from-amber-50 to-amber-100',
  detailPage: 'from-sky-50 to-sky-100',
};

export default function NewProductPage() {
  // Step 1: Basic Info
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sizes, setSizes] = useState('S, M, L');
  const [colors, setColors] = useState('');

  // Step 3: AI Pipeline
  const [aiPipeline, setAiPipeline] = useState<AIPipeline>({
    productCut: true,
    modelCut: true,
    styledCut: true,
    detailPage: true,
  });
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0].value);
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<AIResultTab>('productCut');

  const handleAIGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2500);
  };

  const handleSubmit = () => {
    alert('상품이 등록되었습니다!');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Page Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Catalog</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">상품 등록</h1>
      </div>

      {/* STEP 1: 기본 정보 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8] flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#D4572A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">기본 정보</p>
        </div>
        <div className="p-6 space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">상품명</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="예: 오버사이즈 린넨 블라우스"
              className="w-full px-4 py-2.5 text-sm border border-[#E2DDD4] rounded-sm bg-[#FAFAF8] text-[#2C2825] placeholder-[#B5AFA6] focus:outline-none focus:border-[#D4572A]"
            />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">가격 (원)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2.5 text-sm border border-[#E2DDD4] rounded-sm bg-[#FAFAF8] text-[#2C2825] placeholder-[#B5AFA6] focus:outline-none focus:border-[#D4572A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">카테고리</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-[#E2DDD4] rounded-sm bg-[#FAFAF8] text-[#2C2825] focus:outline-none focus:border-[#D4572A]"
              >
                <option value="">카테고리 선택</option>
                {mockCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">옵션</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-[#8C857B] mb-1">사이즈 (쉼표로 구분)</p>
                <input
                  type="text"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  placeholder="S, M, L, XL"
                  className="w-full px-3 py-2 text-sm border border-[#E2DDD4] rounded-sm bg-[#FAFAF8] text-[#2C2825] placeholder-[#B5AFA6] focus:outline-none focus:border-[#D4572A]"
                />
              </div>
              <div>
                <p className="text-[11px] text-[#8C857B] mb-1">색상 (쉼표로 구분)</p>
                <input
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  placeholder="블랙, 화이트, 베이지"
                  className="w-full px-3 py-2 text-sm border border-[#E2DDD4] rounded-sm bg-[#FAFAF8] text-[#2C2825] placeholder-[#B5AFA6] focus:outline-none focus:border-[#D4572A]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2: 제품 사진 업로드 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8] flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#D4572A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">제품 사진 업로드</p>
        </div>
        <div className="p-6">
          <p className="text-xs text-[#8C857B] mb-4">AI가 분석할 원본 제품 사진을 업로드하세요. 흰 배경의 정면 사진을 권장합니다.</p>
          <ImageUploader />
        </div>
      </div>

      {/* STEP 3: AI 자동 생성 */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8] flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#D4572A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">AI 자동 생성</p>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#FDF5F2] text-[#D4572A] rounded-sm border border-[#F5C4B4]">★ 핵심 기능</span>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Checkboxes */}
          <div>
            <p className="text-xs font-semibold text-[#4A4540] mb-3">생성할 콘텐츠 선택</p>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { key: 'productCut' as const, label: '누끼컷', desc: '배경 제거 이미지' },
                  { key: 'modelCut' as const, label: '모델컷', desc: 'AI 모델 착용샷' },
                  { key: 'styledCut' as const, label: '연출컷', desc: '분위기 연출 이미지' },
                  { key: 'detailPage' as const, label: '상세페이지', desc: '자동 구성 페이지' },
                ] as const
              ).map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-start gap-3 p-3 rounded-sm border cursor-pointer transition-colors ${
                    aiPipeline[key]
                      ? 'border-[#D4572A] bg-[#FDF5F2]'
                      : 'border-[#E2DDD4] bg-[#FAFAF8] hover:border-[#B5AFA6]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={aiPipeline[key]}
                    onChange={(e) => setAiPipeline((prev) => ({ ...prev, [key]: e.target.checked }))}
                    className="mt-0.5 accent-[#D4572A]"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#2C2825]">{label}</p>
                    <p className="text-[11px] text-[#8C857B]">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Model Selector */}
          {aiPipeline.modelCut && (
            <div>
              <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">AI 모델 선택</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-[#E2DDD4] rounded-sm bg-[#FAFAF8] text-[#2C2825] focus:outline-none focus:border-[#D4572A]"
              >
                {MODEL_OPTIONS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleAIGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-[#D4572A] text-white text-sm font-bold rounded-sm hover:bg-[#BF4D24] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI 생성 중...
              </>
            ) : (
              'AI 생성 시작하기'
            )}
          </button>

          {/* Result Preview */}
          {hasGenerated && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#4A4540]">생성 결과 미리보기</p>
              {/* Tabs */}
              <div className="flex gap-1 border-b border-[#E2DDD4]">
                {AI_RESULT_TABS.filter((t) => aiPipeline[t.key]).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 text-xs font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === tab.key
                        ? 'border-[#D4572A] text-[#D4572A]'
                        : 'border-transparent text-[#8C857B] hover:text-[#2C2825]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* Preview area */}
              <div className={`w-full aspect-square rounded-sm bg-gradient-to-br ${GRADIENT_PLACEHOLDERS[activeTab]} flex items-center justify-center`}>
                <div className="text-center">
                  <p className="text-[#8C857B] text-sm font-medium">
                    {AI_RESULT_TABS.find((t) => t.key === activeTab)?.label} 생성 완료
                  </p>
                  <p className="text-[#B5AFA6] text-xs mt-1">실제 서비스에서는 AI 생성 이미지가 표시됩니다</p>
                </div>
              </div>

              {/* Hover Toggle */}
              <label className="flex items-center gap-3 p-3 rounded-sm border border-[#E2DDD4] cursor-pointer hover:bg-[#FAFAF8]">
                <div
                  onClick={() => setHoverEnabled((v) => !v)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                    hoverEnabled ? 'bg-[#D4572A]' : 'bg-[#D4CFC6]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      hoverEnabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2C2825]">호버 전환 활성화</p>
                  <p className="text-[11px] text-[#8C857B]">상품 카드 마우스 오버시 모델컷으로 자동 전환</p>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* STEP 4: Submit */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8] flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#D4572A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">등록 완료</p>
        </div>
        <div className="p-6 flex items-center gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-[#D4572A] text-white text-sm font-bold rounded-sm hover:bg-[#BF4D24] transition-colors"
          >
            상품 등록하기
          </button>
          <button
            className="px-6 py-3 bg-[#EAE6DE] text-[#4A4540] text-sm font-medium rounded-sm hover:bg-[#D4CFC6] transition-colors"
          >
            임시저장
          </button>
        </div>
      </div>
    </div>
  );
}
