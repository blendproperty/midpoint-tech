import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";

export function SocialProof() {
  return (
    <Section tone="stone">
      <Container>
        <Eyebrow>Tenant ecosystem</Eyebrow>
        <h2 className="mt-4 max-w-xl text-step-3 font-display font-semibold text-ink-900">
          Designed to support connection between ambitious businesses.
        </h2>
        <div className="mt-10">
          <EmptyState
            title="Tenant logos and stories are coming soon"
            description="Once tenants are onboarded and have authorised their details, their logos and stories will appear here. No names or testimonials are shown until confirmed."
          />
        </div>
      </Container>
    </Section>
  );
}
