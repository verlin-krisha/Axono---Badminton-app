import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { InstagramIcon, LinkedInIcon } from "@/components/layout/SocialIcons";
import { TextReveal, Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Axono — find an Axono-enabled venue, partner your venue, or ask us anything.",
};

const faqs = [
  {
    q: "Do I need to bring any equipment?",
    a: "No. Cameras are installed at participating venues. Just play your game as normal and scan the QR code at your court when you're done.",
  },
  {
    q: "How do I get my match recording?",
    a: "After your game, scan the QR code displayed at your court or playing area with your phone's camera. It takes you to your match recording, where you can watch and download it.",
  },
  {
    q: "Can I download and share my match?",
    a: "Yes. Download your recording to your phone and share it with your teammates, friends or coach.",
  },
  {
    q: "Which sports does Axono record?",
    a: "Badminton, turf cricket, turf football, pickleball and padel — with more sports to follow. The process is the same for every sport.",
  },
  {
    q: "Where can I play with Axono?",
    a: "Axono is available at participating sports venues. Send us a message and we'll point you to an Axono-enabled venue near you.",
  },
];

export default function ContactPage() {
  const channels = [
    { icon: Mail, label: "Email us", value: site.contactEmail, href: `mailto:${site.contactEmail}`, external: false },
    { icon: InstagramIcon, label: "Instagram", value: "Follow Axono", href: site.social.instagram, external: true },
    { icon: LinkedInIcon, label: "LinkedIn", value: "Connect with Axono", href: site.social.linkedin, external: true },
  ];

  return (
    <>
      <section className="pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Contact us</p>
            <h1 className="h-hero mt-4 text-ink">
              <TextReveal animateOnMount lines={["Let's talk", <span key="g" className="text-brand">about your game.</span>]} />
            </h1>
            <p className="lead mt-5">Looking for an Axono venue, want Axono at yours, or just have a question? We&apos;d love to hear from you.</p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Suspense>
                <ContactForm />
              </Suspense>
            </div>
            <aside className="lg:col-span-5">
              <ul className="divide-y divide-line border-y border-line">
                {channels.map(({ icon: Icon, label, value, href, external }, i) => (
                  <Reveal as="li" key={label} delay={i * 0.05}>
                    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-4 py-5">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-muted">{label}</span>
                        <span className="block truncate font-semibold text-ink">{value}</span>
                      </span>
                      <ArrowUpRight className="ml-auto size-5 shrink-0 text-muted transition-colors group-hover:text-flare" />
                    </a>
                  </Reveal>
                ))}
              </ul>
              <Reveal className="mt-8 rounded-[20px] bg-brand p-7 text-white">
                <p className="h-card">Run a sports venue?</p>
                <p className="mt-2 text-white/85">See how Axono can bring match recording to your courts and turfs.</p>
                <Link href="/venues" className="mt-5 inline-flex items-center gap-2 font-semibold hover:underline">
                  Axono for venues <ArrowUpRight className="size-4" />
                </Link>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Questions" title={["Good to know."]} lead="Quick answers to what players ask most." />
          </div>
          <div className="lg:col-span-7">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
