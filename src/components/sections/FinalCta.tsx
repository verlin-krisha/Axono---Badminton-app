import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { images, videos } from "@/content/media";

export function FinalCta() {
  return (
    <section className="px-2 py-2 sm:px-3 sm:py-3">
      <div className="relative flex min-h-[520px] items-end overflow-hidden rounded-[22px] bg-ink sm:rounded-[28px] md:min-h-[72vh]">
        <BackgroundVideo video={{ ...videos.football, poster: images.celebration.src }} alt={images.celebration.alt} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="container-x relative z-10 pb-12 md:pb-16">
          <h2 className="h-hero max-w-3xl text-white">
            <TextReveal lines={["Your next game", <span key="r" className="text-flare">deserves a replay.</span>]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-lg text-base text-white/80 md:text-lg">
              Play your favourite sport. Capture every moment. Relive it with Axono.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/#sports" variant="flare">
              Explore Sports
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost-light">
              Contact Us
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
