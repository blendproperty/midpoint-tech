"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { site, CTA } from "@/content/site";

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative overflow-hidden bg-ink-950 text-stone-100">
      {/* Blueprint grid backdrop — quiet, technical, not neon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #EDEFEA 1px, transparent 1px), linear-gradient(to bottom, #EDEFEA 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-3xl" />

      <Container className="relative flex min-h-[88vh] flex-col justify-center gap-10 py-28">
        <motion.div {...rise(0)}>
          <Eyebrow className="text-brass-400">MIDRAND · GAUTENG</Eyebrow>
        </motion.div>

        <motion.h1 {...rise(0.08)} className="max-w-3xl text-step-5 font-display font-semibold leading-[1.04]">
          Space for technology businesses building what comes next.
        </motion.h1>

        <motion.p {...rise(0.16)} className="max-w-xl text-lg text-stone-300">
          {site.description}
        </motion.p>

        <motion.div {...rise(0.24)} className="flex flex-wrap items-center gap-4">
          <Button href="/spaces" variant="primary">
            {CTA.primary}
          </Button>
          <Button href="/contact?journey=tour" variant="secondary" tone="on-ink">
            {CTA.bookTour}
          </Button>
        </motion.div>

        <motion.div {...rise(0.32)} className="flex items-center gap-2 pt-4 text-sm text-stone-300">
          <MapPin className="h-4 w-4 text-brass-400" aria-hidden />
          <Link href="/location" className="hover:text-brass-400 hover:underline underline-offset-4 inline-flex items-center gap-1">
            {site.address.line1}, {site.address.city}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
