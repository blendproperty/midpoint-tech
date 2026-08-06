import { z } from "zod";

export const spaceTypeEnum = z.enum(["office", "serviced-office", "studio", "flex-suite"]);
export type SpaceType = z.infer<typeof spaceTypeEnum>;

export const availabilityStatusEnum = z.enum(["available", "coming-soon", "under-offer", "leased"]);
export type AvailabilityStatus = z.infer<typeof availabilityStatusEnum>;

/**
 * `sample` is required and must be `true` for every seed record until the
 * client supplies verified unit data. Rendering code uses this flag to
 * display a "sample data" indicator and must never hide it in a way that
 * misrepresents seed data as a real listing.
 */
export const spaceSchema = z.object({
  slug: z.string().min(1),
  sample: z.literal(true),
  name: z.string().min(1),
  buildingReference: z.string().min(1),
  type: spaceTypeEnum,
  status: availabilityStatusEnum,
  sizeSqm: z.number().positive(),
  floor: z.string().optional(),
  rentalPerSqm: z.number().positive().nullable(),
  rentalDisplay: z.enum(["approved", "on-request"]),
  availableFrom: z.string(),
  summary: z.string().min(1),
  description: z.string().min(1),
  highlights: z.array(z.string()).min(1),
  specifications: z.array(z.object({ label: z.string(), value: z.string() })),
  parkingBays: z.number().nonnegative().optional(),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string().min(1),
        width: z.number(),
        height: z.number(),
      }),
    )
    .min(1),
  floorPlan: z
    .object({
      src: z.string(),
      alt: z.string(),
      fileType: z.enum(["image", "pdf"]),
    })
    .optional(),
  brochureUrl: z.string().optional(),
});

export type Space = z.infer<typeof spaceSchema>;
export const spacesCollectionSchema = z.array(spaceSchema);
