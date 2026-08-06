import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Stage } from "@/components/home/stage";
import { StageDiscover } from "@/components/home/stage-discover";
import { StageChoose } from "@/components/home/stage-choose";
import { StageVisit } from "@/components/home/stage-visit";
import { StageSettle } from "@/components/home/stage-settle";
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
      <Stage index="1.0" label="Discover" title="A connected environment, not just a lease.">
        <StageDiscover />
      </Stage>
      <Stage index="2.0" label="Choose" title="Built around ambitious teams, not just tenants.">
        <StageChoose />
      </Stage>
      <Stage index="3.0" label="Visit" title="A workplace experience worth arriving at.">
        <StageVisit />
      </Stage>
      <Stage index="4.0" label="Settle" title="Positioned in Midrand, between Johannesburg and Pretoria.">
        <StageSettle />
      </Stage>
      <FinalCta />
    </>
  );
}
