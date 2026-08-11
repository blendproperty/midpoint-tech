"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site, CTA } from "@/content/site";
import { campusAerialDataUri } from "@/content/campus-aerial";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Layered parallax: background image drifts slowest, grid mid, foreground
  // type moves fastest — creates architectural depth rather than a flat scroll.
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, reduce ? 1.08 : 1.18]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);

  const rise = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink-950 text-stone-100">
      {/* Cinematic background: the real campus aerial rendering, not stock photography */}
      <motion.div aria-hidden style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={campusAerialDataUri}
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-ink-950/40"
      />

      {/* Quiet architectural grid, drifting independently */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 opacity-[0.06] animate-grid-drift"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #EDEFEA 1px, transparent 1px), linear-gradient(to bottom, #EDEFEA 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }}>
        <Container className="relative flex min-h-[92vh] flex-col justify-end gap-8 pb-20 pt-40 md:min-h-[100vh] md:pb-28">
          <motion.div style={{ y: typeY }} className="flex flex-col gap-6">
            <motion.p
              {...rise(0)}
              className="tick-label flex items-center gap-3 text-brass-400"
            >
              <span aria-hidden className="h-px w-8 bg-current" />
              300 Janadel Avenue · Midrand, Gauteng
            </motion.p>

            <h1 className="font-display font-semibold leading-[0.94] tracking-tight">
              <motion.span {...rise(0.08)} className="block text-step-6 text-stone-50">
                Build here.
              </motion.span>
              <motion.span
                {...rise(0.18)}
                className="mt-2 block text-step-2 font-medium text-stone-300 md:text-step-3"
              >
                Midpoint Tech
              </motion.span>
            </h1>

            <motion.p {...rise(0.3)} className="max-w-xl text-lg text-stone-300">
              A technology campus for founders, engineers and teams building what comes next —
              on the business corridor between Johannesburg and Pretoria.
            </motion.p>

            <motion.div {...rise(0.4)} className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="#campus" variant="primary">
                Explore the campus
              </Button>
              <Button href="/spaces" variant="secondary" tone="on-ink">
                {CTA.primary}
              </Button>
            </motion.div>

            <motion.div {...rise(0.48)} className="flex items-center gap-2 pt-2 text-sm text-stone-300">
              <MapPin className="h-4 w-4 text-brass-400" aria-hidden />
              <Link
                href="/location"
                className="inline-flex items-center gap-1 underline-offset-4 hover:text-brass-400 hover:underline"
              >
                {site.address.line1}, {site.address.city}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
