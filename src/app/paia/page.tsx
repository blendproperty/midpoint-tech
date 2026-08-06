import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { RichText } from "@/components/ui/rich-text";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = buildMetadata({
  title: "PAIA manual",
  description: "Promotion of Access to Information Act (PAIA) manual placeholder for Midpoint Tech.",
  path: "/paia",
});

export default function PaiaPage() {
  return (
    <Section className="pt-32">
      <Container className="max-w-3xl">
        <Heading as="h1">PAIA manual</Heading>
        <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
          Placeholder page. A full Promotion of Access to Information Act (PAIA) manual, prepared in line with South
          African regulatory requirements, must be confirmed with legal counsel and published here before public
          launch.
        </p>
        <div className="mt-8">
          <RichText
            paragraphs={[
              "This section is reserved for the Promotion of Access to Information Act, 2000 (PAIA) manual applicable to the entity operating this website, in line with requirements administered by the South African Human Rights Commission.",
              `Requests for access to information under PAIA, and any queries regarding this manual, may be directed to ${siteConfig.contact.generalEmail} pending confirmation of a dedicated information officer contact.`,
            ]}
          />
        </div>
      </Container>
    </Section>
  );
}
