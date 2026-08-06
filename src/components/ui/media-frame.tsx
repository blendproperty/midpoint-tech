import Image from "next/image";
import { cn } from "@/lib/utils";

export function MediaFrame({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)]", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
