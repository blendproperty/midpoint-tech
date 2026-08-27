import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectorMarquee } from "@/components/sections/SectorMarquee";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Positioning } from "@/components/sections/Positioning";
import { CampusExplorer } from "@/components/sections/CampusExplorer";
import { AvailabilityPreview } from "@/components/sections/AvailabilityPreview";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { ExperienceTeaser } from "@/components/sections/ExperienceTeaser";
import { LocationTeaser } from "@/components/sections/LocationTeaser";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCta } from "@/components/sections/FinalCta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectorMarquee />
      <BrandStatement />
      <Positioning />
      <CampusExplorer />
      <AvailabilityPreview />
      <Ecosystem />
      <ExperienceTeaser />
      <LocationTeaser />
      <SocialProof />
      <FinalCta />
    </>
  );
}
