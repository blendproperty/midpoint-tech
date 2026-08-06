import { describe, it, expect } from "vitest";
import { spaces } from "@/content/spaces";
import { newsArticles } from "@/content/news";
import { spaceSchema, newsArticleSchema, tourFormSchema, leasingFormSchema } from "@/content/schema";

describe("property data validation", () => {
  it("every seeded space passes the schema", () => {
    for (const space of spaces) {
      expect(() => spaceSchema.parse(space)).not.toThrow();
    }
  });

  it("every space has at least one gallery image with alt text", () => {
    for (const space of spaces) {
      expect(space.gallery.length).toBeGreaterThan(0);
      for (const img of space.gallery) {
        expect(img.alt.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("every seeded news article passes the schema", () => {
    for (const article of newsArticles) {
      expect(() => newsArticleSchema.parse(article)).not.toThrow();
    }
  });

  it("space slugs are unique", () => {
    const slugs = spaces.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("form schemas", () => {
  it("rejects a tour form without consent", () => {
    const result = tourFormSchema.safeParse({
      fullName: "Jane Doe",
      company: "Acme",
      workEmail: "jane@acme.com",
      phone: "0110000000",
      spaceRequired: "150 m2",
      moveInTiming: "immediate",
      preferredDate: "2026-09-01",
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid tour form", () => {
    const result = tourFormSchema.safeParse({
      fullName: "Jane Doe",
      company: "Acme",
      workEmail: "jane@acme.com",
      phone: "0110000000",
      spaceRequired: "150 m2",
      moveInTiming: "immediate",
      preferredDate: "2026-09-01",
      consent: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a leasing form with an invalid email", () => {
    const result = leasingFormSchema.safeParse({
      fullName: "Jane Doe",
      company: "Acme",
      email: "not-an-email",
      phone: "0110000000",
      spaceSize: "150 m2",
      spaceType: "office-suite",
      moveInTiming: "immediate",
      consent: true,
    });
    expect(result.success).toBe(false);
  });
});
