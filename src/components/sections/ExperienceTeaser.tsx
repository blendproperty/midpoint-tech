import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";

export function ExperienceTeaser() {
  return (
    <Section tone="raised">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow>The environment</Eyebrow>
          <h2 className="mt-4 text-step-3 font-display font-semibold text-ink-900">
            A workplace built for focus and for people.
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            From the arrival experience to shared spaces for meeting and collaboration, Midpoint Tech is
            designed so teams can do their best work — and still meet clients with confidence.
          </p>
          <ul className="mt-6 space-y-3 text-ink-800">
            <li className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />Considered arrival and lobby experience</li>
            <li className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />Shared spaces for meeting and informal collaboration</li>
            <li className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />Landscaped grounds between buildings</li>
          </ul>
          <div className="mt-8">
            <Button href="/experience" variant="secondary">See the full experience</Button>
          </div>
        </div>
        <MediaFrame
          media={{ src: "https://images.unsplash.com/photo-1785308269647-e56d16b5eb85?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative stock photo of a landscaped paved pathway between modern buildings" }}
          className="aspect-[4/5] md:aspect-[3/4]"
        />
      </Container>
    </Section>
  );
}
