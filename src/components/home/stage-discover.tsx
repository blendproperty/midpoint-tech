import { Reveal } from "@/components/motion/reveal";
import { BlueprintMark } from "@/components/ui/blueprint-mark";

const pillars = [
  {
    title: "Work",
    body: "A professional, focused base for technology teams — from founding studios to established operations — with room to configure space around how you actually work.",
  },
  {
    title: "Connect",
    body: "Proximity to other ambitious businesses in the same building and estate, with shared spaces designed to make informal connection possible, not forced.",
  },
  {
    title: "Grow",
    body: "Space that can flex as your team scales, in a location built for the long term rather than a short-term sublet.",
  },
];

export function StageDiscover() {
  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div>
        <p className="max-w-md text-[var(--color-ink-soft)]">
          Midpoint Tech brings ambitious businesses together in a professional environment created for focus,
          connection and growth — a credible base in Midrand from which technology teams can build, collaborate
          and move forward.
        </p>
        <BlueprintMark className="mt-8 hidden h-40 w-40 opacity-40 sm:block" />
      </div>

      <dl className="divide-y divide-[var(--color-line)]">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.06} className="py-6 first:pt-0 last:pb-0">
            <div className="flex items-baseline gap-4">
              <dt className="shrink-0 font-[var(--font-display)] text-sm font-semibold tabular-nums text-[var(--color-signal)]">
                {String(i + 1).padStart(2, "0")}
              </dt>
              <div>
                <dt className="font-[var(--font-display)] text-xl font-semibold">{pillar.title}</dt>
                <dd className="mt-1 max-w-lg text-[var(--color-ink-soft)]">{pillar.body}</dd>
              </div>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}
