import { z } from "zod";

/**
 * All property / content data flows through these Zod schemas.
 * `isSample` marks records that are placeholder/development data
 * and MUST be replaced before public launch — see docs/content-required.md.
 */

export const spaceTypeEnum = z.enum([
  "office-suite",
  "full-floor",
  "shell-and-core",
  "co-working-desk",
]);
export type SpaceType = z.infer<typeof spaceTypeEnum>;

export const availabilityStatusEnum = z.enum([
  "available",
  "under-offer",
  "coming-soon",
  "leased",
]);
export type AvailabilityStatus = z.infer<typeof availabilityStatusEnum>;

export const mediaSchema = z.object({
  src: z.string(),
  alt: z.string().min(3, "Alt text is required for every image"),
  width: z.number().optional(),
  height: z.number().optional(),
});
export type Media = z.infer<typeof mediaSchema>;

export const spaceSchema = z.object({
  slug: z.string(),
  name: z.string(),
  buildingReference: z.string(),
  type: spaceTypeEnum,
  status: availabilityStatusEnum,
  glaSqm: z.number().positive(),
  floor: z.string(),
  rentalPerSqm: z.number().positive().nullable(),
  rentalDisplay: z.enum(["approved", "on-request"]),
  availableFrom: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()).min(1),
  specification: z.array(z.object({ label: z.string(), value: z.string() })),
  parkingBays: z.number().nullable(),
  gallery: z.array(mediaSchema).min(1),
  floorPlan: mediaSchema.nullable(),
  brochureUrl: z.string().nullable(),
  isSample: z.boolean().default(true),
});
export type Space = z.infer<typeof spaceSchema>;

export const newsArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.enum(["announcement", "insight", "event"]),
  publishedAt: z.string(),
  excerpt: z.string(),
  body: z.array(z.string()),
  cover: mediaSchema,
  isSample: z.boolean().default(true),
});
export type NewsArticle = z.infer<typeof newsArticleSchema>;

export const tourFormSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  company: z.string().min(2, "Enter your company name"),
  workEmail: z.string().email("Enter a valid work email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  spaceRequired: z.string().min(1, "Let us know roughly how much space you need"),
  moveInTiming: z.enum(["immediate", "1-3-months", "3-6-months", "6-months-plus", "just-exploring"]),
  preferredDate: z.string().min(1, "Choose a preferred visit date"),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, { message: "Please confirm you agree to be contacted" }),
  honeypot: z.string().max(0).optional(),
  utm: z.record(z.string(), z.string()).optional(),
  sourcePage: z.string().optional(),
});
export type TourFormValues = z.infer<typeof tourFormSchema>;

export const leasingFormSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  company: z.string().min(2, "Enter your company name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  spaceSize: z.string().min(1, "Let us know roughly how much space you need"),
  spaceType: spaceTypeEnum,
  moveInTiming: z.enum(["immediate", "1-3-months", "3-6-months", "6-months-plus", "just-exploring"]),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, { message: "Please confirm you agree to be contacted" }),
  honeypot: z.string().max(0).optional(),
  utm: z.record(z.string(), z.string()).optional(),
  sourcePage: z.string().optional(),
});
export type LeasingFormValues = z.infer<typeof leasingFormSchema>;

export const generalEnquirySchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7).optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a little more"),
  consent: z.literal(true, { message: "Please confirm you agree to be contacted" }),
  honeypot: z.string().max(0).optional(),
  sourcePage: z.string().optional(),
});
export type GeneralEnquiryValues = z.infer<typeof generalEnquirySchema>;
