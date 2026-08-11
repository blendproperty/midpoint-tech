import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function BrandStatement() {
  return (
    <Section tone="raised" className="py-24 md:py-36">
      <Container>
        <Reveal>
          <p className="tick-label text-brass-600">The proposition</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-4xl font-display text-step-6 font-semibold leading-[0.96] text-ink-900">
            Not another office park.
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-8 max-w-xl text-lg text-ink-700">
            Midpoint Tech is a campus built around ambitious companies, engineering teams and
            businesses building what comes next — not a generic mixed-tenant address.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
