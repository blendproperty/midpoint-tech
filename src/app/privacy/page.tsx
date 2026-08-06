import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { RichText } from "@/components/ui/rich-text";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description: "How Midpoint Tech collects, uses and protects personal information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section className="pt-32">
      <Container className="max-w-3xl">
        <Heading as="h1">Privacy policy</Heading>
        <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
          Draft placeholder — this policy has not yet been reviewed by legal counsel. Do not treat as final until
          confirmed. See docs/content-required.md.
        </p>
        <div className="mt-8">
          <RichText
            paragraphs={[
              "This policy explains how Midpoint Tech collects, uses and protects personal information submitted through this website, in line with the Protection of Personal Information Act (POPIA).",
              "We collect personal information you provide directly — such as your name, company, contact details and enquiry content — when you submit the tour booking form, leasing enquiry form, or contact us directly. We use this information only to respond to your enquiry, arrange a tour, and provide information about availability at Midpoint Tech.",
              "We do not sell personal information. Where analytics tools are used on this site, they are configured to avoid capturing personal form content — see our analytics documentation for detail.",
              `Consent captured through our forms is timestamped and stored alongside the enquiry, and is used only for the purpose described at the point of collection. You may request access to, correction of, or deletion of your personal information by contacting us at ${siteConfig.contact.leasingEmail}.`,
              "This is a placeholder policy pending full legal review. A finalised version, including data retention periods, third-party processors and your rights under POPIA in full, will replace this text before public launch.",
            ]}
          />
        </div>
      </Container>
    </Section>
  );
}
