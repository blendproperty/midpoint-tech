import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/content/site";

export function FinalCta() {
  return (
    <Section tone="raised" className="py-24 md:py-32">
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-step-4 font-display font-semibold text-ink-900">
            Your next chapter needs the right space.
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact?journey=tour" variant="primary">{CTA.bookTour}</Button>
          <Button href="/contact?journey=leasing" variant="secondary">{CTA.speakToLeasing}</Button>
          <Button href="/spaces" variant="ghost">View spaces</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
