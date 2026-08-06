import { cn } from "@/lib/utils";

/**
 * Hand-built abstract line-art accent (Hallmark asset tier 2: no external
 * dependency, no stock photography). Reads as a stylised architectural plan
 * — never claims to depict the real building. Composed with intent per
 * section, not decoratively repeated.
 */
export function BlueprintMark({ className, variant = "site" }: { className?: string; variant?: "site" | "pin" }) {
  if (variant === "pin") {
    return (
      <svg viewBox="0 0 200 200" fill="none" className={cn("text-[var(--color-line)]", className)} aria-hidden="true">
        <rect x="20" y="20" width="160" height="160" stroke="currentColor" strokeWidth="1" />
        <rect x="20" y="20" width="80" height="60" stroke="currentColor" strokeWidth="1" />
        <rect x="100" y="20" width="80" height="100" stroke="currentColor" strokeWidth="1" />
        <rect x="20" y="80" width="40" height="100" stroke="currentColor" strokeWidth="1" />
        <rect x="60" y="80" width="40" height="60" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="140" x2="180" y2="140" stroke="currentColor" strokeWidth="1" />
        <circle cx="140" cy="160" r="7" className="fill-[var(--color-signal)]" />
        <circle cx="140" cy="160" r="16" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 400" fill="none" className={cn("text-[var(--color-line-dark)]", className)} aria-hidden="true">
      <rect x="20" y="20" width="360" height="360" stroke="currentColor" strokeWidth="1" />
      <rect x="20" y="20" width="220" height="140" stroke="currentColor" strokeWidth="1" />
      <rect x="240" y="20" width="140" height="220" stroke="currentColor" strokeWidth="1" />
      <rect x="20" y="160" width="120" height="220" stroke="currentColor" strokeWidth="1" />
      <rect x="140" y="240" width="100" height="140" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="380" x2="380" y2="380" stroke="currentColor" strokeWidth="1" />
      <line x1="240" y1="240" x2="380" y2="240" stroke="currentColor" strokeWidth="1" />
      <circle cx="190" cy="130" r="6" className="fill-[var(--color-signal)]" />
    </svg>
  );
}
