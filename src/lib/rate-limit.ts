/**
 * Minimal in-memory rate limiter for form submission routes.
 * Suitable for a single-instance deployment. If the app scales to
 * multiple replicas behind Traefik, replace with a shared store
 * (e.g. Redis) — see docs/security.md.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
