import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SpacesExplorer } from "@/components/spaces/SpacesExplorer";

export const metadata: Metadata = {
  title: "Available spaces",
  description: "Browse office suites, full floors and flexible desks to lease in Midpoint Tech's technology precinct, Midrand.",
  alternates: { canonical: "/spaces" },
};

export default function SpacesPage() {
  return (
    <Section tone="stone" className="pt-14">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Spaces" }]} />
        <div className="mt-8 max-w-2xl">
          <Eyebrow>Availability</Eyebrow>
          <h1 className="mt-4 text-step-4 font-display font-semibold text-ink-900">Spaces to lease</h1>
          <p className="mt-4 text-lg text-ink-700">
            Every space below sits within Midpoint Tech&rsquo;s technology-forward precinct — filter by type,
            size and availability to find the right footprint for your team. Rental rates are available on
            request from the leasing team.
          </p>
        </div>
        <div className="mt-12">
          <Suspense fallback={<p className="text-ink-700">Loading spaces…</p>}>
            <SpacesExplorer />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
