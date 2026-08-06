import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content/site";

export function FinalCta() {
  return (
    <Section dark className="text-center">
      <Container>
        <Heading as="h2" className="mx-auto max-w-2xl text-[var(--color-paper)]">
          Your next chapter needs the right space.
        </Heading>
        <p className="mx-auto mt-4 max-w-xl text-[var(--color-paper-dim)]">
          Book a tour of Midpoint Tech, speak to the leasing team, or explore current availability at{" "}
          {siteConfig.address.line1}.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact?intent=tour" size="lg">
            Book a tour
          </Button>
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            className="border-[var(--color-paper)] text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
          >
            Speak to leasing
          </Button>
          <Button href="/spaces" variant="ghost" size="lg" className="text-[var(--color-paper)]">
            View spaces
          </Button>
        </div>
      </Container>
    </Section>
  );
}
