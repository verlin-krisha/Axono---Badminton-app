"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/content/media";

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="introducing" className="section scroll-mt-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-mist">
            <motion.div className="absolute inset-[-8%]" style={{ y }}>
              <SmartImage
                src={images.intro.src}
                alt={images.intro.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[62%_50%]"
              />
            </motion.div>
          </div>
          <Reveal
            delay={0.3}
            className="absolute -bottom-6 left-6 w-[min(80%,280px)] rounded-2xl border border-line bg-white p-4 shadow-[0_24px_48px_-24px_rgba(11,23,38,0.35)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-flare-tint">
                <span className="size-2 rounded-full bg-flare" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Match saved</p>
                <p className="text-xs text-muted">Ground 2 · Sunday, 9:00 AM</p>
              </div>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-mist">
              <motion.div
                className="h-full rounded-full bg-brand"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </Reveal>
        </div>

        <div>
          <SectionHeader
            eyebrow="Introducing Axono"
            title={["Every game has a story.", <span key="k" className="text-brand">Now you can keep it.</span>]}
            lead="From weekend games with friends to competitive matchups, Axono makes it easy to capture and relive your sporting moments. No complicated setup. No missed moments. Just play, scan and replay."
          />
        </div>
      </div>
    </section>
  );
}
