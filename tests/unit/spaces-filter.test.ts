import { describe, it, expect } from "vitest";
import { parseFilterState, filterAndSortSpaces, buildFilterQueryString } from "@/lib/spaces-filter";
import { spaces } from "@/lib/content/spaces";

describe("parseFilterState", () => {
  it("defaults to no filters, size-asc sort, grid view", () => {
    const state = parseFilterState({});
    expect(state.types).toEqual([]);
    expect(state.statuses).toEqual([]);
    expect(state.sort).toBe("size-asc");
    expect(state.view).toBe("grid");
  });

  it("parses comma-separated type and status params", () => {
    const state = parseFilterState({ type: "office,studio", status: "available" });
    expect(state.types).toEqual(["office", "studio"]);
    expect(state.statuses).toEqual(["available"]);
  });

  it("ignores invalid type values", () => {
    const state = parseFilterState({ type: "office,not-a-type" });
    expect(state.types).toEqual(["office"]);
  });

  it("round-trips through buildFilterQueryString", () => {
    const state = parseFilterState({ type: "office", min: "100", max: "300", sort: "size-desc", view: "list" });
    const qs = buildFilterQueryString(state);
    const reparsed = parseFilterState(Object.fromEntries(new URLSearchParams(qs)));
    expect(reparsed).toEqual(state);
  });
});

describe("filterAndSortSpaces", () => {
  it("filters by type", () => {
    const result = filterAndSortSpaces(spaces, parseFilterState({ type: "studio" }));
    expect(result.every((s) => s.type === "studio")).toBe(true);
  });

  it("filters by size range", () => {
    const result = filterAndSortSpaces(spaces, parseFilterState({ min: "200", max: "400" }));
    expect(result.every((s) => s.sizeSqm >= 200 && s.sizeSqm <= 400)).toBe(true);
  });

  it("sorts ascending by size by default", () => {
    const result = filterAndSortSpaces(spaces, parseFilterState({}));
    for (let i = 1; i < result.length; i++) {
      expect(result[i].sizeSqm).toBeGreaterThanOrEqual(result[i - 1].sizeSqm);
    }
  });

  it("sorts descending when requested", () => {
    const result = filterAndSortSpaces(spaces, parseFilterState({ sort: "size-desc" }));
    for (let i = 1; i < result.length; i++) {
      expect(result[i].sizeSqm).toBeLessThanOrEqual(result[i - 1].sizeSqm);
    }
  });

  it("returns an empty array when no space matches", () => {
    const result = filterAndSortSpaces(spaces, parseFilterState({ min: "999999" }));
    expect(result).toEqual([]);
  });
});
