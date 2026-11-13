/** Tiny className joiner (no runtime dependency needed). */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
