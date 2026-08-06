import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";

const pillars = [
  {
    title: "Work",
    body: "A professional, focused base for technology teams — from founding studios to established operations — with room to configure space around how you actually work.",
  },
  {
    title: "Connect",
    body: "Proximity to other ambitious businesses in the same building and estate, with shared spaces designed to make informal connection possible, not forced.",
  },
  {
    title: "Grow",
    body: "Space that can flex as your team scales, in a location built for the long term rather than a short-term sublet.",
  },
];

export function Positioning() {
  return (
    <Section id="positioning" className="border-y border-[var(--color-line)]">
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <Heading eyebrow="More than an address">
              A connected environment, not just a lease.
            </Heading>
            <p className="mt-5 max-w-md text-[var(--color-ink-soft)]">
              Midpoint Tech brings ambitious businesses together in a professional environment created for focus,
              connection and growth — a credible base in Midrand from which technology teams can build, collaborate
              and move forward.
            </p>
          </Reveal>

          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 hidden w-px bg-[var(--color-line)] md:block" aria-hidden="true" />
            <dl className="space-y-10">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 0.08}>
                  <div className="md:pl-10">
                    <dt className="font-[var(--font-display)] text-2xl font-medium">
                      <span className="mr-3 text-[var(--color-signal)]">0{i + 1}</span>
                      {pillar.title}
                    </dt>
                    <dd className="mt-2 max-w-lg text-[var(--color-ink-soft)]">{pillar.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
