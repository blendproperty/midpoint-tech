import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/content/schema";

const labels: Record<AvailabilityStatus, string> = {
  available: "Available",
  "under-offer": "Under offer",
  "coming-soon": "Coming soon",
  leased: "Leased",
};

const styles: Record<AvailabilityStatus, string> = {
  available: "bg-teal-500/10 text-teal-600 border-teal-500/30",
  "under-offer": "bg-brass-500/10 text-brass-600 border-brass-500/40",
  "coming-soon": "bg-ink-900/5 text-ink-700 border-ink-900/20",
  leased: "bg-ink-900/5 text-ink-600 border-ink-900/10",
};

export function StatusBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <span className={cn("tick-label inline-flex items-center gap-1.5 border px-2.5 py-1", styles[status])}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}
