"use client";

import { useScroll } from "motion/react";

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
