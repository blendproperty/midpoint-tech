import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { SpaceFilters } from "@/components/spaces/space-filters";
import { SpaceCard } from "@/components/spaces/space-card";
import { SpaceListRow } from "@/components/spaces/space-list-row";
import { spaces } from "@/lib/content/spaces";
import { parseFilterState, filterAndSortSpaces } from "@/lib/spaces-filter";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Available office and studio space in Midrand",
  description:
    "Browse current availability at Midpoint Tech, 300 Janadel Avenue, Midrand — offices, studios, serviced offices and flex suites for technology teams.",
  path: "/spaces",
});

export default async function SpacesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const filters = parseFilterState(resolvedParams);
  const results = filterAndSortSpaces(spaces, filters);

  return (
    <Section className="pt-32">
      <Container>
        <Heading as="h1" eyebrow="Availability">
          Find your space at Midpoint Tech
        </Heading>
        <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)]">
          Filter by space type, availability and size. All listings below are sample data pending confirmation from
          the leasing team — see our{" "}
          <a href="/contact" className="underline">
            contact page
          </a>{" "}
          to confirm current, verified availability.
        </p>

        <div className="mt-10">
          <Suspense>
            <SpaceFilters resultCount={results.length} />
          </Suspense>

          {results.length === 0 ? (
            <EmptyState
              title="No spaces match these filters"
              description="Try widening your size range or clearing a filter, or speak to the leasing team about upcoming availability."
              action={<Button href="/contact">Speak to leasing</Button>}
            />
          ) : filters.view === "list" ? (
            <div>
              {results.map((space) => (
                <SpaceListRow key={space.slug} space={space} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((space) => (
                <SpaceCard key={space.slug} space={space} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
