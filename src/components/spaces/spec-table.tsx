export function SpecTable({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-[var(--color-line)] rounded-[var(--radius-lg)] border border-[var(--color-line)]">
      {specs.map((spec) => (
        <div key={spec.label} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
          <dt className="text-[var(--color-ink-soft)]">{spec.label}</dt>
          <dd className="font-medium">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
