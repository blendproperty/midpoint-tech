import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { formatCoord } from "@/lib/utils";
import { campusAerialDataUri } from "@/content/campus-aerial";
import { ArrowUpRight } from "lucide-react";

const corridor = ["Pretoria", "Midpoint Tech", "Johannesburg"];

export function LocationTeaser() {
  return (
    <Section tone="ink">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal x={-24} y={0}>
          <Eyebrow className="text-brass-400">Location</Eyebrow>
          <h2 className="mt-4 text-step-3 font-display font-semibold text-stone-100">
            On the corridor between Johannesburg and Pretoria.
          </h2>
          <p className="mt-4 text-lg text-stone-300">
            300 Janadel Avenue sits in Halfway House, Midrand — practical for teams that need to serve both
            metros without committing to either.
          </p>

          {/* Corridor device — the geography as the interface, not a generic map embed.
              "Midpoint Tech" reads as a bracketed instrument readout, matching
              StatusBadge, rather than a translucent pill (which read as a
              mismatched box against the ink background). */}
          <ol className="mt-8 flex flex-wrap items-center gap-y-3 text-sm">
            {corridor.map((place, i) => (
              <li key={place} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-3 h-px w-8 bg-stone-100/25 md:w-14" />}
                {place === "Midpoint Tech" ? (
                  <span className="status-readout inline-flex items-center text-brass-400">
                    <span aria-hidden className="bracket">[</span>
                    <span className="mx-1 inline-flex items-center gap-1.5">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
                      {place}
                    </span>
                    <span aria-hidden className="bracket">]</span>
                  </span>
                ) : (
                  <span className="tick-label text-stone-400">{place}</span>
                )}
              </li>
            ))}
          </ol>

          <address className="mt-8 not-italic text-stone-300">
            {site.address.line1}, {site.address.line2}
            <br />
            {site.address.city}, {site.address.province}, {site.address.postalCode}
          </address>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/location" variant="primary">Explore the location</Button>
            <Link
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                `${site.address.line1}, ${site.address.city}, South Africa`
              )}`}
              className="inline-flex items-center gap-2 text-stone-100 hover:text-brass-400"
            >
              Get directions <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        {/* Real aerial rendering of the campus (300 / 100 Janadel Avenue) */}
        <Reveal
          x={24}
          y={0}
          delay={0.1}
          className="group relative aspect-[4/3] overflow-hidden border border-stone-100/15 bg-ink-900"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={campusAerialDataUri}
            alt="Aerial architectural rendering of the Midpoint Tech campus at 300 and 100 Janadel Avenue, showing the two office blocks, covered parking, the circular atrium entrance, and landscaped grounds"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent"
          />
          <div
            aria-hidden
            className="schematic-grid absolute inset-0 opacity-20 animate-grid-drift mix-blend-overlay"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <span aria-hidden className="relative mx-auto flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass-500/60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brass-500" />
            </span>
            <p className="tick-label mt-3 text-stone-100">Halfway House, Midrand</p>
            <p className="coord-readout mt-1 text-brass-400/70">
              {formatCoord(site.address.lat, "N", "S")} / {formatCoord(site.address.lng, "E", "W")}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
