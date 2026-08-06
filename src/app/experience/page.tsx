import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "The Midpoint Tech experience",
  description:
    "Explore the workplace environment at Midpoint Tech — arrival, shared spaces, landscape and the day-to-day experience of working at 300 Janadel Avenue.",
  path: "/experience",
});

const moments = [
  {
    title: "Arrival",
    body: "A considered arrival experience designed to feel professional for staff and visiting clients alike, from the moment you enter the estate.",
    image: { src: "/images/campus/placeholder-arrival.svg", alt: "Placeholder image representing the arrival experience at Midpoint Tech" },
  },
  {
    title: "Workspace",
    body: "Suites configured to suit technology teams — from focused, cellular work areas to open-plan floors that support collaboration.",
    image: { src: "/images/campus/placeholder-workspace.svg", alt: "Placeholder image representing a workspace environment at Midpoint Tech" },
  },
  {
    title: "Shared spaces",
    body: "Shared meeting and breakout areas designed to make informal interaction between teams possible, without forcing it.",
    image: { src: "/images/campus/placeholder-shared.svg", alt: "Placeholder image representing shared collaboration space at Midpoint Tech" },
  },
  {
    title: "Landscape & grounds",
    body: "Considered landscaping around the estate, contributing to a calmer day-to-day environment than a typical office park.",
    image: { src: "/images/campus/placeholder-landscape.svg", alt: "Placeholder image representing the landscaped grounds at Midpoint Tech" },
  },
  {
    title: "Meeting clients",
    body: "Spaces suited to hosting clients, partners and investors, supporting a credible, professional impression.",
    image: { src: "/images/campus/placeholder-meeting.svg", alt: "Placeholder image representing a meeting and client space at Midpoint Tech" },
  },
];

export default function ExperiencePage() {
  return (
    <>
      <Section className="pt-32">
        <Container>
          <Heading as="h1" eyebrow="The environment">
            A workplace experience, not just office space
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-soft)]">
            Midpoint Tech is being shaped around the day-to-day experience of working there — how you arrive, how
            your team collaborates, and how you meet clients. Specific amenities will be confirmed and published here
            as the estate develops.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-line)]">
        <Container className="space-y-16">
          {moments.map((moment, i) => (
            <Reveal key={moment.title}>
              <div className={`grid gap-8 md:grid-cols-2 md:items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <MediaFrame src={moment.image.src} alt={moment.image.alt} width={800} height={600} className="aspect-[4/3]" sizes="(min-width:768px) 560px, 100vw" />
                <div>
                  <h2 className="font-[var(--font-display)] text-2xl font-medium">{moment.title}</h2>
                  <p className="mt-3 max-w-md text-[var(--color-ink-soft)]">{moment.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </Section>

      <Section dark className="text-center">
        <Container>
          <Heading as="h2" className="mx-auto max-w-xl text-[var(--color-paper)]">
            See it for yourself
          </Heading>
          <div className="mt-8">
            <Button href="/contact?intent=tour" size="lg">Book a tour</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
