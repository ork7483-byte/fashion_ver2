# Design System — 비젼AI

## Product Context
- **What this is:** AI 기능을 업종별로 특화하여 SaaS로 양산하는 회사의 내부 허브
- **Who it's for:** 대표 + 팀원 4명 (서비스 현황, 결과물, 기술 스택 관리)
- **Space/industry:** AI SaaS, 내부 도구
- **Project type:** Internal dashboard / hub

## Aesthetic Direction
- **Direction:** Laboratory Notebook — Warm Minimal + Industrial-Utilitarian
- **Decoration level:** Minimal (타이포그래피가 모든 무게를 짊어짐)
- **Mood:** "이건 소프트웨어가 아니라 우리의 연구 노트북 같다" — 따뜻하고 편안하지만 정보는 정확하게
- **Reference sites:** Linear (구조), Notion (정보 밀도), Dieter Rams (기능 우선 미학)

## Typography
- **Display/KPI:** Playfair Display — KPI 숫자와 히어로 타이틀에만 사용 (32px+), 세리프로 즉각적 시각 계층 생성
- **Body:** Pretendard Variable — 한국어/영문 통합, 본문 및 UI 라벨 전체
- **UI/Labels:** Pretendard Variable (Body와 동일, 웨이트로 구분)
- **Data/Tables:** JetBrains Mono — 버전 번호, 코드, ID 등 기술 데이터
- **Code:** JetBrains Mono
- **Loading:** Pretendard CDN, Google Fonts (Playfair Display, JetBrains Mono)
- **Scale:**
  - KPI display: Playfair Display, 48px/36px, weight 700
  - Page title: Pretendard, 24px, weight 700
  - Section header: Pretendard, 11px, weight 600, uppercase, letter-spacing 0.1em
  - Body: Pretendard, 15px, weight 400, line-height 1.6
  - Caption/label: Pretendard, 12px, weight 500
  - Mono values: JetBrains Mono, 13px, weight 400

## Color
- **Approach:** Restrained (1 accent + warm neutrals)
- **Background:** #F4F1EB — 따뜻한 페이퍼 톤
- **Surface:** #FFFFFF — 카드, 패널 (border: 1px solid #E2DDD4)
- **Secondary surface:** #EAE6DE — 사이드바, 그룹 섹션
- **Primary text:** #2C2825 — 따뜻한 니어블랙
- **Secondary text:** #8C857B — 뮤트 카키브라운
- **Muted text:** #B5AFA6
- **Border:** #E2DDD4
- **Accent (primary):** #D4572A — 버닝 버밀리온, 핵심 액션/KPI 강조
- **Accent hover:** #BF4D24
- **Accent background:** #FDF5F2
- **Success:** #2E6B4F — 딥 모스 그린 (운영 중)
- **Success bg:** #F0F7F4
- **Warning:** #C4940A — 에이지드 골드 (개발 중)
- **Warning bg:** #FFFBF0
- **Error:** #B33D3D — 뮤트 브릭 레드 (중단)
- **Error bg:** #FDF2F2
- **Info:** #3A6B96 — 슬레이트 블루
- **Info bg:** #F0F5FA
- **Dark mode:** 다크 모드 전환 지원
  - Background: #1A1816, Surface: #242220, Text: #E8E4DE
  - Accent: #E8734A, Border: #3A3735

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Layout
- **Approach:** Grid-disciplined
- **Grid:** 상단 네비게이션, 컨텐츠 풀 와이드
- **Max content width:** 1120px
- **Border radius:** sm:2px, md:4px, lg:6px — 날카롭게, 정밀함 시그널

## Motion
- **Approach:** Minimal-functional
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150ms) medium(200ms)
- **Hover:** translateY(-1px) lift, 컬러 변경 대신 물리적 움직임
- **No:** entrance animations, skeleton loaders, decorative motion

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-02 | 따뜻한 라이트 모드 기본 | AI 도구 카테고리의 다크모드 관습에서 벗어나 차별화. 4명이 오래 보는 도구이므로 눈 피로도 감소 |
| 2026-04-02 | Burnt vermillion (#D4572A) 액센트 | 보라색 AI 슬롭에서 탈피. 따뜻하고 자신감 있는 색조 |
| 2026-04-02 | Playfair Display 세리프 KPI | 대시보드에 세리프는 파격적이지만 즉각적 시각 계층 생성 |
| 2026-04-02 | border-radius 2px-6px | 날카로운 모서리로 정밀함 시그널. 범용적 둥근 모서리에서 탈피 |
