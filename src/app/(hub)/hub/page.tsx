import Link from 'next/link';
import services from '@/data/services.json';
import updates from '@/data/updates.json';

function StatusBadge({ status, color }: { status: string; color: string }) {
  const styleMap: Record<string, { bg: string; text: string; dot: string }> = {
    green: { bg: '#F0F7F4', text: '#2E6B4F', dot: '#2E6B4F' },
    yellow: { bg: '#FFFBF0', text: '#C4940A', dot: '#C4940A' },
    gray: { bg: '#EAE6DE', text: '#B5AFA6', dot: '#B5AFA6' },
    red: { bg: '#FDF2F2', text: '#B33D3D', dot: '#B33D3D' },
  };
  const s = styleMap[color] || styleMap.gray;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {status}
    </span>
  );
}

const gradientMap: Record<string, string> = {
  fashion: 'from-violet-400 to-purple-600',
  food: 'from-orange-400 to-red-500',
  beauty: 'from-pink-400 to-rose-500',
  'detail-page': 'from-blue-400 to-indigo-500',
};

export default function Home() {
  const recentUpdates = updates.slice(0, 5);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F1EB' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center" style={{ backgroundColor: '#D4572A', borderRadius: '2px' }}>
                <span className="text-xl font-bold text-white">V</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: '#2C2825', fontFamily: 'Playfair Display, serif' }}>
                비젼AI
              </h1>
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8" style={{ color: '#8C857B' }}>
              AI 기능을 업종별로 특화하여 SaaS로 양산하는 회사
            </p>

            <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#D4572A' }}>4개</span>
                <span className="mt-1 text-sm" style={{ color: '#8C857B' }}>운영 서비스</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2825' }}>4명</span>
                <span className="mt-1 text-sm" style={{ color: '#8C857B' }}>팀원</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2825' }}>6개</span>
                <span className="mt-1 text-sm" style={{ color: '#8C857B' }}>기술 스택</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold" style={{ color: '#2C2825' }}>서비스 현황</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/hub/services/${service.slug}`}
              className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2DDD4', borderRadius: '2px' }}
            >
              <div className={`h-40 w-full bg-gradient-to-br ${gradientMap[service.slug] || 'from-gray-400 to-gray-600'} flex items-center justify-center`} style={{ borderRadius: '2px 2px 0 0' }}>
                <span className="text-4xl font-bold text-white/30">{service.name}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold transition-colors" style={{ color: '#2C2825' }}>
                    {service.name}
                  </h3>
                  <StatusBadge status={service.status} color={service.statusColor} />
                </div>
                <p className="mt-2 text-sm line-clamp-2" style={{ color: '#8C857B' }}>
                  {service.shortDescription}
                </p>
                <span className="mt-4 inline-block text-sm font-medium" style={{ color: '#D4572A' }}>
                  자세히 보기 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Updates Timeline Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold" style={{ color: '#2C2825' }}>최근 업데이트</h2>
        <div className="space-y-6">
          {recentUpdates.map((update, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full" style={{ border: '2px solid #D4572A', backgroundColor: '#D4572A30' }} />
                {index < recentUpdates.length - 1 && (
                  <div className="w-px flex-1" style={{ backgroundColor: '#E2DDD4' }} />
                )}
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm" style={{ color: '#8C857B' }}>{update.date}</span>
                  <span className="rounded-md px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: '#FDF5F2', color: '#D4572A' }}>
                    {update.service}
                  </span>
                </div>
                <p className="mt-1 text-sm" style={{ color: '#2C2825' }}>{update.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
