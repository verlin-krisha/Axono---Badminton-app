import { cn } from "@/lib/cn";

const SIZE = 25;

/** Deterministic pseudo-random generator so server and client render identically. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function inFinder(x: number, y: number) {
  const zones = [
    [0, 0],
    [SIZE - 7, 0],
    [0, SIZE - 7],
  ];
  return zones.some(([zx, zy]) => x >= zx - 1 && x <= zx + 7 && y >= zy - 1 && y <= zy + 7);
}

const cells: [number, number][] = (() => {
  const rand = mulberry32(2026);
  const out: [number, number][] = [];
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++) {
      if (inFinder(x, y)) continue;
      // keep a quiet zone in the centre for the AXONO mark
      if (x >= 9 && x <= 15 && y >= 9 && y <= 15) continue;
      if (rand() > 0.52) out.push([x, y]);
    }
  return out;
})();

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x + 0.5} y={y + 0.5} width={6} height={6} rx={1.4} fill="none" stroke="currentColor" strokeWidth={1} />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.6} fill="currentColor" />
    </g>
  );
}

/**
 * Decorative QR-style graphic (not a scannable code).
 * The centre carries the AXONO replay arrow in brand orange.
 */
export function QrPattern({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={cn("text-ink", className)} aria-hidden shapeRendering="crispEdges">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width={0.84} height={0.84} rx={0.2} fill="currentColor" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={SIZE - 7} y={0} />
      <Finder x={0} y={SIZE - 7} />
      <g transform="translate(9.4 9.4)" shapeRendering="geometricPrecision">
        <rect width={6.2} height={6.2} rx={1.4} fill="#fff" />
        <path d="M1.2 4.6 C2.6 4.3 3.6 3.6 4.4 2.4" stroke="#f07d1a" strokeWidth={0.75} fill="none" strokeLinecap="round" />
        <path d="M3.4 1.8 L5 1.5 L4.7 3.1 Z" fill="#f07d1a" />
      </g>
    </svg>
  );
}
