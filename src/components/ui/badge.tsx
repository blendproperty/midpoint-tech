import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  available: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  "coming-soon": "bg-amber-500/10 text-amber-700",
  "under-offer": "bg-[var(--color-ink)]/10 text-[var(--color-ink)]",
  leased: "bg-[var(--color-line)] text-[var(--color-ink-soft)]",
  sample: "bg-[var(--color-signal)]/10 text-[var(--color-signal-strong)]",
};

const statusLabels: Record<string, string> = {
  available: "Available",
  "coming-soon": "Coming soon",
  "under-offer": "Under offer",
  leased: "Leased",
  sample: "Sample data",
};

export function Badge({ tone = "sample", children }: { tone?: string; children?: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        statusStyles[tone] ?? statusStyles.sample,
      )}
    >
      {children ?? statusLabels[tone] ?? tone}
    </span>
  );
}
