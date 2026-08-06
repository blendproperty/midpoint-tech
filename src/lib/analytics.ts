"use client";

/**
 * Minimal, consent-aware analytics event dispatch.
 *
 * Events are pushed to the GTM dataLayer if present. No personal form
 * values (names, emails, phone numbers, free-text messages) are ever sent —
 * only structural/categorical data. `sanitizeEventPayload` strips any key
 * that looks like it could carry personal data as a defence in depth
 * measure, so a future call site mistake can't leak PII into analytics.
 */

const DISALLOWED_KEY_PATTERN =
  /email|phone|name|message|address|consent|token|password/i;

export type AnalyticsEventName =
  | "view_space"
  | "filter_spaces"
  | "click_book_tour"
  | "start_tour_form"
  | "submit_tour_form"
  | "submit_leasing_enquiry"
  | "download_brochure"
  | "click_phone"
  | "click_email"
  | "get_directions"
  | "gallery_interaction";

export function sanitizeEventPayload(
  payload: Record<string, unknown>,
): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (DISALLOWED_KEY_PATTERN.test(key)) continue;
    if (typeof value === "object" && value !== null) continue;
    clean[key] = value;
  }
  return clean;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(name: AnalyticsEventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const safePayload = sanitizeEventPayload(payload);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...safePayload });
}
