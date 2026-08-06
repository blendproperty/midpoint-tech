"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog } from "./dialog";
import { trackEvent } from "@/lib/analytics";

export type GalleryImage = { src: string; alt: string; width: number; height: number };

export function Gallery({ images, itemName }: { images: GalleryImage[]; itemName: string }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      const total = images.length;
      const wrapped = ((next % total) + total) % total;
      setIndex(wrapped);
      trackEvent("gallery_interaction", { item: itemName, index: wrapped });
    },
    [images.length, itemName],
  );

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-line)] text-sm text-[var(--color-ink-soft)]">
        No images available for this space yet
      </div>
    );
  }

  const current = images[index];

  return (
    <div>
      <div
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-dim)]"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${itemName} image gallery`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") goTo(index + 1);
          if (e.key === "ArrowLeft") goTo(index - 1);
        }}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
          priority={index === 0}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="View full screen"
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium"
        >
          <Expand className="size-3.5" aria-hidden="true" /> Full screen
        </button>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Select image">
          {images.map((img, i) => (
            <button
              key={img.src}
              role="tab"
              aria-selected={i === index}
              aria-label={`Image ${i + 1} of ${images.length}`}
              onClick={() => goTo(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-[var(--radius-md)] border-2 ${
                i === index ? "border-[var(--color-signal)]" : "border-transparent"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} title={`${itemName} — full screen gallery`}>
        <div className="relative aspect-[16/10] w-full">
          <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" />
        </div>
        <p className="mt-3 text-center text-sm text-[var(--color-ink-soft)]">{current.alt}</p>
        {images.length > 1 && (
          <div className="mt-4 flex justify-center gap-3">
            <button type="button" onClick={() => goTo(index - 1)} className="text-sm underline">
              Previous
            </button>
            <button type="button" onClick={() => goTo(index + 1)} className="text-sm underline">
              Next
            </button>
          </div>
        )}
      </Dialog>
    </div>
  );
}
