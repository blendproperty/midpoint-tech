"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Stage — the section primitive for the Narrative Workflow macrostructure.
 * Each stage of the leasing journey gets a numbered label (1.0, 2.0, ...)
 * and a thick rule, entering with a horizontal sweep as it reaches the
 * viewport (this macrostructure's reveal pattern), never a uniform fade-up.
 */
export function Stage({
  index,
  label,
  title,
  dark = false,
  children,
  className,
}: {
  index: string;
  label: string;
  title: string;
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.fromTo(
        "[data-stage-sweep]",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className={cn("border-t border-[var(--color-line)] py-20 md:py-28", dark && "section-dark border-[var(--color-line-dark)]", className)}
    >
      <Container>
        <div data-stage-sweep className="flex flex-wrap items-baseline gap-4 border-b border-[var(--color-line)]/60 pb-6" style={{ borderColor: dark ? "var(--color-line-dark)" : undefined }}>
          <span className="font-[var(--font-display)] text-2xl font-semibold tabular-nums text-[var(--color-signal)]">
            {index}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ink-soft)]" style={{ color: dark ? "var(--color-paper-dim)" : undefined }}>
            {label}
          </span>
        </div>
        <h2 className="mt-6 max-w-2xl text-[clamp(1.75rem,3vw+1rem,2.75rem)] font-semibold tracking-tight text-balance">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
