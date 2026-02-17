"use client";

import { useRef, useState, useCallback } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface BlobBackgroundProps {
  className?: string;
  interactive?: boolean;
}

const BLOBS = [
  {
    color: "var(--primary)",
    size: 500,
    blur: 80,
    opacity: 0.6,
    delay: "0s",
    position: { top: "10%", left: "15%" },
  },
  {
    color: "var(--secondary)",
    size: 400,
    blur: 70,
    opacity: 0.5,
    delay: "2s",
    position: { top: "40%", right: "10%" },
  },
  {
    color: "var(--accent)",
    size: 350,
    blur: 60,
    opacity: 0.5,
    delay: "4s",
    position: { bottom: "10%", left: "30%" },
  },
];

export function BlobBackground({
  className,
  interactive = true,
}: BlobBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const isInteractive = interactive && !isMobile;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
      setMouse({ x, y });
    },
    [isInteractive]
  );

  // 항상 3개 blob을 렌더링하되 모바일에서는 3번째를 숨김 (트리 일관성)
  return (
    <div
      ref={containerRef}
      className={`pointer-events-auto absolute inset-0 overflow-hidden ${className || ""}`}
      onMouseMove={handleMouseMove}
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className={`${prefersReducedMotion ? "" : "animate-blob"} absolute rounded-full`}
          style={{
            width: blob.size,
            height: blob.size,
            backgroundColor: blob.color,
            filter: `blur(${isMobile ? blob.blur / 2 : blob.blur}px)`,
            opacity: isMobile && i === 2 ? 0 : blob.opacity,
            mixBlendMode: isMobile ? "normal" : "screen",
            animationDelay: blob.delay,
            transform: isInteractive
              ? `translate(${mouse.x * (0.5 + i * 0.2)}px, ${mouse.y * (0.5 + i * 0.2)}px)`
              : undefined,
            transition: "transform 0.3s ease-out",
            ...blob.position,
          }}
        />
      ))}
    </div>
  );
}
