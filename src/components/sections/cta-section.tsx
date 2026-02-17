"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-10" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold leading-tight">
            Ready to Scale Your Growth?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            지금 바로 무료 컨설팅을 받아보세요
          </p>
          <div className="mt-10">
            <MagneticButton>
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 text-base"
              >
                <Link href="/contact">무료 컨설팅 시작하기</Link>
              </Button>
            </MagneticButton>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            평균 응답 시간 2시간 이내
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
