"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * next/image wrapper with a branded fallback. If a media file is missing or
 * fails to load, a clean AXONO-blue gradient is shown instead of a broken icon.
 */
export function SmartImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,#4c9bd4_0%,#2b7db8_40%,#123f63_100%)]",
          className,
        )}
      />
    );
  }
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
