"use client";

import { BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import type { Result } from "@/types";

function parseNumericValue(value: string): {
  num: number;
  prefix: string;
  suffix: string;
} {
  const match = value.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);
  if (!match) return { num: 0, prefix: "", suffix: value };
  return {
    prefix: match[1],
    num: parseFloat(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

interface WorkDetailClientProps {
  results: Result[];
  testimonial?: string;
}

export function WorkDetailClient({
  results,
  testimonial,
}: WorkDetailClientProps) {
  return (
    <>
      {/* Results */}
      <SectionWrapper className="pt-0">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BarChart3 className="size-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">Results</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {results.map((result, i) => {
              const { num, prefix, suffix } = parseNumericValue(result.value);
              return (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div className="glass rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold md:text-4xl">
                      <AnimatedCounter
                        value={num}
                        prefix={prefix}
                        suffix={suffix}
                        className="text-primary"
                      />
                    </div>
                    <p className="mt-2 font-display font-semibold">
                      {result.metric}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonial */}
      {testimonial && (
        <SectionWrapper className="pt-0">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <blockquote className="glass rounded-2xl p-8 md:p-12">
                <p className="font-display text-xl leading-relaxed md:text-2xl">
                  &ldquo;{testimonial}&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
