import type { ReactNode } from "react";
import { Reveal, TextReveal } from "./Reveal";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: ReactNode[];
  lead?: ReactNode;
  dark?: boolean;
  className?: string;
};

/** The one section header used across the site: eyebrow → title → lead, left-aligned. */
export function SectionHeader({ eyebrow, title, lead, dark = false, className }: Props) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Reveal>
        <p className={cn("eyebrow", dark && "!text-white/80")}>{eyebrow}</p>
      </Reveal>
      <h2 className={cn("h-section mt-4", dark ? "text-white" : "text-ink")}>
        <TextReveal lines={title} />
      </h2>
      {lead && (
        <Reveal delay={0.1}>
          <p className={cn("mt-5 text-base leading-relaxed md:text-lg", dark ? "text-white/80" : "text-ink-soft")}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
