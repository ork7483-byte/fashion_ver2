'use client';

import { useState } from 'react';
import Link from 'next/link';
import services from '@/data/services.json';

const gradientMap: Record<string, string> = {
  fashion: 'from-violet-600 to-purple-800',
  food: 'from-orange-500 to-red-700',
  beauty: 'from-pink-500 to-rose-700',
  'detail-page': 'from-blue-500 to-indigo-700',
};

const statusFilters = ['전체', '운영 중', '개발 중', '준비 중'] as const;

function StatusBadge({ status, color }: { status: string; color: string }) {
  const colorMap: Record<string, string> = {
    green: 'bg-[#F0F7F4] text-[#2E6B4F]',
    yellow: 'bg-[#FFFBF0] text-[#C4940A]',
    gray: 'bg-[#EAE6DE] text-[#B5AFA6]',
    red: 'bg-[#FDF2F2] text-[#B33D3D]',
  };
  const dotMap: Record<string, string> = {
    green: 'bg-[#2E6B4F]',
    yellow: 'bg-[#C4940A]',
    gray: 'bg-[#B5AFA6]',
    red: 'bg-[#B33D3D]',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colorMap[color] || colorMap.gray}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotMap[color] || dotMap.gray}`}
      />
      {status}
    </span>
  );
}

export default function ServicesPage() {
  const [filter, setFilter] = useState<string>('전체');

  const filtered =
    filter === '전체'
      ? services
      : services.filter((s) => s.status === filter);

  return (
    <div className="min-h-screen bg-[#F4F1EB] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#2C2825] mb-2">
            운영 서비스
          </h1>
          <p className="text-[#8C857B]">
            AI 기능을 업종별로 특화한 4개 서비스
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8">
          {statusFilters.map((label) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === label
                  ? 'bg-[#D4572A] text-white'
                  : 'bg-[#EAE6DE] text-[#8C857B] hover:text-[#2C2825] border border-[#E2DDD4]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Service Card List */}
        <div className="flex flex-col gap-4">
          {filtered.map((service) => (
            <div
              key={service.slug}
              className="flex flex-col sm:flex-row gap-5 bg-[#FFFFFF] border border-[#E2DDD4] rounded-[2px] p-5 hover:border-[#D4572A]/50 transition-all duration-200"
            >
              {/* Thumbnail */}
              <div
                className={`w-full sm:w-48 h-32 rounded-xl bg-gradient-to-br ${gradientMap[service.slug] || 'from-gray-600 to-gray-800'} flex items-center justify-center shrink-0`}
              >
                <span className="text-white/60 text-sm font-medium">
                  {service.name}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-bold text-[#2C2825]">
                      {service.name}
                    </h2>
                    <StatusBadge
                      status={service.status}
                      color={service.statusColor}
                    />
                  </div>
                  <p className="text-[#8C857B] text-sm leading-relaxed line-clamp-2 mb-3">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {service.stacks.map((stack) => (
                      <span
                        key={stack}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAE6DE] text-[#8C857B]"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/hub/services/${service.slug}`}
                    className="text-[#D4572A] text-sm font-medium hover:text-[#BF4D24] transition-colors whitespace-nowrap ml-4"
                  >
                    상세 보기 &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
