"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { SmartImage } from "@/components/media/SmartImage";
import { TextReveal } from "@/components/ui/Reveal";
import type { ImageAsset, VideoAsset } from "@/content/media";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  lines: ReactNode[];
  text?: string;
  image: ImageAsset;
  video?: VideoAsset;
  children?: ReactNode;
  variant?: "cinematic" | "split";
  overlay?: ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function PageHero({ eyebrow, lines, text, image, video, children, variant = "split", overlay }: Props) {
  if (variant === "cinematic") {
    return (
      <section className="px-2 pb-2 sm:px-3 sm:pb-3">
        <div className="relative flex min-h-[540px] items-end overflow-hidden rounded-[22px] bg-ink sm:rounded-[28px] md:h-[calc(80svh-72px)]">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease }}
          >
            {video ? (
              <BackgroundVideo video={video} alt={image.alt} priority playOnMobile />
            ) : (
              <SmartImage src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
          {overlay}
          <div className="relative z-10 w-full px-6 pb-10 pt-32 sm:px-10 md:pb-14 lg:px-14">
            <Head eyebrow={eyebrow} lines={lines} text={text} dark>
              {children}
            </Head>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-10 pt-14 md:pt-20">
      <div className="container-x">
        <Head eyebrow={eyebrow} lines={lines} text={text}>
          {children}
        </Head>
      </div>
      <div className="mt-12 px-2 sm:px-3 md:mt-16">
        <motion.div
          className="relative h-[46vh] min-h-[320px] overflow-hidden rounded-[22px] bg-mist sm:rounded-[28px] md:h-[62vh]"
          initial={{ clipPath: "inset(8% 6% 0% 6% round 28px)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
          transition={{ duration: 1.4, ease, delay: 0.2 }}
        >
          <motion.div className="absolute inset-0" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2, ease }}>
            {video ? (
              <BackgroundVideo video={video} alt={image.alt} priority />
            ) : (
              <SmartImage src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
            )}
          </motion.div>
          {overlay}
        </motion.div>
      </div>
    </section>
  );
}

function Head({
  eyebrow,
  lines,
  text,
  children,
  dark = false,
}: {
  eyebrow: string;
  lines: ReactNode[];
  text?: string;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div className="lg:col-span-7">
        <motion.p
          className={cn("eyebrow", dark && "!text-white/80")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {eyebrow}
        </motion.p>
        <h1 className={cn("h-hero mt-4 max-w-3xl", dark ? "text-white" : "text-ink")}>
          <TextReveal animateOnMount delay={0.15} lines={lines} />
        </h1>
      </div>
      {(text || children) && (
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
        >
          {text && <p className={cn("text-base leading-relaxed md:text-lg", dark ? "text-white/85" : "text-ink-soft")}>{text}</p>}
          {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
        </motion.div>
      )}
    </div>
  );
}
