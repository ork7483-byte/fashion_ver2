import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  // 메인 도메인 → 마케팅 랜딩 (그대로 통과)
  if (
    subdomain === 'www' ||
    subdomain === 'visionshop' ||
    hostname.startsWith('localhost') ||
    hostname.startsWith('127.0.0.1')
  ) {
    return NextResponse.next();
  }

  // dashboard → 셀러 대시보드 (그대로 통과)
  if (subdomain === 'dashboard') {
    return NextResponse.next();
  }

  // 그 외 서브도메인 → 쇼핑몰 프론트 ({shop}.visionshop.kr)
  const url = req.nextUrl.clone();
  url.pathname = `/shop/${subdomain}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // 정적 파일, API 제외
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
