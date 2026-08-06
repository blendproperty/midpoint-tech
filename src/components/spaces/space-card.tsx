import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/ui/media-frame";
import { Badge } from "@/components/ui/badge";
import type { Space } from "@/lib/content/spaces.schema";
import { formatSize } from "@/lib/utils";

const typeLabels: Record<Space["type"], string> = {
  office: "Office",
  "serviced-office": "Serviced office",
  studio: "Studio",
  "flex-suite": "Flex suite",
};

export function SpaceCard({ space }: { space: Space }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white transition-shadow duration-[var(--duration-base)] hover:shadow-[0_8px_28px_-12px_rgba(20,20,15,0.25)]">
      <Link href={`/spaces/${space.slug}`} className="block" aria-label={`View ${space.name}`}>
        <MediaFrame
          src={space.images[0].src}
          alt={space.images[0].alt}
          width={space.images[0].width}
          height={space.images[0].height}
          className="aspect-[4/3] rounded-none border-0 border-b border-[var(--color-line)] transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 380px, 100vw"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={space.status} />
          <Badge tone="sample" />
        </div>
        <h3 className="font-[var(--font-display)] text-lg font-medium">
          <Link href={`/spaces/${space.slug}`} className="hover:underline">
            {space.name}
          </Link>
        </h3>
        <p className="text-sm text-[var(--color-ink-soft)]">{space.summary}</p>
        <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-[var(--color-line)] pt-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">Type</dt>
            <dd className="font-medium">{typeLabels[space.type]}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">Size</dt>
            <dd className="font-medium">{formatSize(space.sizeSqm)}</dd>
          </div>
        </dl>
        <Link
          href={`/spaces/${space.slug}`}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-signal-strong)] hover:underline"
        >
          View space <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
