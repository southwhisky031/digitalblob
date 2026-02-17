"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { BlobBackground } from "@/components/shared/blob-background";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CLIENT_CATEGORIES = [
  {
    name: "금융/투자",
    clients: [
      { name: "삼성증권", logo: "삼성.png" },
      { name: "미래에셋그룹", logo: "미래에셋그룹.svg" },
      { name: "삼성자산운용", logo: "삼성자산운용.svg" },
      { name: "신한금융투자", logo: "신한금융투자.svg" },
      { name: "증권플러스 비상장", logo: "증권플러스 비상장.svg" },
      { name: "나이스신용평가", logo: "나이스신용평가.png" },
    ],
  },
  {
    name: "게임/엔터",
    clients: [
      { name: "네오위즈", logo: "네오위즈.png" },
      { name: "넷마블", logo: "넷마블.svg" },
      { name: "펄어비스", logo: "펄어비스.png" },
      { name: "조이씨티", logo: "조이씨티.png" },
      { name: "레진", logo: "레진.png" },
    ],
  },
  {
    name: "커머스/패션",
    clients: [
      { name: "롯데면세점", logo: "롯데면세점2.svg" },
      { name: "이랜드 리테일", logo: "이랜드 리테일.png" },
      { name: "SSF SHOP", logo: "SSF SHOP.svg" },
      { name: "에코", logo: "에코.png" },
      { name: "탑텐", logo: "탑텐.png" },
      { name: "위메프", logo: "위메프.svg" },
      { name: "요기요", logo: "요기요.png" },
    ],
  },
  {
    name: "IT/플랫폼",
    clients: [
      { name: "라인", logo: "라인.png" },
      { name: "안랩", logo: "안랩.png" },
      { name: "애플", logo: "애플.png" },
      { name: "SK매직", logo: "SK매직.png" },
      { name: "트립닷컴", logo: "트립닷컴.png" },
    ],
  },
  {
    name: "식품/건강/뷰티",
    clients: [
      { name: "아모레퍼시픽", logo: "아모레퍼시픽.svg" },
      { name: "종근당건강", logo: "종근당건강.png" },
      { name: "에버셀", logo: "에버셀.png" },
      { name: "김정문알로에", logo: "김정문알로에.png" },
    ],
  },
  {
    name: "교육/기타",
    clients: [
      { name: "웅진씽크빅", logo: "웅진씽크빅.png" },
      { name: "대성마이맥", logo: "대성마이맥.png" },
      { name: "밀리의서재", logo: "밀리의서재.png" },
    ],
  },
];

const STATS = [
  { value: 30, suffix: "+", label: "클라이언트" },
  { value: 6, suffix: "+", label: "산업 분야" },
  { value: 100, suffix: "+", label: "프로젝트" },
  { value: 95, suffix: "%", label: "재계약률" },
];

export default function ReferencePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <BlobBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <Badge variant="outline" className="mb-6">
              Our Clients
            </Badge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Our Clients
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              다양한 분야의 클라이언트와 함께 성공적인 디지털마케팅 캠페인을
              만들어가고 있습니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 카테고리별 클라이언트 로고 */}
      {CLIENT_CATEGORIES.map((category, categoryIndex) => (
        <SectionWrapper
          key={category.name}
          className={categoryIndex === 0 ? "pt-0" : ""}
        >
          <ScrollReveal>
            <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
              {category.name}
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6">
            {category.clients.map((client, i) => (
              <ScrollReveal key={client.name} delay={i * 0.05}>
                <div className="glass group flex aspect-square items-center justify-center rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 md:p-6">
                  <Image
                    src={`/images/clients/${client.logo}`}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="max-h-12 w-auto object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 md:max-h-16"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </SectionWrapper>
      ))}

      {/* 숫자 섹션 */}
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
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-primary"
                  />
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
              함께 성장할 파트너를 찾고 계신가요?
            </h2>
            <p className="mt-4 text-muted-foreground">
              digitalblob과 함께 데이터 기반의 마케팅 혁신을 시작하세요.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/contact">문의하기</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
