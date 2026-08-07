import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactTabs } from "@/components/sections/ContactTabs";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & book a tour",
  description: "Book a tour, send a leasing enquiry, or get in touch with the Midpoint Tech team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section tone="stone" className="pt-14">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 text-step-3 font-display font-semibold text-ink-900">
              Let&apos;s find the right space for your team.
            </h1>
            <p className="mt-4 text-ink-700">
              Choose the option below that best matches what you need — the leasing team will follow up
              directly.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <a href={`mailto:${site.contact.leasingEmail}`} className="flex items-center gap-3 text-ink-800 hover:text-teal-600">
                <Mail className="h-4 w-4" /> {site.contact.leasingEmail}
              </a>
              <a href={`tel:${site.contact.phoneHref}`} className="flex items-center gap-3 text-ink-800 hover:text-teal-600">
                <Phone className="h-4 w-4" /> {site.contact.phoneDisplay}
                <span className="text-xs text-ink-600">(sample)</span>
              </a>
            </div>
            <address className="mt-8 not-italic text-sm text-ink-700">
              {site.address.line1}, {site.address.line2}
              <br />
              {site.address.city}, {site.address.province}, {site.address.postalCode}
            </address>
          </div>

          <div className="border border-ink-900/12 bg-white p-6 md:p-10">
            <Suspense fallback={<p className="text-ink-700">Loading form…</p>}>
              <ContactTabs />
            </Suspense>
          </div>
        </div>
      </Container>
    </Section>
  );
}
