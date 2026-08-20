import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/content/schema";

const labels: Record<AvailabilityStatus, string> = {
  available: "Available",
  "under-offer": "Under offer",
  "coming-soon": "Coming soon",
  leased: "Leased",
};

const styles: Record<AvailabilityStatus, string> = {
  available: "text-teal-600",
  "under-offer": "text-brass-600",
  "coming-soon": "text-ink-700",
  leased: "text-ink-600",
};

export function StatusBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <span className={cn("status-readout inline-flex items-center", styles[status])}>
      <span aria-hidden className="bracket">[</span>
      <span className="mx-1 inline-flex items-center gap-1.5">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
        {labels[status]}
      </span>
      <span aria-hidden className="bracket">]</span>
    </span>
  );
}
