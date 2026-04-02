'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { mockProducts } from '@/data/mock/ver3-products';
import { CartItem } from '@/types/ver3';

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 50000;

function formatPrice(price: number) {
  return price.toLocaleString('ko-KR');
}

const categoryGradient: Record<string, string> = {
  'cat-1': 'from-stone-200 to-stone-300',
  'cat-2': 'from-slate-200 to-slate-300',
  'cat-3': 'from-stone-200 to-stone-300',
  'cat-4': 'from-slate-200 to-slate-300',
  'cat-5': 'from-zinc-200 to-zinc-300',
};

const defaultCartItems: CartItem[] = [
  {
    productId: mockProducts[0].id,
    product: mockProducts[0],
    quantity: 1,
    selectedOptions: { 사이즈: 'M', 색상: '아이보리' },
  },
  {
    productId: mockProducts[1].id,
    product: mockProducts[1],
    quantity: 1,
    selectedOptions: { 사이즈: 'M', 색상: '라이트블루' },
  },
];

export default function CartPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = use(params);
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultCartItems);

  function updateQuantity(productId: string, delta: number) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }

  function removeItem(productId: string) {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  const isEmpty = cartItems.length === 0;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1120px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="text-xl font-bold text-[#2C2825]">장바구니</h1>
          <span className="text-xs text-[#8C857B]">{cartItems.length}개 상품</span>
        </div>

        {isEmpty ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F5F1EB] flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#B5AFA6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[#2C2825] mb-2">장바구니가 비어있습니다</p>
            <p className="text-sm text-[#8C857B] mb-8">원하는 상품을 담아보세요</p>
            <Link
              href={`/shop/${subdomain}/products`}
              className="px-8 py-3 bg-[#D4572A] text-white text-sm font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors"
            >
              쇼핑 계속하기
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1">
              {/* Select all row */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD4] mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#D4572A]" />
                  <span className="text-xs font-medium text-[#2C2825]">전체선택</span>
                </label>
                <button
                  onClick={() => setCartItems([])}
                  className="text-xs text-[#8C857B] hover:text-[#D4572A] transition-colors"
                >
                  선택삭제
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => {
                  const price = item.product.salePrice ?? item.product.price;
                  const isOnSale = !!item.product.salePrice;
                  const grad = categoryGradient[item.product.categoryId ?? ''] ?? 'from-stone-200 to-stone-300';

                  return (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-4 border border-[#E2DDD4] rounded-sm"
                    >
                      {/* Checkbox */}
                      <div className="flex items-start pt-1">
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#D4572A]" />
                      </div>

                      {/* Product Image */}
                      <div
                        className={`w-20 h-24 shrink-0 rounded-sm bg-gradient-to-br ${grad} flex items-center justify-center`}
                      >
                        <span className="text-[10px] text-white/70 font-medium text-center px-1 leading-tight">
                          {item.product.name}
                        </span>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${subdomain}/products/${item.product.id}`}
                          className="text-sm font-semibold text-[#2C2825] hover:text-[#D4572A] transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>

                        {/* Options */}
                        {item.selectedOptions && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {Object.entries(item.selectedOptions).map(([key, val]) => (
                              <span
                                key={key}
                                className="text-[10px] text-[#8C857B] bg-[#F5F1EB] px-2 py-0.5 rounded-sm"
                              >
                                {key}: {val}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price */}
                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span
                            className={`text-sm font-semibold ${isOnSale ? 'text-[#D4572A]' : 'text-[#2C2825]'}`}
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {formatPrice(price)}원
                          </span>
                          {isOnSale && (
                            <span
                              className="text-xs text-[#B5AFA6] line-through"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {formatPrice(item.product.price)}원
                            </span>
                          )}
                        </div>

                        {/* Quantity + Remove */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#E2DDD4] rounded-sm overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.productId, -1)}
                              className="w-8 h-8 flex items-center justify-center text-[#8C857B] hover:bg-[#F5F1EB] transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-xs font-medium text-[#2C2825] border-x border-[#E2DDD4]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#8C857B] hover:bg-[#F5F1EB] transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className="text-sm font-bold text-[#2C2825]"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {formatPrice(price * item.quantity)}원
                            </span>
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="text-[#B5AFA6] hover:text-[#D4572A] transition-colors"
                              aria-label="상품 삭제"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue shopping */}
              <div className="mt-6">
                <Link
                  href={`/shop/${subdomain}/products`}
                  className="text-xs text-[#8C857B] hover:text-[#D4572A] transition-colors inline-flex items-center gap-1"
                >
                  ← 쇼핑 계속하기
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-[#F5F1EB] rounded-sm p-6 sticky top-28">
                <h2 className="text-sm font-bold text-[#2C2825] mb-5">주문 요약</h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C857B]">상품 금액 합계</span>
                    <span
                      className="font-medium text-[#2C2825]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {formatPrice(subtotal)}원
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C857B]">배송비</span>
                    <span
                      className={`font-medium ${shippingFee === 0 ? 'text-[#D4572A]' : 'text-[#2C2825]'}`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {shippingFee === 0 ? '무료' : `${formatPrice(shippingFee)}원`}
                    </span>
                  </div>
                </div>

                {/* Free shipping notice */}
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <div className="bg-white rounded-sm px-3 py-2 mb-5">
                    <p className="text-[10px] text-[#8C857B] leading-relaxed">
                      <span className="font-medium text-[#D4572A]">
                        {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}원
                      </span>{' '}
                      더 담으면 무료배송!
                      <br />
                      (50,000원 이상 무료배송)
                    </p>
                  </div>
                )}

                <div className="border-t border-[#E2DDD4] pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-[#2C2825]">합계</span>
                    <span
                      className="text-lg font-bold text-[#2C2825]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {formatPrice(total)}원
                    </span>
                  </div>
                </div>

                <button className="w-full py-4 bg-[#D4572A] text-white text-sm font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors">
                  주문하기 ({cartItems.length}개 상품)
                </button>

                <p className="text-[10px] text-[#B5AFA6] text-center mt-3">
                  안전한 결제 시스템으로 보호됩니다
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
