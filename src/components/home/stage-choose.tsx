import { Button } from "@/components/ui/button";
import { SpaceCard } from "@/components/spaces/space-card";
import { Reveal } from "@/components/motion/reveal";
import { spaces } from "@/lib/content/spaces";
import { Building2, Users, Handshake, Network } from "lucide-react";

const reasons = [
  {
    icon: Building2,
    title: "Set among other technology businesses",
    body: "Midpoint Tech is designed around companies working in software, fintech, engineering and digital services.",
  },
  {
    icon: Users,
    title: "Room to scale in place",
    body: "Suites are designed to accommodate teams from founding size through to established headcount.",
  },
  {
    icon: Handshake,
    title: "A professional setting for clients",
    body: "A credible business address and considered arrival experience for teams that meet clients on-site.",
  },
  {
    icon: Network,
    title: "Connected to Midrand's business network",
    body: "Positioned within Midrand's active commercial corridor between Johannesburg and Pretoria.",
  },
];

export function StageChoose() {
  const preview = spaces.slice(0, 3);

  return (
    <div className="flex flex-col gap-16">
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {reasons.map((reason, i) => (
          <Reveal key={reason.title} delay={i * 0.05}>
            <li className="flex gap-4 border-t border-[var(--color-line)] pt-5">
              <reason.icon className="mt-0.5 size-5 shrink-0 text-[var(--color-signal)]" aria-hidden="true" />
              <div>
                <p className="font-[var(--font-display)] text-base font-semibold">{reason.title}</p>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{reason.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
            Current availability
          </p>
          <Button href="/spaces" variant="secondary" showArrow>
            View all availability
          </Button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {preview.map((space, i) => (
            <Reveal key={space.slug} delay={i * 0.06}>
              <SpaceCard space={space} />
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--color-ink-soft)]">
          Space names, sizes and availability shown are sample data pending confirmation from the leasing team.
        </p>
      </div>
    </div>
  );
}
