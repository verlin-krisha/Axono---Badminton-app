import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" aria-label="AXONO — home" className={cn("inline-flex shrink-0", className)} onClick={onClick}>
      <Image
        src="/brand/axono-logo.png"
        alt="AXONO"
        width={1600}
        height={400}
        priority
        className="h-7 w-auto md:h-8"
      />
    </Link>
  );
}
