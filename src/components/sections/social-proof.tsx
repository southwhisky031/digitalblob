"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Marquee } from "@/components/shared/marquee";
import { DUMMY_CLIENT_LOGOS } from "@/lib/constants";

export function SocialProof() {
  return (
    <SectionWrapper>
      <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
        신뢰받는 파트너십
      </p>
      <Marquee speed={40} pauseOnHover>
        {DUMMY_CLIENT_LOGOS.map((logo) => (
          <div
            key={logo._id}
            className="flex h-16 items-center justify-center px-8 grayscale opacity-50 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <span className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {logo.name}
            </span>
          </div>
        ))}
      </Marquee>
    </SectionWrapper>
  );
}
