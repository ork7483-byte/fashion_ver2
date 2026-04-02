'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import BeforeAfterHover from '@/components/BeforeAfterHover';
import { mockProducts } from '@/data/mock/ver3-products';
import { Product } from '@/types/ver3';
import { notFound } from 'next/navigation';

const categoryMap: Record<string, string> = {
  'cat-1': 'TOP',
  'cat-2': 'BOTTOM',
  'cat-3': 'TOP',
  'cat-4': 'TOP',
  'cat-5': 'BAG',
};

function formatPrice(price: number) {
  return price.toLocaleString('ko-KR');
}

type ImageTab = '제품컷' | '모델컷' | '연출컷';
const IMAGE_TABS: ImageTab[] = ['제품컷', '모델컷', '연출컷'];

const tabGradients: Record<ImageTab, string> = {
  '제품컷': 'from-stone-200 to-stone-300',
  '모델컷': 'from-[#D4572A]/60 to-[#BF4D24]',
  '연출컷': 'from-slate-300 to-slate-400',
};

function ProductDetail({
  product,
  subdomain,
}: {
  product: Product;
  subdomain: string;
}) {
  const [activeTab, setActiveTab] = useState<ImageTab>('제품컷');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const baCat = categoryMap[product.categoryId ?? ''] ?? 'TOP';
  const isOnSale = !!product.salePrice;
  const displayPrice = product.salePrice ?? product.price;

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  function handleOption(name: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1120px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#8C857B] mb-8">
          <Link href={`/shop/${subdomain}`} className="hover:text-[#D4572A] transition-colors">
            홈
          </Link>
          <span>/</span>
          <Link href={`/shop/${subdomain}/products`} className="hover:text-[#D4572A] transition-colors">
            전체상품
          </Link>
          <span>/</span>
          <span className="text-[#2C2825]">{product.name}</span>
        </nav>

        {/* Product Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image Area */}
          <div>
            {/* Image Tabs */}
            <div className="flex gap-2 mb-3">
              {IMAGE_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-[#2C2825] text-white'
                      : 'bg-[#EAE6DE] text-[#8C857B] hover:text-[#2C2825]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Image Placeholder */}
            <div
              className={`aspect-[3/4] rounded-sm bg-gradient-to-br ${tabGradients[activeTab]} flex items-center justify-center transition-all duration-300 border border-[#E2DDD4]`}
            >
              <div className="text-center">
                <span className="block text-white/60 text-sm mb-1">{activeTab}</span>
                <span className="block text-white/80 text-lg font-semibold">
                  {product.name}
                </span>
              </div>
            </div>

            {/* Thumbnail row */}
            <div className="flex gap-2 mt-3">
              {IMAGE_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 aspect-square rounded-sm bg-gradient-to-br ${tabGradients[tab]} border-2 transition-colors ${
                    activeTab === tab ? 'border-[#D4572A]' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            {isOnSale && (
              <span className="inline-block mb-2 px-2 py-0.5 bg-[#D4572A] text-white text-[10px] font-bold rounded-sm w-fit">
                SALE
              </span>
            )}

            <h1 className="text-xl font-bold text-[#2C2825] leading-snug mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1">
              <span
                className={`text-2xl font-bold ${isOnSale ? 'text-[#D4572A]' : 'text-[#2C2825]'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {formatPrice(displayPrice)}원
              </span>
              {isOnSale && (
                <span
                  className="text-base text-[#B5AFA6] line-through"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {formatPrice(product.price)}원
                </span>
              )}
            </div>
            {isOnSale && (
              <p className="text-xs text-[#D4572A] mb-4">
                {Math.round(((product.price - displayPrice) / product.price) * 100)}% 할인 중
              </p>
            )}

            <p className="text-sm text-[#8C857B] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Delivery Info */}
            <div className="bg-[#F5F1EB] rounded-sm px-4 py-3 mb-6 space-y-1">
              <p className="text-xs text-[#8C857B]">
                <span className="font-medium text-[#2C2825]">배송</span> · 2~3일 이내 배송
              </p>
              <p className="text-xs text-[#8C857B]">
                <span className="font-medium text-[#2C2825]">배송비</span> · 3,000원 (50,000원 이상 무료)
              </p>
            </div>

            {/* Options */}
            {product.options?.map((option) => (
              <div key={option.name} className="mb-4">
                <p className="text-xs font-semibold text-[#2C2825] mb-2">{option.name}</p>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.name] === value;
                    return (
                      <button
                        key={value}
                        onClick={() => handleOption(option.name, value)}
                        className={`px-4 py-2 rounded-sm text-xs font-medium border transition-colors ${
                          isSelected
                            ? 'border-[#D4572A] bg-[#D4572A] text-white'
                            : 'border-[#E2DDD4] bg-white text-[#2C2825] hover:border-[#2C2825]'
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#2C2825] mb-2">수량</p>
              <div className="inline-flex items-center border border-[#E2DDD4] rounded-sm overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#8C857B] hover:bg-[#F5F1EB] transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-medium text-[#2C2825] border-x border-[#E2DDD4]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#8C857B] hover:bg-[#F5F1EB] transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-baseline justify-between py-4 border-t border-b border-[#E2DDD4] mb-6">
              <span className="text-sm text-[#8C857B]">합계</span>
              <span
                className="text-xl font-bold text-[#2C2825]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {formatPrice(displayPrice * quantity)}원
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button className="w-full py-4 bg-[#D4572A] text-white text-sm font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors">
                장바구니 담기
              </button>
              <button className="w-full py-4 bg-[#EAE6DE] text-[#2C2825] text-sm font-semibold rounded-sm hover:bg-[#DDD9D0] transition-colors">
                바로 구매
              </button>
            </div>
          </div>
        </div>

        {/* AI 생성 상세페이지 */}
        <section className="mt-16 border-t border-[#E2DDD4] pt-12">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-base font-bold text-[#2C2825]">AI 생성 상세페이지</h2>
            <span className="px-2 py-0.5 bg-[#D4572A]/10 text-[#D4572A] text-[10px] font-bold rounded-sm">
              AI GENERATED
            </span>
          </div>

          {/* Placeholder detail content */}
          <div className="space-y-6">
            {/* Feature highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['소재 & 품질', '핏 & 실루엣', '스타일링 팁'].map((title, i) => (
                <div
                  key={title}
                  className={`p-6 rounded-sm bg-gradient-to-br ${
                    i === 0
                      ? 'from-stone-100 to-stone-200'
                      : i === 1
                      ? 'from-[#D4572A]/10 to-[#D4572A]/20'
                      : 'from-slate-100 to-slate-200'
                  }`}
                >
                  <h3 className="text-sm font-bold text-[#2C2825] mb-2">{title}</h3>
                  <p className="text-xs text-[#8C857B] leading-relaxed">
                    {i === 0
                      ? '고급 린넨 소재로 제작되어 통기성이 뛰어나며 피부에 부드럽게 닿습니다. 세탁 후에도 형태가 유지됩니다.'
                      : i === 1
                      ? '오버사이즈 실루엣으로 여유로운 착용감을 제공합니다. 어깨선이 자연스럽게 떨어져 세련된 룩을 완성합니다.'
                      : '하이웨이스트 팬츠나 슬랙스와 매치하면 캐주얼하면서도 세련된 데일리 룩이 완성됩니다.'}
                  </p>
                </div>
              ))}
            </div>

            {/* Detail image placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['착용 디테일', 'AI 모델 착용컷'].map((label, i) => (
                <div
                  key={label}
                  className={`aspect-[4/3] rounded-sm bg-gradient-to-br ${
                    i === 0 ? 'from-stone-200 to-stone-300' : 'from-[#D4572A]/50 to-[#BF4D24]'
                  } flex items-center justify-center`}
                >
                  <div className="text-center">
                    <span className="block text-white/60 text-xs mb-1">{label}</span>
                    <span className="block text-white/80 text-sm font-medium">
                      {product.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Spec table */}
            <div className="border border-[#E2DDD4] rounded-sm overflow-hidden">
              <table className="w-full text-xs">
                <tbody>
                  {[
                    ['소재', '린넨 100%'],
                    ['원산지', '국내산'],
                    ['세탁방법', '손세탁 권장, 중성세제 사용'],
                    ['주의사항', '직사광선을 피해 보관'],
                  ].map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-[#F5F1EB]' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-[#2C2825] w-1/3 border-r border-[#E2DDD4]">
                        {key}
                      </td>
                      <td className="px-4 py-3 text-[#8C857B]">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-[#E2DDD4] pt-12">
            <h2 className="text-base font-bold text-[#2C2825] mb-6">관련 상품</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => {
                const relCat = categoryMap[p.categoryId ?? ''] ?? 'TOP';
                const relIsOnSale = !!p.salePrice;
                return (
                  <Link
                    key={p.id}
                    href={`/shop/${subdomain}/products/${p.id}`}
                    className="group block"
                  >
                    <div className="rounded-sm border border-[#E2DDD4] overflow-hidden transition-transform duration-200 group-hover:-translate-y-0.5">
                      <BeforeAfterHover
                        beforeImage={p.images.product}
                        afterImage={p.images.modelCut ?? ''}
                        category={relCat}
                        label={p.name}
                      />
                    </div>
                    <div className="mt-2 px-0.5">
                      <p className="text-xs text-[#2C2825] font-medium leading-snug line-clamp-2">
                        {p.name}
                      </p>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        {relIsOnSale ? (
                          <>
                            <span
                              className="text-sm font-semibold text-[#D4572A]"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {formatPrice(p.salePrice!)}원
                            </span>
                            <span
                              className="text-xs text-[#B5AFA6] line-through"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {formatPrice(p.price)}원
                            </span>
                          </>
                        ) : (
                          <span
                            className="text-sm font-semibold text-[#2C2825]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {formatPrice(p.price)}원
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ subdomain: string; id: string }>;
}) {
  const { subdomain, id } = use(params);
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} subdomain={subdomain} />;
}
