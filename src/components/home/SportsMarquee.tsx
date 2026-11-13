import { sports } from "@/content/sports";

/** Endless ticker of supported sports — a quick multi-sport signal under the hero. */
export function SportsMarquee() {
  const items = [...sports.map((s) => s.name), "Every Game Deserves a Replay"];
  return (
    <div className="overflow-hidden border-y border-line bg-white py-5" aria-label={`Supported sports: ${sports.map((s) => s.name).join(", ")}`}>
      <div className="flex w-max animate-marquee motion-reduce:animate-none" aria-hidden>
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center">
            {items.concat(items).map((name, i) => (
              <li key={`${dup}-${i}`} className="display flex items-center whitespace-nowrap text-lg text-ink md:text-xl">
                <span className={i % items.length === items.length - 1 ? "text-brand" : undefined}>{name}</span>
                <span className="mx-7 inline-block size-2 rotate-45 bg-flare md:mx-9" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
