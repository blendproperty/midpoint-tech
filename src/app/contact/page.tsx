import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { TourForm } from "@/components/forms/tour-form";
import { LeasingForm } from "@/components/forms/leasing-form";
import { siteConfig } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact & book a tour",
  description:
    "Book a tour, send a leasing enquiry or speak to the Midpoint Tech leasing team about space at 300 Janadel Avenue, Midrand.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = await searchParams;
  const intent = typeof resolved.intent === "string" ? resolved.intent : "tour";
  const space = typeof resolved.space === "string" ? resolved.space : undefined;

  return (
    <Section className="pt-32">
      <Container>
        <Heading as="h1" eyebrow="Get in touch">
          Book a tour or send a leasing enquiry
        </Heading>
        <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)]">
          Choose the option that suits you best. The leasing team responds to every enquiry — from founders exploring
          options to brokers requesting availability schedules.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="mb-8 flex gap-2 border-b border-[var(--color-line)]">
              <TabLink href="/contact?intent=tour" active={intent === "tour"}>
                Book a tour
              </TabLink>
              <TabLink href="/contact?intent=leasing" active={intent === "leasing"}>
                Leasing enquiry
              </TabLink>
              <TabLink href="/contact?intent=broker" active={intent === "broker"}>
                Broker enquiry
              </TabLink>
            </div>

            {intent === "tour" && <TourForm defaultSpace={space} />}
            {intent === "leasing" && <LeasingForm defaultSpace={space} />}
            {intent === "broker" && <LeasingForm defaultSpace={space} isBroker />}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] p-6">
              <p className="font-[var(--font-display)] text-lg font-medium">Contact details</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 text-[var(--color-ink-soft)]" aria-hidden="true" />
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:underline">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 text-[var(--color-ink-soft)]" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.contact.leasingEmail}`} className="hover:underline">
                    {siteConfig.contact.leasingEmail}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--color-ink-soft)]" aria-hidden="true" />
                  <address className="not-italic">
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}, {siteConfig.address.city}
                    <br />
                    {siteConfig.address.region}, {siteConfig.address.postalCode}
                  </address>
                </li>
              </ul>
            </div>
            <p className="text-xs text-[var(--color-ink-soft)]">
              Contact details shown are sample data pending confirmation of the dedicated Midpoint Tech leasing line.
            </p>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

function TabLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={`-mb-px border-b-2 px-1 pb-3 text-sm font-medium ${
        active ? "border-[var(--color-signal)] text-[var(--color-ink)]" : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
      }`}
    >
      {children}
    </a>
  );
}
