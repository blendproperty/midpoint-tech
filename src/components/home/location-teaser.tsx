import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/content/site";
import { MapPin } from "lucide-react";

export function LocationTeaser() {
  const query = encodeURIComponent(
    `${siteConfig.address.line1}, ${siteConfig.address.city}, ${siteConfig.address.region}, ${siteConfig.address.country}`,
  );

  return (
    <Section className="border-t border-[var(--color-line)]">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <Heading eyebrow="At the centre of it">Positioned in Midrand, between Johannesburg and Pretoria</Heading>
            <p className="mt-5 max-w-md text-[var(--color-ink-soft)]">
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
            <div className="aspect-[4/3] w-full rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-dim)] grid-motif" role="img" aria-label="Stylised map placeholder showing the Midrand location of Midpoint Tech" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
