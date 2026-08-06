import { describe, it, expect } from "vitest";
import { sanitizeEventPayload } from "@/lib/analytics";

describe("sanitizeEventPayload", () => {
  it("strips keys that look like personal data", () => {
    const clean = sanitizeEventPayload({
      email: "user@example.com",
      phone: "+27821234567",
      fullName: "Someone",
      message: "hello",
      spaceType: "office",
    });
    expect(clean).toEqual({ spaceType: "office" });
  });

  it("strips nested objects defensively", () => {
    const clean = sanitizeEventPayload({ nested: { a: 1 }, count: 3 });
    expect(clean).toEqual({ count: 3 });
  });

  it("keeps safe categorical/numeric values", () => {
    const clean = sanitizeEventPayload({ location: "hero", index: 2, isBroker: true });
    expect(clean).toEqual({ location: "hero", index: 2, isBroker: true });
  });
});
