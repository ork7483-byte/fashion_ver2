import services from '@/data/services.json';
import stacks from '@/data/stacks.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GallerySection from './GallerySection';

const gradientMap: Record<string, string> = {
  fashion: 'from-violet-600 to-purple-800',
  food: 'from-orange-500 to-red-700',
  beauty: 'from-pink-500 to-rose-700',
  'detail-page': 'from-blue-500 to-indigo-700',
};

function StatusBadge({ status, color }: { status: string; color: string }) {
  const colorMap: Record<string, string> = {
    green: 'bg-[#F0F7F4] text-[#2E6B4F]',
    yellow: 'bg-[#FFFBF0] text-[#C4940A]',
    gray: 'bg-[#EAE6DE] text-[#B5AFA6]',
    red: 'bg-[#FDF2F2] text-[#B33D3D]',
  };
  const dotMap: Record<string, string> = {
    green: 'bg-[#2E6B4F]',
    yellow: 'bg-[#C4940A]',
    gray: 'bg-[#B5AFA6]',
    red: 'bg-[#B33D3D]',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colorMap[color] || colorMap.gray}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotMap[color] || dotMap.gray}`}
      />
      {status}
    </span>
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const gradient = gradientMap[slug] || 'from-gray-600 to-gray-800';
  const serviceStacks = stacks.filter((st) =>
    st.usedIn.some((u: { service: string }) => u.service === slug)
  );

  return (
    <div className="min-h-screen bg-[#F4F1EB] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/hub/services"
          className="inline-flex items-center gap-1 text-[#8C857B] hover:text-[#2C2825] text-sm font-medium mb-6 transition-colors"
        >
          &larr; 서비스 목록으로
        </Link>

        {/* Header Section */}
        <section className="mb-12">
          {/* Banner */}
          <div
            className={`w-full h-48 sm:h-64 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-8`}
          >
            <span className="text-white/60 text-lg font-medium">
              {service.name}
            </span>
          </div>

          {/* Service Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[#2C2825]">
                {service.name}
              </h1>
              <StatusBadge
                status={service.status}
                color={service.statusColor}
              />
            </div>

            <p className="text-[#8C857B] leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex gap-2">
                <span className="text-[#B5AFA6] font-medium min-w-[80px]">
                  대상 고객
                </span>
                <span className="text-[#2C2825]">
                  {service.target}
                </span>
              </div>
            </div>

            {/* Core Features */}
            <div>
              <h3 className="text-sm font-medium text-[#B5AFA6] mb-2">
                핵심 기능
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[#2C2825]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4572A]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* External Link */}
            {service.externalUrl && (
              <a
                href={service.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-[#D4572A] hover:bg-[#BF4D24] text-white text-sm font-medium rounded-xl transition-colors w-fit"
              >
                서비스 바로가기 &rarr;
              </a>
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#2C2825] mb-6">결과물</h2>
          <GallerySection gallery={service.gallery} slug={slug} />
        </section>

        {/* Tech Stack Section */}
        <section>
          <h2 className="text-xl font-bold text-[#2C2825] mb-6">
            사용 기술
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {serviceStacks.map((stack) => (
              <div
                key={stack.name}
                className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-[#2C2825]">
                    {stack.name}
                  </h3>
                  <span className="text-[10px] font-medium text-[#B5AFA6]">
                    {stack.currentVersion}
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#EAE6DE] text-[#8C857B]">
                  {stack.category}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/hub/stack"
            className="text-[#D4572A] text-sm font-medium hover:text-[#BF4D24] transition-colors"
          >
            스택 페이지에서 자세히 보기 &rarr;
          </Link>
        </section>
      </div>
    </div>
  );
}
