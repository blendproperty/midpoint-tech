import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Midpoint Tech experience",
  description: "Workspace quality, shared environments and the day-to-day experience of Midpoint Tech in Midrand.",
  alternates: { canonical: "/experience" },
};

const moments = [
  { title: "Arrival", body: "A considered lobby and entrance sequence that sets the tone before a single meeting starts.", img: "placeholder-experience-4" },
  { title: "Focus", body: "Fitted and shell-and-core suites configured for deep work as much as for client meetings.", img: "placeholder-experience-1" },
  { title: "Collaboration", body: "Shared spaces for meeting, informal conversation and cross-team collaboration.", img: "placeholder-experience-2" },
  { title: "Landscape", body: "Landscaped grounds between buildings — a deliberate break from the desk.", img: "placeholder-experience-3" },
];

export default function ExperiencePage() {
  return (
    <>
      <Section tone="stone" className="pt-14 pb-10">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Experience" }]} />
          <div className="mt-8 max-w-2xl">
            <Eyebrow>Experience</Eyebrow>
            <h1 className="mt-4 text-step-4 font-display font-semibold text-ink-900">
              A workplace built for focus and for people.
            </h1>
            <p className="mt-4 text-lg text-ink-700">
              From arrival to collaboration, Midpoint Tech is shaped around how technology teams actually
              spend their day. Specific amenities will be confirmed and added here as they are finalised.
            </p>
          </div>
        </Container>
      </Section>

      {moments.map((m, i) => (
        <Section key={m.title} tone={i % 2 === 0 ? "raised" : "stone"}>
          <Container className={`grid gap-12 md:grid-cols-2 md:items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <MediaFrame media={{ src: `/media/experience/${m.img}.svg`, alt: `Placeholder image illustrating the ${m.title.toLowerCase()} moment at Midpoint Tech` }} className="aspect-[4/3]" />
            <div>
              <p className="tick-label text-brass-600">0{i + 1} — {m.title}</p>
              <h2 className="mt-3 text-step-2 font-display font-semibold text-ink-900">{m.title}</h2>
              <p className="mt-4 text-ink-700">{m.body}</p>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="ink" className="text-center">
        <Container>
          <h2 className="mx-auto max-w-xl text-step-3 font-display font-semibold text-stone-100">
            See it for yourself.
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="/contact?journey=tour" variant="primary">Book a tour</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
