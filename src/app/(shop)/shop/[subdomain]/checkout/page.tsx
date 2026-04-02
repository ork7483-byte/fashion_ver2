'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { mockProducts, mockShop } from '@/data/mock/ver3-products';

type PaymentMethod = 'card' | 'kakaopay' | 'tosspay';

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 50000;

function formatPrice(price: number) {
  return price.toLocaleString('ko-KR');
}

const checkoutItems = [
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

const PAYMENT_METHODS: { id: PaymentMethod; label: string; desc: string }[] = [
  { id: 'card', label: '카드결제', desc: '신용카드 · 체크카드' },
  { id: 'kakaopay', label: '카카오페이', desc: '간편결제' },
  { id: 'tosspay', label: '토스페이', desc: '간편결제' },
];

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = use(params);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const subtotal = checkoutItems.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const discount = checkoutItems.reduce((sum, item) => {
    if (!item.product.salePrice) return sum;
    return sum + (item.product.price - item.product.salePrice) * item.quantity;
  }, 0);
  const total = subtotal + shippingFee;

  const canPay = agreeTerms && agreePrivacy && name && email && phone && zipCode && address1;

  const handlePay = () => {
    if (!canPay) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    alert('결제가 완료되었습니다!');
  };

  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      <div className="max-w-[1040px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/shop/${subdomain}/cart`}
            className="text-xs text-[#8C857B] hover:text-[#D4572A] transition-colors inline-flex items-center gap-1 mb-3"
          >
            ← 장바구니로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-[#2C2825]">주문/결제</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-5">

            {/* Order Summary */}
            <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">주문 상품</p>
              </div>
              <div className="divide-y divide-[#F5F1EB]">
                {checkoutItems.map((item) => {
                  const price = item.product.salePrice ?? item.product.price;
                  return (
                    <div key={item.productId} className="px-6 py-4 flex items-center gap-4">
                      <div className="w-16 h-16 shrink-0 rounded-sm bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                        <span className="text-[10px] text-white/70 font-medium text-center px-1">
                          {item.product.name.slice(0, 4)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#2C2825] truncate">{item.product.name}</p>
                        {item.selectedOptions && (
                          <p className="text-xs text-[#8C857B] mt-0.5">
                            {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(' / ')}
                          </p>
                        )}
                        <p className="text-xs text-[#8C857B] mt-0.5">수량: {item.quantity}개</p>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-sm font-semibold text-[#2C2825]"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {formatPrice(price * item.quantity)}원
                        </p>
                        {item.product.salePrice && (
                          <p
                            className="text-xs text-[#B5AFA6] line-through"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {formatPrice(item.product.price * item.quantity)}원
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buyer Info */}
            <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">구매자 정보</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">이름 *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">연락처 *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A4540] mb-1.5">이메일 *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">배송지</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="우편번호"
                    className="flex-1 px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
                  />
                  <button className="px-4 py-2 bg-[#EAE6DE] text-[#4A4540] text-sm font-medium rounded-sm hover:bg-[#D4CFC6] transition-colors whitespace-nowrap">
                    검색
                  </button>
                </div>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  placeholder="기본 주소"
                  className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
                />
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  placeholder="상세 주소 (동/호수 등)"
                  className="w-full px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm focus:border-[#D4572A] focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E2DDD4] bg-[#FAFAF8]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">결제 수단</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-sm border-2 text-left transition-all hover:-translate-y-0.5 ${
                        paymentMethod === method.id
                          ? 'border-[#D4572A] bg-[#FDF5F2]'
                          : 'border-[#E2DDD4] hover:border-[#8C857B]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === method.id ? 'border-[#D4572A]' : 'border-[#D4CFC6]'
                          }`}
                        >
                          {paymentMethod === method.id && (
                            <div className="w-2 h-2 rounded-full bg-[#D4572A]" />
                          )}
                        </div>
                        <p className="text-sm font-semibold text-[#2C2825]">{method.label}</p>
                      </div>
                      <p className="text-[11px] text-[#8C857B]">{method.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Agreements */}
            <div className="bg-white rounded-sm border border-[#E2DDD4] p-6 space-y-3">
              <p className="text-xs font-semibold text-[#4A4540] mb-4">약관 동의</p>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#D4572A]"
                />
                <div>
                  <p className="text-sm text-[#2C2825]">[필수] 구매조건 확인 및 결제 진행에 동의</p>
                  <p className="text-[11px] text-[#8C857B] mt-0.5">
                    주문 내역을 확인하였으며, 구매 진행에 동의합니다.
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#D4572A]"
                />
                <div>
                  <p className="text-sm text-[#2C2825]">[필수] 개인정보 수집 및 이용 동의</p>
                  <p className="text-[11px] text-[#8C857B] mt-0.5">
                    주문 처리를 위한 개인정보 수집·이용에 동의합니다.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Right Column: Order Totals + Pay Button */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-sm border border-[#E2DDD4] p-6 sticky top-28">
              <h2 className="text-sm font-bold text-[#2C2825] mb-5">결제 금액</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8C857B]">상품 금액</span>
                  <span
                    className="font-medium text-[#2C2825]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {formatPrice(subtotal + discount)}원
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C857B]">할인</span>
                    <span
                      className="font-medium text-[#D4572A]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      -{formatPrice(discount)}원
                    </span>
                  </div>
                )}
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

              <div className="border-t border-[#E2DDD4] pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#2C2825]">합계</span>
                  <span
                    className="text-xl font-bold text-[#2C2825]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {formatPrice(total)}원
                  </span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={!canPay}
                className="w-full py-4 bg-[#D4572A] text-white text-sm font-bold rounded-sm hover:bg-[#BF4D24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formatPrice(total)}원 결제하기
              </button>

              <p className="text-[10px] text-[#B5AFA6] text-center mt-3">
                안전한 결제 시스템으로 보호됩니다
              </p>

              <div className="mt-4 pt-4 border-t border-[#F5F1EB]">
                <p className="text-[11px] text-[#8C857B]">
                  배송 정책: {mockShop.settings?.shippingPolicy}
                </p>
                <p className="text-[11px] text-[#8C857B] mt-1">
                  반품 정책: {mockShop.settings?.returnPolicy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
