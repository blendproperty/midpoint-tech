import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalDoc({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <Section tone="stone" className="pt-14">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <div className="mt-8 max-w-3xl">
          <h1 className="text-step-3 font-display font-semibold text-ink-900">{title}</h1>
          <p className="mt-2 text-sm text-ink-600">Last reviewed: {updated} · Pending final legal review — see docs/launch-checklist.md</p>
          <div className="prose prose-headings:font-display mt-8 max-w-none space-y-4 text-ink-800 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_li]:ml-5 [&_li]:list-disc">
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}
