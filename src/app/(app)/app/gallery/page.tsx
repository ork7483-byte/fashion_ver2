'use client';

import { useState } from 'react';

const filters = ['전체', '모델컷', '가상피팅', '영상', '연출컷'] as const;

export default function GalleryPage() {
  const [filter, setFilter] = useState('전체');

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl font-bold text-[#2C2825] mb-6">내 갤러리</h1>

      <div className="flex gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
              filter === f ? 'bg-[#D4572A] text-white' : 'bg-white text-[#8C857B] border border-[#E2DDD4]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-[3/4] rounded-sm border border-[#E2DDD4] bg-white flex items-center justify-center group relative overflow-hidden">
            <div className="bg-gradient-to-br from-slate-200 to-slate-300 absolute inset-0" />
            <span className="relative text-[#8C857B] text-xs">샘플 {i + 1}</span>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="px-3 py-1.5 rounded-sm bg-white text-[#2C2825] text-xs font-medium">다운로드</button>
              <button className="px-3 py-1.5 rounded-sm bg-[#D4572A] text-white text-xs font-medium">삭제</button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state for no results */}
      <div className="text-center py-16 text-[#8C857B]">
        <p className="text-sm">아직 생성한 이미지가 없습니다</p>
        <p className="text-xs mt-1">모델컷을 만들어보세요!</p>
      </div>
    </div>
  );
}
