import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  "Fibre-ready infrastructure",
  "24/7 secure access",
  "Full-floor options available",
  "On the Midrand corridor",
  "Meeting rooms on demand",
  "Flexible desk terms",
  "Dedicated leasing team",
  "Landscaped campus grounds",
];

export function SocialProof() {
  const loop = [...values, ...values];

  return (
    <Section tone="stone" className="overflow-hidden">
      <Container>
        <Reveal>
          <Eyebrow>Tenant ecosystem</Eyebrow>
          <h2 className="mt-4 max-w-xl text-step-3 font-display font-semibold text-ink-900">
            Designed to support connection between ambitious businesses.
          </h2>
        </Reveal>
      </Container>

      <Reveal delay={0.15} className="mt-12">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-stone-50 to-transparent md:w-32"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-stone-50 to-transparent md:w-32"
          />
          <div className="flex w-max animate-marquee">
            {loop.map((value, i) => (
              <div
                key={`${value}-${i}`}
                className="flex items-center gap-3 border-r border-ink-900/10 px-8 py-2 whitespace-nowrap"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass-500" />
                <span className="tick-label text-ink-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Container>
        <p className="mt-8 max-w-xl text-sm text-ink-600">
          Tenant logos and stories will appear here once tenants are onboarded and have authorised their
          details — no names or testimonials are shown until confirmed.
        </p>
      </Container>
    </Section>
  );
}
