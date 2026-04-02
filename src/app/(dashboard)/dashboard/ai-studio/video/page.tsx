'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import UsageBar from '@/components/UsageBar';

type DurationOption = '3초' | '5초' | '10초';

const MOOD_PRESETS = [
  { id: 'mood1', label: '자연스러운', desc: '부드럽고 자연스러운 움직임', gradient: 'from-emerald-50 to-teal-100' },
  { id: 'mood2', label: '다이나믹', desc: '역동적인 카메라 워크', gradient: 'from-sky-50 to-blue-100' },
  { id: 'mood3', label: '감성적', desc: '느리고 감성적인 연출', gradient: 'from-rose-50 to-pink-100' },
  { id: 'mood4', label: '프리미엄', desc: '고급스러운 제품 연출', gradient: 'from-amber-50 to-yellow-100' },
];

const SPACE_OPTIONS = ['스튜디오', '야외', '인테리어', '추상'];
const LIGHT_OPTIONS = ['자연광', '스튜디오 조명', '황금빛 노을', '야간 조명'];
const MOOD_OPTIONS = ['밝고 화사', '차분하고 우아', '역동적', '감성적'];

const DURATION_OPTIONS: DurationOption[] = ['3초', '5초', '10초'];

const GALLERY_GRADIENTS = [
  'from-stone-200 to-stone-300',
  'from-rose-100 to-rose-200',
  'from-amber-100 to-amber-200',
  'from-sky-100 to-sky-200',
  'from-slate-100 to-slate-200',
  'from-violet-100 to-violet-200',
];

export default function VideoPage() {
  const [selectedMood, setSelectedMood] = useState('mood1');
  const [selectedSpace, setSelectedSpace] = useState('스튜디오');
  const [selectedLight, setSelectedLight] = useState('자연광');
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('밝고 화사');
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('5초');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setHasResult(false);
    setIsPlaying(false);
    setTimeout(() => {
      setIsGenerating(false);
      setHasResult(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">AI Studio</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">영상 변환</h1>
      </div>

      {/* Usage */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
        <div className="max-w-xs">
          <UsageBar used={3} total={10} label="영상 사용량" />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Panel */}
        <div className="w-[320px] shrink-0 space-y-4">

          {/* Image Selector */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">이미지 선택</p>
            <ImageUploader />
            <p className="text-[11px] text-[#8C857B] mt-3 mb-2">또는 갤러리에서 선택</p>
            <div className="grid grid-cols-3 gap-2">
              {GALLERY_GRADIENTS.map((grad, idx) => (
                <button
                  key={idx}
                  className={`aspect-square rounded-sm bg-gradient-to-br ${grad} hover:ring-2 hover:ring-[#D4572A] transition-all hover:-translate-y-0.5`}
                />
              ))}
            </div>
          </div>

          {/* Visual Mood */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">Visual Mood</p>
            <div className="grid grid-cols-2 gap-2">
              {MOOD_PRESETS.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`relative p-3 rounded-sm border-2 text-left transition-all hover:-translate-y-0.5 ${
                    selectedMood === mood.id
                      ? 'border-[#D4572A]'
                      : 'border-[#E2DDD4] hover:border-[#8C857B]'
                  }`}
                >
                  <div className={`w-full h-12 rounded-sm bg-gradient-to-br ${mood.gradient} mb-2`} />
                  <p className="text-xs font-semibold text-[#2C2825]">{mood.label}</p>
                  <p className="text-[10px] text-[#8C857B] mt-0.5">{mood.desc}</p>
                  {selectedMood === mood.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#D4572A] flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Scene Control */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">Scene Control</p>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-[#4A4540] mb-1.5">공간</p>
                <div className="flex flex-wrap gap-1.5">
                  {SPACE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSpace(s)}
                      className={`px-2.5 py-1 text-xs rounded-sm border transition-colors ${
                        selectedSpace === s
                          ? 'border-[#D4572A] bg-[#FDF5F2] text-[#D4572A]'
                          : 'border-[#E2DDD4] text-[#4A4540] hover:border-[#8C857B]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-[#4A4540] mb-1.5">빛</p>
                <div className="flex flex-wrap gap-1.5">
                  {LIGHT_OPTIONS.map((l) => (
                    <button
                      key={l}
                      onClick={() => setSelectedLight(l)}
                      className={`px-2.5 py-1 text-xs rounded-sm border transition-colors ${
                        selectedLight === l
                          ? 'border-[#D4572A] bg-[#FDF5F2] text-[#D4572A]'
                          : 'border-[#E2DDD4] text-[#4A4540] hover:border-[#8C857B]'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-[#4A4540] mb-1.5">분위기</p>
                <div className="flex flex-wrap gap-1.5">
                  {MOOD_OPTIONS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedAtmosphere(m)}
                      className={`px-2.5 py-1 text-xs rounded-sm border transition-colors ${
                        selectedAtmosphere === m
                          ? 'border-[#D4572A] bg-[#FDF5F2] text-[#D4572A]'
                          : 'border-[#E2DDD4] text-[#4A4540] hover:border-[#8C857B]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">영상 길이</p>
            <div className="flex gap-2">
              {DURATION_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDuration(d)}
                  className={`flex-1 py-2 text-sm font-medium rounded-sm border transition-colors ${
                    selectedDuration === d
                      ? 'border-[#D4572A] bg-[#FDF5F2] text-[#D4572A]'
                      : 'border-[#E2DDD4] text-[#4A4540] hover:border-[#8C857B]'
                  }`}
                >
                  {d}
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">영상 미리보기</p>

            {isGenerating ? (
              <div className="aspect-video bg-[#F4F1EB] rounded-sm flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-[#D4572A] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-[#8C857B]">AI가 영상을 생성하고 있습니다...</p>
                <p className="text-xs text-[#B5AFA6]">약 30~60초 소요됩니다</p>
              </div>
            ) : hasResult ? (
              <div className="space-y-4">
                <div className="relative aspect-video bg-gradient-to-br from-slate-700 to-slate-900 rounded-sm overflow-hidden flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-sm font-medium mb-1">영상 생성 완료</p>
                    <p className="text-xs text-white/60">{selectedDuration} · {selectedMood === 'mood1' ? '자연스러운' : selectedMood === 'mood2' ? '다이나믹' : selectedMood === 'mood3' ? '감성적' : '프리미엄'}</p>
                  </div>
                  <button
                    onClick={() => setIsPlaying((v) => !v)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                      {isPlaying ? (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                  </button>
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full w-1/3 bg-[#D4572A]" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-[#D4572A] text-white text-xs font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors">
                    다운로드
                  </button>
                  <button className="flex-1 py-2.5 bg-[#EAE6DE] text-[#2C2825] text-xs font-semibold rounded-sm hover:bg-[#D4CFC6] transition-colors">
                    갤러리에 저장
                  </button>
                  <button
                    onClick={() => setHasResult(false)}
                    className="flex-1 py-2.5 bg-[#EAE6DE] text-[#2C2825] text-xs font-semibold rounded-sm hover:bg-[#D4CFC6] transition-colors"
                  >
                    다시 생성
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-[#F4F1EB] rounded-sm flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E2DDD4]">
                <div className="w-12 h-12 rounded-full bg-[#EAE6DE] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#B5AFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-[#8C857B]">영상 결과가 여기에 표시됩니다</p>
                <p className="text-xs text-[#B5AFA6]">이미지를 선택하고 생성하기를 클릭하세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
