"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X, LayoutGrid, List } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { parseFilterState, buildFilterQueryString, type SpaceFilterState } from "@/lib/spaces-filter";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const typeOptions: { value: string; label: string }[] = [
  { value: "office", label: "Office" },
  { value: "serviced-office", label: "Serviced office" },
  { value: "studio", label: "Studio" },
  { value: "flex-suite", label: "Flex suite" },
];

const statusOptions: { value: string; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "coming-soon", label: "Coming soon" },
  { value: "under-offer", label: "Under offer" },
];

const sizeOptions: { label: string; min?: number; max?: number }[] = [
  { label: "Any size" },
  { label: "Under 100 m²", max: 100 },
  { label: "100–300 m²", min: 100, max: 300 },
  { label: "300–600 m²", min: 300, max: 600 },
  { label: "600 m²+", min: 600 },
];

export function SpaceFilters({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = parseFilterState(Object.fromEntries(searchParams.entries()));

  function updateFilters(next: Partial<SpaceFilterState>) {
    const merged: SpaceFilterState = { ...filters, ...next };
    const qs = buildFilterQueryString(merged);
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    trackEvent("filter_spaces", { types: merged.types.join(","), statuses: merged.statuses.join(",") });
  }

  function toggleValue(list: string[], value: string) {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  }

  const activeCount = filters.types.length + filters.statuses.length + (filters.minSize || filters.maxSize ? 1 : 0);

  const content = (
    <div className="space-y-6">
      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">Space type</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {typeOptions.map((opt) => (
            <FilterChip
              key={opt.value}
              active={filters.types.includes(opt.value as never)}
              onClick={() => updateFilters({ types: toggleValue(filters.types, opt.value) as never })}
            >
              {opt.label}
            </FilterChip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">Availability</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {statusOptions.map((opt) => (
            <FilterChip
              key={opt.value}
              active={filters.statuses.includes(opt.value as never)}
              onClick={() => updateFilters({ statuses: toggleValue(filters.statuses, opt.value) as never })}
            >
              {opt.label}
            </FilterChip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">Size range</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizeOptions.map((opt) => {
            const active = filters.minSize === opt.min && filters.maxSize === opt.max;
            return (
              <FilterChip key={opt.label} active={active} onClick={() => updateFilters({ minSize: opt.min, maxSize: opt.max })}>
                {opt.label}
              </FilterChip>
            );
          })}
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => router.push(pathname, { scroll: false })}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-signal-strong)] hover:underline"
        >
          <X className="size-3.5" aria-hidden="true" /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-line)] px-4 py-2.5 text-sm font-medium md:hidden"
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters {activeCount > 0 && `(${activeCount})`}
        </button>

        <p className="text-sm text-[var(--color-ink-soft)]" aria-live="polite">
          {resultCount} {resultCount === 1 ? "space" : "spaces"} found
        </p>

        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            Sort
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value as SpaceFilterState["sort"] })}
              className="rounded-[var(--radius-md)] border border-[var(--color-line)] px-2 py-1.5 text-sm"
            >
              <option value="size-asc">Smallest first</option>
              <option value="size-desc">Largest first</option>
            </select>
          </label>
          <div className="flex overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)]" role="group" aria-label="View">
            <button
              type="button"
              aria-pressed={filters.view === "grid"}
              onClick={() => updateFilters({ view: "grid" })}
              className={cn("p-2", filters.view === "grid" && "bg-[var(--color-ink)] text-[var(--color-paper)]")}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-pressed={filters.view === "list"}
              onClick={() => updateFilters({ view: "list" })}
              className={cn("p-2", filters.view === "list" && "bg-[var(--color-ink)] text-[var(--color-paper)]")}
              aria-label="List view"
            >
              <List className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 hidden md:block">{content}</div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filter spaces">
        {content}
      </Drawer>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
          : "border-[var(--color-line)] bg-white hover:border-[var(--color-ink)]",
      )}
    >
      {children}
    </button>
  );
}
