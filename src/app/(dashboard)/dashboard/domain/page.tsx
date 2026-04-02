'use client';

import { useState } from 'react';

type DomainStatus = 'connected' | 'pending' | 'error';

const statusConfig: Record<DomainStatus, { label: string; dot: string; text: string; bg: string }> = {
  connected: {
    label: '연결됨',
    dot: 'bg-green-500',
    text: 'text-green-700',
    bg: 'bg-green-50 border-green-200',
  },
  pending: {
    label: '연결 대기 중',
    dot: 'bg-yellow-500',
    text: 'text-yellow-700',
    bg: 'bg-yellow-50 border-yellow-200',
  },
  error: {
    label: '연결 오류',
    dot: 'bg-red-500',
    text: 'text-red-700',
    bg: 'bg-red-50 border-red-200',
  },
};

export default function DomainPage() {
  const [customDomain, setCustomDomain] = useState('');
  const [domainStatus, setDomainStatus] = useState<DomainStatus>('connected');
  const [copied, setCopied] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const shopDomain = 'modera.visionshop.kr';
  const status = statusConfig[domainStatus];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnect = () => {
    if (!customDomain) return;
    setConnecting(true);
    setDomainStatus('pending');
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setDomainStatus('connected');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">Domain</p>
        <h1 className="text-2xl font-bold text-[#2C2825]">도메인 설정</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">

          {/* Current Domain */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">기본 도메인</p>
            <div className="flex items-center gap-3 p-4 bg-[#F4F1EB] rounded-sm border border-[#E2DDD4]">
              <div className="flex-1 overflow-hidden">
                <p
                  className="text-sm font-medium text-[#2C2825] truncate"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  https://{shopDomain}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
                  copied
                    ? 'bg-[#2E6B4F] text-white'
                    : 'bg-[#EAE6DE] text-[#2C2825] hover:bg-[#D4CFC6]'
                }`}
              >
                {copied ? '복사됨!' : '복사'}
              </button>
            </div>

            {/* Status */}
            <div className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-sm border ${status.bg}`}>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${status.dot}`} />
              <span className={`text-xs font-medium ${status.text}`}>
                {status.label} — SSL 인증서 활성화됨
              </span>
            </div>

            {/* SSL Badge */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-sm">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-[11px] font-semibold text-green-700">SSL 보안 연결</span>
              </div>
              <span className="text-xs text-[#8C857B]">인증서 만료: 2027년 3월 15일</span>
            </div>
          </div>

          {/* Custom Domain */}
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-1">커스텀 도메인 연결</p>
            <p className="text-xs text-[#8C857B] mb-5">보유하신 도메인을 연결하세요. DNS 설정 후 최대 48시간이 소요될 수 있습니다.</p>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="예: www.yourshop.com"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="flex-1 px-3 py-2 rounded-sm border border-[#E2DDD4] text-sm text-[#2C2825] placeholder-[#B5AFA6] focus:outline-none focus:border-[#D4572A]"
              />
              <button
                onClick={handleConnect}
                disabled={!customDomain || connecting}
                className="px-5 py-2 bg-[#D4572A] text-white text-sm font-semibold rounded-sm hover:bg-[#BF4D24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {connecting ? '확인 중...' : '연결하기'}
              </button>
            </div>

            {connected && (
              <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-sm">
                <p className="text-xs font-medium text-green-700">도메인 연결 요청이 접수되었습니다. DNS 전파까지 최대 48시간 소요됩니다.</p>
              </div>
            )}

            {/* DNS Instructions */}
            <div className="bg-[#F4F1EB] rounded-sm p-4">
              <p className="text-xs font-semibold text-[#2C2825] mb-3">DNS 설정 안내</p>
              <p className="text-xs text-[#8C857B] mb-3">도메인 등록업체의 DNS 관리 페이지에서 아래 레코드를 추가하세요.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#E2DDD4]">
                      <th className="pb-2 text-left font-semibold text-[#4A4540]">타입</th>
                      <th className="pb-2 text-left font-semibold text-[#4A4540]">호스트</th>
                      <th className="pb-2 text-left font-semibold text-[#4A4540]">값</th>
                      <th className="pb-2 text-left font-semibold text-[#4A4540]">TTL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-[#D4572A] font-semibold">CNAME</td>
                      <td className="py-2 pr-4 font-mono text-[#2C2825]">www</td>
                      <td className="py-2 pr-4 font-mono text-[#2C2825]">shops.visionshop.kr</td>
                      <td className="py-2 font-mono text-[#8C857B]">3600</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right: QR Code */}
        <div className="space-y-5">
          <div className="bg-white rounded-sm border border-[#E2DDD4] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-4">QR 코드</p>
            <div className="aspect-square bg-[#F4F1EB] rounded-sm border border-[#E2DDD4] flex flex-col items-center justify-center gap-3">
              {/* QR placeholder grid */}
              <div className="w-24 h-24 grid grid-cols-7 gap-0.5">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-[1px] ${
                      Math.random() > 0.4 ? 'bg-[#2C2825]' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-[#8C857B] text-center">{shopDomain}</p>
            </div>
            <button className="mt-4 w-full py-2 bg-[#EAE6DE] text-[#2C2825] text-xs font-semibold rounded-sm hover:bg-[#D4CFC6] transition-colors">
              QR 다운로드
            </button>
          </div>

          <div className="bg-white rounded-sm border border-[#E2DDD4] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4572A] mb-3">도메인 현황</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#8C857B]">기본 도메인</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-green-700">활성</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#8C857B]">커스텀 도메인</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B5AFA6]" />
                  <span className="text-xs font-medium text-[#8C857B]">미설정</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#8C857B]">SSL 인증서</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-green-700">유효</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
