/**
 * Typed, validated environment variables.
 * Import from this module instead of reading `process.env` directly so that
 * missing/invalid configuration fails fast at build/start time rather than
 * silently producing broken behaviour in production.
 */
import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  SITE_URL: z.string().url().default("http://localhost:3000"),
  LEASING_TO_EMAIL: z.string().email().optional(),
  LEASING_FROM_EMAIL: z.string().email().optional(),
  EMAIL_PROVIDER: z.enum(["log", "smtp", "resend"]).default("log"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RATE_LIMIT_MAX: z.coerce.number().default(5),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60_000),
});

const clientSchema = z.object({
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_MAPS_EMBED_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

function loadServerEnv() {
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid server environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid server environment variables. See log above.");
  }
  return parsed.data;
}

function loadClientEnv() {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    NEXT_PUBLIC_MAPS_EMBED_ENABLED: process.env.NEXT_PUBLIC_MAPS_EMBED_ENABLED,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });
  if (!parsed.success) {
    console.error("Invalid client environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid client environment variables. See log above.");
  }
  return parsed.data;
}

export const serverEnv = loadServerEnv();
export const clientEnv = loadClientEnv();
