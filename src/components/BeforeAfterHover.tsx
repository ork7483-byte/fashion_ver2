'use client';

import { useState } from 'react';

interface BeforeAfterHoverProps {
  beforeImage: string;
  afterImage: string;
  category: string;
  label?: string;
}

const categoryGradients: Record<string, [string, string]> = {
  TOP: ['from-slate-300 to-slate-400', 'from-[#D4572A]/70 to-[#BF4D24]'],
  BOTTOM: ['from-stone-300 to-stone-400', 'from-[#D4572A]/70 to-[#BF4D24]'],
  BAG: ['from-zinc-300 to-zinc-400', 'from-[#D4572A]/70 to-[#BF4D24]'],
  SHOES: ['from-gray-300 to-gray-400', 'from-[#D4572A]/70 to-[#BF4D24]'],
};

export default function BeforeAfterHover({ category, label }: BeforeAfterHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [before, after] = categoryGradients[category] || categoryGradients.TOP;

  return (
    <div
      className="relative aspect-[3/4] rounded-sm border border-[#E2DDD4] overflow-hidden cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered((v) => !v)}
    >
      {/* Before */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${before} flex flex-col items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      >
        <span className="text-white/50 text-xs font-medium mb-2">{label}</span>
        <span className="text-white/80 text-sm font-semibold">제품 이미지</span>
      </div>

      {/* After */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${after} flex flex-col items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-white/70 text-xs font-medium mb-2">{label}</span>
        <span className="text-white text-sm font-semibold">AI 모델컷</span>
      </div>

      {/* Label Badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${isHovered ? 'bg-white/90 text-[#D4572A]' : 'bg-[#2C2825]/70 text-white'} transition-colors duration-300`}>
          {isHovered ? 'AFTER' : 'BEFORE'}
        </span>
      </div>

      {/* Category Badge */}
      <div className="absolute bottom-2 right-2 z-10">
        <span className="px-2 py-0.5 rounded-sm text-[10px] font-medium bg-white/20 text-white backdrop-blur-sm">
          {category}
        </span>
      </div>
    </div>
  );
}
