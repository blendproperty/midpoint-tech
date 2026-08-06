import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

export function LocationTeaser() {
  return (
    <Section tone="ink">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow className="text-brass-400">Location</Eyebrow>
          <h2 className="mt-4 text-step-3 font-display font-semibold text-stone-100">
            On the corridor between Johannesburg and Pretoria.
          </h2>
          <p className="mt-4 text-lg text-stone-300">
            300 Janadel Avenue sits in Halfway House, Midrand — practical for teams that need to serve both
            metros without committing to either.
          </p>
          <address className="mt-6 not-italic text-stone-300">
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
        </div>

        {/* Static styled location panel — no API key required */}
        <div className="relative aspect-[4/3] overflow-hidden border border-stone-100/15 bg-ink-900">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, #EDEFEA 1px, transparent 1px), linear-gradient(to bottom, #EDEFEA 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="block h-3 w-3 rounded-full bg-brass-500 mx-auto" aria-hidden />
            <p className="tick-label mt-3 text-stone-100">Halfway House, Midrand</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
