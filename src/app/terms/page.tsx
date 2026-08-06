import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { RichText } from "@/components/ui/rich-text";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Website terms",
  description: "Terms of use for the Midpoint Tech website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section className="pt-32">
      <Container className="max-w-3xl">
        <Heading as="h1">Website terms</Heading>
        <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
          Draft placeholder — pending legal review before public launch.
        </p>
        <div className="mt-8">
          <RichText
            paragraphs={[
              "These terms govern your use of the Midpoint Tech website. By using this site, you agree to these terms.",
              "Content on this website — including images, floor plans and specifications marked as sample data — is illustrative and may not reflect the final, confirmed condition of the property. Availability, pricing and specification are subject to change and confirmation by the leasing team.",
              "Images marked as placeholders are for illustrative purposes only and do not depict the actual property. Real photography will replace these images as it becomes available.",
              "This website and its content are provided by Blend Property Group in connection with the Midpoint Tech development at 300 Janadel Avenue, Midrand. All rights reserved.",
            ]}
          />
        </div>
      </Container>
    </Section>
  );
}
