import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Midpoint Tech",
  description: "Midpoint Tech is a distinct technology-focused environment within the wider Midpoint commercial portfolio, at 300 Janadel Avenue, Midrand.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section tone="stone" className="pt-14 pb-10">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-8 max-w-2xl">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-4 text-step-4 font-display font-semibold text-ink-900">
              A technology-focused environment within the Midpoint portfolio.
            </h1>
            <p className="mt-4 text-lg text-ink-700">
              Midpoint Tech brings ambitious businesses together in a professional environment created for
              focus, connection and growth, at 300 Janadel Avenue in Midrand.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container className="grid gap-12 md:grid-cols-2 md:items-center">
          <MediaFrame
            media={{ src: "https://images.unsplash.com/photo-1783315943625-6c00dc4b265b?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative stock photo of a minimalist concrete courtyard with plants, similar in feel to the Midpoint Tech campus" }}
            className="aspect-[4/5]"
          />
          <div>
            <h2 className="text-step-2 font-display font-semibold text-ink-900">Part of a larger commercial estate</h2>
            <p className="mt-4 text-ink-700">
              Midpoint Tech sits within the broader {site.parentBrand} commercial portfolio, which includes offices,
              serviced offices and warehousing elsewhere on the estate. Midpoint Tech itself, at 300 Janadel
              Avenue, is a distinct proposition focused specifically on technology, engineering and fintech
              businesses — it does not include warehouse facilities.
            </p>
            <p className="mt-4 text-ink-700">
              The positioning balances two ideas: a credible commercial property and professional business
              address, and a technology-oriented environment where companies can connect and grow.
            </p>
            <div className="mt-8">
              <Button href={site.parentBrandUrl} variant="secondary">Visit the Midpoint website</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <h2 className="max-w-xl text-step-3 font-display font-semibold text-stone-100">
            Progressive. Established. Human.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { title: "Progressive, not pretentious", body: "Premium without excess — an environment that feels considered rather than performative." },
              { title: "Established, not corporate-cold", body: "Credible enough for large technology organisations, welcoming enough for a first-time founder." },
              { title: "Human, not generic", body: "Built around how technology teams actually work, meet clients and grow." },
            ].map((v) => (
              <div key={v.title} className="border-t border-stone-100/15 pt-6">
                <h3 className="font-display text-lg font-semibold text-stone-100">{v.title}</h3>
                <p className="mt-2 text-stone-300">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
