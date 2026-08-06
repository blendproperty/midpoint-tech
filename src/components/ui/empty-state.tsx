export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-line)] px-6 py-16 text-center">
      <p className="font-[var(--font-display)] text-xl font-medium">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-ink-soft)]">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
