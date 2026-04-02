'use client';

import { useState, useEffect, useRef } from 'react';

interface ResultCanvasProps {
  isGenerating: boolean;
  onGenerate: () => void;
}

export default function ResultCanvas({ isGenerating, onGenerate }: ResultCanvasProps) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (isGenerating) {
      setTimeLeft(10);
      setIsComplete(false);
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setIsComplete(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isGenerating]);

  const progress = isGenerating ? ((10 - timeLeft) / 10) * 100 : 0;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (progress / 100) * circumference;

  // Idle state
  if (!isGenerating && !isComplete) {
    return (
      <div className="aspect-square rounded-sm border border-[#E2DDD4] bg-white flex flex-col items-center justify-center text-center p-8">
        <div className="text-4xl mb-4 text-[#B5AFA6]">🎨</div>
        <p className="text-sm text-[#8C857B] mb-6">의상을 첨부하고<br />생성하기를 눌러주세요</p>
        <button
          onClick={onGenerate}
          className="px-6 py-2.5 rounded-sm bg-[#D4572A] text-white text-sm font-semibold hover:bg-[#BF4D24] hover:-translate-y-0.5 transition-all duration-150"
        >
          생성하기
        </button>
      </div>
    );
  }

  // Generating state
  if (isGenerating && !isComplete) {
    return (
      <div className="aspect-square rounded-sm border border-[#E2DDD4] bg-white flex flex-col items-center justify-center">
        <div className="relative w-28 h-28 mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#EAE6DE" strokeWidth="4" />
            <circle
              cx="50" cy="50" r="45" fill="none" stroke="#D4572A" strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#D4572A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {timeLeft}
            </span>
          </div>
        </div>
        <p className="text-sm font-medium text-[#2C2825]">AI가 생성 중...</p>
        <p className="text-xs text-[#8C857B] mt-1">잠시만 기다려주세요</p>
      </div>
    );
  }

  // Complete state
  return (
    <div className="rounded-sm border border-[#E2DDD4] overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-[#D4572A]/60 to-[#BF4D24]/80 flex items-center justify-center">
        <span className="text-white text-lg font-semibold">AI 모델컷 완성!</span>
      </div>
      <div className="p-4 bg-white flex gap-2">
        <button className="flex-1 py-2 rounded-sm bg-[#D4572A] text-white text-xs font-semibold hover:bg-[#BF4D24] transition-colors">
          다운로드
        </button>
        <button className="flex-1 py-2 rounded-sm bg-[#EAE6DE] text-[#2C2825] text-xs font-semibold hover:bg-[#E2DDD4] transition-colors">
          갤러리에 저장
        </button>
        <button className="flex-1 py-2 rounded-sm bg-[#EAE6DE] text-[#2C2825] text-xs font-semibold hover:bg-[#E2DDD4] transition-colors">
          공유
        </button>
      </div>
    </div>
  );
}
