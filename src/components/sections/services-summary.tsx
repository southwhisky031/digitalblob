"use client";

import Link from "next/link";
import {
  TrendingUp,
  Palette,
  PenTool,
  BarChart3,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { DUMMY_SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  Palette,
  PenTool,
  BarChart3,
  Target,
  Users,
};

export function ServicesSummary() {
  return (
    <SectionWrapper>
      <div className="mb-12 text-center">
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold">
          Our Services
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          비즈니스 성장을 위한 통합 솔루션
        </p>
      </div>

      <div className="group/services grid grid-cols-1 gap-6 sm:grid-cols-2">
        {DUMMY_SERVICES.map((service, i) => {
          const Icon = ICON_MAP[service.icon] || TrendingUp;
          return (
            <ScrollReveal key={service._id} delay={i * 0.1}>
              <div className="glass rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] group-hover/services:[&:not(:hover)]:opacity-60">
                <Icon className="mb-4 size-8 text-primary" />
                <h3 className="font-display text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href={`/services#${service.slug.current}`}
                  className="mt-4 inline-block text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  자세히 보기 &rarr;
                </Link>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
