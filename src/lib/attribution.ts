"use client";

export function captureAttribution() {
  if (typeof window === "undefined") {
    return { utmSource: undefined, utmMedium: undefined, utmCampaign: undefined, referrer: undefined, sourcePage: undefined };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    referrer: document.referrer || undefined,
    sourcePage: window.location.pathname,
  };
}
