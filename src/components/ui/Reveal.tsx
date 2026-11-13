"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "p" | "span";
};

/** Fade + slide-up once the element scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 32, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

/**
 * Masked line-by-line headline reveal. Pass each visual line as an array item.
 * `animateOnMount` reveals immediately (for heroes); otherwise on scroll.
 */
export function TextReveal({
  lines,
  className,
  lineClassName,
  animateOnMount = false,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: (i: number) => string | undefined;
  animateOnMount?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.span className={className} initial={reduce ? false : "hidden"} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block ${lineClassName?.(i) ?? ""}`}
            variants={lineVariants}
            custom={i + delay / 0.09}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
