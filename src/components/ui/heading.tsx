import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
};

const sizeMap: Record<NonNullable<HeadingProps["as"]>, string> = {
  h1: "text-[clamp(2.25rem,5vw+1rem,4.5rem)] leading-[1.04]",
  h2: "text-[clamp(1.75rem,3vw+1rem,3rem)] leading-[1.08]",
  h3: "text-[clamp(1.375rem,1.5vw+1rem,1.875rem)] leading-[1.15]",
  h4: "text-[clamp(1.125rem,1vw+1rem,1.375rem)] leading-[1.2]",
};

export function Heading({ as = "h2", eyebrow, className, children }: HeadingProps) {
  const Tag = as;
  return (
    <div>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-signal-strong)]">
          {eyebrow}
        </p>
      )}
      <Tag className={cn("font-medium tracking-tight text-balance", sizeMap[as], className)}>
        {children}
      </Tag>
    </div>
  );
}
