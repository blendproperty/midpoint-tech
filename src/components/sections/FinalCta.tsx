import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/content/site";

export function FinalCta() {
  return (
    <Section tone="ink" className="py-24 md:py-36">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl font-display text-step-6 font-semibold leading-[0.96] text-stone-50">
            Build what&rsquo;s next.
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contact?journey=tour" variant="primary">{CTA.bookTour}</Button>
          <Button href="/contact?journey=leasing" variant="secondary" tone="on-ink">{CTA.speakToLeasing}</Button>
          <Button href="/spaces" variant="ghost" tone="on-ink">View spaces</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
