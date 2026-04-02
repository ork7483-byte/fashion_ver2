import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  // Vercel 배포 도메인, localhost, 메인 도메인 → 그대로 통과
  if (
    hostname.includes('vercel.app') ||
    hostname.startsWith('localhost') ||
    hostname.startsWith('127.0.0.1') ||
    subdomain === 'www' ||
    subdomain === 'visionshop' ||
    subdomain === 'dashboard'
  ) {
    return NextResponse.next();
  }

  // *.visionshop.kr 서브도메인만 → 쇼핑몰 프론트 rewrite
  if (hostname.endsWith('.visionshop.kr')) {
    const url = req.nextUrl.clone();
    url.pathname = `/shop/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 그 외 도메인 → 그대로 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정적 파일, API 제외
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
