import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { MapPanel } from "@/components/location/map-panel";
import { CopyAddressButton } from "@/components/location/copy-address-button";
import { Button } from "@/components/ui/button";
import { buildMetadata, placeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Location — Midrand, between Johannesburg and Pretoria",
  description:
    "Midpoint Tech is located at 300 Janadel Avenue, Halfway House, Midrand — part of the Johannesburg–Pretoria business corridor.",
  path: "/location",
});

const nearbyCategories = [
  "Corporate and financial services offices",
  "Established logistics and distribution operations",
  "Retail and convenience amenities",
  "Other commercial and industrial business parks",
];

export default function LocationPage() {
  const address = `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.region}, ${siteConfig.address.postalCode}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd()) }}
      />
      <Section className="pt-32">
        <Container>
          <Heading as="h1" eyebrow="Location">
            At the centre of Midrand&apos;s business corridor
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-soft)]">
            Midpoint Tech is located in Halfway House, Midrand — part of the same active commercial corridor that
            connects Johannesburg and Pretoria. This gives technology teams practical access for staff, clients and
            partners across Gauteng.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <CopyAddressButton address={address} />
            <Button href="/contact" variant="ghost">Ask about commute options</Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-line)]">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <MapPanel />
          <div>
            <h2 className="font-[var(--font-display)] text-xl font-medium">Road access</h2>
            <p className="mt-3 text-[var(--color-ink-soft)]">
              Midrand sits along the N1 highway corridor between Johannesburg and Pretoria, with surrounding arterial
              routes serving the wider Halfway House business node. Specific drive-time and route detail for 300
              Janadel Avenue will be confirmed and published here — see our outstanding content items in
              docs/content-required.md for what is still pending verification.
            </p>

            <h2 className="mt-8 font-[var(--font-display)] text-xl font-medium">Public transport</h2>
            <p className="mt-3 text-[var(--color-ink-soft)]">
              Gautrain and public bus/taxi context for this specific address has not yet been confirmed. This section
              will be updated with verified detail once available.
            </p>

            <h2 className="mt-8 font-[var(--font-display)] text-xl font-medium">Nearby business context</h2>
            <ul className="mt-3 space-y-2">
              {nearbyCategories.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-ink-soft)]">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-signal)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
