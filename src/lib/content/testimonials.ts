import { z } from "zod";

export const testimonialSchema = z.object({
  sample: z.literal(true),
  quote: z.string(),
  attribution: z.string(),
  role: z.string(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;

/**
 * No tenant testimonials, logos or named companies have been supplied or
 * authorised for publication at time of writing. This collection is
 * intentionally empty so the social-proof section renders an honest,
 * labelled placeholder state instead of fabricated quotes or logos.
 * See docs/content-required.md.
 */
export const testimonials: Testimonial[] = [];

export const tenantCategories = [
  "Software & SaaS",
  "Fintech",
  "Engineering & digital services",
  "Managed service providers",
  "Corporate innovation teams",
] as const;
