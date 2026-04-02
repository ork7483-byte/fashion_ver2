'use client';

import { useState } from 'react';

type ClothingTab = 'top-bottom' | 'onepiece';
type RatioOption = '16:9' | '3:2' | '4:3' | '1:1' | '3:4' | '2:3' | '9:16';

const RATIO_OPTIONS: RatioOption[] = ['16:9', '3:2', '4:3', '1:1', '3:4', '2:3', '9:16'];

const TOP_PRESETS = [
  { id: 't1', label: '화이트 셔츠', gradient: 'from-slate-50 to-slate-100' },
  { id: 't2', label: '스트라이프', gradient: 'from-sky-50 to-sky-100' },
  { id: 't3', label: '니트 탑', gradient: 'from-amber-50 to-amber-100' },
  { id: 't4', label: '블라우스', gradient: 'from-rose-50 to-rose-100' },
];

const BOTTOM_PRESETS = [
  { id: 'b1', label: '와이드 팬츠', gradient: 'from-stone-100 to-stone-200' },
  { id: 'b2', label: '미니 스커트', gradient: 'from-pink-50 to-pink-100' },
  { id: 'b3', label: '슬랙스', gradient: 'from-zinc-100 to-zinc-200' },
];

const ONEPIECE_PRESETS = [
  { id: 'op1', label: '플리츠 원피스', gradient: 'from-fuchsia-50 to-fuchsia-100' },
  { id: 'op2', label: '캐주얼 원피스', gradient: 'from-violet-50 to-violet-100' },
  { id: 'op3', label: '니트 원피스', gradient: 'from-amber-50 to-amber-100' },
  { id: 'op4', label: '셔링 원피스', gradient: 'from-rose-50 to-rose-100' },
];

const MODEL_PRESETS = [
  { id: 'fm1', label: '여성 모델 A', gradient: 'from-rose-100 to-rose-200' },
  { id: 'fm2', label: '여성 모델 B', gradient: 'from-pink-100 to-pink-200' },
  { id: 'fm3', label: '남성 모델 A', gradient: 'from-slate-100 to-slate-200' },
];

const POSE_PRESETS = [
  { id: 'p1', label: '정면 스탠딩', gradient: 'from-sky-50 to-sky-100' },
  { id: 'p2', label: '측면 스탠딩', gradient: 'from-teal-50 to-teal-100' },
  { id: 'p3', label: '앉은 자세', gradient: 'from-emerald-50 to-emerald-100' },
  { id: 'p4', label: '걷는 자세', gradient: 'from-lime-50 to-lime-100' },
];

const BG_PRESETS = [
  { id: 'bg1', label: '스튜디오', gradient: 'from-gray-100 to-gray-200' },
  { id: 'bg2', label: '야외', gradient: 'from-green-50 to-green-100' },
  { id: 'bg3', label: '카페', gradient: 'from-amber-50 to-amber-100' },
  { id: 'bg4', label: '도심', gradient: 'from-slate-100 to-slate-200' },
];

interface PresetCardProps {
  id: string;
  label: string;
  gradient: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

function PresetCard({ id, label, gradient, selected, onSelect }: PresetCardProps) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`relative rounded-sm overflow-hidden border-2 transition-all hover:-translate-y-0.5 ${
        selected ? 'border-[#D4572A]' : 'border-[#E2DDD4] hover:border-[#8C857B]'
      }`}
    >
      <div className={`w-full aspect-square bg-gradient-to-br ${gradient} flex items-end justify-center pb-1.5`}>
        <span className="text-[10px] font-medium text-[#4A4540] bg-white/70 px-1.5 py-0.5 rounded-sm">
          {label}
        </span>
      </div>
      {selected && (
        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4572A] flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}

function AttachButton() {
  return (
    <button className="relative rounded-sm overflow-hidden border-2 border-dashed border-[#E2DDD4] hover:border-[#D4572A] transition-colors">
      <div className="w-full aspect-square bg-[#FAFAF8] flex flex-col items-center justify-center gap-1">
        <span className="text-lg text-[#B5AFA6]">+</span>
        <span className="text-[10px] text-[#8C857B]">내 이미지</span>
      </div>
    </button>
  );
}

