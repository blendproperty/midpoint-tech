import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Media } from "@/content/schema";

export function MediaFrame({
  media,
  className,
  priority = false,
  sizes = "100vw",
  zoomOnHover = false,
}: {
  media: Media;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Requires an ancestor with the `group` class to trigger on hover. */
  zoomOnHover?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-900/5", className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover",
          zoomOnHover && "transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        )}
      />
    </div>
  );
}
