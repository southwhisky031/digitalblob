"use client";

import { motion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const directionOffset = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
}: ScrollRevealProps) {
  const offset = directionOffset[direction];
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // 항상 같은 컴포넌트 트리를 반환하여 하이드레이션 불일치 방지
  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
