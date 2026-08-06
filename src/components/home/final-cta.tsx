import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="section-dark border-t border-[var(--color-line-dark)] py-24 md:py-32">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap items-baseline gap-4">
          <span className="font-[var(--font-display)] text-2xl font-semibold tabular-nums text-[var(--color-signal)]">
            5.0
          </span>
          <h2 className="max-w-xl text-[clamp(1.75rem,3vw+1rem,2.75rem)] font-semibold tracking-tight text-balance">
            Your next chapter needs the right space.
          </h2>
        </div>
        <Button href="/contact?intent=tour" size="lg" showArrow className="w-fit shrink-0">
          Book a tour
        </Button>
      </Container>
    </section>
  );
}
