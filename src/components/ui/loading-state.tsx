export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-3 py-16 justify-center">
      <span className="size-2.5 animate-pulse rounded-full bg-[var(--color-signal)]" />
      <span className="text-sm text-[var(--color-ink-soft)]">{label}…</span>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[var(--radius-lg)] border border-[var(--color-line)] p-4">
      <div className="aspect-[4/3] w-full rounded-[var(--radius-md)] bg-[var(--color-paper-dim)]" />
      <div className="mt-4 h-4 w-2/3 rounded bg-[var(--color-paper-dim)]" />
      <div className="mt-2 h-3 w-1/3 rounded bg-[var(--color-paper-dim)]" />
    </div>
  );
}
