"use client";

import Link from "next/link";
import {
  Target,
  TrendingUp,
  BarChart3,
  Palette,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { DUMMY_TEAM_MEMBERS, MEDIA_PARTNERS } from "@/lib/constants";

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
  },
  {
    icon: TrendingUp,
    title: "Campaign Operating",
    description:
      "캠페인 목표와 KPI 달성을 위한 최적화 진행 / 셀프서브 매체&트래킹 플랫폼 운영 및 컨설팅",
  },
  {
    icon: BarChart3,
    title: "Data 기반 컨설팅",
    description:
      "MMP, GA4와 같은 데이터 측정 도구 활용 / 타겟 고객, 소재, 매체 효율 등 데이터 기반의 의사결정",
  },
  {
    icon: Palette,
    title: "Creative Planning",
    description:
      "공략할 시장과 고객, 플랫폼의 특수성에 기반한 최적의 크리에이티브 기획, 제작",
  },
  {
    icon: Users,
    title: "인플루언서 협업 마케팅",
    description:
      "먹방, 뷰티, 금융 등 각 분야별 인플루언서를 활용한 마케팅 기획",
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
            <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
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
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              극한의 가성비,{" "}
              <span className="text-primary">최적의 경로</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              미로 문제를 마주한 &apos;블롭&apos;은 놀라운 기억력과 학습능력을 바탕으로
              가장 효율적인 탈출 경로를 빠르게 찾아냅니다.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              DigitalBlob은 정확한 시장 분석과 고객의 니즈 파악을 통해
              브랜드의 본질적 가치를 발견하고, 브랜딩과 퍼포먼스를 아우르는 마케팅과
              일관성 있는 여정 설계를 통해 고객이 브랜드에 열광할 수 있는
              최적의 경로를 찾아줍니다.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              다양한 산업의 디지털마케팅 경험과 성공 노하우를 보유한 각 분야별 스페셜리스트들로 구성되어 있으며, 디지털 주요 매체의 운영은 물론 크리에이티브 기획, Data 기반의 컨설팅 등 폭넓은 디지털 마케팅을 수행합니다.
            </p>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Work Scope */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Work Scope
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            브랜드 성장을 위한 디지털 마케팅 풀서비스를 제공합니다
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WORK_SCOPE.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div className="glass group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="size-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
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

      {/* Team */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Our Team
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {DUMMY_TEAM_MEMBERS.map((member, i) => (
            <ScrollReveal key={member._id} delay={i * 0.1}>
              <div className="glass group rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1">
                <Avatar className="mx-auto size-16">
                  <AvatarFallback className="text-lg font-display">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-display font-semibold">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-foreground/60 line-clamp-2">
                  {member.bio}
                </p>
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
              <div className="glass rounded-2xl p-8 text-center">
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
