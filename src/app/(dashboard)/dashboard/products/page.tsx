'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockProducts } from '@/data/mock/ver3-products';
import { Product } from '@/types/ver3';

const statusMap: Record<Product['status'], { label: string; className: string }> = {
  active: { label: '판매중', className: 'bg-green-50 text-green-700 border border-green-200' },
  draft: { label: '임시저장', className: 'bg-gray-50 text-gray-600 border border-gray-200' },
  soldout: { label: '품절', className: 'bg-red-50 text-red-700 border border-red-200' },
};

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Product['status']>('all');

  const filtered = mockProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Catalog</p>
          <h1 className="text-2xl font-bold text-[#2C2825]">상품 관리</h1>
        </div>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4572A] text-white text-sm font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors"
        >
          <span>+</span>
          <span>상품 등록</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C857B] text-sm">🔍</span>
          <input
            type="text"
            placeholder="상품명 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#E2DDD4] rounded-sm bg-[#FAFAF8] text-[#2C2825] placeholder-[#B5AFA6] focus:outline-none focus:border-[#D4572A]"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'draft', 'soldout'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 text-xs font-medium rounded-sm transition-colors ${
                statusFilter === s
                  ? 'bg-[#D4572A] text-white'
                  : 'bg-[#EAE6DE] text-[#4A4540] hover:bg-[#D4CFC6]'
              }`}
            >
              {s === 'all' ? '전체' : statusMap[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Count */}
      <p className="text-xs text-[#8C857B]">
        총 <span className="font-semibold text-[#2C2825]">{filtered.length}</span>개 상품
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E2DDD4] bg-[#FAFAF8]">
              <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">상품</th>
              <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">가격</th>
              <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">재고</th>
              <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">상태</th>
              <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const status = statusMap[product.status];
              return (
                <tr
                  key={product.id}
                  className="border-b border-[#E2DDD4] last:border-0 hover:bg-[#FAFAF8] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Image Placeholder */}
                      <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#EAE6DE] to-[#D4CFC6] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#2C2825]">{product.name}</p>
                        <p className="text-xs text-[#8C857B] mt-0.5">
                          {product.options?.map((o) => o.name).join(' · ')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {product.salePrice ? (
                      <div>
                        <p
                          className="text-sm font-semibold text-[#D4572A]"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          ₩{product.salePrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-[#B5AFA6] line-through">
                          ₩{product.price.toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p
                        className="text-sm font-semibold text-[#2C2825]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ₩{product.price.toLocaleString()}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className="text-sm text-[#2C2825]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-sm text-[11px] font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-xs text-[#8C857B] hover:text-[#2C2825] transition-colors px-2 py-1 rounded-sm hover:bg-[#EAE6DE]">
                        수정
                      </button>
                      <button className="text-xs text-[#8C857B] hover:text-red-600 transition-colors px-2 py-1 rounded-sm hover:bg-red-50">
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-16 text-center text-[#8C857B] text-sm">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((product) => {
          const status = statusMap[product.status];
          return (
            <div
              key={product.id}
              className="bg-white rounded-sm border border-[#E2DDD4] p-4 hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-sm bg-gradient-to-br from-[#EAE6DE] to-[#D4CFC6] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-[#2C2825] truncate">{product.name}</p>
                    <span className={`flex-shrink-0 inline-block px-2 py-0.5 rounded-sm text-[11px] font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    {product.salePrice ? (
                      <>
                        <span className="text-sm font-semibold text-[#D4572A]">₩{product.salePrice.toLocaleString()}</span>
                        <span className="text-xs text-[#B5AFA6] line-through">₩{product.price.toLocaleString()}</span>
                      </>
                    ) : (
                      <span className="text-sm font-semibold text-[#2C2825]">₩{product.price.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-[#8C857B]">재고 {product.stock}개</span>
                    <div className="flex gap-2">
                      <button className="text-xs text-[#8C857B] hover:text-[#2C2825]">수정</button>
                      <button className="text-xs text-[#8C857B] hover:text-red-600">삭제</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-white rounded-sm border border-[#E2DDD4] px-6 py-16 text-center text-[#8C857B] text-sm">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
