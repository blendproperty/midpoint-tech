import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Positioning } from "@/components/home/positioning";
import { AvailabilityPreview } from "@/components/home/availability-preview";
import { Ecosystem } from "@/components/home/ecosystem";
import { ExperienceTeaser } from "@/components/home/experience-teaser";
import { LocationTeaser } from "@/components/home/location-teaser";
import { SocialProof } from "@/components/home/social-proof";
import { FinalCta } from "@/components/home/final-cta";
import { buildMetadata, placeJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Office space for technology companies in Midrand",
  description:
    "Midpoint Tech is a connected business environment for startups, scale-ups and established technology teams at 300 Janadel Avenue, Midrand, Gauteng.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd()) }}
      />
      <Hero />
      <Positioning />
      <AvailabilityPreview />
      <Ecosystem />
      <ExperienceTeaser />
      <LocationTeaser />
      <SocialProof />
      <FinalCta />
    </>
  );
}
