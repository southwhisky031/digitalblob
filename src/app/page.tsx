"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ShaderBackground } from "@/components/ui/neural-network-hero";
import { AnimatedDigitalBlobLogo } from "@/components/shared/animated-logo";

gsap.registerPlugin(useGSAP);

export default function OpeningPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set(taglineRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(ctaRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(bottomRef.current, { autoAlpha: 0 });
    },
    { scope: sectionRef }
  );

  const handleLogoComplete = useCallback(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(taglineRef.current, { autoAlpha: 1, y: 0, duration: 0.7 })
      .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.3")
      .to(bottomRef.current, { autoAlpha: 1, duration: 0.5 }, "-=0.2");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
    >
      <ShaderBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Animated Logo */}
        <div className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
          <AnimatedDigitalBlobLogo
            className="w-full h-auto"
            onComplete={handleLogoComplete}
          />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-center font-sans text-sm font-light tracking-[0.05em] uppercase text-white/60 sm:text-base"
        >
          Brand Accelerator &amp; Digital MKT Agency
        </p>

        {/* CTA Button */}
        <div ref={ctaRef} className="pt-4">
          <Link
            href="/about"
            className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm font-light tracking-tight text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Explore Our Work
          </Link>
        </div>
      </div>

      {/* Bottom micro detail */}
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 pb-8"
      >
        <div className="flex items-center gap-6 text-[11px] font-extralight tracking-tight text-white/40">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/30" />
            Data-Driven
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/30" />
            Creative Excellence
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/30" />
            Full-Funnel
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
}
