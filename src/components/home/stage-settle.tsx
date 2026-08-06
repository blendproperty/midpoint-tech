import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BlueprintMark } from "@/components/ui/blueprint-mark";
import { siteConfig } from "@/lib/content/site";
import { testimonials, tenantCategories } from "@/lib/content/testimonials";

export function StageSettle() {
  const query = encodeURIComponent(
    `${siteConfig.address.line1}, ${siteConfig.address.city}, ${siteConfig.address.region}, ${siteConfig.address.country}`,
  );

  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="max-w-md text-[var(--color-ink-soft)]">
            Midpoint Tech sits in Halfway House, Midrand — part of the same active commercial corridor connecting
            Johannesburg and Pretoria. The location gives technology teams practical access for staff, clients and
            partners across Gauteng.
          </p>
          <address className="mt-5 flex items-start gap-2 text-sm not-italic text-[var(--color-ink-soft)]">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.city},{" "}
            {siteConfig.address.region}, {siteConfig.address.postalCode}
          </address>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/location" variant="secondary" showArrow>
              Explore the location
            </Button>
            <Button href={`https://www.google.com/maps/dir/?api=1&destination=${query}`} variant="ghost">
              Get directions
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-dim)]"
            role="img"
            aria-label="Stylised site plan illustration marking the Midrand location of Midpoint Tech — not a real map or floor plan"
          >
            <BlueprintMark variant="pin" className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]" />
          </div>
        </Reveal>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
            Who Midpoint Tech is built for
          </p>
          <ul className="mt-4 flex flex-col divide-y divide-[var(--color-line)]">
            {tenantCategories.map((category) => (
              <li key={category} className="py-3 text-base font-medium">
                {category}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.06}>
          {testimonials.length === 0 ? (
            <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-line)] bg-[var(--color-paper-dim)] p-8 text-sm text-[var(--color-ink-soft)]">
              Tenant stories and testimonials will appear here once businesses have moved in and given permission
              to share their experience. No tenant names or quotes are published without confirmation.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {testimonials.map((t) => (
                <blockquote key={t.attribution} className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-dim)] p-6">
                  <p className="text-[var(--color-ink-soft)]">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm font-medium">
                    {t.attribution} <span className="font-normal text-[var(--color-ink-soft)]">— {t.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}
