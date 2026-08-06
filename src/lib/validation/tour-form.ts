import { z } from "zod";

export const tourFormSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  company: z.string().trim().min(2, "Enter your company name").max(120),
  workEmail: z.string().trim().email("Enter a valid work email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  spaceRequired: z.enum(["under-100", "100-300", "300-600", "600-plus", "not-sure"], {
    message: "Select an approximate space requirement",
  }),
  moveInTiming: z.enum(["immediate", "3-months", "6-months", "12-months-plus", "exploring"], {
    message: "Select a preferred move-in timing",
  }),
  preferredVisitDate: z.string().trim().min(1, "Select a preferred visit date"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Consent is required to submit this form" }),
  // Honeypot — must remain empty for a genuine human submission. This is
  // intentionally permissive at the schema level (not rejected) so that a
  // filled honeypot can be silently discarded at the API layer instead of
  // returning a validation error that would tip off automated spam.
  website: z.string().optional(),
  // Attribution, populated client-side, validated loosely.
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  sourcePage: z.string().max(300).optional(),
});

export type TourFormValues = z.infer<typeof tourFormSchema>;

export const spaceRequiredLabels: Record<TourFormValues["spaceRequired"], string> = {
  "under-100": "Under 100 m²",
  "100-300": "100–300 m²",
  "300-600": "300–600 m²",
  "600-plus": "600 m²+",
  "not-sure": "Not sure yet",
};

export const moveInTimingLabels: Record<TourFormValues["moveInTiming"], string> = {
  immediate: "Immediately",
  "3-months": "Within 3 months",
  "6-months": "Within 6 months",
  "12-months-plus": "12 months or more",
  exploring: "Just exploring options",
};
