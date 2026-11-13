import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="pb-24 pt-14 md:pb-32 md:pt-20">
      <div className="container-x max-w-4xl">
        <p className="eyebrow">Legal</p>
        <h1 className="h-hero mt-4 text-ink">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
        <div className="mt-8 rounded-2xl border border-flare/30 bg-flare-tint p-5 text-sm text-ink-soft">
          This is a draft summary to be reviewed and finalised by Axono&apos;s legal advisers before launch.
        </div>
        <div className="mt-12 space-y-10 text-ink-soft [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_p]:mt-3 [&_p]:leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
