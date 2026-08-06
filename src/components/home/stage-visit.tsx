"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MediaFrame } from "@/components/ui/media-frame";
import { Button } from "@/components/ui/button";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";

const frames = [
  { src: "/images/campus/placeholder-arrival.svg", alt: "Placeholder image of the arrival and reception experience at Midpoint Tech" },
  { src: "/images/campus/placeholder-workspace.svg", alt: "Placeholder image of a workspace environment at Midpoint Tech" },
  { src: "/images/campus/placeholder-shared.svg", alt: "Placeholder image of a shared collaboration space at Midpoint Tech" },
];

export function StageVisit() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || window.innerWidth < 768) return;

      const pinTarget = scope.current?.querySelector("[data-pin-panel]");
      if (!pinTarget) return;

      ScrollTrigger.create({
        trigger: scope.current!,
        start: "top top",
        end: "bottom bottom",
        pin: pinTarget,
        pinSpacing: false,
      });

      gsap.utils.toArray<HTMLElement>("[data-gallery-frame]").forEach((frame) => {
        gsap.fromTo(
          frame,
          { scale: 0.85, opacity: 0.35 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 85%", end: "top 40%", scrub: true },
          },
        );
        gsap.to(frame, {
          opacity: 0.3,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "bottom 40%", end: "bottom 5%", scrub: true },
        });
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="grid gap-10 md:grid-cols-2">
      <div data-pin-panel className="flex h-fit flex-col gap-6 self-start">
        <p className="max-w-md text-[var(--color-ink-soft)]">
          From the moment you arrive, Midpoint Tech is built to feel considered — a workplace environment that
          technology teams and their clients notice.
        </p>
        <Button href="/experience" variant="secondary" showArrow className="w-fit">
          See the full experience
        </Button>
      </div>

      <div className="flex flex-col gap-16">
        {frames.map((frame) => (
          <div key={frame.src} data-gallery-frame>
            <MediaFrame
              src={frame.src}
              alt={frame.alt}
              width={800}
              height={600}
              className="aspect-[4/3]"
              sizes="(min-width:768px) 45vw, 100vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
