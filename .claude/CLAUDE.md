# DigitalBlob 홈페이지 프로젝트

## 언어/작성 규칙 (필수)
- 모든 응답은 한국어로 진행
- 코드 주석, 커밋 메시지, 문서화(README 포함) 모두 한국어로 작성
- 변수명과 함수명은 영어 사용 (코드 표준)

## 기술 스택
- Next.js 15+ (App Router, React Server Components)
- React 19, TypeScript 5+
- Tailwind CSS v4 (`@theme` 디렉티브)
- shadcn/ui (New York 스타일)
- Motion v12+ (framer-motion → `motion/react`에서 import)
- GSAP + ScrollTrigger
- React Hook Form + Zod
- next-themes (다크모드 기본)
- Sanity v3 (Headless CMS)
- Resend (이메일 전송)

## 프로젝트 구조
```
src/
├── app/(marketing)/     # 마케팅 페이지 (Header+Footer 레이아웃)
├── app/studio/          # Sanity Studio 임베드
├── app/api/             # API 라우트 (contact, draft)
├── components/sections/ # 홈페이지 7개 섹션
├── components/shared/   # 공통 컴포넌트 (blob, marquee 등)
├── components/layout/   # 헤더, 푸터
├── components/ui/       # shadcn 컴포넌트
├── lib/                 # 유틸, 상수, 폰트, 메타데이터
├── hooks/               # 커스텀 훅
├── types/               # TypeScript 타입 정의
sanity/                  # Sanity 스키마, 클라이언트, 쿼리
```

## 디자인 시스템
- 다크모드 기본 (oklch 컬러 시스템)
- Primary: 비비드 퍼플 / Secondary: 네온 시안 / Accent: 핫 핑크
- 글래스모피즘 카드 (.glass 클래스)
- Blob 애니메이션 (3색 발광 효과)
- 폰트: Space Grotesk (display), Pretendard/Inter (body), JetBrains Mono (data)

## 개발 서버
- `npm run dev` → http://localhost:3001 (포트 3001 사용)

## 참고 자료
- 회사 소개 PDF: `project_digitalBlob/static/resource/test.pdf`
- 기존 웹사이트: `project_digitalBlob/index.html`
- 클라이언트 로고 이미지: `project_digitalBlob/static/assets/images/advertiser logo/`
