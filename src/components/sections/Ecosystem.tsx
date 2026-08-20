import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Metric } from "@/components/ui/Metric";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Network, Users, Building2 } from "lucide-react";

const points = [
  { code: "01", icon: Network, title: "Proximity to other technology businesses", body: "A campus curated for technology, engineering and fintech companies rather than a generic tenant mix." },
  { code: "02", icon: Building2, title: "Space to scale", body: "Move from a shared desk to a full floor without leaving the building — or the network — you've built." },
  { code: "03", icon: Users, title: "A professional, client-facing setting", body: "An address and environment credible enough to bring clients, investors and partners into." },
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
          {points.map(({ code, icon: Icon, title, body }) => (
            <RevealItem key={title} className="group transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-brass-400 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                <span className="mono-figure text-xs text-stone-100/40">{code}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-stone-100">{title}</h3>
              <p className="mt-2 text-stone-300">{body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Instrument ledger — a data readout rather than a repeat of the
            icon-column pattern above, so the two rows don't feel like the
            same device twice. */}
        <Reveal delay={0.1} className="mt-16 border-t border-stone-100/15 pt-10">
          <div className="instrument-ledger grid grid-cols-2 sm:grid-cols-4">
            <LedgerStat value={4} label="Buildings on campus" isSample />
            <LedgerStat value={2076} suffix=" m²" label="GLA currently listed" isSample />
            <LedgerStat value={61} label="Parking bays listed" isSample />
            <LedgerStat value={1} label="Business address, Midrand" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function LedgerStat(props: { value: number; suffix?: string; label: string; isSample?: boolean }) {
  return (
    <div className="p-5 [&_p:first-child]:text-stone-100 [&_p:last-child]:text-stone-400">
      <Metric {...props} />
    </div>
  );
}
