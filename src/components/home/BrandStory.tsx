"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/content/media";

const story =
  "Sport is about more than the score. It's the friends you play with every week, the rivalries that get serious, the shot you still can't believe you pulled off. Those are the moments players wish they could watch again. Axono exists to make them accessible — so the game ends, but the memories don't.";

const next = ["Automatic highlights", "Smarter match insights", "More sports"];

/** The "About" section of the home page. */
export function BrandStory() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 85%", "end 50%"] });

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const yA = useTransform(imgProgress, [0, 1], ["8%", "-8%"]);
  const yB = useTransform(imgProgress, [0, 1], ["-4%", "10%"]);

  const words = story.split(" ");

  return (
    <section id="about" className="section scroll-mt-20 overflow-hidden">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            eyebrow="About Axono"
            title={["We capture more than games.", <span key="m" className="text-flare">We capture moments.</span>]}
          />
          <p ref={textRef} className="mt-6 text-lg leading-relaxed md:text-xl">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </p>
          <Reveal delay={0.1} className="mt-8 border-t border-line pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Coming next</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {next.map((n) => (
                <li key={n} className="rounded-full bg-brand-tint px-3.5 py-1.5 text-sm font-medium text-brand">
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div ref={imgRef} className="relative h-[400px] lg:h-[520px]">
          <motion.div className="absolute left-0 top-0 h-[72%] w-[74%] overflow-hidden rounded-[20px] bg-mist" style={{ y: yA }}>
            <SmartImage src={images.friends.src} alt={images.friends.alt} fill sizes="(min-width:1024px) 34vw, 74vw" className="object-cover object-[65%_50%]" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-0 h-[54%] w-[56%] overflow-hidden rounded-[20px] border-[6px] border-white bg-mist shadow-xl"
            style={{ y: yB }}
          >
            <SmartImage src={images.celebration.src} alt={images.celebration.alt} fill sizes="(min-width:1024px) 26vw, 56vw" className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="text-ink">
        {children}
      </motion.span>{" "}
    </>
  );
}
