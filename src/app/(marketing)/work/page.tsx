"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BlobBackground } from "@/components/shared/blob-background";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { DUMMY_CASE_STUDIES } from "@/lib/constants";

const GRADIENT_COLORS = [
  "from-primary/40 to-secondary/40",
  "from-secondary/40 to-accent/40",
  "from-accent/40 to-primary/40",
];

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("전체");

  const industries = useMemo(
    () => [...new Set(DUMMY_CASE_STUDIES.map((cs) => cs.industry))],
    []
  );

  const services = useMemo(
    () => [...new Set(DUMMY_CASE_STUDIES.flatMap((cs) => cs.services))],
    []
  );

  const categories = useMemo(
    () => ["전체", ...industries, ...services],
    [industries, services]
  );

  const filteredStudies = useMemo(() => {
    if (activeTab === "전체") return DUMMY_CASE_STUDIES;
    return DUMMY_CASE_STUDIES.filter(
      (cs) => cs.industry === activeTab || cs.services.includes(activeTab)
    );
  }, [activeTab]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <BlobBackground className="opacity-30" interactive={false} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Our Work
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              데이터로 만든 성장 사례
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <SectionWrapper className="pt-0">
        <ScrollReveal>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-12"
          >
            <TabsList className="flex flex-wrap gap-1 h-auto bg-transparent">
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
                  {/* Gradient placeholder */}
                  <div
                    className={`relative aspect-[4/3] bg-gradient-to-br ${GRADIENT_COLORS[i % GRADIENT_COLORS.length]}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl font-bold opacity-20">
                        {cs.client}
                      </span>
                    </div>
                    {/* Client badge */}
                    <Badge className="absolute top-4 left-4" variant="secondary">
                      {cs.client}
                    </Badge>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 p-6">
                      <p className="text-sm text-center text-foreground/80 line-clamp-3">
                        {cs.challenge}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        자세히 보기 <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold leading-tight">
                      {cs.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
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
                      <p className="mt-3 font-mono text-sm text-primary">
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
    </>
  );
}
