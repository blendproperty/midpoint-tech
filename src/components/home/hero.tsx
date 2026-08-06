"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/content/site";
import { trackEvent } from "@/lib/analytics";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1 } });
      tl.fromTo(
        "[data-hero-kicker]",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          "[data-hero-word]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.06 },
          "-=0.35",
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.45",
        )
        ;
    },
    { scope },
  );

  const heading = "Space for technology businesses building what comes next.";
  const words = heading.split(" ");

  return (
    <section
      ref={scope}
      className="relative overflow-hidden border-b border-[var(--color-line-dark)] bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      <div className="grid-motif absolute inset-0 opacity-60" aria-hidden="true" />

      <Container className="relative grid gap-10 py-28 md:grid-cols-[1.3fr_0.7fr] md:py-40">
        <div className="flex flex-col gap-8">
          <p
            data-hero-kicker
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-signal)]"
          >
            0.0 · Midrand, Gauteng
          </p>

          <h1 className="max-w-3xl text-balance text-[clamp(2.5rem,4.8vw+1rem,5.5rem)] font-semibold leading-[1.03] tracking-tight">
            {words.map((word, i) => (
              <span key={i}>
                <span data-hero-word className="inline-block will-change-transform">
                  {word}
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p data-hero-sub className="max-w-lg text-lg text-[var(--color-paper-dim)]">
            A connected business environment for startups, scale-ups and established technology teams at 300
            Janadel Avenue in Midrand.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span data-hero-cta>
              <Button href="/spaces" size="lg" showArrow>
                Explore available spaces
              </Button>
            </span>
            <span data-hero-cta>
              <Button
                href="/contact?intent=tour"
                variant="secondary"
                size="lg"
                className="border-[var(--color-paper)] text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
                onClick={() => trackEvent("click_book_tour", { location: "hero" })}
              >
                Book a tour
              </Button>
            </span>
          </div>

          <p data-hero-sub className="flex items-center gap-2 text-sm text-[var(--color-paper-dim)]">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.region}
          </p>
        </div>

        <div data-hero-sub className="hidden flex-col justify-end gap-6 border-l border-[var(--color-line-dark)] pl-8 md:flex">
          <dl className="flex flex-col gap-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[var(--color-paper-dim)]">Address</dt>
              <dd className="mt-1 text-base font-medium">{siteConfig.address.line1}</dd>
              <dd className="text-sm text-[var(--color-paper-dim)]">{siteConfig.address.line2}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[var(--color-paper-dim)]">Corridor</dt>
              <dd className="mt-1 text-base font-medium">Johannesburg &ndash; Pretoria</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
