import { describe, it, expect } from "vitest";
import { filterSpaces } from "@/lib/filter-spaces";
import { spaces } from "@/content/spaces";

describe("filterSpaces", () => {
  it("returns all spaces with no filters applied", () => {
    expect(filterSpaces(spaces, {})).toHaveLength(spaces.length);
  });

  it("filters by type", () => {
    const result = filterSpaces(spaces, { type: "office-suite" });
    expect(result.every((s) => s.type === "office-suite")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("filters by status", () => {
    const result = filterSpaces(spaces, { status: "available" });
    expect(result.every((s) => s.status === "available")).toBe(true);
  });

  it("filters by minimum size", () => {
    const result = filterSpaces(spaces, { minSize: 500 });
    expect(result.every((s) => s.glaSqm >= 500)).toBe(true);
  });

  it("sorts ascending by size by default", () => {
    const result = filterSpaces(spaces, {});
    for (let i = 1; i < result.length; i++) {
      expect(result[i].glaSqm).toBeGreaterThanOrEqual(result[i - 1].glaSqm);
    }
  });

  it("sorts descending by size when requested", () => {
    const result = filterSpaces(spaces, { sort: "size-desc" });
    for (let i = 1; i < result.length; i++) {
      expect(result[i].glaSqm).toBeLessThanOrEqual(result[i - 1].glaSqm);
    }
  });

  it("returns an empty array when no space matches", () => {
    const result = filterSpaces(spaces, { minSize: 999999 });
    expect(result).toHaveLength(0);
  });
});
