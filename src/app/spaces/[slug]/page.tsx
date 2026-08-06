import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Gallery } from "@/components/ui/gallery";
import { SpecTable } from "@/components/spaces/spec-table";
import { StickyEnquiry } from "@/components/spaces/sticky-enquiry";
import { SpaceCard } from "@/components/spaces/space-card";
import { spaces, getSpaceBySlug, getRelatedSpaces } from "@/lib/content/spaces";
import { formatSize } from "@/lib/utils";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/content/site";

export function generateStaticParams() {
  return spaces.map((space) => ({ slug: space.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const space = getSpaceBySlug(slug);
  if (!space) return {};
  return buildMetadata({
    title: `${space.name} — ${formatSize(space.sizeSqm)} in Midrand`,
    description: space.summary,
    path: `/spaces/${space.slug}`,
  });
}

export default async function SpaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const space = getSpaceBySlug(slug);
  if (!space) notFound();

  const related = getRelatedSpaces(space);
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Spaces", path: "/spaces" },
    { name: space.name, path: `/spaces/${space.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />
      <Section className="pt-32">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Spaces", href: "/spaces" }, { label: space.name }]} />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge tone={space.status} />
            <Badge tone="sample" />
          </div>

          <Heading as="h1" className="mt-3">
            {space.name}
          </Heading>
          <p className="mt-2 text-[var(--color-ink-soft)]">
            {space.buildingReference} · {siteConfig.address.line1}, {siteConfig.address.city}
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-10">
              <Gallery images={space.images} itemName={space.name} />

              <div>
                <h2 className="font-[var(--font-display)] text-xl font-medium">About this space</h2>
                <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">{space.description}</p>
              </div>

              <div>
                <h2 className="font-[var(--font-display)] text-xl font-medium">Highlights</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {space.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-[var(--color-ink-soft)]">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-signal)]" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-[var(--font-display)] text-xl font-medium">Key facts</h2>
                <div className="mt-3">
                  <SpecTable
                    specs={[
                      { label: "Gross lettable area", value: formatSize(space.sizeSqm) },
                      { label: "Floor", value: space.floor ?? "On request" },
                      { label: "Rental", value: space.rentalDisplay === "approved" ? `${space.rentalPerSqm} / m²` : "On request" },
                      { label: "Available from", value: space.availableFrom },
                      { label: "Parking bays", value: space.parkingBays !== undefined ? String(space.parkingBays) : "On request" },
                      ...space.specifications,
                    ]}
                  />
                </div>
              </div>

              {space.floorPlan && (
                <div>
                  <h2 className="font-[var(--font-display)] text-xl font-medium">Floor plan</h2>
                  <div className="mt-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={space.floorPlan.src} alt={space.floorPlan.alt} className="w-full" />
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-ink-soft)]">{space.floorPlan.alt}</p>
                </div>
              )}

              <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-dim)] p-6">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-[var(--color-ink-soft)]" aria-hidden="true" />
                  <p className="text-sm">
                    {space.brochureUrl
                      ? "Download the brochure for full specifications."
                      : "A downloadable brochure for this space is not yet available. Contact the leasing team for full specifications."}
                  </p>
                </div>
                {space.brochureUrl && (
                  <Link href={space.brochureUrl} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-signal-strong)] hover:underline">
                    <Download className="size-4" aria-hidden="true" /> Download brochure
                  </Link>
                )}
              </div>
            </div>

            <div>
              <StickyEnquiry spaceName={space.name} />
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-[var(--color-line)] bg-[var(--color-paper-dim)]">
          <Container>
            <Heading as="h2">Related spaces</Heading>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <SpaceCard key={s.slug} space={s} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
