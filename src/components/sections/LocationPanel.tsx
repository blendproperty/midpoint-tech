"use client";

import { site } from "@/content/site";
import { formatCoord } from "@/lib/utils";

/**
 * No-key map fallback: a styled static panel plus an external
 * directions link. If NEXT_PUBLIC_MAPS_EMBED_KEY is configured,
 * swap in a real embed here — never expose a private API key in
 * the client bundle for anything beyond a publicly-scoped Maps
 * Embed key.
 */
export function LocationPanel() {
  const embedKey = process.env.NEXT_PUBLIC_MAPS_EMBED_KEY;

  if (embedKey) {
    const src = `https://www.google.com/maps/embed/v1/place?key=${embedKey}&q=${encodeURIComponent(
      `${site.address.line1}, ${site.address.city}, South Africa`
    )}`;
    return (
      <iframe
        title="Map showing Midpoint Tech location"
        src={src}
        loading="lazy"
        className="aspect-[4/3] w-full border border-ink-900/10 lg:aspect-auto lg:h-full"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-ink-900/10 bg-ink-900 lg:aspect-auto lg:h-full lg:min-h-[420px]">
      <div aria-hidden className="schematic-grid absolute inset-0 opacity-[0.35]" />

      {/* Survey-plot marker + viewfinder corners — same schematic voice as
          the hero and campus explorer, not a generic map pin. */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="absolute inset-0 h-full w-full opacity-90">
        <line x1="47.8" y1="50" x2="52.2" y2="50" stroke="var(--brass-400)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <line x1="50" y1="47.8" x2="50" y2="52.2" stroke="var(--brass-400)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <circle cx="50" cy="50" r="2" fill="none" stroke="var(--brass-400)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        {[
          { x: 4, y: 6, dx: 1, dy: 1 },
          { x: 96, y: 6, dx: -1, dy: 1 },
          { x: 4, y: 94, dx: 1, dy: -1 },
          { x: 96, y: 94, dx: -1, dy: -1 },
        ].map((c, i) => (
          <path
            key={i}
            d={`M ${c.x} ${c.y + c.dy * 4} L ${c.x} ${c.y} L ${c.x + c.dx * 4} ${c.y}`}
            fill="none"
            stroke="var(--brass-400)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            opacity="0.7"
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-4 text-center">
        <p className="tick-label mt-3 text-stone-100">{site.address.city}, {site.address.province}</p>
        <p className="coord-readout mt-1 text-brass-400/70">
          {formatCoord(site.address.lat, "N", "S")} / {formatCoord(site.address.lng, "E", "W")}
        </p>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="status-readout inline-flex items-center text-stone-400">
          <span aria-hidden className="bracket">[</span>
          <span className="mx-1">MAP PENDING API CONFIGURATION</span>
          <span aria-hidden className="bracket">]</span>
        </span>
      </div>
    </div>
  );
}
