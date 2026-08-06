import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/ui/media-frame";
import { Badge } from "@/components/ui/badge";
import type { Space } from "@/lib/content/spaces.schema";
import { formatSize } from "@/lib/utils";

export function SpaceListRow({ space }: { space: Space }) {
  return (
    <article className="flex flex-col gap-4 border-b border-[var(--color-line)] py-6 sm:flex-row">
      <MediaFrame
        src={space.images[0].src}
        alt={space.images[0].alt}
        width={space.images[0].width}
        height={space.images[0].height}
        className="aspect-[4/3] w-full shrink-0 sm:w-56"
        sizes="224px"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={space.status} />
          <Badge tone="sample" />
        </div>
        <h3 className="font-[var(--font-display)] text-lg font-medium">
          <Link href={`/spaces/${space.slug}`} className="hover:underline">
            {space.name}
          </Link>
        </h3>
        <p className="max-w-2xl text-sm text-[var(--color-ink-soft)]">{space.summary}</p>
        <div className="mt-1 flex flex-wrap gap-6 text-sm">
          <span><strong className="font-medium">{formatSize(space.sizeSqm)}</strong> GLA</span>
          <span>{space.buildingReference}</span>
          <span>Available: {space.availableFrom}</span>
        </div>
        <Link href={`/spaces/${space.slug}`} className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-signal-strong)] hover:underline">
          View space <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
