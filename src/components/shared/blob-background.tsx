"use client";

import { useRef, useState, useCallback } from "react";

interface BlobBackgroundProps {
  className?: string;
  interactive?: boolean;
}

export function BlobBackground({
  className,
  interactive = true,
}: BlobBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
      setMouse({ x, y });
    },
    [interactive]
  );

  const blobs = [
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

  return (
    <div
      ref={containerRef}
      className={`pointer-events-auto absolute inset-0 overflow-hidden ${className || ""}`}
      onMouseMove={handleMouseMove}
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="animate-blob absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            backgroundColor: blob.color,
            filter: `blur(${blob.blur}px)`,
            opacity: blob.opacity,
            mixBlendMode: "screen",
            animationDelay: blob.delay,
            transform: interactive
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
