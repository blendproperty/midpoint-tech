import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { testimonials, tenantCategories } from "@/lib/content/testimonials";

export function SocialProof() {
  return (
    <Section className="border-t border-[var(--color-line)] bg-[var(--color-paper-dim)]">
      <Container>
        <Heading eyebrow="Who Midpoint Tech is built for">A home for technology-led businesses</Heading>
        <div className="mt-8 flex flex-wrap gap-2">
          {tenantCategories.map((category) => (
            <span key={category} className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm">
              {category}
            </span>
          ))}
        </div>

        {testimonials.length === 0 ? (
          <div className="mt-10 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-line)] bg-white p-8 text-sm text-[var(--color-ink-soft)]">
            Tenant stories, logos and testimonials will appear here once businesses have moved in and given
            permission to share their experience. No tenant names or quotes are published without confirmation.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.attribution} className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-6">
                <p className="text-[var(--color-ink-soft)]">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-medium">
                  {t.attribution} <span className="font-normal text-[var(--color-ink-soft)]">— {t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
