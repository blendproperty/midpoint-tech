"use client";
import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/content/site";

export function MapPanel() {
  const [loadMap, setLoadMap] = useState(false);
  const address = `${siteConfig.address.line1}, ${siteConfig.address.city}, ${siteConfig.address.region}, ${siteConfig.address.country}`;
  const query = encodeURIComponent(address);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)]">
      {loadMap ? (
        <iframe
          title={`Map showing ${address}`}
          src={embedSrc}
          className="aspect-[4/3] w-full md:aspect-video"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="grid-motif flex aspect-[4/3] flex-col items-center justify-center gap-4 bg-[var(--color-paper-dim)] p-8 text-center md:aspect-video">
          <MapPin className="size-8 text-[var(--color-signal)]" aria-hidden="true" />
          <p className="max-w-sm text-sm text-[var(--color-ink-soft)]">
            Interactive map loads on request to avoid unnecessary third-party requests on page load.
          </p>
          <Button onClick={() => setLoadMap(true)} variant="secondary">
            Load interactive map
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-3 border-t border-[var(--color-line)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <address className="not-italic text-sm">{address}</address>
        <Button href={directionsUrl} variant="ghost" onClick={() => trackEvent("get_directions")}>
          Get directions <ExternalLink className="ml-1 inline size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
