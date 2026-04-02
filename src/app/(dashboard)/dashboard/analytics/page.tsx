'use client';

import { useState } from 'react';

type DateRange = '7일' | '30일' | '90일';

const kpiData: Record<DateRange, { sales: number; orders: number; visitors: number; conversion: string }> = {
  '7일': { sales: 3420000, orders: 38, visitors: 1240, conversion: '3.1%' },
  '30일': { sales: 12800000, orders: 142, visitors: 4850, conversion: '2.9%' },
  '90일': { sales: 38500000, orders: 421, visitors: 14200, conversion: '3.0%' },
};

const chartData: Record<DateRange, { day: string; value: number }[]> = {
  '7일': [
    { day: '3/27', value: 320000 },
    { day: '3/28', value: 580000 },
    { day: '3/29', value: 420000 },
    { day: '3/30', value: 750000 },
    { day: '3/31', value: 290000 },
    { day: '4/1', value: 640000 },
    { day: '4/2', value: 420000 },
  ],
  '30일': [
    { day: '3/4', value: 380000 },
    { day: '3/8', value: 620000 },
    { day: '3/12', value: 450000 },
    { day: '3/16', value: 890000 },
    { day: '3/20', value: 340000 },
    { day: '3/24', value: 720000 },
    { day: '3/28', value: 580000 },
  ],
  '90일': [
    { day: '1월', value: 9200000 },
    { day: '2월', value: 11800000 },
    { day: '3월', value: 12500000 },
    { day: '4월', value: 5000000 },
    { day: '', value: 0 },
    { day: '', value: 0 },
    { day: '', value: 0 },
  ],
};

const topProducts = [
  { name: '트렌치 코트', sales: 42, revenue: 4158000 },
  { name: '플리츠 롱 원피스', sales: 38, revenue: 2242000 },
  { name: '와이드 데님 팬츠', sales: 31, revenue: 1798000 },
  { name: '오버사이즈 린넨 블라우스', sales: 28, revenue: 1092000 },
  { name: '하이웨이스트 슬랙스', sales: 22, revenue: 1144000 },
];

const trafficSources = [
  { label: '직접 방문', percent: 40, color: '#D4572A' },
  { label: 'SNS', percent: 30, color: '#8C857B' },
  { label: '검색', percent: 20, color: '#4A4540' },
  { label: '기타', percent: 10, color: '#D4CFC6' },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>('7일');

  const kpi = kpiData[range];
  const chart = chartData[range];
  const maxVal = Math.max(...chart.map((d) => d.value));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Analytics</p>
          <h1 className="text-2xl font-bold text-[#2C2825]">분석</h1>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-1 bg-[#EAE6DE] p-1 rounded-sm">
          {(['7일', '30일', '90일'] as DateRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                range === r
                  ? 'bg-white text-[#2C2825] shadow-sm'
                  : 'text-[#8C857B] hover:text-[#2C2825]'
              }`}
            >
              최근 {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-sm border border-[#E2DDD4] p-5 hover:-translate-y-0.5 transition-transform">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-2">총 매출</p>
          <p
            className="text-2xl font-bold text-[#2C2825]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ₩{(kpi.sales / 10000).toFixed(0)}만
          </p>
          <p className="text-xs text-[#8C857B] mt-1">전기 대비 +14%</p>
        </div>

        <div className="bg-white rounded-sm border border-[#E2DDD4] p-5 hover:-translate-y-0.5 transition-transform">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-2">총 주문</p>
          <p
            className="text-2xl font-bold text-[#2C2825]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {kpi.orders}
            <span className="text-sm font-normal text-[#8C857B] ml-1">건</span>
          </p>
          <p className="text-xs text-[#8C857B] mt-1">전기 대비 +8건</p>
        </div>

        <div className="bg-white rounded-sm border border-[#E2DDD4] p-5 hover:-translate-y-0.5 transition-transform">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-2">총 방문자</p>
          <p
            className="text-2xl font-bold text-[#2C2825]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {kpi.visitors.toLocaleString()}
            <span className="text-sm font-normal text-[#8C857B] ml-1">명</span>
          </p>
          <p className="text-xs text-[#8C857B] mt-1">전기 대비 +22%</p>
        </div>

        <div className="bg-white rounded-sm border border-[#E2DDD4] p-5 hover:-translate-y-0.5 transition-transform">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-2">전환율</p>
          <p
            className="text-2xl font-bold text-[#2C2825]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {kpi.conversion}
          </p>
          <p className="text-xs text-[#8C857B] mt-1">업계 평균 2.3%</p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-6">매출 추이</p>
        <div className="flex items-end gap-2 h-40">
          {chart.map((d, i) => {
            const heightPct = maxVal > 0 ? (d.value / maxVal) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                  <div
                    className="w-full rounded-t-sm bg-[#D4572A] transition-all duration-500 hover:bg-[#BF4D24] cursor-pointer"
                    style={{ height: `${heightPct}%`, minHeight: d.value > 0 ? '4px' : '0' }}
                    title={`₩${d.value.toLocaleString()}`}
                  />
                </div>
                <span className="text-[10px] text-[#8C857B] whitespace-nowrap">{d.day}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-[#E2DDD4] flex items-center justify-between">
          <span className="text-xs text-[#8C857B]">최대: ₩{maxVal.toLocaleString()}</span>
          <span className="text-xs text-[#8C857B]">합계: ₩{chart.reduce((s, d) => s + d.value, 0).toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-sm border border-[#E2DDD4]">
          <div className="px-6 py-4 border-b border-[#E2DDD4]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A]">인기 상품 Top 5</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2DDD4] bg-[#FAFAF8]">
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">상품명</th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">판매량</th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8C857B] uppercase tracking-[0.08em]">매출</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={p.name} className="border-b border-[#E2DDD4] last:border-0 hover:bg-[#FAFAF8] transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] font-bold w-5 text-center"
                        style={{
                          color: i === 0 ? '#D4572A' : i === 1 ? '#8C857B' : '#B5AFA6',
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-[#2C2825]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className="text-sm text-[#4A4540]">{p.sales}개</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span
                      className="text-sm font-semibold text-[#2C2825]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ₩{(p.revenue / 10000).toFixed(0)}만
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-5">유입 채널</p>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-[#2C2825]">{source.label}</span>
                  <span
                    className="text-sm font-semibold text-[#2C2825]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {source.percent}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#EAE6DE] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${source.percent}%`, backgroundColor: source.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-[#E2DDD4]">
            <p className="text-xs text-[#8C857B] mb-3">채널별 총 방문자</p>
            <div className="grid grid-cols-2 gap-3">
              {trafficSources.map((source) => (
                <div key={source.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: source.color }} />
                  <span className="text-xs text-[#4A4540]">{source.label}</span>
                  <span className="text-xs font-medium text-[#2C2825] ml-auto">
                    {Math.round((kpi.visitors * source.percent) / 100).toLocaleString()}명
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
