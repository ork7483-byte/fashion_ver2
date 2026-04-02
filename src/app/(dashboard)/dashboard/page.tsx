'use client';

import UsageBar from '@/components/UsageBar';
import { mockOrders, mockDashboardStats } from '@/data/mock/ver3-products';
import { Order } from '@/types/ver3';

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

const stats = mockDashboardStats;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Overview</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">대시보드</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-sm border border-[#E2DDD4] p-6 hover:-translate-y-0.5 transition-transform">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">오늘 매출</p>
          <p
            className="text-3xl font-bold text-[#2C2825]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ₩{stats.todaySales.toLocaleString()}
          </p>
          <p className="text-xs text-[#8C857B] mt-2">전일 대비 +12%</p>
        </div>

        <div className="bg-white rounded-sm border border-[#E2DDD4] p-6 hover:-translate-y-0.5 transition-transform">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">오늘 주문</p>
          <p
            className="text-3xl font-bold text-[#2C2825]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {stats.todayOrders}
            <span className="text-lg font-normal text-[#8C857B] ml-1">건</span>
          </p>
          <p className="text-xs text-[#8C857B] mt-2">전일 대비 +3건</p>
        </div>

        <div className="bg-white rounded-sm border border-[#E2DDD4] p-6 hover:-translate-y-0.5 transition-transform">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">오늘 방문자</p>
          <p
            className="text-3xl font-bold text-[#2C2825]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {stats.todayVisitors}
            <span className="text-lg font-normal text-[#8C857B] ml-1">명</span>
          </p>
          <p className="text-xs text-[#8C857B] mt-2">전일 대비 +28명</p>
        </div>
      </div>

      {/* AI Usage Section */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">AI 사용량</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <UsageBar
            used={stats.monthlyAIUsage.modelCut.used}
            total={stats.monthlyAIUsage.modelCut.total}
            label="모델컷"
          />
          <UsageBar
            used={stats.monthlyAIUsage.video.used}
            total={stats.monthlyAIUsage.video.total}
            label="영상"
          />
          <UsageBar
            used={stats.monthlyAIUsage.fitting.used}
            total={stats.monthlyAIUsage.fitting.total}
            label="가상피팅"
          />
          <UsageBar
            used={stats.monthlyAIUsage.productCut.used}
            total={stats.monthlyAIUsage.productCut.total}
            label="연출컷"
          />
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-sm border border-[#E2DDD4]">
        <div className="px-6 py-4 border-b border-[#E2DDD4]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">최근 주문</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2DDD4] bg-[#FAFAF8]">
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">주문번호</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">주문자</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">상품</th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">금액</th>
                <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">결제상태</th>
                <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">배송상태</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => {
                const payment = paymentStatusMap[order.paymentStatus];
                const shipping = shippingStatusMap[order.shippingStatus];
                return (
                  <tr
                    key={order.id}
                    className="border-b border-[#E2DDD4] last:border-0 hover:bg-[#FAFAF8] transition-colors"
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
                      <span className="text-sm text-[#2C2825]">{order.buyerName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#4A4540]">
                        {order.items.length > 1
                          ? `${order.items[0].productId} 외 ${order.items.length - 1}건`
                          : order.items[0].productId}
                      </span>
                      <span className="ml-1 text-xs text-[#8C857B]">({order.items.length}개)</span>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
