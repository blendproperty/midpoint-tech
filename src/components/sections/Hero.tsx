"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { site, CTA } from "@/content/site";

const HEADLINE = "Space for technology businesses building what comes next.";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.2]);

  const rise = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const words = HEADLINE.split(" ");

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink-950 text-stone-100">
      {/* Blueprint grid backdrop — quiet, technical, not neon — slowly drifts */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 opacity-[0.07] animate-grid-drift"
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
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-3xl animate-float-slow"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-brass-500/10 blur-3xl animate-float-slow"
        style={{ animationDelay: "-3.5s" }}
      />

      <motion.div style={{ opacity: contentOpacity }}>
        <Container className="relative flex min-h-[88vh] flex-col justify-center gap-10 py-28">
          <motion.div {...rise(0)}>
            <Eyebrow className="text-brass-400">MIDRAND · GAUTENG</Eyebrow>
          </motion.div>

          <h1 className="max-w-3xl text-step-5 font-display font-semibold leading-[1.04]">
            <span className="sr-only">{HEADLINE}</span>
            <motion.span
              aria-hidden
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ staggerChildren: reduce ? 0 : 0.045, delayChildren: 0.05 }}
              className="inline"
            >
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  variants={{
                    hidden: reduce ? {} : { opacity: 0, y: 32, rotateX: -40 },
                    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="inline-block [transform-style:preserve-3d] will-change-transform"
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <motion.p {...rise(0.5)} className="max-w-xl text-lg text-stone-300">
            {site.description}
          </motion.p>

          <motion.div {...rise(0.58)} className="flex flex-wrap items-center gap-4">
            <Button href="/spaces" variant="primary">
              {CTA.primary}
            </Button>
            <Button href="/contact?journey=tour" variant="secondary" tone="on-ink">
              {CTA.bookTour}
            </Button>
          </motion.div>

          <motion.div {...rise(0.66)} className="flex items-center gap-2 pt-4 text-sm text-stone-300">
            <MapPin className="h-4 w-4 text-brass-400" aria-hidden />
            <Link href="/location" className="hover:text-brass-400 hover:underline underline-offset-4 inline-flex items-center gap-1">
              {site.address.line1}, {site.address.city}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
