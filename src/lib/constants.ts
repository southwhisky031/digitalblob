import type {
  CaseStudy,
  Service,
  TeamMember,
  Testimonial,
  ClientLogo,
  SiteSettings,
} from "@/types";

export const SITE_NAME = "DigitalBlob";
export const SITE_DESCRIPTION =
  "Brand Accelerator & Digital MKT Agency. 정확한 시장 분석과 데이터 기반 전략으로 브랜드의 최적 성장 경로를 찾아줍니다.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

// 회사 법인 정보
export const COMPANY_INFO = {
  legalName: "㈜브랜디스트",
  bizNumber: "333-81-03134",
  address: "서울특별시 서초구 서초대로 398 BNK 디지털타워 6층, 패스트파이브 635호",
  email: "help@digital-blob.com",
  phone: "02-6952-1006",
} as const;

export const NAV_LINKS = [
  { label: "Our Works", href: "/about" },
  { label: "Reference", href: "/reference" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/digitalblob",
  linkedin: "https://linkedin.com/company/digitalblob",
} as const;

export const SERVICE_CATEGORIES = [
  "Marketing Planning",
  "Campaign Operating",
  "Data 기반 컨설팅",
  "Creative Planning",
  "인플루언서 협업 마케팅",
] as const;

export const BUDGET_OPTIONS = [
  "500만원 미만",
  "500만원 ~ 1,000만원",
  "1,000만원 ~ 3,000만원",
  "3,000만원 ~ 5,000만원",
  "5,000만원 이상",
  "미정",
] as const;

// --- 운영 매체 목록 (PDF 기반) ---
export const MEDIA_PARTNERS = {
  portalAndSA: ["Google Partners", "Naver", "Kakao", "Apple"],
  socialMedia: ["Meta", "TikTok", "Twitter", "LinkedIn"],
  retargeting: ["Criteo", "TargetingGates", "Remerge", "Mobon"],
  adNetworkDSP: ["MOLOCO", "TradingWorks", "Appier", "CAULY", "theTradeDesk"],
  verticalMedia: ["Toss", "Blind", "Cashslide", "AfreecaTV"],
  mmpSolutions: ["AppsFlyer", "Adjust", "Adbrix", "Google Analytics 4", "Google Tag Manager"],
} as const;

// --- 실제 회사 데이터 (PDF 기반) ---

export const DUMMY_SITE_SETTINGS: SiteSettings = {
  heroHeadline: "브랜드 성장의 최적 경로를 찾아줍니다",
  heroSubtext:
    "DigitalBlob은 정확한 시장 분석과 고객의 니즈 파악을 통해 브랜드의 본질적 가치를 발견하고, 브랜딩과 퍼포먼스를 아우르는 마케팅과 일관성 있는 여정 설계를 통해 고객이 브랜드에 열광할 수 있는 최적의 경로를 찾아줍니다.",
  ctaText: "프로젝트 문의하기",
  contactEmail: "help@digital-blob.com",
  socialLinks: { ...SOCIAL_LINKS },
};

export const DUMMY_CASE_STUDIES: CaseStudy[] = [
  {
    _id: "cs-1",
    title: "미래에셋그룹 연간 브랜딩 캠페인",
    slug: { current: "mirae-asset-branding" },
    client: "미래에셋그룹",
    industry: "금융",
    services: ["Campaign Operating", "Data 기반 컨설팅"],
    challenge:
      "해외주식 투자 열풍 속 미래에셋증권의 브랜딩 제고를 위해 Youtube를 통한 브랜딩 캠페인을 집행해야 했습니다.",
    solution:
      "실제 증권/투자 활동을 하는 타겟 도달 목적으로 앱 사용성 기반 타겟, 금융 투자 관심 유저 타겟, 유튜브 자사 채널 리타겟팅 등 다양한 타겟 옵션을 활용하여 타겟을 고도화했습니다.",
    results: [
      { metric: "광고 조회율", value: "34%", description: "DMP 오디언스 기준 YouTube 광고 조회율" },
      { metric: "광고 클릭률", value: "0.33%", description: "DMP 오디언스 기준 YouTube 광고 클릭률" },
      { metric: "리타겟팅 조회율", value: "28%", description: "유튜브 자사 채널 리타겟팅 조회율" },
    ],
  },
  {
    _id: "cs-2",
    title: "펄어비스 <검은사막 모바일> 연간 UA 캠페인",
    slug: { current: "pearl-abyss-black-desert" },
    client: "펄어비스",
    industry: "게임",
    services: ["Campaign Operating", "Creative Planning", "Data 기반 컨설팅"],
    challenge:
      "기출시된 모바일 게임의 신규/복귀 유저 증대와 매출 확보를 목적으로 UA 캠페인을 집행해야 했습니다.",
    solution:
      "시기별 캠페인의 KPI를 따라 운영 매체/상품을 차별화하고, 모객 극대화를 위한 고효율 캠페인 집중 운영, 최적화 기준 테스트 등을 진행했습니다.",
    results: [
      { metric: "CPA", value: "-21%", description: "캐릭터 생성 단가 21% 하락" },
      { metric: "ROAS", value: "+72%", description: "최적화 기준 테스트 후 ROAS 72% 증가" },
      { metric: "요일별 최적화", value: "+20%", description: "주말 일예산 20% 증대 운영" },
    ],
  },
  {
    _id: "cs-3",
    title: "SSF SHOP 구매 증대 캠페인",
    slug: { current: "ssf-shop-purchase" },
    client: "SSF SHOP",
    industry: "패션 / 이커머스",
    services: ["Campaign Operating", "Data 기반 컨설팅", "Marketing Planning"],
    challenge:
      "캠페인 목표가 단기 ROAS 달성에 매몰됨에 따라 구매와 매출 규모의 고착화가 발생했습니다.",
    solution:
      "GA 고객 데이터 분석 기반 크로스 셀링 유도, LTV 개념 도입으로 시장 점유율 증대 목적의 캠페인을 집행했습니다.",
    results: [
      { metric: "평균 객단가", value: "2.5x", description: "교차 판매를 통한 평균 객단가 2.5배 증가" },
      { metric: "매출 규모", value: "4x", description: "ROAS를 유지하며 매출 규모 4배 상승" },
      { metric: "전략", value: "LTV", description: "LTV 기반 효율 필터링 기준 변경" },
    ],
  },
  {
    _id: "cs-4",
    title: "종근당건강 자사몰 구매 증대 캠페인",
    slug: { current: "ckdhc-purchase" },
    client: "종근당건강",
    industry: "건강기능식품",
    services: ["Campaign Operating", "Creative Planning", "Data 기반 컨설팅"],
    challenge:
      "디지털 판매 채널 확장과 자사 데이터 활용을 위한 자사몰 구축 및 구매 증대 캠페인이 필요했습니다.",
    solution:
      "자사몰 구매 혜택 강조 및 제품별 타겟 오디언스 설계, 맞춤 소재 기획/활용으로 리타겟팅과 고객일치 타겟팅의 구매 효율을 실험했습니다.",
    results: [
      { metric: "성과", value: "구글 마당", description: "구글 마당 성공사례 등재" },
      { metric: "캠페인", value: "구글 펀딩", description: "'22년 2분기 구글 펀딩 캠페인 선정" },
      { metric: "전략", value: "A/B 테스트", description: "리타겟팅 vs 고객일치 타겟팅 실험" },
    ],
  },
  {
    _id: "cs-5",
    title: "식음료 커머스 자사몰 복합 KPI 캠페인",
    slug: { current: "food-commerce-multi-kpi" },
    client: "식음료 커머스 K",
    industry: "식음료 / 이커머스",
    services: ["Campaign Operating", "Creative Planning"],
    challenge:
      "월별로 구매, 회원가입, 유료 구독 3가지 KPI를 모두 달성하고자 하는 니즈가 있어 복합적인 캠페인 운영이 필요했습니다.",
    solution:
      "매출액의 경우 빅 미디어 활용, 회원가입의 경우 CPA 매체 단가 협의하여 한정적인 예산을 합리적으로 활용했습니다.",
    results: [
      { metric: "분기별 ROAS", value: "1.5x", description: "23년 4분기 대비 분기별 ROAS 1.5배 상승" },
      { metric: "유저 획득", value: "5~10%", description: "유저 획득 관련 지표 매달 5~10% 개선" },
      { metric: "소재", value: "5종+", description: "월별 5종 이상 소재 기획" },
    ],
  },
  {
    _id: "cs-6",
    title: "밀키트 브랜드 '주식당' 런칭",
    slug: { current: "jusikdang-launch" },
    client: "주식당",
    industry: "F&B / 밀키트",
    services: ["Marketing Planning", "Creative Planning", "인플루언서 협업 마케팅"],
    challenge:
      "B2B 대상으로 제품 생산, 공급하던 업체와의 파트너쉽으로 B2C 시장 진출을 위한 신규 브랜드 런칭이 필요했습니다.",
    solution:
      "브랜드 네이밍/로고부터 패키지 디자인, 스마트스토어 구축, 인플루언서 콜라보 마케팅까지 기획과 마케팅을 통합 수행했습니다.",
    results: [
      { metric: "스토어 등급", value: "파워", description: "스토어 런칭 3개월 파워등급 달성" },
      { metric: "기획", value: "풀패키지", description: "네이밍/로고/패키지/상세페이지 기획" },
      { metric: "마케팅", value: "통합", description: "디지털매체+바이럴+인플루언서 통합 운영" },
    ],
  },
];

export const DUMMY_SERVICES: Service[] = [
  {
    _id: "svc-1",
    title: "Marketing Planning",
    slug: { current: "marketing-planning" },
    icon: "Target",
    description:
      "시장과 경쟁상황 분석을 통한 인사이트 도출과 효율적인 마케팅 전략 및 플랜을 기획합니다.",
    features: [
      "시장 환경 및 경쟁사 분석",
      "타겟 오디언스 설정 및 고도화",
      "마케팅 전략 및 KPI 수립",
      "채널별 예산 배분 전략",
    ],
    order: 1,
  },
  {
    _id: "svc-2",
    title: "Campaign Operating",
    slug: { current: "campaign-operating" },
    icon: "TrendingUp",
    description:
      "캠페인 목표와 KPI 달성을 위한 최적화를 진행하고, 셀프서브 매체 및 트래킹 플랫폼 운영과 컨설팅을 제공합니다.",
    features: [
      "멀티채널 광고 운영 (Meta, Google, TikTok, Naver, Kakao)",
      "캠페인 KPI 기반 실시간 최적화",
      "셀프서브 매체 & 트래킹 플랫폼 운영",
      "A/B 테스트 및 성과 리포팅",
    ],
    order: 2,
  },
  {
    _id: "svc-3",
    title: "Data 기반 컨설팅",
    slug: { current: "data-consulting" },
    icon: "BarChart3",
    description:
      "캠페인 성과에 영향을 주는 타겟 고객, 소재, 매체 효율 등 전반에 걸쳐 데이터 기반의 의사결정을 지원합니다.",
    features: [
      "MMP (AppsFlyer, Adjust) 활용 분석",
      "GA4 / GTM 설정 및 고도화",
      "어트리뷰션 모델링 및 성과 분석",
      "데이터 기반 인사이트 도출 및 개선안 제시",
    ],
    order: 3,
  },
  {
    _id: "svc-4",
    title: "Creative Planning",
    slug: { current: "creative-planning" },
    icon: "Palette",
    description:
      "공략할 시장과 고객, 플랫폼의 특수성에 기반한 최적의 크리에이티브를 기획하고 제작합니다.",
    features: [
      "플랫폼별 최적 크리에이티브 기획",
      "광고 소재 A/B 테스트 및 필터링",
      "브랜드 네이밍 / 로고 / 패키지 디자인",
      "스토어 상세페이지 기획 및 제작",
    ],
    order: 4,
  },
  {
    _id: "svc-5",
    title: "인플루언서 협업 마케팅",
    slug: { current: "influencer-marketing" },
    icon: "Users",
    description:
      "먹방, 뷰티, 금융 등 각 분야별 인플루언서를 활용한 마케팅을 기획합니다.",
    features: [
      "분야별 인플루언서 섭외 및 협업",
      "유튜버 콜라보 마케팅 기획",
      "인플루언서 협찬 및 공동구매 운영",
      "바이럴 콘텐츠 마케팅 기획",
    ],
    order: 5,
  },
];

export const DUMMY_TEAM_MEMBERS: TeamMember[] = [
  {
    _id: "tm-1",
    name: "김도현",
    role: "CEO & 전략 디렉터",
    bio: "다양한 산업의 디지털마케팅 경험과 성공 노하우를 바탕으로 브랜드의 성장 전략을 설계합니다.",
    order: 1,
  },
  {
    _id: "tm-2",
    name: "이서연",
    role: "퍼포먼스 리드",
    bio: "Self-Serve 기반 MKT Specialist로 Media Operating & Optimization을 다이렉트 핸들링합니다.",
    order: 2,
  },
  {
    _id: "tm-3",
    name: "박준혁",
    role: "크리에이티브 디렉터",
    bio: "시장과 고객, 플랫폼의 특수성에 기반한 최적의 크리에이티브를 기획합니다.",
    order: 3,
  },
  {
    _id: "tm-4",
    name: "최민지",
    role: "데이터 애널리스트",
    bio: "MMP, GA4 등 데이터 측정 도구를 활용하여 데이터 기반의 인사이트를 도출합니다.",
    order: 4,
  },
  {
    _id: "tm-5",
    name: "정하은",
    role: "콘텐츠 매니저",
    bio: "트렌드를 읽고 타겟에게 공감을 이끌어내는 바이럴 콘텐츠를 기획합니다.",
    order: 5,
  },
];

export const DUMMY_TESTIMONIALS: Testimonial[] = [
  {
    _id: "test-1",
    quote:
      "데이터 기반의 체계적인 타겟 고도화와 최적화 기준 테스트 덕분에 ROAS가 눈에 띄게 성장했습니다.",
    author: "마케팅 담당자",
    role: "마케팅팀",
    company: "게임사 P",
  },
  {
    _id: "test-2",
    quote:
      "GA 고객 데이터 분석 기반의 크로스 셀링 전략으로 객단가와 매출이 동시에 성장했습니다. LTV 관점의 접근이 인상적이었습니다.",
    author: "이커머스 담당",
    role: "사업부",
    company: "패션 커머스 S",
  },
  {
    _id: "test-3",
    quote:
      "브랜드 네이밍부터 스토어 구축, 인플루언서 마케팅까지 원스톱으로 진행해주어 3개월 만에 파워등급을 달성했습니다.",
    author: "대표",
    role: "경영",
    company: "F&B 스타트업",
  },
  {
    _id: "test-4",
    quote:
      "복합 KPI 캠페인에서 매체별 전략을 차별화하여 ROAS와 유저 획득 모두 개선된 결과를 만들어 주었습니다.",
    author: "마케팅 이사",
    role: "CMO",
    company: "식음료 커머스 K",
  },
];

// PDF 기반 실제 클라이언트 로고 목록
export const DUMMY_CLIENT_LOGOS: ClientLogo[] = [
  { _id: "cl-01", name: "Samsung", featured: true },
  { _id: "cl-02", name: "미래에셋그룹", featured: true },
  { _id: "cl-03", name: "삼성자산운용", featured: true },
  { _id: "cl-04", name: "신한금융투자", featured: true },
  { _id: "cl-05", name: "NICE신용평가", featured: true },
  { _id: "cl-06", name: "아모레퍼시픽", featured: true },
  { _id: "cl-07", name: "넷마블", featured: true },
  { _id: "cl-08", name: "펄어비스", featured: true },
  { _id: "cl-09", name: "LINE", featured: true },
  { _id: "cl-10", name: "JOYCITY", featured: true },
  { _id: "cl-11", name: "롯데면세점", featured: true },
  { _id: "cl-12", name: "Nike", featured: true },
  { _id: "cl-13", name: "SSF SHOP", featured: true },
  { _id: "cl-14", name: "이랜드 리테일", featured: false },
  { _id: "cl-15", name: "요기요", featured: false },
  { _id: "cl-16", name: "위메프", featured: false },
  { _id: "cl-17", name: "탑텐", featured: false },
  { _id: "cl-18", name: "종근당건강", featured: false },
  { _id: "cl-19", name: "안랩", featured: false },
  { _id: "cl-20", name: "Apple", featured: false },
  { _id: "cl-21", name: "Trip.com", featured: false },
  { _id: "cl-22", name: "SK매직", featured: false },
  { _id: "cl-23", name: "웅진씽크빅", featured: false },
  { _id: "cl-24", name: "대성마이맥", featured: false },
  { _id: "cl-25", name: "네오위즈", featured: false },
  { _id: "cl-26", name: "밀리의서재", featured: false },
  { _id: "cl-27", name: "레진", featured: false },
  { _id: "cl-28", name: "김정문알로에", featured: false },
  { _id: "cl-29", name: "에버셀", featured: false },
  { _id: "cl-30", name: "증권플러스 비상장", featured: false },
];
