"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { BlobBackground } from "@/components/shared/blob-background";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DUMMY_CASE_STUDIES } from "@/lib/constants";

const GRADIENT_COLORS = [
  "from-primary/40 to-secondary/40",
  "from-secondary/40 to-accent/40",
  "from-accent/40 to-primary/40",
];

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
  const [activeTab, setActiveTab] = useState("전체");

  const industries = useMemo(
    () => [...new Set(DUMMY_CASE_STUDIES.map((cs) => cs.industry))],
    []
  );

  const categories = useMemo(
    () => ["전체", ...industries],
    [industries]
  );

  const filteredStudies = useMemo(() => {
    if (activeTab === "전체") return DUMMY_CASE_STUDIES;
    return DUMMY_CASE_STUDIES.filter((cs) => cs.industry === activeTab);
  }, [activeTab]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <BlobBackground className="opacity-30" interactive={false} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-tight">
              Reference
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              데이터로 만든 성장 사례와 클라이언트
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 숫자 섹션 */}
      <SectionWrapper className="pt-0 pb-8 md:pb-14 lg:pb-16">
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            파트너들은 digitalblob과{" "}
            <br className="hidden md:inline" />
            성장을 위한 답을 찾고 있습니다
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

      {/* Case Studies */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Case Studies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            데이터 기반의 마케팅 성공 사례
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-8 mb-12"
          >
            <TabsList className="flex flex-nowrap gap-1 h-auto bg-transparent overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-x-visible">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudies.map((cs, i) => (
            <ScrollReveal key={cs._id} delay={i * 0.1}>
              <Link href={`/work/${cs.slug.current}`} className="group block">
                <div className="glass relative overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-translate-y-1">
                  <div
                    className={`relative aspect-[4/3] bg-gradient-to-br ${GRADIENT_COLORS[i % GRADIENT_COLORS.length]}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl font-bold opacity-20">
                        {cs.client}
                      </span>
                    </div>
                    <Badge className="absolute top-4 left-4" variant="secondary">
                      {cs.client}
                    </Badge>
                    <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 p-6">
                      <p className="text-sm text-center text-foreground/80 line-clamp-3">
                        {cs.challenge}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        자세히 보기 <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </div>

                  <div className="flex h-[160px] flex-col p-5">
                    <h3 className="font-display text-lg font-semibold leading-tight line-clamp-2">
                      {cs.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5 overflow-hidden max-h-[52px]">
                      <Badge variant="outline" className="text-xs">
                        {cs.industry}
                      </Badge>
                      {cs.services.map((svc) => (
                        <Badge
                          key={svc}
                          variant="outline"
                          className="text-xs"
                        >
                          {svc}
                        </Badge>
                      ))}
                    </div>
                    {cs.results[0] && (
                      <p className="mt-auto font-mono text-sm text-primary">
                        {cs.results[0].metric}{" "}
                        <span className="font-semibold">
                          {cs.results[0].value}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* 카테고리별 클라이언트 로고 */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Our Clients
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            다양한 분야의 클라이언트와 함께 성공적인 디지털마케팅 캠페인을
            만들어가고 있습니다
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-10">
          {CLIENT_CATEGORIES.map((category) => (
            <ScrollReveal key={category.name}>
              <h3 className="mb-5 font-display text-lg font-semibold text-muted-foreground md:text-xl">
                {category.name}
              </h3>

              {/* 모바일: 가로 슬라이드 / 데스크톱: 그리드 */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-4 lg:grid-cols-6 md:overflow-x-visible md:pb-0">
                {category.clients.map((client) => (
                  <div
                    key={client.name}
                    className="group flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md w-[140px] md:w-auto"
                  >
                    <Image
                      src={`/images/clients/${client.logo}`}
                      alt={client.name}
                      width={120}
                      height={48}
                      className="h-8 w-auto max-w-[100px] object-contain md:h-10 md:max-w-[120px]"
                    />
                  </div>
                ))}
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
