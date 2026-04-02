'use client';

import { useState } from 'react';
import { mockOrders } from '@/data/mock/ver3-products';
import { Order } from '@/types/ver3';

type PaymentFilter = 'all' | Order['paymentStatus'];
type ShippingFilter = 'all' | Order['shippingStatus'];

const paymentStatusMap: Record<Order['paymentStatus'], { label: string; className: string }> = {
  paid: { label: '결제완료', className: 'bg-green-50 text-green-700 border border-green-200' },
  pending: { label: '결제대기', className: 'bg-yellow-50 text-yellow-700 border border-yellow-200' },
  cancelled: { label: '취소', className: 'bg-red-50 text-red-700 border border-red-200' },
  refunded: { label: '환불', className: 'bg-gray-50 text-gray-600 border border-gray-200' },
};

const shippingStatusMap: Record<Order['shippingStatus'], { label: string; className: string }> = {
  preparing: { label: '배송준비', className: 'bg-gray-50 text-gray-600 border border-gray-200' },
  shipped: { label: '배송중', className: 'bg-blue-50 text-blue-700 border border-blue-200' },
  delivered: { label: '배송완료', className: 'bg-green-50 text-green-700 border border-green-200' },
  returned: { label: '반품', className: 'bg-red-50 text-red-700 border border-red-200' },
};

const FILTER_TABS: { key: ShippingFilter | 'all'; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'preparing', label: '배송준비' },
  { key: 'shipped', label: '배송중' },
  { key: 'delivered', label: '배송완료' },
];

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function OrdersPage() {
  const [shippingFilter, setShippingFilter] = useState<ShippingFilter | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockOrders.filter((o) => {
    return shippingFilter === 'all' || o.shippingStatus === shippingFilter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Commerce</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">주문 관리</h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 border-b border-[#E2DDD4]">
        {FILTER_TABS.map((tab) => {
          const count =
            tab.key === 'all'
              ? mockOrders.length
              : mockOrders.filter((o) => o.shippingStatus === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setShippingFilter(tab.key)}
              className={`px-4 py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px flex items-center gap-1.5 ${
                shippingFilter === tab.key
                  ? 'border-[#D4572A] text-[#D4572A]'
                  : 'border-transparent text-[#8C857B] hover:text-[#2C2825]'
              }`}
            >
              {tab.label}
              <span
                className={`px-1.5 py-0.5 rounded-sm text-[10px] font-bold ${
                  shippingFilter === tab.key
                    ? 'bg-[#FDF5F2] text-[#D4572A]'
                    : 'bg-[#EAE6DE] text-[#8C857B]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E2DDD4] bg-[#FAFAF8]">
              <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">주문번호</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">주문일시</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">주문자</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">상품</th>
              <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">금액</th>
              <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">결제</th>
              <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">배송</th>
              <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const payment = paymentStatusMap[order.paymentStatus];
              const shipping = shippingStatusMap[order.shippingStatus];
              const isExpanded = expandedId === order.id;

              return (
                <>
                  <tr
                    key={order.id}
                    className={`border-b border-[#E2DDD4] hover:bg-[#FAFAF8] transition-colors cursor-pointer ${
                      isExpanded ? 'bg-[#FAFAF8]' : ''
                    }`}
                    onClick={() => toggleExpand(order.id)}
                  >
                    <td className="px-6 py-4">
                      <span
                        className="text-xs font-medium text-[#2C2825]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-[#8C857B]">{formatDateTime(order.createdAt)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-[#2C2825]">{order.buyerName}</p>
                        <p className="text-[11px] text-[#B5AFA6]">{order.buyerPhone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#4A4540]">
                        {order.items.length > 1
                          ? `${order.items[0].productId} 외 ${order.items.length - 1}건`
                          : order.items[0].productId}
                      </p>
                      <p className="text-[11px] text-[#8C857B]">총 {order.items.length}개 상품</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className="text-sm font-semibold text-[#2C2825]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ₩{order.totalPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-sm text-[11px] font-medium ${payment.className}`}>
                        {payment.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-sm text-[11px] font-medium ${shipping.className}`}>
                        {shipping.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-[#B5AFA6] text-xs select-none">
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {isExpanded && (
                    <tr key={`${order.id}-detail`} className="bg-[#FAFAF8] border-b border-[#E2DDD4]">
                      <td colSpan={8} className="px-6 py-5">
                        <div className="grid grid-cols-2 gap-8">
                          {/* Order Items */}
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">주문 상품</p>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#EAE6DE] to-[#D4CFC6] flex-shrink-0" />
                                    <div>
                                      <p className="text-xs text-[#2C2825]">
                                        {item.productId}
                                      </p>
                                      {item.options && (
                                        <p className="text-[11px] text-[#8C857B]">
                                          {Object.entries(item.options).map(([k, v]) => `${k}: ${v}`).join(' / ')}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs font-medium text-[#2C2825]">₩{item.price.toLocaleString()}</p>
                                    <p className="text-[11px] text-[#8C857B]">× {item.quantity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Delivery Info */}
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">배송 정보</p>
                            <div className="space-y-1.5 text-xs text-[#4A4540]">
                              <p><span className="text-[#8C857B] w-16 inline-block">수령인</span>{order.buyerName}</p>
                              <p><span className="text-[#8C857B] w-16 inline-block">연락처</span>{order.buyerPhone}</p>
                              <p><span className="text-[#8C857B] w-16 inline-block">우편번호</span>{order.buyerAddress.zipCode}</p>
                              <p><span className="text-[#8C857B] w-16 inline-block">주소</span>{order.buyerAddress.address1}</p>
                              <p><span className="text-[#8C857B] w-16 inline-block"></span>{order.buyerAddress.address2}</p>
                              {order.trackingNumber && (
                                <p>
                                  <span className="text-[#8C857B] w-16 inline-block">운송장</span>
                                  <span
                                    className="font-medium"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                  >
                                    {order.trackingNumber}
                                  </span>
                                </p>
                              )}
                            </div>
                            <div className="mt-4 flex gap-2">
                              <button className="px-3 py-1.5 text-xs font-medium bg-[#EAE6DE] text-[#4A4540] rounded-sm hover:bg-[#D4CFC6] transition-colors">
                                운송장 입력
                              </button>
                              <button className="px-3 py-1.5 text-xs font-medium bg-[#D4572A] text-white rounded-sm hover:bg-[#BF4D24] transition-colors">
                                배송 처리
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-16 text-center text-[#8C857B] text-sm">
            해당 조건의 주문이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
