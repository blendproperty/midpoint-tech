"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function Metric({
  value,
  label,
  suffix = "",
  note,
}: {
  value: number;
  label: string;
  suffix?: string;
  note?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 900;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * progress));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref}>
      <p className="font-[var(--font-display)] text-4xl font-medium tabular-nums md:text-5xl">
        {display.toLocaleString("en-ZA")}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{label}</p>
      {note && <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]/70">{note}</p>}
    </div>
  );
}
