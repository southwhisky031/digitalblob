import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, AlertCircle, Lightbulb, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { DUMMY_CASE_STUDIES } from "@/lib/constants";
import { WorkDetailClient } from "./work-detail-client";

function findCaseStudy(slug: string) {
  return DUMMY_CASE_STUDIES.find((cs) => cs.slug.current === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = findCaseStudy(slug);
  if (!cs) return { title: "Not Found" };
  return {
    title: `${cs.title} | Work`,
    description: cs.challenge,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = findCaseStudy(slug);
  if (!cs) notFound();

  const GRADIENT_MAP: Record<string, string> = {
    "fashion-brand-d2c": "from-primary/30 to-secondary/30",
    "saas-lead-generation": "from-secondary/30 to-accent/30",
    "fnb-brand-launch": "from-accent/30 to-primary/30",
  };
  const gradient = GRADIENT_MAP[slug] || "from-primary/30 to-secondary/30";

  return (
    <>
      {/* Hero */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br ${gradient} py-24 md:py-32`}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            전체 프로젝트 보기
          </Link>
          <p className="font-mono text-sm text-primary">{cs.client}</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {cs.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary">{cs.industry}</Badge>
            {cs.services.map((svc) => (
              <Badge key={svc} variant="outline">
                {svc}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="size-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">Challenge</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            {cs.challenge}
          </p>
        </div>
      </SectionWrapper>

      {/* Solution */}
      <SectionWrapper className="pt-0">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <Lightbulb className="size-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">Solution</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            {cs.solution}
          </p>
        </div>
      </SectionWrapper>

      {/* Results - Client component for AnimatedCounter */}
      <WorkDetailClient results={cs.results} testimonial={cs.testimonial} />

      {/* CTA */}
      <SectionWrapper>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            비슷한 프로젝트를 계획하고 계신가요?
          </h2>
          <p className="mt-4 text-muted-foreground">
            데이터 기반 전략으로 비즈니스 성장을 함께 만들어갑니다.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">프로젝트 문의하기</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
