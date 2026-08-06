import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="pt-40 text-center">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-signal-strong)]">404</p>
        <Heading as="h1" className="mx-auto mt-3 max-w-xl">
          We couldn&apos;t find that page
        </Heading>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-ink-soft)]">
          The page you&apos;re looking for may have moved. Try exploring current availability or head back to the
          homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Back to homepage</Button>
          <Button href="/spaces" variant="secondary">View available spaces</Button>
        </div>
      </Container>
    </Section>
  );
}
