import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = buildMetadata({
  title: "About Midpoint Tech",
  description:
    "Midpoint Tech is a technology-focused destination within the Midpoint portfolio, developed by Blend Property Group at 300 Janadel Avenue, Midrand.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32">
        <Container>
          <Heading as="h1" eyebrow="About Midpoint Tech">
            A technology-focused chapter within the Midpoint story
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-soft)]">
            Midpoint Tech brings ambitious businesses together in a professional environment created for focus,
            connection and growth. Located at {siteConfig.address.line1} in Midrand, it gives technology teams a
            credible base from which to build, collaborate and move forward.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-line)]">
        <Container className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-[var(--font-display)] text-2xl font-medium">Why a technology-focused destination</h2>
            <p className="mt-4 text-[var(--color-ink-soft)]">
              Technology businesses — software companies, fintechs, engineering teams, managed service providers and
              corporate innovation units — have different needs to a conventional office tenant. Midpoint Tech is
              being shaped specifically around those needs: flexible space that can scale, an environment that
              supports focused work and informal connection, and a location that works for staff, clients and
              partners across the wider Gauteng business corridor.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-[var(--font-display)] text-2xl font-medium">Part of the Midpoint portfolio</h2>
            <p className="mt-4 text-[var(--color-ink-soft)]">
              Midpoint Tech is a distinct destination within the broader Midpoint commercial property portfolio,
              developed by Blend Property Group. It is a separate proposition from Midpoint&apos;s existing offices,
              serviced offices and warehousing at its Tonetti Street estate — Midpoint Tech is purpose-shaped around
              technology businesses at {siteConfig.address.line1}.
            </p>
            <Button href={siteConfig.parentBrand.url} variant="ghost" className="mt-3">
              Visit the Midpoint portfolio site ↗
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-line)] bg-[var(--color-paper-dim)]">
        <Container>
          <h2 className="font-[var(--font-display)] text-2xl font-medium">What we&apos;re building toward</h2>
          <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)]">
            Midpoint Tech is being developed in phases. Specification details, amenities, sustainability credentials
            and the community programme will be published here as they are confirmed — this site is built so that
            content can be added without misrepresenting what exists today. See our{" "}
            <a href="/community" className="underline">community page</a> for how we intend to support connection
            between tenants, and our <a href="/experience" className="underline">experience page</a> for the
            workplace environment.
          </p>
        </Container>
      </Section>
    </>
  );
}
