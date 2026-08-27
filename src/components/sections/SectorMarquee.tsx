const sectors = [
  "Fintech",
  "AI / ML",
  "Cybersecurity",
  "Cloud & DevOps",
  "Healthtech",
  "Climate",
  "Data platforms",
  "Developer tools",
  "Payments",
  "IoT / Hardware",
];

/**
 * Positioning language, not a claim about who is actually on campus —
 * distinct from SocialProof, which markets confirmed-or-in-progress
 * building features. See docs/content-required.md for the tenant-mix
 * disclosure rule this respects.
 */
export function SectorMarquee() {
  const loop = [...sectors, ...sectors];

  return (
    <section aria-label="Sectors Midpoint Tech is built for" className="relative overflow-hidden border-y border-ink-900/10 bg-white py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-32"
      />
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {loop.map((sector, i) => (
          <div key={`${sector}-${i}`} className="flex items-center gap-10">
            <span className="tick-label text-ink-700">{sector}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-brass-500/70" />
          </div>
        ))}
      </div>
    </section>
  );
}
