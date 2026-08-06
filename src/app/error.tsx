"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="ink" className="flex min-h-[70vh] items-center">
      <Container className="text-center">
        <p className="tick-label text-brass-400">Something went wrong</p>
        <h1 className="mt-4 text-step-3 font-display font-semibold text-stone-100">
          We hit an unexpected error.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone-300">
          Please try again, or contact the leasing team directly if the problem continues.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button onClick={reset} variant="primary">Try again</Button>
          <Button href="/contact" variant="secondary" tone="on-ink">Contact us</Button>
        </div>
      </Container>
    </Section>
  );
}
