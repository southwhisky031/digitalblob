"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  direction?: "left" | "right";
}

export function Marquee({
  children,
  speed = 30,
  pauseOnHover = false,
  className,
  direction = "left",
}: MarqueeProps) {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // 항상 같은 컴포넌트 트리를 반환하여 하이드레이션 불일치 방지
  // 모션 감소 시 애니메이션만 정지
  return (
    <div
      className={`group relative flex overflow-hidden ${className || ""}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={`${prefersReducedMotion ? "" : "animate-marquee"} flex shrink-0 items-center gap-4 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{
          ["--marquee-duration" as string]: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={`${prefersReducedMotion ? "" : "animate-marquee"} flex shrink-0 items-center gap-4 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{
          ["--marquee-duration" as string]: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
}
