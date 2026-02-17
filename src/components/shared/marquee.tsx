"use client";

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
        className={`animate-marquee flex shrink-0 items-center gap-4 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{
          ["--marquee-duration" as string]: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={`animate-marquee flex shrink-0 items-center gap-4 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
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
