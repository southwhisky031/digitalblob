"use client";

import Link from "next/link";
import {
  TrendingUp,
  Palette,
  PenTool,
  BarChart3,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { DUMMY_SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Palette,
  PenTool,
  BarChart3,
  Target,
  Users,
};

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "비즈니스 목표와 현황을 분석하여 핵심 과제를 정의합니다.",
    color: "bg-primary text-primary-foreground",
  },
  {
    number: "02",
    title: "Strategy",
    description: "데이터 기반의 맞춤형 마케팅 전략을 수립합니다.",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    number: "03",
    title: "Execution",
    description: "전략을 실행하고 크리에이티브를 제작합니다.",
    color: "bg-accent text-accent-foreground",
  },
  {
    number: "04",
    title: "Optimization",
    description: "성과 데이터를 분석하여 지속적으로 최적화합니다.",
    color: "bg-primary text-primary-foreground",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Our Services
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              비즈니스 성장을 위한 통합 마케팅 솔루션
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Blocks */}
      <SectionWrapper className="pt-0">
        <div className="space-y-20 md:space-y-28">
          {DUMMY_SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon];
            const isEven = i % 2 === 1;

            return (
              <ScrollReveal key={service._id}>
                <div
                  className={`glass rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col gap-8 ${
                    isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                  } lg:items-center`}
                >
                  {/* Icon side */}
                  <div className="flex shrink-0 items-center justify-center lg:w-1/3">
                    <div className="flex size-24 items-center justify-center rounded-3xl bg-primary/10 md:size-32">
                      {Icon && (
                        <Icon className="size-12 text-primary md:size-16" />
                      )}
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex-1">
                    <h2 className="font-display text-3xl font-bold md:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-foreground/80"
                        >
                          <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Our Process
          </h2>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Desktop connecting line */}
          <div className="absolute top-12 left-[10%] right-[10%] hidden h-0.5 bg-border lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.15}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Step number */}
                  <div
                    className={`relative z-10 flex size-24 items-center justify-center rounded-full ${step.color}`}
                  >
                    <span className="font-mono text-2xl font-bold">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                  {/* Arrow for mobile/tablet between steps */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="mt-4 size-5 rotate-90 text-muted-foreground sm:hidden" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              어떤 서비스가 필요하신가요?
            </h2>
            <p className="mt-4 text-muted-foreground">
              비즈니스 목표에 맞는 최적의 솔루션을 제안해 드립니다.
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
