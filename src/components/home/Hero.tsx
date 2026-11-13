"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/Reveal";
import { sports } from "@/content/sports";
import { cn } from "@/lib/cn";

const SLIDE_MS = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const sport = sports[index];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % sports.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <section aria-label="Introduction" className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="relative h-[calc(100svh-72px-8px)] min-h-[620px] overflow-hidden rounded-[22px] bg-ink sm:h-[calc(100svh-72px-12px)] sm:rounded-[28px]">
        {/* Cinematic cross-fade between sports */}
        <AnimatePresence initial={false}>
          <motion.div
            key={sport.slug}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease: [0.65, 0, 0.35, 1] }, scale: { duration: 7, ease: "linear" } }}
          >
            <BackgroundVideo video={sport.video} alt={sport.image.alt} priority={index === 0} eagerPoster playOnMobile />
          </motion.div>
        </AnimatePresence>

        {/* Readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" />

        {/* Viewfinder framing */}
        <Viewfinder sportName={sport.name} />

        {/* Copy */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-28 sm:px-10 sm:pb-32 lg:px-14 lg:pb-14 lg:pr-[380px]">
          <motion.p
            className="eyebrow !text-white/80"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Automated match recording
          </motion.p>
          <h1 className="h-hero mt-5 max-w-[16ch] text-white">
            <TextReveal
              animateOnMount
              delay={0.25}
              lines={[
                "Play the game.",
                <>
                  <span className="text-flare">Relive</span> the moment.
                </>,
              ]}
            />
          </h1>
          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            Your game deserves more than just memories. Capture your matches, scan the QR and relive every moment with
            Axono.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ButtonLink href="#introducing" variant="flare">
              Explore Axono
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="ghost-light" arrow={false}>
              How It Works
            </ButtonLink>
          </motion.div>
        </div>

        {/* Sport selector with progress */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 lg:inset-x-auto lg:bottom-14 lg:right-14 lg:w-[280px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ul className="flex gap-1 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:px-10 lg:flex-col lg:gap-0 lg:overflow-visible lg:p-0">
            {sports.map((s, i) => (
              <li key={s.slug} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${s.name}`}
                  aria-pressed={i === index}
                  className={cn(
                    "group relative flex min-h-11 w-full items-center gap-3 px-3 py-2 text-left text-sm font-semibold transition-colors lg:border-t lg:border-white/15 lg:px-0 lg:py-3",
                    i === index ? "text-white" : "text-white/50 hover:text-white/80",
                  )}
                >
                  <span className="hidden font-mono text-xs text-white/50 lg:inline">{s.index}</span>
                  <span className="whitespace-nowrap uppercase tracking-wider">{s.name}</span>
                  <span className="absolute inset-x-3 bottom-0 h-[2px] overflow-hidden bg-white/15 lg:inset-x-0 lg:top-[-1px] lg:bottom-auto">
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="block h-full origin-left bg-flare"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        transition={{ duration: paused ? 0.2 : SLIDE_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Scroll cue */}
        <a
          href="#introducing"
          aria-label="Scroll to learn more"
          className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 lg:flex"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-white/25">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-white"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            />
          </span>
        </a>
      </div>
    </section>
  );
}

function Viewfinder({ sportName }: { sportName: string }) {
  const corners = [
    "left-4 top-4 border-l-2 border-t-2 sm:left-6 sm:top-6",
    "right-4 top-4 border-r-2 border-t-2 sm:right-6 sm:top-6",
    "left-4 bottom-4 border-b-2 border-l-2 sm:left-6 sm:bottom-6",
    "right-4 bottom-4 border-b-2 border-r-2 sm:right-6 sm:bottom-6",
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
      {corners.map((c) => (
        <span key={c} className={cn("absolute size-6 border-white/60 sm:size-8", c)} />
      ))}
      <div className="absolute left-8 top-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white sm:left-12 sm:top-11">
        <span className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
          <span className="size-2 animate-rec rounded-full bg-red-500" />
          Rec
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={sportName}
            className="hidden sm:inline"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
          >
            {sportName}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="absolute right-8 top-9 hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:right-12 sm:top-12 sm:block">
        Auto-recording
      </span>
    </div>
  );
}
