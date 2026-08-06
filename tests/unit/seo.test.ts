import { describe, it, expect } from "vitest";
import { absoluteUrl, buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

describe("seo helpers", () => {
  it("builds an absolute URL from a relative path", () => {
    expect(absoluteUrl("/spaces")).toMatch(/\/spaces$/);
    expect(absoluteUrl("/spaces")).toMatch(/^https?:\/\//);
  });

  it("buildMetadata sets a canonical URL matching the path", () => {
    const metadata = buildMetadata({ title: "Test", description: "Test description", path: "/about" });
    expect(metadata.alternates?.canonical).toMatch(/\/about$/);
  });

  it("buildMetadata marks noIndex pages correctly", () => {
    const metadata = buildMetadata({ title: "t", description: "d", path: "/x", noIndex: true });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("breadcrumbJsonLd produces a positioned ItemList", () => {
    const jsonLd = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Spaces", path: "/spaces" },
    ]);
    expect(jsonLd.itemListElement).toHaveLength(2);
    expect(jsonLd.itemListElement[0].position).toBe(1);
    expect(jsonLd.itemListElement[1].position).toBe(2);
  });
});
