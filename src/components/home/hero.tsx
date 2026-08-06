"use client";
import { useRef } from "react";
import Image from "next/image";
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
        .fromTo(
          "[data-hero-bg]",
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 0.45, duration: 1.6, ease: "expo.out" },
          0,
        );
    },
    { scope },
  );

  const heading = "Space for technology businesses building what comes next.";
  const words = heading.split(" ");

  return (
    <section
      ref={scope}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      <div className="absolute inset-0" data-hero-bg>
        <Image
          src="https://picsum.photos/seed/midpointtech-hero/1920/1080"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-ink)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-[var(--color-ink)]/20" />
      </div>

      <Container className="relative flex flex-col items-center gap-8 py-32 text-center">
        <p
          data-hero-kicker
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-signal)]"
        >
          Midrand · Gauteng
        </p>

        <h1 className="max-w-5xl text-balance font-[var(--font-display)] text-[clamp(2.75rem,5.2vw+1rem,6.5rem)] font-medium leading-[1.02] tracking-tight">
          {words.map((word, i) => (
            <span key={i}>
              <span data-hero-word className="inline-block will-change-transform">
                {word}
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p data-hero-sub className="max-w-xl text-lg text-[var(--color-paper-dim)]">
          A connected business environment for startups, scale-ups and established technology teams at 300 Janadel
          Avenue in Midrand.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
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
      </Container>
    </section>
  );
}
