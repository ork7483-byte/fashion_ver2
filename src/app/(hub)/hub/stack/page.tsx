'use client';

import { useState } from 'react';
import stacks from '@/data/stacks.json';
import services from '@/data/services.json';

const serviceNames: Record<string, string> = {
  fashion: '패션',
  food: '식품',
  beauty: '뷰티',
  'detail-page': '상세페이지',
};

const serviceColors: Record<string, string> = {
  fashion: 'bg-[#2E6B4F]',
  food: 'bg-[#C4940A]',
  beauty: 'bg-[#D4572A]',
  'detail-page': 'bg-[#3A6B96]',
};

const industries = ['전체', '패션', '식품', '뷰티', '상세페이지'];
const categories = ['전체', '이미지 생성', '이미지 처리', '워크플로우', '모델 학습', '텍스트 생성', '레이아웃'];

const industryToSlug: Record<string, string> = {
  '패션': 'fashion',
  '식품': 'food',
  '뷰티': 'beauty',
  '상세페이지': 'detail-page',
};

export default function StackPage() {
  const [industryFilter, setIndustryFilter] = useState('전체');
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStack, setExpandedStack] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'matrix'>('grid');

  const filteredStacks = stacks.filter((stack) => {
    if (industryFilter !== '전체') {
      const slug = industryToSlug[industryFilter];
      if (!stack.usedIn.some((u) => u.service === slug)) return false;
    }
    if (categoryFilter !== '전체' && stack.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!stack.name.toLowerCase().includes(q) && !stack.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F4F1EB] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#2C2825] mb-2">기술 스택</h1>
          <p className="text-[#8C857B] text-lg">레고 블록처럼 기술을 조립해서 새 서비스에 재사용</p>
        </div>

        {/* Filter Bar */}
        <div className="space-y-4 mb-8">
          {/* Industry Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#B5AFA6] font-medium mr-1">업종</span>
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustryFilter(ind)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  industryFilter === ind
                    ? 'bg-[#FDF5F2] text-[#D4572A]'
                    : 'text-[#8C857B] hover:bg-[#F4F1EB]'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#B5AFA6] font-medium mr-1">분류</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#FDF5F2] text-[#D4572A]'
                    : 'text-[#8C857B] hover:bg-[#F4F1EB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + View Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B5AFA6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="스택 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg text-sm text-[#2C2825] placeholder-[#B5AFA6] focus:outline-none focus:border-[#D4572A] transition-colors"
              />
            </div>
            <div className="flex items-center bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  viewMode === 'grid' ? 'bg-[#FDF5F2] text-[#D4572A]' : 'text-[#8C857B] hover:text-[#2C2825]'
                }`}
              >
                카드
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  viewMode === 'matrix' ? 'bg-[#FDF5F2] text-[#D4572A]' : 'text-[#8C857B] hover:text-[#2C2825]'
                }`}
              >
                매트릭스
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredStacks.map((stack) => {
              const isExpanded = expandedStack === stack.id;
              return (
                <div
                  key={stack.id}
                  className={`bg-[#FFFFFF] border border-[#E2DDD4] rounded-xl overflow-hidden transition-all ${
                    isExpanded ? 'lg:col-span-2' : ''
                  }`}
                >
                  {/* Card Header - clickable */}
                  <button
                    onClick={() => setExpandedStack(isExpanded ? null : stack.id)}
                    className="w-full text-left p-5 hover:bg-[#F9F7F3] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[#2C2825] font-semibold text-base">{stack.name}</h3>
                        <span className="px-2 py-0.5 rounded-md bg-[#FDF5F2] text-[#D4572A] text-xs font-medium">
                          {stack.category}
                        </span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-[#B5AFA6] transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#B5AFA6] mb-3">
                      <span>v{stack.currentVersion}</span>
                      <span>{stack.lastUpdated}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stack.usedIn.map((u) => (
                        <span
                          key={u.service}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EAE6DE] text-xs text-[#8C857B]"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${serviceColors[u.service] || 'bg-gray-400'}`} />
                          {serviceNames[u.service] || u.service}
                        </span>
                      ))}
                    </div>
                  </button>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="border-t border-[#E2DDD4] p-5 space-y-5">
                      {/* Description */}
                      <div>
                        <h4 className="text-xs font-medium text-[#B5AFA6] uppercase tracking-wider mb-2">설명</h4>
                        <p className="text-sm text-[#2C2825]">{stack.description}</p>
                      </div>

                      {/* Version History */}
                      <div>
                        <h4 className="text-xs font-medium text-[#B5AFA6] uppercase tracking-wider mb-2">버전 히스토리</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-[#B5AFA6] text-xs">
                                <th className="pb-2 pr-4 font-medium">버전</th>
                                <th className="pb-2 pr-4 font-medium">날짜</th>
                                <th className="pb-2 font-medium">변경 내용</th>
                              </tr>
                            </thead>
                            <tbody>
                              {stack.versions.map((v, i) => (
                                <tr key={v.version} className={i === 0 ? 'text-[#2C2825]' : 'text-[#8C857B]'}>
                                  <td className="py-1.5 pr-4 font-mono text-xs">v{v.version}</td>
                                  <td className="py-1.5 pr-4 text-xs">{v.date}</td>
                                  <td className="py-1.5 text-xs">{v.note}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Used In Services */}
                      <div>
                        <h4 className="text-xs font-medium text-[#B5AFA6] uppercase tracking-wider mb-2">사용 중인 서비스</h4>
                        <div className="space-y-2">
                          {stack.usedIn.map((u) => (
                            <div key={u.service} className="flex items-center gap-3 text-sm">
                              <span className="inline-flex items-center gap-1.5 min-w-[80px]">
                                <span className={`w-2 h-2 rounded-full ${serviceColors[u.service] || 'bg-gray-400'}`} />
                                <span className="text-[#2C2825] font-medium">{serviceNames[u.service]}</span>
                              </span>
                              <span className="text-[#8C857B]">{u.usage}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Memo */}
                      <div>
                        <h4 className="text-xs font-medium text-[#B5AFA6] uppercase tracking-wider mb-2">메모</h4>
                        <p className="text-sm text-[#2C2825] bg-[#F9F7F3] rounded-lg p-3 border border-[#E2DDD4]">
                          {stack.memo}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Matrix View */}
        {viewMode === 'matrix' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 text-[#B5AFA6] font-medium text-xs bg-[#FFFFFF] border border-[#E2DDD4] sticky left-0 z-10">
                    스택
                  </th>
                  {services.map((svc) => (
                    <th
                      key={svc.slug}
                      className="p-3 text-center text-[#B5AFA6] font-medium text-xs bg-[#FFFFFF] border border-[#E2DDD4] min-w-[100px]"
                    >
                      {serviceNames[svc.slug] || svc.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStacks.map((stack, idx) => (
                  <tr key={stack.id} className={idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F9F7F3]'}>
                    <td className={`p-3 border border-[#E2DDD4] font-medium text-[#2C2825] sticky left-0 z-10 ${idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F9F7F3]'}`}>
                      <div className="flex items-center gap-2">
                        {stack.name}
                        <span className="text-[10px] text-[#8C857B] font-normal">v{stack.currentVersion}</span>
                      </div>
                    </td>
                    {services.map((svc) => {
                      const used = stack.usedIn.some((u) => u.service === svc.slug);
                      return (
                        <td key={svc.slug} className="p-3 text-center border border-[#E2DDD4]">
                          {used ? (
                            <span className="text-[#2E6B4F] font-medium">&#10003;</span>
                          ) : (
                            <span className="text-[#B5AFA6]">&mdash;</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {filteredStacks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#B5AFA6] text-lg">검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
