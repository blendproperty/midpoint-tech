import { z } from "zod";

/** Typed, validated environment variables. Fails fast at startup if misconfigured. */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://tech.mid-point.co.za"),
  LEADS_WEBHOOK_URL: z.string().url().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_MAPS_EMBED_KEY: z.string().optional(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  LEADS_WEBHOOK_URL: process.env.LEADS_WEBHOOK_URL,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_MAPS_EMBED_KEY: process.env.NEXT_PUBLIC_MAPS_EMBED_KEY,
});
