import { z } from "zod";

export const articleSchema = z.object({
  slug: z.string().min(1),
  sample: z.literal(true),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.array(z.string().min(1)),
  category: z.enum(["announcement", "insight", "event"]),
  publishedAt: z.string(),
  coverImage: z.object({ src: z.string(), alt: z.string() }),
});

export type Article = z.infer<typeof articleSchema>;
export const articlesCollectionSchema = z.array(articleSchema);
