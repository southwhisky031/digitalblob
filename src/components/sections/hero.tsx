"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { BlobBackground } from "@/components/shared/blob-background";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { TextRotator } from "@/components/shared/text-rotator";
import { Button } from "@/components/ui/button";
import { DUMMY_SITE_SETTINGS } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      <BlobBackground className="absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.8 }}
        >
          <span className="inline-block rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-[0_0_15px_rgba(var(--primary),0.15)]">
            Brand Accelerator &amp; Digital MKT Agency
          </span>
        </motion.div>

        <motion.h1
          className="mt-8 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {DUMMY_SITE_SETTINGS.heroHeadline}
          <span className="mt-2 block">
            <TextRotator
              texts={["Optimal Path", "Data-Driven", "Growth Marketing"]}
            />
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {DUMMY_SITE_SETTINGS.heroSubtext}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <MagneticButton>
            <Button asChild size="lg" className="rounded-full px-8 text-base">
              <Link href="/contact">무료 컨설팅 받기</Link>
            </Button>
          </MagneticButton>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-dashed px-8 text-base"
          >
            <Link href="/work">프로젝트 보기 &rarr;</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
