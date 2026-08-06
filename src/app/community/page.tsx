import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { tenantCategories } from "@/lib/content/testimonials";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Community",
  description:
    "Midpoint Tech is designed to support connection between ambitious technology businesses in Midrand.",
  path: "/community",
});

const structureCards = [
  {
    title: "Shared spaces designed for connection",
    body: "Common areas and breakout spaces are planned to make informal interaction between tenants possible, without engineering forced networking.",
  },
  {
    title: "A technology-oriented tenant mix",
    body: "Leasing is being shaped around software, fintech, engineering and digital service businesses, so the surrounding community shares common context.",
  },
  {
    title: "Room for a future programme",
    body: "The site is structured so that tenant stories, talks, workshops and partnerships can be added here once they are confirmed — nothing is claimed before it exists.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <Section className="pt-32">
        <Container>
          <Heading as="h1" eyebrow="Community">
            Designed to support connection between ambitious businesses
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-soft)]">
            Midpoint Tech&apos;s community proposition is intentionally honest about where things stand today. We are
            not yet able to point to a formal accelerator, funding programme or scheduled events calendar — this page
            will be expanded as those elements are confirmed.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-line)]">
        <Container className="grid gap-8 md:grid-cols-3">
          {structureCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06}>
              <div className="h-full rounded-[var(--radius-lg)] border border-[var(--color-line)] p-6">
                <h2 className="font-[var(--font-display)] text-lg font-medium">{card.title}</h2>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-line)] bg-[var(--color-paper-dim)]">
        <Container>
          <h2 className="font-[var(--font-display)] text-xl font-medium">Who the community is for</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {tenantCategories.map((category) => (
              <span key={category} className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm">
                {category}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-[var(--color-ink-soft)]">
            No formal incubator, funding access, university partnership or investor programme is currently confirmed
            at Midpoint Tech. Any such initiative will be described here accurately, once agreed and operational.
          </p>
          <div className="mt-8">
            <Button href="/contact">Talk to us about the community</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
