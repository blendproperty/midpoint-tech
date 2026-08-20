"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function Metric({ value, suffix = "", label, isSample = false }: { value: number; suffix?: string; label: string; isSample?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  const displayValue = reduce ? value : display;

  return (
    <div ref={ref}>
      <p className="mono-figure text-step-3 text-ink-900">
        {displayValue}
        {suffix}
      </p>
      <p className="tick-label mt-1 text-ink-700">
        {label}
        {isSample && <span className="ml-1 text-ink-600/60">(sample)</span>}
      </p>
    </div>
  );
}
