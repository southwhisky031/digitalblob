# DigitalBlob 홈페이지 구현 계획

## 개요
DigitalBlob(디지털블롭)은 퍼포먼스 마케팅 에이전시로, "Creative Branding + Data-Driven Results"를 결합한 포지셔닝의 회사 홈페이지를 구축합니다.

**핵심 차별화**: "blob" 네이밍을 시각적 모티프로 활용 — 다크모드 기본 + 네온 그라데이션 blob 애니메이션

---

## 기술 스택

| 기술 | 역할 |
|------|------|
| Next.js 15+ | App Router, RSC |
| React 19 + TypeScript | UI + 타입 안전성 |
| Tailwind CSS v4 | 스타일링 (@theme) |
| shadcn/ui | UI 컴포넌트 (New York) |
| Motion 12+ | 등장/호버/전환 애니메이션 |
| GSAP + ScrollTrigger | 스크롤 패럴랙스, 피닝 |
| React Hook Form + Zod | 문의 폼 |
| next-themes | 다크모드 (기본: dark) |
| Sanity v3 | Headless CMS |
| Resend | 이메일 전송 |

---

## 사이트 구조

```
Home (7개 섹션)
├── Work (케이스 스터디 리스트 + 상세)
├── Services (5대 서비스)
├── About (팀, 철학, 파트너)
└── Contact (문의 폼 + 연락처)
```

---

## 홈페이지 섹션

1. **Hero**: Blob 배경 + 타이핑 애니메이션 + CTA
2. **Social Proof**: 클라이언트 로고 마퀴 (삼성, 미래에셋, 넷마블, Nike 등 30+)
3. **Value Proposition**: 5대 핵심 역량 카드
4. **Selected Work**: 3개 케이스 스터디 (미래에셋, 펄어비스, SSF SHOP)
5. **Services Summary**: 5개 서비스 그리드
6. **Testimonials**: 고객 후기 캐러셀
7. **CTA**: 문의 유도

---

## 서비스 (PDF 기반 실제 데이터)

1. Marketing Planning — 시장 분석, 전략 기획
2. Campaign Operating — KPI 달성, 매체 운영/컨설팅
3. Data 기반 컨설팅 — MMP, GA4 활용, 데이터 의사결정
4. Creative Planning — 시장/고객/플랫폼 기반 크리에이티브
5. 인플루언서 협업 마케팅 — 분야별 인플루언서 활용

---

## 케이스 스터디 (PDF 기반 실제 데이터)

1. 미래에셋그룹 연간 브랜딩 캠페인 — YouTube 조회율 34%, 클릭률 0.33%
2. 펄어비스 검은사막 모바일 UA — CPA 21% 하락, ROAS 72% 증가
3. SSF SHOP 구매 증대 — 객단가 2.5배, 매출 4배 상승
4. 종근당건강 자사몰 구매 — 구글 마당 성공사례 등재
5. 네오위즈 트리플판타지 글로벌 UA
6. 식음료 커머스 K — ROAS 1.5배, 유저 획득 5~10% 개선
7. 주류업체 K — CPV 지속 개선
8. 식품배송 O — 유저획득단가 70% 개선
9. 밀키트 주식당 — 3개월 파워등급 달성

---

## 회사 정보

- **법인명**: ㈜브랜디스트
- **사업자등록번호**: 333-81-03134
- **주소**: 서울특별시 서초구 서초대로 398 BNK 디지털타워 6층, 패스트파이브 635호
- **이메일**: help@digital-blob.com
- **철학**: 'Blob'처럼 가장 효율적이고 경제적인 최적의 경로를 추구

---

## 운영 매체

### 주요 포털 & SA
Google Partners, Naver, Kakao, Apple

### 소셜 미디어
Meta, TikTok, Twitter, LinkedIn

### 리타겟팅 매체
Criteo, TargetingGates, Remerge, Mobon

### 애드 네트워크 & DSP
MOLOCO, TradingWorks, Appier, CAULY, theTradeDesk

### 버티컬 매체
Toss, Blind, Cashslide, AfreecaTV

### MMP & Solutions
AppsFlyer, Adjust, Adbrix, GA4, GTM

---

## 클라이언트 (PDF 기반 실제 목록)

삼성, 미래에셋그룹, 삼성자산운용, 신한금융투자, 증권플러스 비상장, NICE신용평가, 아모레퍼시픽, 넷마블, 펄어비스, 라인, 조이시티, 롯데면세점, Nike, SSF SHOP, 이랜드 리테일, 요기요, 위메프, 탑텐, 종근당건강, 에코, 안랩, 애플, 트립닷컴, SK매직, 김정문알로에, 웅진씽크빅, 대성마이맥, 네오위즈, 밀리의서재, 레진

---

## 실행 단계

### Phase 1: 기반 구축 ✅
프로젝트 셋업, 디자인 시스템, 레이아웃, Sanity, 타입

### Phase 2: 병렬 작업 ✅
- 애니메이션 컴포넌트 ✅
- 홈페이지 7개 섹션 ✅
- 서브페이지 (Work, Services, About) ✅
- 인프라 (Contact, SEO, API) ✅

### Phase 3: 통합 ✅
- 빌드 검증 통과
- 실제 회사 데이터 반영
- 포트 3001로 변경

---

## 검증 체크리스트

- [x] `npm run build` 성공
- [ ] 모든 페이지 수동 탐색
- [ ] 반응형 확인 (375px, 768px, 1440px)
- [ ] 다크/라이트 모드 전환
- [ ] 애니메이션 정상 동작
- [ ] Contact 폼 검증
- [ ] SEO 메타 태그 확인
