"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/Badge";
import { spaces } from "@/content/spaces";
import { formatSqm } from "@/lib/utils";
import { campusAerialDataUri } from "@/content/campus-aerial";
import { campusBuildings as buildings } from "@/content/campus-buildings";

export function CampusExplorer() {
  const [activeId, setActiveId] = useState<string>(buildings[0].id);
  const reduce = useReducedMotion();
  const active = buildings.find((b) => b.id === activeId) ?? buildings[0];

  const summaries = useMemo(() => {
    const map = new Map<string, { count: number; gla: number; available: number }>();
    for (const b of buildings) map.set(b.reference, { count: 0, gla: 0, available: 0 });
    for (const s of spaces) {
      const entry = map.get(s.buildingReference);
      if (!entry) continue;
      entry.count += 1;
      entry.gla += s.glaSqm;
      if (s.status === "available") entry.available += 1;
    }
    return map;
  }, []);

  const activeSummary = summaries.get(active.reference);
  const activeSpaces = spaces.filter((s) => s.buildingReference === active.reference);

  return (
    <Section tone="stone" id="campus">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Explore the campus</Eyebrow>
          <h2 className="mt-4 text-step-3 font-display font-semibold text-ink-900">
            Three buildings, one campus.
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            Select a building to see what&rsquo;s available. Each one is connected — by grounds,
            parking and a single address — but built to house a different scale of team.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-[1.4fr_1fr] md:gap-10">
          <Reveal
            delay={0.1}
            className="group relative aspect-[16/10] overflow-hidden border border-ink-900/15 bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={campusAerialDataUri}
              alt="Aerial architectural rendering of the Midpoint Tech campus, showing the connected office wings, the circular atrium building, covered parking and landscaped grounds"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-ink-950/10" />
            <div aria-hidden className="schematic-grid absolute inset-0 opacity-[0.35] mix-blend-overlay" />

            {/* Connective survey lines between the three markers — the campus
                read as one instrumented node network, not three separate dots. */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <polyline
                points={buildings.map((b) => `${b.x},${b.y}`).join(" ")}
                fill="none"
                stroke="var(--brass-400)"
                strokeWidth="0.15"
                strokeDasharray="0.6 0.6"
                opacity="0.55"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {buildings.map((b) => {
              const isActive = b.id === activeId;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveId(b.id)}
                  aria-pressed={isActive}
                  aria-label={`View ${b.label} availability`}
                  style={{ left: `${b.x}%`, top: `${b.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-500"
                >
                  <motion.span
                    aria-hidden
                    animate={reduce ? undefined : { scale: isActive ? [1, 1.15, 1] : 1 }}
                    transition={{ duration: 1.8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                    className={
                      "mono-figure relative flex h-5 w-5 items-center justify-center rounded-full border-2 text-[9px] transition-colors " +
                      (isActive
                        ? "border-brass-500 bg-brass-500 text-ink-950"
                        : "border-stone-100 bg-ink-950/70 text-stone-100 hover:bg-brass-500/80")
                    }
                  >
                    {b.code}
                    {isActive && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass-500/60" />
                    )}
                  </motion.span>
                  <span
                    className={
                      "tick-label pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-[2px] border px-2 py-1 transition-opacity " +
                      (isActive
                        ? "border-brass-500/60 bg-ink-950 text-stone-50 opacity-100"
                        : "border-transparent bg-ink-950/80 text-stone-100 opacity-0 group-hover:opacity-100")
                    }
                  >
                    {b.label}
                  </span>
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={0.18} className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              {buildings.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveId(b.id)}
                  aria-pressed={b.id === activeId}
                  className={
                    "tick-label flex items-center gap-2 border px-3 py-2 transition-colors " +
                    (b.id === activeId
                      ? "border-ink-900 bg-ink-900 text-stone-50"
                      : "border-ink-900/20 text-ink-700 hover:border-ink-900/50")
                  }
                >
                  <span className="mono-figure text-[10px] opacity-60">{b.code}</span>
                  {b.label}
                </button>
              ))}
            </div>

            <motion.div
              key={active.id}
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-1 flex-col border-t border-ink-900/15 pt-6"
            >
              <h3 className="font-display text-2xl font-semibold text-ink-900">{active.label}</h3>
              <p className="mt-2 text-ink-700">{active.description}</p>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-ink-900/10 py-5 text-sm">
                <div>
                  <dt className="text-ink-600">Listed GLA</dt>
                  <dd className="mono-figure mt-1 text-xl font-medium text-ink-900">
                    {activeSummary && activeSummary.gla > 0 ? formatSqm(activeSummary.gla) : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-600">Available now</dt>
                  <dd className="mono-figure mt-1 text-xl font-medium text-ink-900">
                    {activeSummary ? activeSummary.available : 0} / {activeSummary?.count ?? 0}
                  </dd>
                </div>
              </dl>

              <ul className="mt-5 flex flex-col gap-3">
                {activeSpaces.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/spaces/${s.slug}`}
                      className="group flex items-center justify-between gap-4 border border-ink-900/10 bg-white px-4 py-3 transition-colors hover:border-brass-500/40"
                    >
                      <span>
                        <span className="block font-medium text-ink-900 group-hover:text-teal-600">
                          {s.name}
                        </span>
                        <span className="text-sm text-ink-600">{formatSqm(s.glaSqm)} · {s.floor}</span>
                      </span>
                      <StatusBadge status={s.status} />
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/spaces"
                className="mt-auto inline-flex items-center gap-2 pt-6 font-medium text-ink-900 hover:text-brass-600"
              >
                View all available spaces
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
