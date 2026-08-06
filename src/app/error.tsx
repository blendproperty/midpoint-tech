"use client";
import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <Section className="pt-40 text-center">
      <Container>
        <Heading as="h1" className="mx-auto max-w-xl">
          Something went wrong
        </Heading>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-ink-soft)]">
          An unexpected error occurred while loading this page. You can try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">Back to homepage</Button>
        </div>
      </Container>
    </Section>
  );
}
