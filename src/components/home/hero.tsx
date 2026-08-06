"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/content/site";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="absolute inset-0">
        <Image
          src="/images/campus/placeholder-hero.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-[var(--color-ink)]/30" />
      </div>

      <Container className="relative flex min-h-[86vh] flex-col justify-end gap-8 pb-16 pt-40 md:min-h-[92vh] md:pb-24">
        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-signal)]"
        >
          Midrand · Gauteng
        </motion.p>

        <motion.h1
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="max-w-3xl font-[var(--font-display)] text-[clamp(2.25rem,5vw+1rem,4.25rem)] font-medium leading-[1.05] tracking-tight text-balance"
        >
          Space for technology businesses building what comes next.
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="max-w-xl text-lg text-[var(--color-paper-dim)]"
        >
          A connected business environment for startups, scale-ups and established technology teams at 300 Janadel
          Avenue in Midrand.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button href="/spaces" size="lg" showArrow>
            Explore available spaces
          </Button>
          <Button
            href="/contact?intent=tour"
            variant="secondary"
            size="lg"
            className="border-[var(--color-paper)] text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
            onClick={() => trackEvent("click_book_tour", { location: "hero" })}
          >
            Book a tour
          </Button>
        </motion.div>

        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="flex items-center gap-2 text-sm text-[var(--color-paper-dim)]"
        >
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.region}
        </motion.p>
      </Container>
    </section>
  );
}
