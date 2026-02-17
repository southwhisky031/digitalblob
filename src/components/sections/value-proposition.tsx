"use client";

import { Layers, Monitor, TrendingUp, BarChart3, GitMerge } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const VALUE_ITEMS = [
  {
    title: "Integrated Digital MKT Agency",
    description: "기획, 제작, 운영 등 어느 한 분야가 아닌 하나의 팀으로 One Stop MKT Solution을 제공합니다",
    icon: Layers,
    color: "text-primary",
  },
  {
    title: "Media Coverage",
    description: "Self-Serve 기반 MKT Specialist로 구성, Media Operating & Optimization을 다이렉트 핸들링합니다",
    icon: Monitor,
    color: "text-secondary",
  },
  {
    title: "Growth Marketer Group",
    description: "단순 퍼포먼스 향상이 아닌 마케팅 컨설팅 관점에서 성장 방법론을 제시합니다",
    icon: TrendingUp,
    color: "text-accent",
  },
  {
    title: "Data-Savvy Workforce",
    description: "MMP, GA4 등 데이터 측정 도구를 활용하여 Data 기반 인사이트를 도출하고 개선점을 제시합니다",
    icon: BarChart3,
    color: "text-primary",
  },
  {
    title: "Full Funnel MKT Solution",
    description: "브랜드 인지와 전환 유도, CRM 관리까지 고객 여정 전 과정의 최적 솔루션을 설계합니다",
    icon: GitMerge,
    color: "text-secondary",
  },
] as const;

export function ValueProposition() {
  return (
    <SectionWrapper>
      <div className="mb-12 text-center">
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold">
          Digital Marketing Capabilities
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          디지털마케팅 전 영역을 아우르는 업무 수행 능력으로 브랜드의 성공을 이끌어냅니다
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {VALUE_ITEMS.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.1} className={i === VALUE_ITEMS.length - 1 && VALUE_ITEMS.length % 2 !== 0 ? "sm:col-span-2 lg:col-span-1" : undefined}>
            <div className="glass rounded-xl p-6 transition-transform duration-300 hover:scale-105 h-full">
              <item.icon className={`mb-4 size-8 ${item.color}`} />
              <h3 className="font-display text-lg font-semibold">
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
  );
}
