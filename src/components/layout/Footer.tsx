import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "./Logo";
import { InstagramIcon, LinkedInIcon } from "./SocialIcons";
import { mainNav, site } from "@/content/site";
import { sports } from "@/content/sports";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-mist">
      <div className="container-x pt-16 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
              Automated match recording for the sports you love. Play your game, scan the QR and relive every moment.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AXONO on Instagram"
                className="flex size-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AXONO on LinkedIn"
                className="flex size-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <LinkedInIcon className="size-[18px]" />
              </a>
              <a
                href={`mailto:${site.contactEmail}`}
                aria-label="Email AXONO"
                className="flex size-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Explore</p>
              <ul className="mt-5 space-y-3">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-ink-soft transition-colors hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Sports</p>
              <ul className="mt-5 space-y-3">
                {sports.map((s) => (
                  <li key={s.slug} className="text-ink-soft">
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Connect</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-brand">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-brand">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <Link href="/venues" className="text-ink-soft hover:text-brand">
                    For Venues
                  </Link>
                </li>
                <li>
                  <a href={`mailto:${site.contactEmail}`} className="break-all text-ink-soft hover:text-brand">
                    {site.contactEmail}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p className="display mt-16 select-none text-[10vw] text-ink/[0.08] lg:text-[6.5rem]" aria-hidden>
          Play. Capture. <span className="text-flare/30">Relive.</span>
        </p>

        <div className="flex flex-col gap-4 border-t border-ink/10 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 AXONO. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
