import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { MediaFrame } from "@/components/ui/media-frame";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const frames = [
  { src: "/images/campus/placeholder-arrival.svg", alt: "Placeholder image of the arrival and reception experience at Midpoint Tech" },
  { src: "/images/campus/placeholder-workspace.svg", alt: "Placeholder image of a workspace environment at Midpoint Tech" },
  { src: "/images/campus/placeholder-shared.svg", alt: "Placeholder image of a shared collaboration space at Midpoint Tech" },
];

export function ExperienceTeaser() {
  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="The environment">A workplace experience worth arriving at</Heading>
          <Button href="/experience" variant="secondary" showArrow>
            See the full experience
          </Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {frames.map((frame, i) => (
            <Reveal key={frame.src} delay={i * 0.06}>
              <MediaFrame src={frame.src} alt={frame.alt} width={800} height={600} className="aspect-[4/3]" sizes="(min-width:1024px) 420px, 100vw" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
