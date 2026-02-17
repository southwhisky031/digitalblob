import Image from "next/image";
import Link from "next/link";
import {
  Target,
  TrendingUp,
  BarChart3,
  Palette,
  Users,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MEDIA_PARTNERS } from "@/lib/constants";

const STATS = [
  { value: 100, suffix: "+", label: "프로젝트 완료" },
  { value: 95, suffix: "%", label: "클라이언트 재계약률" },
  { value: 4.2, suffix: "x", label: "평균 ROAS", decimals: true },
  { value: 2, suffix: "시간", label: "평균 응답 시간" },
];

const WORK_SCOPE = [
  {
    icon: Target,
    title: "Marketing Planning",
    description:
      "시장과 경쟁상황 분석을 통한 인사이트 도출 / 효율적인 마케팅 전략 및 플랜 기획",
    features: [
      "시장 환경 및 경쟁사 분석",
      "타겟 오디언스 설정 및 고도화",
      "마케팅 전략 및 KPI 수립",
      "채널별 예산 배분 전략",
    ],
    slug: "marketing-planning",
    gradient: "from-primary/30 via-secondary/10 to-background",
    glowColor: "bg-primary/25",
    image: "/images/services/marketing-planning.webp",
  },
  {
    icon: TrendingUp,
    title: "Campaign Operating",
    description:
      "캠페인 목표와 KPI 달성을 위한 최적화 진행 / 셀프서브 매체&트래킹 플랫폼 운영 및 컨설팅",
    features: [
      "멀티채널 광고 운영",
      "캠페인 KPI 기반 실시간 최적화",
      "셀프서브 매체 & 트래킹 플랫폼 운영",
      "A/B 테스트 및 성과 리포팅",
    ],
    slug: "campaign-operating",
    gradient: "from-secondary/30 via-primary/10 to-background",
    glowColor: "bg-secondary/25",
    image: "/images/services/campaign-operating.webp",
  },
  {
    icon: BarChart3,
    title: "Data 기반 컨설팅",
    description:
      "MMP, GA4와 같은 데이터 측정 도구 활용 / 타겟 고객, 소재, 매체 효율 등 데이터 기반의 의사결정",
    features: [
      "MMP (AppsFlyer, Adjust) 활용 분석",
      "GA4 / GTM 설정 및 고도화",
      "어트리뷰션 모델링 및 성과 분석",
      "데이터 기반 인사이트 도출",
    ],
    slug: "data-consulting",
    gradient: "from-accent/25 via-primary/15 to-background",
    glowColor: "bg-accent/20",
    image: "/images/services/data-consulting.webp",
  },
  {
    icon: Palette,
    title: "Creative Planning",
    description:
      "공략할 시장과 고객, 플랫폼의 특수성에 기반한 최적의 크리에이티브 기획, 제작",
    features: [
      "플랫폼별 최적 크리에이티브 기획",
      "광고 소재 A/B 테스트 및 필터링",
      "브랜드 네이밍 / 로고 / 패키지",
      "스토어 상세페이지 기획 및 제작",
    ],
    slug: "creative-planning",
    gradient: "from-primary/25 via-accent/15 to-background",
    glowColor: "bg-primary/20",
    image: "/images/services/creative-planning.webp",
  },
  {
    icon: Users,
    title: "인플루언서 협업",
    description:
      "먹방, 뷰티, 금융 등 각 분야별 인플루언서를 활용한 마케팅 기획",
    features: [
      "분야별 인플루언서 섭외 및 협업",
      "유튜버 콜라보 마케팅 기획",
      "인플루언서 협찬 및 공동구매 운영",
      "바이럴 콘텐츠 마케팅 기획",
    ],
    slug: "influencer-marketing",
    gradient: "from-secondary/25 via-accent/10 to-background",
    glowColor: "bg-secondary/20",
    image: "/images/services/influencer-marketing.webp",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "비즈니스 목표와 현황을 분석하여 핵심 과제를 정의합니다.",
    color: "bg-primary",
  },
  {
    number: "02",
    title: "Strategy",
    description: "데이터 기반의 맞춤형 마케팅 전략을 수립합니다.",
    color: "bg-secondary",
  },
  {
    number: "03",
    title: "Execution",
    description: "전략을 실행하고 크리에이티브를 제작합니다.",
    color: "bg-accent",
  },
  {
    number: "04",
    title: "Optimization",
    description: "성과 데이터를 분석하여 지속적으로 최적화합니다.",
    color: "bg-primary",
  },
];

