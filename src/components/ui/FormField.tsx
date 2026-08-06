import { cn } from "@/lib/utils";

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  children,
  required,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink-900">
        {label} {required && <span aria-hidden className="text-brass-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ink-700">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClasses = cn(
  "w-full border border-ink-900/25 bg-white px-4 py-2.5 text-ink-900 placeholder:text-ink-600/50",
  "focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
);
