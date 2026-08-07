import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { spaces } from "@/content/spaces";
import { formatSqm } from "@/lib/utils";
import Link from "next/link";

export function AvailabilityPreview() {
  const preview = spaces.slice(0, 3);

  return (
    <Section tone="stone">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Available now</Eyebrow>
            <h2 className="mt-4 text-step-3 font-display font-semibold text-ink-900">Spaces ready to view</h2>
          </div>
          <Button href="/spaces" variant="secondary">
            View all availability
          </Button>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-8 md:grid-cols-3" stagger={0.12}>
          {preview.map((space) => (
            <RevealItem key={space.slug}>
              <Link
                href={`/spaces/${space.slug}`}
                className="group flex h-full flex-col border border-ink-900/12 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-24px_rgba(15,28,24,0.35)] hover:border-brass-500/40"
              >
                <MediaFrame
                  media={space.gallery[0]}
                  className="aspect-[4/3]"
                  sizes="(min-width:768px) 33vw, 100vw"
                  zoomOnHover
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={space.status} />
                    <span className="text-sm text-ink-700">{space.buildingReference}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink-900 group-hover:text-teal-600">
                    {space.name}
                  </h3>
                  <p className="text-sm text-ink-700">{space.summary}</p>
                  <dl className="mt-auto flex items-center justify-between border-t border-ink-900/10 pt-4 text-sm">
                    <div>
                      <dt className="text-ink-600">Size</dt>
                      <dd className="font-medium text-ink-900">{formatSqm(space.glaSqm)}</dd>
                    </div>
                    <div className="text-right">
                      <dt className="text-ink-600">Rental</dt>
                      <dd className="font-medium text-ink-900">On request</dd>
                    </div>
                  </dl>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
