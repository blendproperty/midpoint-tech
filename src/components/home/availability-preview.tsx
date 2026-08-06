import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SpaceCard } from "@/components/spaces/space-card";
import { Reveal } from "@/components/motion/reveal";
import { spaces } from "@/lib/content/spaces";

export function AvailabilityPreview() {
  const preview = spaces.slice(0, 3);

  return (
    <Section id="availability">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Current availability">Explore spaces at Midpoint Tech</Heading>
          <Button href="/spaces" variant="secondary" showArrow>
            View all availability
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {preview.map((space, i) => (
            <Reveal key={space.slug} delay={i * 0.06}>
              <SpaceCard space={space} />
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--color-ink-soft)]">
          Space names, sizes and availability shown are sample data pending confirmation from the leasing team.
        </p>
      </Container>
    </Section>
  );
}
