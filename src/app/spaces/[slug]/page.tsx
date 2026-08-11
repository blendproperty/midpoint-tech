import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Download, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Gallery } from "@/components/ui/Gallery";
import { spaces, getSpaceBySlug, getRelatedSpaces } from "@/content/spaces";
import { site } from "@/content/site";
import { formatSqm, formatDate, absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return spaces.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const space = getSpaceBySlug(slug);
  if (!space) return {};
  return {
    title: `${space.name}, ${space.buildingReference}`,
    description: space.summary,
    alternates: { canonical: `/spaces/${space.slug}` },
    openGraph: { title: space.name, description: space.summary, url: absoluteUrl(`/spaces/${space.slug}`) },
  };
}

export default async function SpaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const space = getSpaceBySlug(slug);
  if (!space) notFound();

  const related = getRelatedSpaces(space);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${space.name}, ${space.buildingReference}`,
    description: space.summary,
    offers: { "@type": "Offer", availability: space.status === "available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder", priceCurrency: "ZAR" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section tone="stone" className="pb-0 pt-10">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Spaces", href: "/spaces" }, { label: space.name }]}
          />
        </Container>
      </Section>

      <Section tone="stone" className="pt-6">
        <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Gallery media={space.gallery} name={space.name} />

            <div className="mt-10">
              <p className="tick-label text-ink-600">{space.buildingReference} · {space.floor}</p>
              <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-3">
                <p className="font-display leading-none text-ink-900">
                  <span className="text-step-5 font-semibold">{Math.round(space.glaSqm)}</span>
                  <span className="ml-1 text-step-1 align-top text-ink-600">m²</span>
                </p>
                <StatusBadge status={space.status} />
              </div>
              <h1 className="mt-4 text-step-3 font-display font-semibold text-ink-900">{space.name}</h1>
            </div>

            <p className="mt-6 max-w-2xl text-lg text-ink-700">{space.summary}</p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="tick-label text-ink-700">Highlights</h2>
                <ul className="mt-3 space-y-2">
                  {space.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-ink-800">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="tick-label text-ink-700">Key facts</h2>
                <dl className="mt-3 space-y-2 text-sm">
                  <Fact label="Availability date" value={formatDate(space.availableFrom)} />
                  <Fact label="Rental" value="On request" />
                  <Fact label="Parking bays" value={space.parkingBays ? String(space.parkingBays) : "Confirm with leasing team"} />
                </dl>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="tick-label text-ink-700">Specification</h2>
              <dl className="mt-4 divide-y divide-ink-900/10 border-t border-ink-900/10">
                {space.specification.map((row) => (
                  <div key={row.label} className="grid grid-cols-[160px_1fr] gap-4 py-3 text-sm">
                    <dt className="text-ink-600">{row.label}</dt>
                    <dd className="text-ink-900">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {space.floorPlan && (
              <div className="mt-12">
                <div className="flex items-center justify-between">
                  <h2 className="tick-label text-ink-700">Floor plan</h2>
                  <span className="text-xs text-ink-600">Sample plan — replace before launch</span>
                </div>
                <MediaFrame media={space.floorPlan} className="mt-4 aspect-[4/3] max-w-xl border border-ink-900/10" />
              </div>
            )}

            <div className="mt-12 flex items-center gap-2 text-sm text-ink-700">
              <MapPin className="h-4 w-4 text-brass-600" />
              <Link href="/location" className="hover:text-teal-500 hover:underline underline-offset-4">
                {site.address.line1}, {site.address.city}
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-ink-900/12 bg-white p-6">
              <p className="font-display text-lg font-semibold text-ink-900">Interested in this space?</p>
              <p className="mt-2 text-sm text-ink-700">Book a tour or send an enquiry and the leasing team will follow up directly.</p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href={`/contact?journey=tour&space=${space.slug}`} variant="primary" className="justify-center">
                  Book a tour
                </Button>
                <Button href={`/contact?journey=leasing&space=${space.slug}`} variant="secondary" className="justify-center">
                  Enquire about leasing
                </Button>
                {space.brochureUrl ? (
                  <Button href={space.brochureUrl} variant="ghost" className="justify-center">
                    <Download className="h-4 w-4" /> Download brochure
                  </Button>
                ) : (
                  <p className="text-center text-xs text-ink-600">Brochure available on request</p>
                )}
              </div>
            </div>
          </aside>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="raised">
          <Container>
            <h2 className="text-step-2 font-display font-semibold text-ink-900">Related spaces</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/spaces/${r.slug}`} className="group flex flex-col border border-ink-900/12">
                  <MediaFrame media={r.gallery[0]} className="aspect-[4/3]" sizes="(min-width:1024px) 33vw, 100vw" />
                  <div className="p-5">
                    <StatusBadge status={r.status} />
                    <p className="mt-2 font-display font-semibold text-ink-900 group-hover:text-teal-600">{r.name}</p>
                    <p className="text-sm text-ink-700">{formatSqm(r.glaSqm)} · {r.buildingReference}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-ink-900/10 pb-2">
      <dt className="text-ink-600">{label}</dt>
      <dd className="font-medium text-ink-900">{value}</dd>
    </div>
  );
}
