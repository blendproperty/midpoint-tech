"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, List, X } from "lucide-react";
import { spaces } from "@/content/spaces";
import { filterSpaces } from "@/lib/filter-spaces";
import type { Space, SpaceType, AvailabilityStatus } from "@/content/schema";
import { StatusBadge } from "@/components/ui/Badge";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatSqm } from "@/lib/utils";
import { track } from "@/lib/analytics";

const typeLabels: Record<SpaceType, string> = {
  "office-suite": "Office suite",
  "full-floor": "Full floor",
  "shell-and-core": "Shell and core",
  "co-working-desk": "Co-working desk",
};

const statusOptions: AvailabilityStatus[] = ["available", "under-offer", "coming-soon", "leased"];
const typeOptions: SpaceType[] = ["office-suite", "full-floor", "shell-and-core", "co-working-desk"];

export function SpacesExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const type = searchParams.get("type") ?? "";
  const status = searchParams.get("status") ?? "";
  const minSize = Number(searchParams.get("min") ?? 0);
  const sort = searchParams.get("sort") ?? "size-asc";

  function updateParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value) params.delete(key);
      else params.set(key, value);
    }
    startTransition(() => router.push(`${pathname}?${params.toString()}`, { scroll: false }));
    track("filter_spaces", next);
  }

  const filtered = useMemo(
    () =>
      filterSpaces(spaces, {
        type: type as SpaceType | "",
        status: status as AvailabilityStatus | "",
        minSize,
        sort: sort as "size-asc" | "size-desc",
      }),
    [type, status, minSize, sort]
  );

  const hasFilters = Boolean(type || status || minSize);

  const FilterControls = (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="filter-type" className="tick-label text-ink-700">Space type</label>
        <select
          id="filter-type"
          value={type}
          onChange={(e) => updateParams({ type: e.target.value || null })}
          className="mt-2 w-full border border-ink-900/25 bg-white px-3 py-2 text-sm"
        >
          <option value="">All types</option>
          {typeOptions.map((t) => (
            <option key={t} value={t}>{typeLabels[t]}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-status" className="tick-label text-ink-700">Availability</label>
        <select
          id="filter-status"
          value={status}
          onChange={(e) => updateParams({ status: e.target.value || null })}
          className="mt-2 w-full border border-ink-900/25 bg-white px-3 py-2 text-sm"
        >
          <option value="">Any status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s.replace("-", " ")}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-min" className="tick-label text-ink-700">Minimum size (m²)</label>
        <input
          id="filter-min"
          type="number"
          min={0}
          value={minSize || ""}
          onChange={(e) => updateParams({ min: e.target.value || null })}
          className="mt-2 w-full border border-ink-900/25 bg-white px-3 py-2 text-sm"
          placeholder="e.g. 100"
        />
      </div>
      <div>
        <label htmlFor="filter-sort" className="tick-label text-ink-700">Sort by</label>
        <select
          id="filter-sort"
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="mt-2 w-full border border-ink-900/25 bg-white px-3 py-2 text-sm"
        >
          <option value="size-asc">Size — smallest first</option>
          <option value="size-desc">Size — largest first</option>
        </select>
      </div>
      {hasFilters && (
        <button
          type="button"
          onClick={() => updateParams({ type: null, status: null, min: null })}
          className="tick-label inline-flex items-center gap-1 self-start text-teal-600 hover:text-teal-500"
        >
          <X className="h-3.5 w-3.5" /> Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-10 md:grid-cols-[240px_1fr]">
      <aside className="hidden md:block" aria-label="Filter spaces">{FilterControls}</aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-900/10 pb-4">
          <p className="text-sm text-ink-700" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "space" : "spaces"} found
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="tick-label border border-ink-900/25 px-3 py-2 md:hidden"
            >
              Filters
            </button>
            <div className="hidden items-center gap-1 border border-ink-900/15 p-1 md:flex" role="group" aria-label="Toggle layout">
              <button type="button" aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => setView("grid")} className={`p-1.5 ${view === "grid" ? "bg-ink-900 text-stone-100" : "text-ink-700"}`}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button type="button" aria-pressed={view === "list"} aria-label="List view" onClick={() => setView("list")} className={`p-1.5 ${view === "list" ? "bg-ink-900 text-stone-100" : "text-ink-700"}`}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No spaces match those filters"
              description="Try widening your size range or clearing a filter to see more available spaces."
              action={
                <button type="button" onClick={() => updateParams({ type: null, status: null, min: null })} className="tick-label text-teal-600 hover:text-teal-500">
                  Clear filters
                </button>
              }
            />
          </div>
        ) : (
          <div className={view === "grid" ? "mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3" : "mt-8 flex flex-col divide-y divide-ink-900/10"}>
            {filtered.map((space) =>
              view === "grid" ? <SpaceCard key={space.slug} space={space} /> : <SpaceRow key={space.slug} space={space} />
            )}
          </div>
        )}
      </div>

      {drawerOpen && (
        <div role="dialog" aria-modal="true" aria-label="Filter spaces" className="fixed inset-0 z-50 flex md:hidden">
          <button aria-label="Close filters" onClick={() => setDrawerOpen(false)} className="flex-1 bg-ink-950/60" />
          <div className="w-[85%] max-w-sm overflow-y-auto bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-lg font-semibold text-ink-900">Filters</p>
              <button aria-label="Close filters" onClick={() => setDrawerOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            {FilterControls}
          </div>
        </div>
      )}
    </div>
  );
}

function SpaceCard({ space }: { space: Space }) {
  return (
    <Link href={`/spaces/${space.slug}`} onClick={() => track("view_space", { slug: space.slug })} className="group flex flex-col border border-ink-900/12 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-brass-500/40 hover:shadow-[0_20px_40px_-24px_rgba(15,28,24,0.35)]">
      <MediaFrame media={space.gallery[0]} className="aspect-[4/3]" sizes="(min-width:1280px) 33vw, (min-width:640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <StatusBadge status={space.status} />
          <span className="text-sm text-ink-700">{space.buildingReference}</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-ink-900 group-hover:text-teal-600">{space.name}</h3>
        <p className="text-sm text-ink-700">{typeLabels[space.type]}</p>
        <dl className="mt-auto flex items-center justify-between border-t border-ink-900/10 pt-4 text-sm">
          <div><dt className="text-ink-600">Size</dt><dd className="font-medium text-ink-900">{formatSqm(space.glaSqm)}</dd></div>
          <div className="text-right"><dt className="text-ink-600">Rental</dt><dd className="font-medium text-ink-900">On request</dd></div>
        </dl>
      </div>
    </Link>
  );
}

function SpaceRow({ space }: { space: Space }) {
  return (
    <Link href={`/spaces/${space.slug}`} onClick={() => track("view_space", { slug: space.slug })} className="group flex items-center gap-6 py-5">
      <MediaFrame media={space.gallery[0]} className="h-24 w-32 shrink-0" sizes="128px" />
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-lg font-semibold text-ink-900 group-hover:text-teal-600">{space.name}</h3>
          <StatusBadge status={space.status} />
        </div>
        <p className="mt-1 text-sm text-ink-700">{space.buildingReference} · {typeLabels[space.type]} · {formatSqm(space.glaSqm)}</p>
      </div>
    </Link>
  );
}
