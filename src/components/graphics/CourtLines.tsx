import type { SportSlug } from "@/content/sports";
import { cn } from "@/lib/cn";

/**
 * Minimal top-down court / pitch line drawings — one per sport.
 * Used as a subtle overlay so each sport gets its own visual signature
 * while staying inside the AXONO system.
 */
export function CourtLines({ sport, className }: { sport: SportSlug; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.6}
      vectorEffect="non-scaling-stroke"
      className={cn("pointer-events-none", className)}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {paths[sport]}
    </svg>
  );
}

const paths: Record<SportSlug, React.ReactNode> = {
  badminton: (
    <g>
      <rect x="10" y="10" width="180" height="80" />
      <line x1="10" y1="16" x2="190" y2="16" />
      <line x1="10" y1="84" x2="190" y2="84" />
      <line x1="100" y1="6" x2="100" y2="94" strokeDasharray="1.5 1.5" />
      <line x1="76" y1="10" x2="76" y2="90" />
      <line x1="124" y1="10" x2="124" y2="90" />
      <line x1="20" y1="10" x2="20" y2="90" />
      <line x1="180" y1="10" x2="180" y2="90" />
      <line x1="10" y1="50" x2="76" y2="50" />
      <line x1="124" y1="50" x2="190" y2="50" />
    </g>
  ),
  cricket: (
    <g>
      <ellipse cx="100" cy="50" rx="94" ry="46" />
      <ellipse cx="100" cy="50" rx="46" ry="26" strokeDasharray="2 2" />
      <rect x="70" y="45" width="60" height="10" />
      <line x1="76" y1="43" x2="76" y2="57" />
      <line x1="124" y1="43" x2="124" y2="57" />
      <line x1="72" y1="48.5" x2="72" y2="51.5" strokeWidth={1.2} />
      <line x1="128" y1="48.5" x2="128" y2="51.5" strokeWidth={1.2} />
    </g>
  ),
  football: (
    <g>
      <rect x="6" y="6" width="188" height="88" />
      <line x1="100" y1="6" x2="100" y2="94" />
      <circle cx="100" cy="50" r="13" />
      <circle cx="100" cy="50" r="0.8" fill="currentColor" />
      <rect x="6" y="28" width="26" height="44" />
      <rect x="168" y="28" width="26" height="44" />
      <rect x="6" y="40" width="9" height="20" />
      <rect x="185" y="40" width="9" height="20" />
      <path d="M32 42 A10 10 0 0 1 32 58" />
      <path d="M168 42 A10 10 0 0 0 168 58" />
    </g>
  ),
  pickleball: (
    <g>
      <rect x="20" y="14" width="160" height="72" />
      <line x1="100" y1="8" x2="100" y2="92" strokeDasharray="1.5 1.5" />
      <line x1="76" y1="14" x2="76" y2="86" />
      <line x1="124" y1="14" x2="124" y2="86" />
      <line x1="20" y1="50" x2="76" y2="50" />
      <line x1="124" y1="50" x2="180" y2="50" />
      <rect x="76" y="14" width="48" height="72" fill="currentColor" fillOpacity={0.05} stroke="none" />
    </g>
  ),
  padel: (
    <g>
      <rect x="14" y="12" width="172" height="76" />
      <rect x="9" y="7" width="182" height="86" strokeDasharray="4 2" />
      <line x1="100" y1="7" x2="100" y2="93" strokeDasharray="1.5 1.5" />
      <line x1="54" y1="12" x2="54" y2="88" />
      <line x1="146" y1="12" x2="146" y2="88" />
      <line x1="54" y1="50" x2="146" y2="50" />
    </g>
  ),
};
