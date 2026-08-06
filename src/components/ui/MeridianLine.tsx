"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The signature structural device for Midpoint Tech: a coordinate
 * line with a travelling marker, used to connect labelled nodes
 * (e.g. Work / Connect / Grow) and to stitch between sections.
 * Purely decorative — never the only carrier of information.
 */
export function MeridianLine({
  nodes,
  tone = "stone",
  className,
}: {
  nodes: string[];
  tone?: "stone" | "ink";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const lineColor = tone === "ink" ? "bg-stone-300/30" : "bg-ink-900/15";
  const textColor = tone === "ink" ? "text-stone-100" : "text-ink-900";

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className={cn("absolute left-0 right-0 top-1/2 h-px -translate-y-1/2", lineColor)} />
      <motion.div
        className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brass-500"
        initial={{ left: "0%" }}
        animate={reduce ? { left: "0%" } : { left: ["0%", "100%", "0%"] }}
        transition={reduce ? undefined : { duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative flex justify-between">
        {nodes.map((node) => (
          <div key={node} className="flex flex-col items-center gap-3 bg-transparent px-2">
            <span className={cn("tick-label", textColor)}>{node}</span>
            <span className={cn("h-2 w-px", lineColor.replace("/15", "/40").replace("/30", "/50"))} />
          </div>
        ))}
      </div>
    </div>
  );
}
