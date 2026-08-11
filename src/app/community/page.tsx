import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { MediaFrame } from "@/components/ui/MediaFrame";

export const metadata: Metadata = {
  title: "Community",
  description: "Midpoint Tech is designed to support connection between ambitious technology businesses in Midrand.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <>
      <Section tone="stone" className="pt-14 pb-10">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Community" }]} />
          <div className="mt-8 max-w-2xl">
            <Eyebrow>Community</Eyebrow>
            <h1 className="mt-4 text-step-5 font-display font-semibold leading-[0.98] text-ink-900">
              Designed to support connection between ambitious businesses.
            </h1>
            <p className="mt-4 text-lg text-ink-700">
              Midpoint Tech brings technology, engineering and fintech companies into a shared environment.
              We do not claim a formal accelerator, incubator or guaranteed funding access — the structure
              below is built so real programmes can be activated here as they are confirmed.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-step-2 font-display font-semibold text-ink-900">A shared technology environment</h2>
            <p className="mt-4 text-ink-700">
              Tenants at Midpoint Tech share buildings, common areas and a professional address with other
              technology-focused businesses — creating natural opportunities for connection without any
              guarantee of formal collaboration.
            </p>
          </div>
          <MediaFrame media={{ src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative stock photo of a group of people sitting around a table together" }} className="aspect-[4/3]" />
        </Container>
      </Section>

      {(["Member stories", "Events and talks", "Partnerships"] as const).map((title) => (
        <Section key={title} tone="stone">
          <Container>
            <h2 className="text-step-2 font-display font-semibold text-ink-900">{title}</h2>
            <div className="mt-8">
              <EmptyState
                title={`${title} are coming soon`}
                description="This section is structured and ready to publish — content will appear here once confirmed by the Midpoint Tech team."
              />
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
