import { tenantCategories } from "@/lib/content/testimonials";

export function Marquee() {
  const items = [...tenantCategories, ...tenantCategories];

  return (
    <div className="overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-paper-dim)] py-6">
      <div className="marquee-track">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex shrink-0 items-center" aria-hidden={rep === 1}>
            {items.map((category, i) => (
              <span
                key={`${rep}-${i}`}
                className="mx-6 whitespace-nowrap font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink-soft)] md:text-3xl"
              >
                {category}
                <span className="ml-6 text-[var(--color-signal)]" aria-hidden="true">
                  &middot;
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
