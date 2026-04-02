'use client';

import { useState, useMemo } from 'react';

interface GalleryItem {
  title: string;
  tag: string;
}

const gradientMap: Record<string, string> = {
  fashion: 'from-violet-600 to-purple-800',
  food: 'from-orange-500 to-red-700',
  beauty: 'from-pink-500 to-rose-700',
  'detail-page': 'from-blue-500 to-indigo-700',
};

export default function GallerySection({
  gallery,
  slug,
}: {
  gallery: GalleryItem[];
  slug: string;
}) {
  const tags = useMemo(
    () => ['전체', ...Array.from(new Set(gallery.map((g) => g.tag)))],
    [gallery]
  );
  const [activeTag, setActiveTag] = useState('전체');

  const filtered =
    activeTag === '전체'
      ? gallery
      : gallery.filter((g) => g.tag === activeTag);

  const gradient = gradientMap[slug] || 'from-gray-600 to-gray-800';

  return (
    <div>
      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              activeTag === tag
                ? 'bg-[#D4572A] text-white'
                : 'bg-[#EAE6DE] text-[#8C857B] hover:text-[#2C2825] border border-[#E2DDD4]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4`}
          >
            <span className="text-white/80 text-sm font-medium text-center mb-2">
              {item.title}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/20 text-white/90">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
