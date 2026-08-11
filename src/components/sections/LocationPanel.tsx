"use client";

import { site } from "@/content/site";
import { campusAerialDataUri } from "@/content/campus-aerial";

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={campusAerialDataUri}
        alt="Aerial architectural rendering of the Midpoint Tech campus at 300 and 100 Janadel Avenue, Halfway House, Midrand"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, #EDEFEA 1px, transparent 1px), linear-gradient(to bottom, #EDEFEA 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <span className="mx-auto block h-3 w-3 rounded-full bg-brass-500" aria-hidden />
        <p className="tick-label mt-3 text-stone-100">{site.address.city}, {site.address.province}</p>
        <p className="mt-1 text-xs text-stone-400">Static preview — interactive map pending API configuration</p>
      </div>
    </div>
  );
}
