import PricingTable from '@/components/PricingTable';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="bg-[#F4F1EB] min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="요금제"
          title="합리적인 가격, 무제한 가능성"
          description="비즈니스 규모에 맞는 플랜을 선택하세요"
        />
        <PricingTable />

        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-[#2C2825] mb-6 text-center">자주 묻는 질문</h3>
          <div className="space-y-3">
            {[
              { q: '무료 체험은 어떻게 시작하나요?', a: '가입만 하면 3장을 무료로 생성할 수 있습니다. 카드 등록이 필요 없습니다.' },
              { q: '연간 결제 시 혜택이 있나요?', a: '연간 결제 시 2개월 무료 혜택이 적용됩니다.' },
              { q: '플랜을 중간에 변경할 수 있나요?', a: '언제든지 업그레이드/다운그레이드가 가능합니다. 차액은 일할 계산됩니다.' },
              { q: '환불 정책은 어떻게 되나요?', a: '결제 후 7일 이내 미사용 시 전액 환불됩니다.' },
            ].map((faq) => (
              <details key={faq.q} className="bg-white rounded-sm border border-[#E2DDD4] group">
                <summary className="px-5 py-4 text-sm font-medium text-[#2C2825] cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-[#8C857B] group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-[#8C857B]">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/app/model-cut" className="inline-block px-8 py-3 rounded-sm bg-[#D4572A] text-white text-sm font-semibold hover:bg-[#BF4D24] transition-colors">
            무료로 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}
