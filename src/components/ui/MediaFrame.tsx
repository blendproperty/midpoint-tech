import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Media } from "@/content/schema";

export function MediaFrame({ media, className, priority = false, sizes = "100vw" }: { media: Media; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-900/5", className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
