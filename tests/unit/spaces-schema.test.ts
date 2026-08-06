import { describe, it, expect } from "vitest";
import { spaces } from "@/lib/content/spaces";
import { spacesCollectionSchema } from "@/lib/content/spaces.schema";

describe("spaces content", () => {
  it("all seed spaces validate against the schema", () => {
    expect(() => spacesCollectionSchema.parse(spaces)).not.toThrow();
  });

  it("every seed space is flagged as sample data", () => {
    for (const space of spaces) {
      expect(space.sample).toBe(true);
    }
  });

  it("has unique slugs", () => {
    const slugs = spaces.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every space has at least one image with alt text", () => {
    for (const space of spaces) {
      expect(space.images.length).toBeGreaterThan(0);
      for (const image of space.images) {
        expect(image.alt.length).toBeGreaterThan(0);
      }
    }
  });
});
