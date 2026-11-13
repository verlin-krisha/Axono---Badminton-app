import { Hero } from "@/components/home/Hero";
import { SportsMarquee } from "@/components/home/SportsMarquee";
import { Intro } from "@/components/home/Intro";
import { SportsShowcase } from "@/components/home/SportsShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyAxono } from "@/components/home/WhyAxono";
import { BrandStory } from "@/components/home/BrandStory";
import { VenuesBand } from "@/components/sections/VenuesBand";
import { FinalCta } from "@/components/sections/FinalCta";

/** Home holds Sports (#sports), How It Works (#how-it-works) and About (#about). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SportsMarquee />
      <Intro />
      <SportsShowcase />
      <HowItWorks />
      <WhyAxono />
      <BrandStory />
      <VenuesBand />
      <FinalCta />
    </>
  );
}
