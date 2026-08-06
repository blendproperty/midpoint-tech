import { describe, it, expect } from "vitest";
import { formatSqm, formatDate, absoluteUrl, cn } from "@/lib/utils";

describe("formatSqm", () => {
  it("formats with the m² suffix and thousands separator", () => {
    expect(formatSqm(940)).toBe("940 m²");
    expect(formatSqm(1234)).toContain("m²");
  });
});

describe("formatDate", () => {
  it("formats an ISO date as a readable long date", () => {
    const result = formatDate("2026-06-02");
    expect(result).toContain("2026");
    expect(result).toContain("June");
  });
});

describe("absoluteUrl", () => {
  it("builds an absolute URL from a relative path", () => {
    const result = absoluteUrl("/spaces");
    expect(result.startsWith("http")).toBe(true);
    expect(result.endsWith("/spaces")).toBe(true);
  });
});

describe("cn", () => {
  it("merges class names, dropping falsy values", () => {
    expect(cn("a", false, "b", undefined, "c")).toBe("a b c");
  });
});
