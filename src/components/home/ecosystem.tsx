import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Users, Handshake, Network } from "lucide-react";

/**
 * Bento grid: 6-column track, grid-flow-dense, zero empty cells.
 * Row 1: card A (col-span-4, row-span-2) + card B (col-span-2, row-span-1) => 4+2 = 6
 * Row 2: card A continues (4)          + card C (col-span-2, row-span-1) => 4+2 = 6
 * Row 3: card D (col-span-6, row-span-1)                                  => 6
 * Every row sums to exactly 6 columns — no gaps, no overhang.
 */
export function Ecosystem() {
  return (
    <Section dark motif className="border-y border-[var(--color-line-dark)]">
      <Container>
        <Heading eyebrow="A technology-oriented environment" className="text-[var(--color-paper)]">
          Built around ambitious teams, not just tenants.
        </Heading>

        <div className="mt-14 grid auto-rows-[minmax(9rem,auto)] grid-cols-6 grid-flow-dense gap-4">
          <Reveal className="group relative col-span-6 row-span-2 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-dark)] md:col-span-4">
            <div className="relative flex h-full flex-col justify-end p-8">
              <Image
                src="https://picsum.photos/seed/midpointtech-teams/1600/1400"
                alt=""
                fill
                sizes="(min-width:768px) 60vw, 100vw"
                className="object-cover opacity-40 grayscale mix-blend-luminosity transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent" />
              <div className="relative">
                <h3 className="font-[var(--font-display)] text-2xl font-medium md:text-3xl">
                  Set among other technology businesses
                </h3>
                <p className="mt-3 max-w-md text-[var(--color-paper-dim)]">
                  Midpoint Tech is designed around companies working in software, fintech, engineering and digital
                  services — an environment shaped for that kind of work.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.06}
            className="col-span-6 row-span-1 rounded-[var(--radius-lg)] border border-[var(--color-line-dark)] bg-white/[0.03] p-6 transition-colors duration-500 hover:bg-white/[0.06] sm:col-span-3 md:col-span-2"
          >
            <Users className="size-6 text-[var(--color-signal)]" aria-hidden="true" />
            <h3 className="mt-4 font-[var(--font-display)] text-lg font-medium">Room to scale in place</h3>
            <p className="mt-2 text-sm text-[var(--color-paper-dim)]">
              Suites are designed to accommodate teams from founding size through to established headcount, reducing
              the need to relocate as you grow.
            </p>
          </Reveal>

          <Reveal
            delay={0.12}
            className="col-span-6 row-span-1 rounded-[var(--radius-lg)] border border-[var(--color-line-dark)] bg-white/[0.03] p-6 transition-colors duration-500 hover:bg-white/[0.06] sm:col-span-3 md:col-span-2"
          >
            <Handshake className="size-6 text-[var(--color-signal)]" aria-hidden="true" />
            <h3 className="mt-4 font-[var(--font-display)] text-lg font-medium">A professional setting for clients</h3>
            <p className="mt-2 text-sm text-[var(--color-paper-dim)]">
              A credible business address and considered arrival experience for teams that meet clients, partners
              and investors on-site.
            </p>
          </Reveal>

          <Reveal
            delay={0.18}
            className="col-span-6 row-span-1 flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line-dark)] bg-white/[0.03] p-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <Network className="size-6 shrink-0 text-[var(--color-signal)]" aria-hidden="true" />
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-medium">
                  Connected to Midrand&rsquo;s business network
                </h3>
                <p className="mt-2 max-w-xl text-sm text-[var(--color-paper-dim)]">
                  Positioned within Midrand&rsquo;s active commercial corridor between Johannesburg and Pretoria,
                  close to the wider business community.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
