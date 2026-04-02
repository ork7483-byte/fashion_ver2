import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SELECT AI - 모델 촬영 없이, AI로 10초만에",
  description: "제품 사진 한 장이면 스튜디오급 모델컷이 완성됩니다. 패션 셀러를 위한 AI 이미지 생성 서비스.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="bg-[#F4F1EB] text-[#2C2825] antialiased">
        {children}
      </body>
    </html>
  );
}
