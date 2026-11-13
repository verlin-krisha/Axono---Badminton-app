"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { SmartImage } from "@/components/media/SmartImage";
import { CourtLines } from "@/components/graphics/CourtLines";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sports } from "@/content/sports";
import { cn } from "@/lib/cn";

/** Each sport gets its own light/colour treatment on top of the shared system. */
const treatments: Record<string, string> = {
  badminton: "from-ink/90 via-ink/30 to-brand/20",
  cricket: "from-ink/90 via-ink/25 to-flare/25",
  football: "from-ink/90 via-brand-deep/30 to-transparent",
  pickleball: "from-ink/90 via-ink/20 to-flare/15",
  padel: "from-ink/90 via-brand/25 to-brand/10",
};

export function SportsShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section id="sports" className="section scroll-mt-20" aria-labelledby="sports-heading">
      <div className="container-x mb-10 md:mb-14">
        <SectionHeader
          eyebrow="Sports we support"
          title={["One platform.", <span key="e" className="text-brand">Every sport.</span>]}
          lead="Badminton to padel, turf cricket to pickleball — the same simple way to capture and relive your game."
        />
      </div>

      {/* Desktop: expanding panels */}
      <div className="container-x hidden lg:block">
        <div className="flex h-[min(70vh,620px)] gap-3">
          {sports.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                type="button"
                key={s.slug}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`${s.name} — ${s.tagline}`}
                className={cn(
                  "group relative overflow-hidden rounded-[20px] bg-ink text-left transition-[flex-grow] duration-700 ease-out-expo",
                  isActive ? "grow-[4]" : "grow",
                )}
                style={{ flexBasis: 0 }}
              >
                <div className={cn("absolute inset-0 transition-transform duration-[1400ms] ease-out-expo", isActive ? "scale-100" : "scale-110")}>
                  <BackgroundVideo video={s.video} alt={s.image.alt} active={isActive} sizes="60vw" deferUntilActive />
                </div>
                <div className={cn("absolute inset-0 bg-gradient-to-t", treatments[s.slug])} />
                <div className={cn("absolute inset-0 bg-ink/45 transition-opacity duration-700", isActive ? "opacity-0" : "opacity-100")} />
                <CourtLines
                  sport={s.slug}
                  className={cn("absolute right-6 top-6 w-32 text-white transition-opacity duration-700", isActive ? "opacity-60" : "opacity-0")}
                />

                {/* Collapsed label */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-between py-7 text-white transition-opacity duration-500",
                    isActive ? "opacity-0" : "opacity-100 delay-200",
                  )}
                >
                  <span className="text-xs font-semibold text-white/70">{s.index}</span>
                  <span className="rotate-180 whitespace-nowrap font-display text-lg font-bold tracking-tight [writing-mode:vertical-rl]">
                    {s.name}
                  </span>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-x-0 bottom-0 p-8 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <span className="text-sm font-semibold text-flare">{s.index} / 05</span>
                      <h3 className="h-section mt-2 !text-4xl">{s.name}</h3>
                      <p className="mt-3 max-w-md text-white/85">{s.tagline}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile / tablet: swipeable rail */}
      <div className="lg:hidden">
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-8">
          {sports.map((s) => (
            <li key={s.slug} className="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-[20px] bg-ink sm:w-[46%]">
              <SmartImage src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 640px) 46vw, 78vw" className="object-cover" />
              <div className={cn("absolute inset-0 bg-gradient-to-t", treatments[s.slug])} />
              <CourtLines sport={s.slug} className="absolute right-4 top-4 w-20 text-white/60" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="text-xs font-semibold text-flare">{s.index}</span>
                <h3 className="h-card mt-1">{s.name}</h3>
                <p className="mt-1.5 text-sm text-white/85">{s.tagline}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
