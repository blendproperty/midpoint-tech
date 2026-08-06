import type { Space, SpaceType, AvailabilityStatus } from "./content/spaces.schema";

export type SpaceSort = "size-asc" | "size-desc";
export type SpaceView = "grid" | "list";

export type SpaceFilterState = {
  types: SpaceType[];
  statuses: AvailabilityStatus[];
  minSize?: number;
  maxSize?: number;
  sort: SpaceSort;
  view: SpaceView;
};

const ALL_TYPES: SpaceType[] = ["office", "serviced-office", "studio", "flex-suite"];
const ALL_STATUSES: AvailabilityStatus[] = ["available", "coming-soon", "under-offer", "leased"];

export function parseFilterState(searchParams: Record<string, string | string[] | undefined>): SpaceFilterState {
  const typesParam = toSingle(searchParams.type);
  const statusesParam = toSingle(searchParams.status);
  const min = toSingle(searchParams.min);
  const max = toSingle(searchParams.max);
  const sort = toSingle(searchParams.sort);
  const view = toSingle(searchParams.view);

  return {
    types: typesParam ? (typesParam.split(",").filter((t): t is SpaceType => ALL_TYPES.includes(t as SpaceType))) : [],
    statuses: statusesParam
      ? statusesParam.split(",").filter((s): s is AvailabilityStatus => ALL_STATUSES.includes(s as AvailabilityStatus))
      : [],
    minSize: min ? Number(min) : undefined,
    maxSize: max ? Number(max) : undefined,
    sort: sort === "size-desc" ? "size-desc" : "size-asc",
    view: view === "list" ? "list" : "grid",
  };
}

function toSingle(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function filterAndSortSpaces(spaces: Space[], filters: SpaceFilterState): Space[] {
  let result = spaces.filter((space) => {
    if (filters.types.length > 0 && !filters.types.includes(space.type)) return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(space.status)) return false;
    if (filters.minSize !== undefined && space.sizeSqm < filters.minSize) return false;
    if (filters.maxSize !== undefined && space.sizeSqm > filters.maxSize) return false;
    return true;
  });

  result = [...result].sort((a, b) =>
    filters.sort === "size-desc" ? b.sizeSqm - a.sizeSqm : a.sizeSqm - b.sizeSqm,
  );

  return result;
}

export function buildFilterQueryString(filters: SpaceFilterState): string {
  const params = new URLSearchParams();
  if (filters.types.length) params.set("type", filters.types.join(","));
  if (filters.statuses.length) params.set("status", filters.statuses.join(","));
  if (filters.minSize !== undefined) params.set("min", String(filters.minSize));
  if (filters.maxSize !== undefined) params.set("max", String(filters.maxSize));
  if (filters.sort !== "size-asc") params.set("sort", filters.sort);
  if (filters.view !== "grid") params.set("view", filters.view);
  return params.toString();
}
