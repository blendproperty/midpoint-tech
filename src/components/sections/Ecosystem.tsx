import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Metric } from "@/components/ui/Metric";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Network, Users, Building2 } from "lucide-react";

const points = [
  { icon: Network, title: "Proximity to other technology businesses", body: "A campus curated for technology, engineering and fintech companies rather than a generic tenant mix." },
  { icon: Building2, title: "Space to scale", body: "Move from a shared desk to a full floor without leaving the building — or the network — you've built." },
  { icon: Users, title: "A professional, client-facing setting", body: "An address and environment credible enough to bring clients, investors and partners into." },
];

export function Ecosystem() {
  return (
    <Section tone="ink">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-brass-400">The ecosystem</Eyebrow>
          <h2 className="mt-4 text-step-3 font-display font-semibold text-stone-100">
            Designed around ambitious businesses and teams.
          </h2>
          <p className="mt-4 text-lg text-stone-300">
            Midpoint Tech gives technology teams a credible base from which to build, collaborate and move
            forward — without overstating what the environment offers on day one.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3" stagger={0.12}>
          {points.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title} className="group transition-transform duration-300 hover:-translate-y-1">
              <Icon className="h-6 w-6 text-brass-400 transition-transform duration-300 group-hover:scale-110" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-semibold text-stone-100">{title}</h3>
              <p className="mt-2 text-stone-300">{body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-16 grid grid-cols-2 gap-8 border-t border-stone-100/15 pt-10 md:grid-cols-4">
          <MetricInverse value={4} label="Buildings on campus" isSample />
          <MetricInverse value={2076} suffix=" m²" label="GLA currently listed" isSample />
          <MetricInverse value={61} label="Parking bays listed" isSample />
          <MetricInverse value={1} label="Business address, Midrand" />
        </Reveal>
      </Container>
    </Section>
  );
}

function MetricInverse(props: { value: number; suffix?: string; label: string; isSample?: boolean }) {
  return (
    <div className="[&_p:first-child]:text-stone-100 [&_p:last-child]:text-stone-400">
      <Metric {...props} />
    </div>
  );
}
