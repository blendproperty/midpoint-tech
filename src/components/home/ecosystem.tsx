import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Users, Building2, Handshake, Network } from "lucide-react";

const points = [
  {
    icon: Building2,
    title: "Set among other technology businesses",
    body: "Midpoint Tech is designed around companies working in software, fintech, engineering and digital services — an environment shaped for that kind of work.",
  },
  {
    icon: Users,
    title: "Room to scale in place",
    body: "Suites are designed to accommodate teams from founding size through to established headcount, reducing the need to relocate as you grow.",
  },
  {
    icon: Handshake,
    title: "A professional setting for clients",
    body: "A credible business address and considered arrival experience for teams that meet clients, partners and investors on-site.",
  },
  {
    icon: Network,
    title: "Connected to Midrand's business network",
    body: "Positioned within Midrand's active commercial corridor between Johannesburg and Pretoria, close to the wider business community.",
  },
];

export function Ecosystem() {
  return (
    <Section dark motif className="border-y border-[var(--color-line-dark)]">
      <Container>
        <Heading eyebrow="A technology-oriented environment" className="text-[var(--color-paper)]">
          Built around ambitious teams, not just tenants.
        </Heading>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.06}>
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-line-dark)] bg-white/[0.03] p-6">
                <point.icon className="size-6 text-[var(--color-signal)]" aria-hidden="true" />
                <h3 className="mt-4 font-[var(--font-display)] text-lg font-medium">{point.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-paper-dim)]">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
