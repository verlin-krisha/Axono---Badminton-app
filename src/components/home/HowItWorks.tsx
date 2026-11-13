"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Camera, PlayCircle, QrCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PhoneMockup, type PhoneScreen } from "@/components/graphics/PhoneMockup";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/content/media";
import { cn } from "@/lib/cn";

const STEP_MS = 4500;

const steps: { key: PhoneScreen; title: string; text: string; icon: typeof Camera }[] = [
  { key: "record", title: "Play", text: "Enjoy your game while Axono automatically records the action.", icon: Camera },
  { key: "scan", title: "Scan", text: "When the game ends, scan the QR code at your court.", icon: QrCode },
  { key: "replay", title: "Relive", text: "Watch your match and download it to keep or share.", icon: PlayCircle },
];

/** Compact, single-screen "how it works": three steps beside one phone that walks through them. */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % steps.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active, running]);

  return (
    <section ref={ref} id="how-it-works" className="section scroll-mt-20 bg-mist">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-10">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <SectionHeader
            eyebrow="How it works"
            title={["Three simple steps.", <span key="h" className="text-brand">Your game, saved forever.</span>]}
            lead="Same for every sport. Nothing to set up, nothing to carry."
          />
        </div>

          <ol
            className="space-y-3 lg:col-start-1 lg:row-start-2 lg:self-start"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {steps.map((s, i) => {
              const on = i === active;
              const Icon = s.icon;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={cn(
                      "relative flex w-full items-start gap-4 overflow-hidden rounded-2xl p-5 text-left transition-all duration-500",
                      on ? "bg-white shadow-[0_18px_40px_-24px_rgba(11,23,38,0.35)]" : "hover:bg-white/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                        on ? "bg-brand text-white" : "bg-white text-brand",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold text-flare">0{i + 1}</span>
                        <span className={cn("font-display text-lg font-bold transition-colors", on ? "text-ink" : "text-ink-soft")}>
                          {s.title}
                        </span>
                      </span>
                      <span className={cn("mt-1 block text-[15px] leading-relaxed transition-colors", on ? "text-ink-soft" : "text-muted")}>
                        {s.text}
                      </span>
                    </span>
                    {on && (
                      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-line">
                        <motion.span
                          key={`${active}-${running}`}
                          className="block h-full origin-left bg-flare"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: running ? 1 : 0 }}
                          transition={{ duration: running ? STEP_MS / 1000 : 0.2, ease: "linear" }}
                        />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

        <div className="relative row-start-2 flex items-center justify-center py-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:py-0">
          <div className="absolute top-1/2 size-[min(80vw,440px)] -translate-y-1/2 rounded-full bg-brand-tint" aria-hidden />
          <div className="absolute top-1/2 size-[min(62vw,330px)] -translate-y-1/2 rounded-full border border-brand/15" aria-hidden />
          <PhoneMockup screen={steps[active].key} image={images.badminton1} className="relative max-w-[200px] sm:max-w-[240px] lg:max-w-[270px]" />
        </div>
      </div>
    </section>
  );
}
