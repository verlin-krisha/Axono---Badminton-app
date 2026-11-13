"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoAsset } from "@/content/media";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/cn";

type Props = {
  video: VideoAsset;
  alt: string;
  className?: string;
  /** Hero usage: loads immediately and marks the poster as priority. */
  priority?: boolean;
  /** Play/pause control (e.g. hero carousel, hover tiles). Defaults to playing. */
  active?: boolean;
  /** By default phones get the poster only, to save data. */
  playOnMobile?: boolean;
  sizes?: string;
  /** Don't download the video until `active` has been true at least once (hover tiles). */
  deferUntilActive?: boolean;
  /** Load the poster immediately (e.g. hero slides that appear without scrolling). */
  eagerPoster?: boolean;
};

/**
 * Muted, looping, inline background video with a poster underneath.
 * - Lazy: the video source is only attached when near the viewport.
 * - Poster-only on reduced-motion, data-saver and (by default) small screens.
 * - Any load/playback error silently falls back to the poster image.
 */
export function BackgroundVideo({
  video,
  alt,
  className,
  priority = false,
  active = true,
  playOnMobile = false,
  sizes = "100vw",
  deferUntilActive = false,
  eagerPoster = false,
}: Props) {
  const [wasActive, setWasActive] = useState(active);
  useEffect(() => {
    if (active) setWasActive(true);
  }, [active]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [near, setNear] = useState(priority);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Decide once on the client whether video is appropriate for this device.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const saveData = nav.connection?.saveData === true;
    const small = window.matchMedia("(max-width: 767px)").matches;
    setAllowed(!reduce && !saveData && (playOnMobile || !small));
  }, [playOnMobile]);

  // Attach the source only when close to the viewport.
  useEffect(() => {
    if (near || !wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [near]);

  // Play / pause with the `active` flag.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) {
      el.play().catch(() => {
        /* Autoplay blocked — poster stays visible. */
      });
    } else {
      el.pause();
    }
  }, [active, ready, near, allowed, wasActive]);

  const showVideo = !!video.mp4 && allowed && near && !failed && (!deferUntilActive || wasActive);
  // No clip for this sport: give the still a slow cinematic zoom so it still feels alive.
  const kenBurns = !video.mp4 && active;

  return (
    <div ref={wrapRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <SmartImage
        src={video.poster}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : eagerPoster ? "eager" : "lazy"}
        sizes={sizes}
        className={cn("object-cover", kenBurns && "animate-kenburns motion-reduce:animate-none")}
      />
      {showVideo && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
          muted
          loop
          playsInline
          autoPlay={active}
          preload={priority ? "auto" : "metadata"}
          poster={video.poster}
          aria-hidden
          onCanPlay={(e) => {
            setReady(true);
            if (active) e.currentTarget.play().catch(() => {});
          }}
          onError={() => setFailed(true)}
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" onError={() => setFailed(true)} />}
        </video>
      )}
    </div>
  );
}
