import type { Metadata } from "next";
import { Suspense } from "react";
import { BadgeCheck, CalendarCheck, Camera, QrCode, Sparkles, TrendingUp, Users } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/content/media";
import { venueTypes } from "@/content/venues";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "For Venues",
  description:
    "Partner with Axono to offer automated match recording at your badminton, cricket, football, pickleball or padel venue — a memorable experience that keeps players coming back.",
};

const benefits = [
  { icon: Sparkles, t: "Enhance customer experience", d: "Every booking comes with something to take home: the match itself." },
  { icon: CalendarCheck, t: "An additional service", d: "Offer match recording alongside your courts and turfs." },
  { icon: Users, t: "Increase player engagement", d: "Players watch, share and talk about their games — and come back for the next one." },
  { icon: TrendingUp, t: "Differentiate your venue", d: "Stand out from venues that only rent out a court." },
  { icon: Camera, t: "Smart recording technology", d: "Automated recording at your facility, without staff running cameras." },
  { icon: QrCode, t: "Effortless for players", d: "A QR code at each court is all your customers need." },
];

const process = [
  { t: "Talk to us", d: "Tell us about your venue, your courts and the sports you host." },
  { t: "Plan your setup", d: "We work out the right recording setup for each playing area." },
  { t: "Go live", d: "Cameras are installed and QR codes are placed at every court." },
  { t: "Players replay", d: "Your customers play, scan and relive their matches." },
];

export default function VenuesPage() {
  return (
    <>
      <PageHero
        variant="cinematic"
        eyebrow="For sports venues"
        lines={["Bring your venue", <span key="g" className="text-flare">into the game.</span>]}
        text="Give your customers an experience worth coming back for. With Axono, sports venues can offer automated match recording and convenient video access, making every booking more memorable."
        image={images.venue}
      />

      {/* Benefits */}
      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow="Why partner"
            title={["Every booking,", <span key="m" className="text-brand">more memorable.</span>]}
            lead="Players remember the venue where they hit that shot — especially when they can watch it again."
          />
          <ul className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {benefits.map(({ icon: Icon, t, d }, i) => (
              <Reveal as="li" key={t} delay={(i % 3) * 0.07} className="border-b border-r border-line p-7 md:p-8">
                <Icon className="size-6 text-flare" strokeWidth={1.8} />
                <h3 className="mt-6 text-lg font-bold text-ink">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Built for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {venueTypes.map((v) => (
                <li key={v} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft">
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-mist">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="How partnering works"
              title={["Simple for you.", <span key="p" className="text-brand">Simple for players.</span>]}
            />
            <ol className="mt-10">
              {process.map((p, i) => (
                <Reveal as="li" key={p.t} delay={i * 0.06} className="flex gap-5 border-t border-line py-5 last:border-b">
                  <span className="font-display text-lg font-bold text-flare">0{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-ink">{p.t}</h3>
                    <p className="mt-1 text-muted">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-ink lg:aspect-auto lg:h-full lg:min-h-[480px]">
            <SmartImage src={images.football1.src} alt={images.football1.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Partner form */}
      <section id="partner" className="section scroll-mt-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Partner with Axono"
              title={["Let's bring replays", <span key="r" className="text-brand">to your courts.</span>]}
              lead="Tell us a little about your venue and we'll be in touch to talk it through."
            />
            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-3 text-ink-soft">
                {["No obligation conversation", "Setup tailored to your courts", "Support for every sport you host"].map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <BadgeCheck className="size-5 text-brand" /> {x}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted">
                Prefer email?{" "}
                <a href={`mailto:${site.partnershipsEmail}`} className="font-semibold text-brand hover:underline">
                  {site.partnershipsEmail}
                </a>
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Suspense>
              <ContactForm venueOnly />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
