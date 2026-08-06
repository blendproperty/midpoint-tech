import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "stone",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "stone" | "ink" | "raised";
  id?: string;
}) {
  const toneClass =
    tone === "ink"
      ? "bg-ink-900 text-stone-100"
      : tone === "raised"
        ? "bg-white text-ink-900"
        : "bg-stone-50 text-ink-900";
  return (
    <section id={id} className={cn("relative py-20 md:py-28", toneClass, className)} data-tone={tone}>
      {children}
    </section>
  );
}
