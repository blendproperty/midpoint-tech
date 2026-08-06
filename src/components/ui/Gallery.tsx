"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import type { Media } from "@/content/schema";
import { track } from "@/lib/analytics";

export function Gallery({ media, name }: { media: Media[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % media.length), [media.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + media.length) % media.length), [media.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  if (media.length === 0) {
    return <div className="flex h-80 items-center justify-center border border-dashed border-ink-900/20 text-ink-700">No images available yet</div>;
  }

  const current = media[index];

  return (
    <div>
      <div className="relative h-[360px] md:h-[520px] w-full overflow-hidden bg-ink-900/5">
        <Image src={current.src} alt={current.alt} fill sizes="(min-width:768px) 60vw, 100vw" className="object-cover" priority />
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            track("gallery_interaction", { name, action: "open_lightbox" });
          }}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-ink-950/80 px-3 py-2 text-sm text-stone-100 hover:bg-ink-950"
        >
          <Expand className="h-4 w-4" aria-hidden /> View full screen
        </button>
        {media.length > 1 && (
          <>
            <button type="button" aria-label="Previous image" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-ink-950/70 p-2 text-stone-100 hover:bg-ink-950">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next image" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-ink-950/70 p-2 text-stone-100 hover:bg-ink-950">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {media.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {media.map((m, i) => (
            <button
              key={m.src + i}
              type="button"
              aria-label={`Show image ${i + 1} of ${media.length}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden border ${i === index ? "border-brass-500" : "border-transparent"}`}
            >
              <Image src={m.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div role="dialog" aria-modal="true" aria-label={`${name} image ${index + 1} of ${media.length}`} className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4">
          <button type="button" aria-label="Close full screen gallery" onClick={() => setOpen(false)} className="absolute right-4 top-4 p-2 text-stone-100 hover:text-brass-400">
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-full w-full max-w-5xl">
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
          </div>
          {media.length > 1 && (
            <>
              <button type="button" aria-label="Previous image" onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-stone-100 hover:text-brass-400">
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button type="button" aria-label="Next image" onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-stone-100 hover:text-brass-400">
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
