import type { Variants, Transition } from "motion/react";

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const fadeLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const smooth: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.4,
};

export const bounce: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 10,
};
