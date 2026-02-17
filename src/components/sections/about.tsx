"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* 왼쪽: 타이틀 영역 */}
        <ScrollReveal direction="left">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            About Us
          </span>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight">
            브랜드가 열광받는
            <br />
            <span className="text-gradient">최적의 경로</span>를 찾습니다
          </h2>
        </ScrollReveal>

        {/* 오른쪽: 설명 영역 */}
        <div className="space-y-6">
          <ScrollReveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              정확한 시장 분석과 고객의 니즈 파악을 통해 브랜드의 본질적 가치를
              발견하고, 브랜딩과 퍼포먼스를 아우르는 마케팅과 일관성 있는 여정
              설계를 통해 고객이 브랜드에 열광할 수 있는 최적의 경로를
              찾아줍니다.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              다양한 산업의 디지털마케팅 경험과 성공 노하우를 보유한 각 분야별
              스페셜리스트들로 구성되어 있으며, 디지털 주요 매체의 운영은 물론
              크리에이티브 기획, Data 기반의 컨설팅 등 폭넓은 디지털 마케팅을
              수행합니다.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* 하단 수치 카드 */}
      <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={0.1 * i}>
            <div className="glass rounded-xl p-4 md:p-6 text-center">
              <p className="font-mono text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Brand Partners" },
  { value: "99%", label: "Client Satisfaction" },
] as const;
