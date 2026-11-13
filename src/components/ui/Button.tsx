import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "flare" | "outline" | "light" | "ghost-light";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-deep",
  flare: "bg-flare text-white hover:bg-flare-deep",
  outline: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-flare hover:text-white",
  "ghost-light": "border border-white/40 text-white backdrop-blur-sm hover:bg-white hover:text-ink",
};

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 ease-out-expo";

function Inner({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="relative -mr-1 flex size-6 items-center justify-center overflow-hidden rounded-full">
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-6"
          />
          <ArrowRight
            aria-hidden
            className="absolute size-4 -translate-x-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-0"
          />
        </span>
      )}
    </>
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({ variant = "primary", arrow = true, className, children, ...props }: LinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { variant?: Variant; arrow?: boolean };

export function Button({ variant = "primary", arrow = true, className, children, ...props }: BtnProps) {
  return (
    <button className={cn(base, variants[variant], "disabled:opacity-60", className)} {...props}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
