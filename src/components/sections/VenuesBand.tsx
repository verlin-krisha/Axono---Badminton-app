"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/content/media";
import { venueBenefits, venueTypes } from "@/content/venues";

/** Brand-blue partnership band (homepage + sport pages). */
export function VenuesBand({ cta = true }: { cta?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="px-2 sm:px-3">
      <div ref={ref} className="relative overflow-hidden rounded-[22px] bg-brand text-white sm:rounded-[28px]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[340px] overflow-hidden lg:min-h-[600px]">
            <motion.div className="absolute inset-[-8%]" style={{ y }}>
              <SmartImage src={images.badminton2.src} alt={images.badminton2.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-brand/40" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-5 sm:p-8">
              {venueTypes.map((v) => (
                <span key={v} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-14 lg:py-20">
            <SectionHeader
              dark
              eyebrow="For sports venues"
              title={["Bring your venue into the game."]}
              lead="Give your customers an experience worth coming back for. With Axono, sports venues can offer automated match recording and convenient video access, making every booking more memorable."
            />
            <ul className="mt-8 space-y-3">
              {venueBenefits.map((b, i) => (
                <Reveal as="li" key={b} delay={0.05 * i} className="flex items-start gap-3 border-b border-white/15 pb-3 text-[15px]">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-flare">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium">{b}</span>
                </Reveal>
              ))}
            </ul>
            {cta && (
              <Reveal delay={0.2} className="mt-8">
                <ButtonLink href="/venues" variant="light">
                  Axono for venues
                </ButtonLink>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
