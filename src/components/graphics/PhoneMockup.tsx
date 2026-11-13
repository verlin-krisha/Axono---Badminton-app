"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Pause, Play, ScanLine, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import type { ImageAsset } from "@/content/media";
import { QrPattern } from "./QrPattern";
import { cn } from "@/lib/cn";

export type PhoneScreen = "record" | "scan" | "replay";

type Props = {
  screen: PhoneScreen;
  image: ImageAsset;
  label?: string;
  className?: string;
};

/** A stylised phone that walks through the AXONO journey: record → scan → replay. */
export function PhoneMockup({ screen, image, label = "Court 3 · Badminton", className }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-full max-w-[300px] rounded-[2.6rem] bg-ink p-[10px] shadow-[0_40px_80px_-30px_rgba(11,23,38,0.55)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-white">
        <div className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {screen === "record" && <RecordScreen image={image} label={label} />}
            {screen === "scan" && <ScanScreen />}
            {screen === "replay" && <ReplayScreen image={image} label={label} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function useTicker(start: number) {
  const [t, setT] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(t / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function RecordScreen({ image, label }: { image: ImageAsset; label: string }) {
  const time = useTicker(23 * 60 + 41);
  return (
    <div className="absolute inset-0 bg-ink">
      <SmartImage src={image.src} alt={image.alt} fill sizes="300px" className="object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/80" />
      <div className="absolute left-4 right-4 top-10 flex items-center justify-between text-[11px] font-semibold text-white">
        <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1">
          <span className="size-1.5 animate-rec rounded-full bg-white" /> REC
        </span>
        <span className="rounded-full bg-black/40 px-2.5 py-1 tabular-nums">{time}</span>
      </div>
      <div className="absolute bottom-6 left-4 right-4 text-white">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Live on court</p>
        <p className="mt-1 text-sm font-semibold">{label}</p>
        <p className="mt-1 text-[11px] text-white/70">Recording automatically — just play.</p>
      </div>
    </div>
  );
}

function ScanScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f1a27] px-6">
      <p className="absolute top-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Scan to get your match</p>
      <div className="relative aspect-square w-[78%] rounded-2xl bg-white p-4">
        <QrPattern className="h-full w-full" />
        {!done && (
          <motion.span
            className="absolute inset-x-3 h-0.5 rounded-full bg-flare shadow-[0_0_14px_2px_rgba(240,125,26,0.7)]"
            initial={{ top: "6%" }}
            animate={{ top: ["6%", "94%", "6%"] }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          />
        )}
        {(["left-0 top-0 border-l-[3px] border-t-[3px]", "right-0 top-0 border-r-[3px] border-t-[3px]", "left-0 bottom-0 border-b-[3px] border-l-[3px]", "right-0 bottom-0 border-b-[3px] border-r-[3px]"] as const).map(
          (pos) => (
            <span key={pos} className={cn("absolute size-7 rounded-md border-brand", pos)} style={{ margin: -6 }} />
          ),
        )}
      </div>
      <div className="absolute bottom-8 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white">
        {done ? (
          <>
            <Check className="size-4 text-flare" /> Match found
          </>
        ) : (
          <>
            <ScanLine className="size-4" /> Scanning…
          </>
        )}
      </div>
    </div>
  );
}

function ReplayScreen({ image, label }: { image: ImageAsset; label: string }) {
  const [playing, setPlaying] = useState(true);
  const [dl, setDl] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDl((v) => (v >= 100 ? 100 : v + 4)), 90);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 flex flex-col bg-mist">
      <div className="px-4 pb-3 pt-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">Your match</p>
        <p className="mt-0.5 text-sm font-bold text-ink">{label}</p>
      </div>
      <div className="relative mx-3 aspect-video overflow-hidden rounded-xl bg-ink">
        <SmartImage src={image.src} alt={image.alt} fill sizes="300px" className="object-cover" />
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause preview" : "Play preview"}
          className="absolute inset-0 m-auto flex size-10 items-center justify-center rounded-full bg-white/90 text-ink"
        >
          {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
        </button>
        <div className="absolute inset-x-2 bottom-2 h-1 overflow-hidden rounded-full bg-white/30">
          <motion.div
            className="h-full bg-flare"
            initial={{ width: "8%" }}
            animate={{ width: playing ? "92%" : undefined }}
            transition={{ duration: 14, ease: "linear" }}
          />
        </div>
      </div>
      <div className="mx-3 mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative aspect-video overflow-hidden rounded-md bg-ink/80">
            <SmartImage
              src={image.src}
              alt=""
              fill
              sizes="100px"
              className="object-cover opacity-80"
              style={{ objectPosition: `${20 + i * 30}% 50%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-auto p-3">
        <div className="relative flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full bg-brand text-xs font-semibold text-white">
          <span className="absolute inset-y-0 left-0 bg-brand-deep transition-[width] duration-150" style={{ width: `${dl}%` }} />
          <span className="relative flex items-center gap-2">
            {dl < 100 ? (
              <>
                <Download className="size-4" /> Downloading {dl}%
              </>
            ) : (
              <>
                <Check className="size-4" /> Saved to your phone
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
