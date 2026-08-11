import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { spaces } from "@/content/spaces";

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

        <RevealGroup className="mt-14 flex flex-col md:mt-20" stagger={0.1}>
          {preview.map((space, i) => (
            <RevealItem key={space.slug}>
              <Link
                href={`/spaces/${space.slug}`}
                className="group grid gap-8 border-t border-ink-900/15 py-10 first:border-t md:grid-cols-[0.9fr_1.4fr_0.9fr] md:items-center md:gap-12 md:py-14"
              >
                <div>
                  <p className="tick-label text-ink-600">{String(i + 1).padStart(2, "0")} · {space.buildingReference}</p>
                  <p className="mt-4 font-display leading-none text-ink-900">
                    <span className="text-step-5 font-semibold">{Math.round(space.glaSqm)}</span>
                    <span className="ml-1 text-step-1 align-top text-ink-600">m²</span>
                  </p>
                </div>

                <MediaFrame
                  media={space.gallery[0]}
                  className="aspect-[16/10] order-first md:order-none"
                  sizes="(min-width:768px) 45vw, 100vw"
                  zoomOnHover
                />

                <div className="flex flex-col gap-3">
                  <StatusBadge status={space.status} />
                  <h3 className="font-display text-2xl font-semibold text-ink-900 group-hover:text-teal-600">
                    {space.name}
                  </h3>
                  <p className="text-ink-700">{space.summary}</p>
                  <p className="mt-2 inline-flex items-center gap-2 font-medium text-ink-900">
                    View space
                    <span
                      aria-hidden
                      className="inline-block h-px w-6 bg-current transition-all duration-300 group-hover:w-10"
                    />
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
