import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { MeridianLine } from "@/components/ui/MeridianLine";

const themes = [
  {
    node: "Work",
    title: "A serious environment for serious work",
    body: "Fitted and shell-and-core suites configured around how technology teams actually operate — from focused engineering time to client-facing meetings.",
  },
  {
    node: "Connect",
    title: "Proximity to businesses like yours",
    body: "A campus built specifically for technology, fintech and engineering-led companies — not a generic mixed-tenant office park.",
  },
  {
    node: "Grow",
    title: "Room to move as you scale",
    body: "From a handful of desks to a full floor, with a leasing team that plans for where your company is headed, not just where it is now.",
  },
];

export function Positioning() {
  return (
    <Section tone="raised">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>The proposition</Eyebrow>
          <h2 className="mt-4 text-step-3 font-display font-semibold text-ink-900">
            More than an office address.
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            Midpoint Tech brings ambitious businesses together in a professional environment created for
            focus, connection and growth.
          </p>
        </div>

        <div className="mt-16 hidden md:block">
          <MeridianLine nodes={themes.map((t) => t.node)} tone="stone" />
        </div>

        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {themes.map((theme) => (
            <div key={theme.node} className="border-t border-ink-900/15 pt-6">
              <p className="tick-label text-brass-600">{theme.node}</p>
              <h3 className="mt-3 text-xl font-display font-semibold text-ink-900">{theme.title}</h3>
              <p className="mt-3 text-ink-700">{theme.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
