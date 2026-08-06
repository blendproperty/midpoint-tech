import { cn } from "@/lib/utils";

export function EmptyState({ title, description, action, className }: { title: string; description: string; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border border-dashed border-ink-900/20 px-8 py-16 text-center", className)}>
      <p className="font-display text-step-1 text-ink-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-ink-700">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
