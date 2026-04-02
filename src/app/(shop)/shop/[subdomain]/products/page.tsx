'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import BeforeAfterHover from '@/components/BeforeAfterHover';
import { mockProducts, mockCategories } from '@/data/mock/ver3-products';
import { Product } from '@/types/ver3';

const categoryMap: Record<string, string> = {
  'cat-1': 'TOP',
  'cat-2': 'BOTTOM',
  'cat-3': 'TOP',
  'cat-4': 'TOP',
  'cat-5': 'BAG',
};

type SortOption = 'newest' | 'price-asc' | 'price-desc';

const SORT_LABELS: Record<SortOption, string> = {
  newest: '최신순',
  'price-asc': '가격낮은순',
  'price-desc': '가격높은순',
};

function formatPrice(price: number) {
  return price.toLocaleString('ko-KR');
}

function ProductCard({
  product,
  subdomain,
}: {
  product: Product;
  subdomain: string;
}) {
  const baCat = categoryMap[product.categoryId ?? ''] ?? 'TOP';
  const isOnSale = !!product.salePrice;

  return (
    <Link href={`/shop/${subdomain}/products/${product.id}`} className="group block">
      <div className="rounded-sm border border-[#E2DDD4] overflow-hidden transition-transform duration-200 group-hover:-translate-y-0.5">
        <BeforeAfterHover
          beforeImage={product.images.product}
          afterImage={product.images.modelCut ?? ''}
          category={baCat}
          label={product.name}
        />
      </div>
      <div className="mt-2 px-0.5">
        {isOnSale && (
          <span className="inline-block mb-1 px-1.5 py-0.5 bg-[#D4572A] text-white text-[9px] font-bold rounded-sm">
            SALE
          </span>
        )}
        <p className="text-xs text-[#2C2825] font-medium leading-snug line-clamp-2">
          {product.name}
        </p>
        <div className="mt-1 flex items-baseline gap-1.5">
          {isOnSale ? (
            <>
              <span
                className="text-sm font-semibold text-[#D4572A]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {formatPrice(product.salePrice!)}원
              </span>
              <span
                className="text-xs text-[#B5AFA6] line-through"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {formatPrice(product.price)}원
              </span>
            </>
          ) : (
            <span
              className="text-sm font-semibold text-[#2C2825]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {formatPrice(product.price)}원
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ subdomain: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { subdomain } = use(params);
  const { category: initialCategory } = use(searchParams);

  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory ?? 'all'
  );
  const [sort, setSort] = useState<SortOption>('newest');
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    if (activeCategory !== 'all') {
      const cat = mockCategories.find((c) => c.slug === activeCategory);
      if (cat) {
        products = products.filter((p) => p.categoryId === cat.id);
      }
    }

    switch (sort) {
      case 'price-asc':
        products.sort((a, b) => {
          const pa = a.salePrice ?? a.price;
          const pb = b.salePrice ?? b.price;
          return pa - pb;
        });
        break;
      case 'price-desc':
        products.sort((a, b) => {
          const pa = a.salePrice ?? a.price;
          const pb = b.salePrice ?? b.price;
          return pb - pa;
        });
        break;
      case 'newest':
      default:
        products.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return products;
  }, [activeCategory, sort]);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1120px] mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#2C2825]">전체 상품</h1>
          <p className="text-xs text-[#8C857B] mt-1">
            {filteredProducts.length}개 상품
          </p>
        </div>

        {/* Filter & Sort Row */}
        <div className="flex items-start justify-between gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-sm text-xs font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#2C2825] text-white'
                  : 'bg-[#F5F1EB] text-[#8C857B] hover:text-[#2C2825] hover:bg-[#EAE6DE]'
              }`}
            >
              전체
            </button>
            {mockCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-sm text-xs font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-[#2C2825] text-white'
                    : 'bg-[#F5F1EB] text-[#8C857B] hover:text-[#2C2825] hover:bg-[#EAE6DE]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 border border-[#E2DDD4] rounded-sm text-xs text-[#2C2825] hover:border-[#2C2825] transition-colors bg-white"
            >
              {SORT_LABELS[sort]}
              <svg
                className={`w-3 h-3 text-[#8C857B] transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-[#E2DDD4] rounded-sm shadow-sm z-20 overflow-hidden">
                {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(
                  ([value, label]) => (
                    <button
                      key={value}
                      onClick={() => {
                        setSort(value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                        sort === value
                          ? 'text-[#D4572A] font-semibold bg-[#FFF5F2]'
                          : 'text-[#2C2825] hover:bg-[#F5F1EB]'
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                subdomain={subdomain}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-sm font-medium text-[#2C2825] mb-2">상품이 없습니다</p>
            <p className="text-xs text-[#8C857B] mb-6">다른 카테고리를 선택해보세요</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-6 py-2.5 bg-[#D4572A] text-white text-xs font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors"
            >
              전체 상품 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
