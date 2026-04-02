import Link from 'next/link';
import BeforeAfterHover from '@/components/BeforeAfterHover';
import { mockProducts, mockShop, mockCategories } from '@/data/mock/ver3-products';
import { Product } from '@/types/ver3';

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

function ProductCard({ product, subdomain }: { product: Product; subdomain: string }) {
  const baCat = categoryMap[product.categoryId ?? ''] ?? 'TOP';
  const isOnSale = !!product.salePrice;

  return (
    <Link
      href={`/shop/${subdomain}/products/${product.id}`}
      className="group block"
    >
      <div className="rounded-sm border border-[#E2DDD4] overflow-hidden transition-transform duration-200 group-hover:-translate-y-0.5">
        <BeforeAfterHover
          beforeImage={product.images.product}
          afterImage={product.images.modelCut ?? ''}
          category={baCat}
          label={product.name}
        />
      </div>
      <div className="mt-2 px-0.5">
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

export default async function ShopPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[320px] md:h-[440px] bg-gradient-to-br from-[#2C2825] via-[#3D3530] to-[#1A1714] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#D4572A] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#D4572A] blur-2xl" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-[10px] tracking-[0.3em] text-[#D4572A] font-semibold uppercase mb-3">
            AI Fashion Store
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            {mockShop.shopName}
          </h1>
          <p className="text-sm text-white/60 max-w-sm mx-auto leading-relaxed">
            {mockShop.description}
          </p>
          <Link
            href={`/shop/${subdomain}/products`}
            className="inline-block mt-8 px-8 py-3 bg-[#D4572A] text-white text-sm font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors"
          >
            쇼핑하기
          </Link>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="sticky top-14 z-30 bg-white border-b border-[#E2DDD4]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            <Link
              href={`/shop/${subdomain}/products`}
              className="shrink-0 px-4 py-3 text-xs font-medium text-[#8C857B] hover:text-[#2C2825] border-b-2 border-transparent hover:border-[#D4572A] transition-colors"
            >
              전체
            </Link>
            {mockCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/${subdomain}/products?category=${cat.slug}`}
                className="shrink-0 px-4 py-3 text-xs font-medium text-[#8C857B] hover:text-[#2C2825] border-b-2 border-transparent hover:border-[#D4572A] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product Gallery */}
      <section className="max-w-[1120px] mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-base font-bold text-[#2C2825]">신상품</h2>
          <Link
            href={`/shop/${subdomain}/products`}
            className="text-xs text-[#8C857B] hover:text-[#D4572A] transition-colors"
          >
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              subdomain={subdomain}
            />
          ))}
        </div>
      </section>

      {/* AI 기능 소개 배너 */}
      <section className="bg-[#F5F1EB] py-16 px-6 mt-6">
        <div className="max-w-[1120px] mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] text-[#D4572A] font-semibold uppercase mb-3">
            AI-Powered
          </p>
          <h3 className="text-2xl font-bold text-[#2C2825] mb-3">
            AI 모델컷으로 확인하세요
          </h3>
          <p className="text-sm text-[#8C857B] max-w-md mx-auto leading-relaxed">
            상품 이미지에 마우스를 올리면 AI가 생성한 모델컷을 확인할 수 있습니다.
            실제 착용 모습을 미리 경험해보세요.
          </p>
        </div>
      </section>
    </div>
  );
}
