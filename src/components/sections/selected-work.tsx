"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Badge } from "@/components/ui/badge";
import { DUMMY_CASE_STUDIES } from "@/lib/constants";

function parseMetricValue(value: string): {
  num: number;
  prefix: string;
  suffix: string;
} {
  const match = value.match(/^([+\-]?)(\d+)(.*)/);
  if (!match) return { num: 0, prefix: "", suffix: value };
  return {
    prefix: match[1],
    num: parseInt(match[2], 10),
    suffix: match[3],
  };
}

const GRADIENTS = [
  "from-primary/30 via-secondary/20 to-accent/10",
  "from-secondary/30 via-accent/20 to-primary/10",
  "from-accent/30 via-primary/20 to-secondary/10",
];

export function SelectedWork() {
  const caseStudies = DUMMY_CASE_STUDIES.slice(0, 3);

  return (
    <SectionWrapper>
      <div className="mb-12 text-center">
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold">
          Selected Work
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          우리가 만든 성장 스토리
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {caseStudies.map((cs, i) => {
          const metric = cs.results[0];
          const parsed = parseMetricValue(metric.value);
          const isFirst = i === 0;

          return (
            <ScrollReveal
              key={cs._id}
              delay={i * 0.15}
              className={isFirst ? "md:col-span-2" : ""}
            >
              <Link
                href={`/work/${cs.slug.current}`}
                className="group relative block overflow-hidden rounded-xl"
              >
                <div
                  className={`bg-gradient-to-br ${GRADIENTS[i]} flex aspect-[16/9] items-end p-6 transition-transform duration-500 group-hover:scale-[1.02] ${
                    isFirst ? "md:aspect-[21/9]" : ""
                  }`}
                >
                  <div className="relative z-10 w-full">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-semibold text-foreground/80">
                        {cs.client}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {cs.industry}
                      </Badge>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold md:text-2xl">
                      {cs.title}
                    </h3>
                    <div className="mt-3">
                      <span className="text-sm text-muted-foreground">
                        {metric.metric}
                      </span>
                      <span className="ml-2 font-mono text-2xl font-bold text-primary">
                        <AnimatedCounter
                          value={parsed.num}
                          prefix={parsed.prefix}
                          suffix={parsed.suffix}
                        />
                      </span>
                    </div>
                    <span className="mt-3 inline-block text-sm font-medium text-primary md:hidden">
                      자세히 보기 →
                    </span>
                  </div>

                  <div className="absolute inset-0 hidden items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 md:flex">
                    <span className="font-display text-lg font-semibold">
                      자세히 보기 &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
