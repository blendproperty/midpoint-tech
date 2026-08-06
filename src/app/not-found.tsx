import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="ink" className="flex min-h-[70vh] items-center">
      <Container className="text-center">
        <p className="tick-label text-brass-400">404</p>
        <h1 className="mt-4 text-step-4 font-display font-semibold text-stone-100">
          This page has moved or doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone-300">
          Try exploring available spaces, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary">Back to homepage</Button>
          <Button href="/spaces" variant="secondary" tone="on-ink">View spaces</Button>
        </div>
      </Container>
    </Section>
  );
}
