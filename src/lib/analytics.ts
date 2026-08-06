/**
 * Consent-aware, privacy-safe event tracking helper.
 * Never pass personal form values (names, emails, phone numbers,
 * message bodies) into event payloads — only structural/categorical
 * data. See docs/analytics.md.
 */
export type AnalyticsEvent =
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

type SafePayload = Record<string, string | number | boolean | null | undefined>;

const PII_KEYS = new Set([
  "email", "workemail", "phone", "fullname", "name", "message", "company",
]);

function sanitize(payload: SafePayload): SafePayload {
  const clean: SafePayload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (PII_KEYS.has(key.toLowerCase())) continue;
    clean[key] = value;
  }
  return clean;
}

export function track(event: AnalyticsEvent, payload: SafePayload = {}): void {
  if (typeof window === "undefined") return;
  const hasConsent = window.localStorage?.getItem("mt-analytics-consent") === "granted";
  if (!hasConsent) return;

  const safe = sanitize(payload);
  const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event, ...safe });
  }
}
