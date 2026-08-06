import { describe, it, expect, beforeEach } from "vitest";
import { track } from "@/lib/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

beforeEach(() => {
  window.localStorage.clear();
  window.dataLayer = [];
});

describe("track", () => {
  it("does nothing without consent", () => {
    track("view_space", { slug: "block-a-suite-201" });
    expect(window.dataLayer).toHaveLength(0);
  });

  it("pushes sanitised events once consent is granted", () => {
    window.localStorage.setItem("mt-analytics-consent", "granted");
    track("view_space", { slug: "block-a-suite-201" });
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer?.[0]).toMatchObject({ event: "view_space", slug: "block-a-suite-201" });
  });

  it("strips personal fields even if a caller passes them", () => {
    window.localStorage.setItem("mt-analytics-consent", "granted");
    track("submit_tour_form", { fullName: "Jane Doe", email: "jane@acme.com", company: "Acme", spaceRequired: "150 m2" });
    const event = window.dataLayer?.[0] as Record<string, unknown>;
    expect(event.fullName).toBeUndefined();
    expect(event.email).toBeUndefined();
    expect(event.company).toBeUndefined();
    expect(event.spaceRequired).toBe("150 m2");
  });
});