export default function FittingPage() {
  const [clothingTab, setClothingTab] = useState<ClothingTab>('top-bottom');
  const [selectedTop, setSelectedTop] = useState('t1');
  const [selectedBottom, setSelectedBottom] = useState('b1');
  const [selectedOnepiece, setSelectedOnepiece] = useState('op1');
  const [selectedModel, setSelectedModel] = useState('fm1');
  const [selectedPose, setSelectedPose] = useState('p1');
  const [selectedBg, setSelectedBg] = useState('bg1');
  const [selectedRatio, setSelectedRatio] = useState<RatioOption>('3:4');
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
        <h1 className="text-2xl font-bold text-[#2C2825]">가상 피팅</h1>
      </div>

      <div className="flex gap-6">
        {/* Left Panel */}
        <div className="w-[320px] shrink-0 space-y-4">

          {/* 의상 */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">의상</p>
            {/* Tab */}
            <div className="flex gap-1 bg-[#EAE6DE] p-1 rounded-sm mb-4">
              {([['top-bottom', '상/하의'], ['onepiece', '원피스']] as const).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setClothingTab(id)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                    clothingTab === id
                      ? 'bg-white text-[#2C2825] shadow-sm'
                      : 'text-[#8C857B] hover:text-[#2C2825]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {clothingTab === 'top-bottom' ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-[#4A4540] mb-2">상의</p>
                  <div className="grid grid-cols-4 gap-2">
                    {TOP_PRESETS.map((p) => (
                      <PresetCard key={p.id} {...p} selected={selectedTop === p.id} onSelect={setSelectedTop} />
                    ))}
                    <AttachButton />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#4A4540] mb-2">하의</p>
                  <div className="grid grid-cols-4 gap-2">
                    {BOTTOM_PRESETS.map((p) => (
                      <PresetCard key={p.id} {...p} selected={selectedBottom === p.id} onSelect={setSelectedBottom} />
                    ))}
                    <AttachButton />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-4 gap-2">
                  {ONEPIECE_PRESETS.map((p) => (
                    <PresetCard key={p.id} {...p} selected={selectedOnepiece === p.id} onSelect={setSelectedOnepiece} />
                  ))}
                  <AttachButton />
                </div>
              </div>
            )}
          </div>

          {/* 모델 */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">모델</p>
            <div className="grid grid-cols-4 gap-2">
              {MODEL_PRESETS.map((p) => (
                <PresetCard key={p.id} {...p} selected={selectedModel === p.id} onSelect={setSelectedModel} />
              ))}
              <AttachButton />
            </div>
          </div>

          {/* 포즈 */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">포즈</p>
            <div className="grid grid-cols-4 gap-2">
              {POSE_PRESETS.map((p) => (
                <PresetCard key={p.id} {...p} selected={selectedPose === p.id} onSelect={setSelectedPose} />
              ))}
              <AttachButton />
            </div>
          </div>

          {/* 배경 */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">배경</p>
            <div className="grid grid-cols-4 gap-2">
              {BG_PRESETS.map((p) => (
                <PresetCard key={p.id} {...p} selected={selectedBg === p.id} onSelect={setSelectedBg} />
              ))}
              <AttachButton />
            </div>
          </div>

          {/* 비율 */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">비율</p>
            <div className="flex flex-wrap gap-1.5">
              {RATIO_OPTIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRatio(r)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-sm border transition-colors ${
                    selectedRatio === r
                      ? 'border-[#D4572A] bg-[#FDF5F2] text-[#D4572A]'
                      : 'border-[#E2DDD4] text-[#4A4540] hover:border-[#8C857B]'
                  }`}
                >
                  {r}
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
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6 h-full flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">결과 미리보기</p>
            <div className="flex-1 flex flex-col">
              {isGenerating ? (
                <div className="flex-1 bg-[#F4F1EB] rounded-sm flex flex-col items-center justify-center gap-3 min-h-[400px]">
                  <div className="w-8 h-8 border-2 border-[#D4572A] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-[#8C857B]">가상 피팅을 처리하고 있습니다...</p>
                  <p className="text-xs text-[#B5AFA6]">약 15~30초 소요됩니다</p>
                </div>
              ) : hasResult ? (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex-1 bg-gradient-to-br from-violet-50 to-fuchsia-100 rounded-sm flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                      <p className="text-sm text-[#4A4540] font-medium">가상 피팅 완료</p>
                      <p className="text-xs text-[#8C857B] mt-1">비율: {selectedRatio}</p>
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
                  <p className="text-sm text-[#8C857B]">가상 피팅 결과가 여기에 표시됩니다</p>
                  <p className="text-xs text-[#B5AFA6]">의상, 모델, 포즈를 선택하고 생성하기를 클릭하세요</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