const MEDIA_CATEGORIES = [
  { key: "portalAndSA" as const, label: "포털 & SA" },
  { key: "socialMedia" as const, label: "소셜 미디어" },
  { key: "retargeting" as const, label: "리타겟팅" },
  { key: "adNetworkDSP" as const, label: "Ad Network / DSP" },
  { key: "verticalMedia" as const, label: "버티컬 미디어" },
  { key: "mmpSolutions" as const, label: "MMP & 솔루션" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-tight">
              About DigitalBlob
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Brand Accelerator &amp; Digital MKT Agency
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <SectionWrapper className="pt-0">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              데이터가 증명하는,{" "}
              <span className="text-primary">최적의 경로</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              미로 문제를 마주한 &apos;블롭&apos;은 놀라운 기억력과 학습능력을
              바탕으로 가장 효율적인 탈출 경로를 빠르게 찾아냅니다.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              DigitalBlob은 정확한 시장 분석과 고객의 니즈 파악을 통해 브랜드의 본질적 가치를 발견하고,
              <br className="hidden md:inline" />
              브랜딩과 퍼포먼스를 아우르는 마케팅과 일관성 있는 여정 설계를 통해 고객이 브랜드에 열광할 수 있는 최적의 경로를 제시합니다.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              다양한 산업의 디지털마케팅 경험과 성공 노하우를 보유한 각 분야별 스페셜리스트들로 구성되어 있으며,
              <br className="hidden md:inline" />
              디지털 주요 매체의 운영은 물론 크리에이티브 기획, Data 기반의 컨설팅 등 폭넓은 디지털 마케팅을 수행합니다.
            </p>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Work Scope */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Work Scope
              </h2>
              <p className="mt-4 text-muted-foreground">
                브랜드 성장을 위한 디지털 마케팅 풀서비스를 제공합니다
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-3 lg:grid-cols-5">
          {WORK_SCOPE.map((item, i) => (
            <ScrollReveal
              key={item.title}
              delay={i * 0.1}
              className={
                i === WORK_SCOPE.length - 1 && WORK_SCOPE.length % 2 !== 0
                  ? "col-span-2 md:col-span-1"
                  : undefined
              }
            >
              <div className="group relative overflow-hidden bg-background">
                {/* 배경: 이미지 또는 그래디언트 */}
                <div
                  className={`relative ${item.image ? "" : `bg-gradient-to-br ${item.gradient}`} aspect-[3/4]`}
                >
                  {/* 나노바나나 생성 이미지 */}
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* 이미지 없을 때: 장식 링 + 아이콘 */}
                  {!item.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute size-28 rounded-full border border-foreground/[0.04] sm:size-36" />
                      <div className="absolute size-20 rounded-full border border-foreground/[0.07] sm:size-24" />
                      <div className="absolute size-12 rounded-full border border-foreground/[0.1] sm:size-14" />
                      <div
                        className={`absolute size-20 rounded-full blur-3xl ${item.glowColor}`}
                      />
                      <item.icon className="relative size-8 text-foreground/20 sm:size-10" />
                    </div>
                  )}

                  {/* 하단 그래디언트 (제목 가독성) */}
                  <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background via-background/80 to-transparent" />

                  {/* 번호 + 제목 (항상 표시) */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="font-mono text-xs text-primary sm:text-sm">
                      0{i + 1}
                    </span>
                    <h3 className="mt-0.5 font-display text-sm font-bold uppercase tracking-wider sm:text-base">
                      {item.title}
                    </h3>
                  </div>

                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 flex flex-col justify-center bg-background/90 p-4 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 sm:p-5">
                    <span className="font-mono text-xs text-primary">
                      0{i + 1}
                    </span>
                    <h3 className="mt-1 font-display text-base font-bold sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {item.description}
                    </p>

                    <div className="mt-3 h-px bg-border/50" />

                    <ul className="mt-3 space-y-1.5">
                      {item.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm"
                        >
                          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </SectionWrapper>

      {/* Our Process */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Our Process
          </h2>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* 데스크톱 연결선 */}
          <div className="absolute top-8 left-[12%] right-[12%] hidden h-px bg-border/40 md:top-10 md:block" />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.15}>
                <div className="relative flex flex-col items-center text-center">
                  <div
                    className={`relative z-10 flex size-16 items-center justify-center rounded-full shadow-lg md:size-20 ${step.color}`}
                  >
                    <span className="font-mono text-lg font-bold text-white md:text-xl">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-sm font-semibold md:text-base">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground md:text-sm">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Media Partners */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Media Partners
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            주요 디지털 매체와의 파트너십을 통해 최적의 광고 성과를 달성합니다
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-8">
          {MEDIA_CATEGORIES.map((category, i) => (
            <ScrollReveal key={category.key} delay={i * 0.08}>
              <div className="glass rounded-2xl p-6">
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-primary">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {MEDIA_PARTNERS[category.key].map((partner) => (
                    <Badge
                      key={partner}
                      variant="outline"
                      className="px-3 py-1.5 text-sm"
                    >
                      {partner}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Numbers */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            In Numbers
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="glass rounded-2xl p-5 md:p-8 text-center">
                <div className="text-4xl font-bold md:text-5xl">
                  {stat.decimals ? (
                    <span className="font-mono text-primary">
                      {stat.value}
                      {stat.suffix}
                    </span>
                  ) : (
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-primary"
                    />
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              함께 성장할 준비가 되셨나요?
            </h2>
            <p className="mt-4 text-muted-foreground">
              digitalblob과 함께 데이터 기반의 마케팅 혁신을 시작하세요.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/contact">프로젝트 문의하기</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
