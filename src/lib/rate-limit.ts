/**
 * In-memory sliding-window rate limiter for form submission routes.
 *
 * This is process-local and resets on restart/scale-out. It is intended as
 * a basic abuse deterrent for a low-traffic leasing site, not a substitute
 * for edge/CDN-level protection. For multi-instance production deployments,
 * replace the in-memory store with a shared store (e.g. Redis) — the
 * interface below is deliberately narrow to make that swap straightforward.
 */
import { serverEnv } from "./env";

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const windowMs = serverEnv.RATE_LIMIT_WINDOW_MS;
  const max = serverEnv.RATE_LIMIT_MAX;

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (existing.count >= max) {
    return { allowed: false, retryAfterMs: existing.resetAt - now };
  }

  existing.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}
