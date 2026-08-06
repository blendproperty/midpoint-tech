import { describe, it, expect } from "vitest";
import { tourFormSchema } from "@/lib/validation/tour-form";
import { leasingFormSchema } from "@/lib/validation/leasing-form";

const validTour = {
  fullName: "Jane Founder",
  company: "Acme Software",
  workEmail: "jane@acmesoftware.co.za",
  phone: "+27 82 000 0000",
  spaceRequired: "100-300",
  moveInTiming: "3-months",
  preferredVisitDate: "2026-09-01",
  message: "",
  consent: true,
  website: "",
};

describe("tourFormSchema", () => {
  it("accepts a valid submission", () => {
    expect(tourFormSchema.safeParse(validTour).success).toBe(true);
  });

  it("rejects a missing consent", () => {
    const result = tourFormSchema.safeParse({ ...validTour, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = tourFormSchema.safeParse({ ...validTour, workEmail: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("still validates successfully when the honeypot field is filled (API layer, not the schema, silently discards bot submissions)", () => {
    const result = tourFormSchema.safeParse({ ...validTour, website: "http://spam.example" });
    expect(result.success).toBe(true);
  });
});

describe("leasingFormSchema", () => {
  const validLeasing = {
    fullName: "Sam Broker",
    company: "Gauteng Commercial Brokers",
    email: "sam@brokers.co.za",
    phone: "+27 82 111 1111",
    spaceRequired: "300-600",
    spaceType: "office",
    moveInTiming: "6-months",
    message: "Looking for space on behalf of a client.",
    consent: true,
    website: "",
  };

  it("accepts a valid submission", () => {
    expect(leasingFormSchema.safeParse(validLeasing).success).toBe(true);
  });

  it("requires a non-empty message", () => {
    const result = leasingFormSchema.safeParse({ ...validLeasing, message: "" });
    expect(result.success).toBe(false);
  });
});
