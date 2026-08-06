import type { Space, SpaceType, AvailabilityStatus } from "@/content/schema";

export interface SpaceFilters {
  type?: SpaceType | "";
  status?: AvailabilityStatus | "";
  minSize?: number;
  sort?: "size-asc" | "size-desc";
}

/** Pure filter/sort function — kept separate from SpacesExplorer so it is unit-testable without rendering. */
export function filterSpaces(spaces: Space[], filters: SpaceFilters): Space[] {
  let list = spaces.filter((s) => {
    if (filters.type && s.type !== filters.type) return false;
    if (filters.status && s.status !== filters.status) return false;
    if (filters.minSize && s.glaSqm < filters.minSize) return false;
    return true;
  });
  list = [...list].sort((a, b) =>
    filters.sort === "size-desc" ? b.glaSqm - a.glaSqm : a.glaSqm - b.glaSqm
  );
  return list;
}
