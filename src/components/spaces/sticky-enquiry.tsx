"use client";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function StickyEnquiry({ spaceName }: { spaceName: string }) {
  return (
    <div className="sticky top-24 space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-6">
      <p className="font-[var(--font-display)] text-lg font-medium">Interested in {spaceName}?</p>
      <p className="text-sm text-[var(--color-ink-soft)]">
        Book a tour or send a leasing enquiry and the team will confirm current availability and specification.
      </p>
      <div className="flex flex-col gap-3">
        <Button
          href={`/contact?intent=tour&space=${encodeURIComponent(spaceName)}`}
          className="w-full"
          onClick={() => trackEvent("click_book_tour", { location: "space-detail" })}
        >
          Book a tour
        </Button>
        <Button href={`/contact?intent=leasing&space=${encodeURIComponent(spaceName)}`} variant="secondary" className="w-full">
          Send leasing enquiry
        </Button>
      </div>
    </div>
  );
}
