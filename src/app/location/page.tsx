import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { LocationPanel } from "@/components/sections/LocationPanel";
import { AddressCopyButton } from "@/components/sections/AddressCopyButton";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Location — 300 Janadel Avenue, Midrand",
  description: "Midpoint Tech is located at 300 Janadel Avenue, Halfway House, Midrand — on the business corridor between Johannesburg and Pretoria.",
  alternates: { canonical: "/location" },
};

const placeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: site.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.province,
    postalCode: site.address.postalCode,
    addressCountry: "ZA",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
  url: absoluteUrl("/location"),
};

export default function LocationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      <Section tone="stone" className="pt-14 pb-10">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Location" }]} />
          <div className="mt-8 max-w-2xl">
            <Eyebrow>Location</Eyebrow>
            <h1 className="mt-4 text-step-4 font-display font-semibold text-ink-900">
              On the corridor between Johannesburg and Pretoria.
            </h1>
            <p className="mt-4 text-lg text-ink-700">
              300 Janadel Avenue sits in Halfway House, Midrand — a practical base for teams that need to
              serve both metros. Exact travel times will be confirmed and added ahead of launch.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="tick-label text-ink-700">Address</h2>
            <address className="mt-3 not-italic text-2xl font-display font-semibold text-ink-900">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}, {site.address.province}
              <br />
              {site.address.postalCode}, {site.address.country}
            </address>
            <p className="mt-2 text-xs text-ink-600">Coordinates shown are indicative sample data pending confirmation.</p>

            <div className="mt-6 flex flex-wrap gap-4">
              <AddressCopyButton />
              <Button
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${site.address.line1}, ${site.address.city}, South Africa`
                )}`}
                variant="secondary"
              >
                Get directions
              </Button>
            </div>

            <div className="mt-10">
              <h2 className="tick-label text-ink-700">Road access</h2>
              <ul className="mt-3 space-y-2 text-ink-800">
                <li className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />Positioned within the Midrand business node</li>
                <li className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />Close to major routes connecting Johannesburg and Pretoria</li>
                <li className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />Public-transport access to be confirmed and added</li>
              </ul>
              <p className="mt-3 text-xs text-ink-600">Detailed road-access and transit information is pending verification — see docs/content-required.md.</p>
            </div>

            <div className="mt-10">
              <h2 className="tick-label text-ink-700">Nearby business context</h2>
              <p className="mt-3 text-ink-700">
                Midrand hosts a mix of established corporates, logistics and technology businesses. Specific
                nearby landmarks and business nodes will be added once confirmed.
              </p>
            </div>
          </div>

          <LocationPanel />
        </Container>
      </Section>
    </>
  );
}
