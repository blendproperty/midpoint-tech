import { z } from "zod";
import { spaceRequiredLabels, moveInTimingLabels } from "./tour-form";

export const leasingFormSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  company: z.string().trim().min(2, "Enter your company name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  spaceRequired: z.enum(Object.keys(spaceRequiredLabels) as [string, ...string[]], {
    message: "Select an approximate space requirement",
  }),
  spaceType: z.enum(["office", "serviced-office", "studio", "flex-suite", "not-sure"], {
    message: "Select a space type",
  }),
  moveInTiming: z.enum(Object.keys(moveInTimingLabels) as [string, ...string[]], {
    message: "Select a preferred move-in timing",
  }),
  message: z.string().trim().min(1, "Add a short message so we can help").max(2000),
  consent: z.literal(true, { message: "Consent is required to submit this form" }),
  website: z.string().optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  sourcePage: z.string().max(300).optional(),
  isBroker: z.boolean().optional(),
});

export type LeasingFormValues = z.infer<typeof leasingFormSchema>;
