"use client";
import { useId } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

const fieldClasses =
  "w-full rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/60 focus-visible:border-[var(--color-signal)]";

export function TextField({
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span aria-hidden="true" className="text-[var(--color-signal)]"> *</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-xs text-[var(--color-ink-soft)]">
          {hint}
        </p>
      )}
      <input
        id={id}
        className={cn(fieldClasses, error && "border-[var(--color-error)]")}
        aria-invalid={!!error}
        aria-describedby={cn(hint && hintId, error && errorId) || undefined}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  error,
  hint,
  required,
  className,
  children,
  ...props
}: BaseProps & React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span aria-hidden="true" className="text-[var(--color-signal)]"> *</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-xs text-[var(--color-ink-soft)]">
          {hint}
        </p>
      )}
      <select
        id={id}
        className={cn(fieldClasses, error && "border-[var(--color-error)]")}
        aria-invalid={!!error}
        aria-describedby={cn(hint && hintId, error && errorId) || undefined}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span aria-hidden="true" className="text-[var(--color-signal)]"> *</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-xs text-[var(--color-ink-soft)]">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        rows={4}
        className={cn(fieldClasses, error && "border-[var(--color-error)]")}
        aria-invalid={!!error}
        aria-describedby={cn(hint && hintId, error && errorId) || undefined}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckboxField({
  label,
  error,
  className,
  ...props
}: Omit<BaseProps, "hint" | "required"> & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          type="checkbox"
          className="mt-1 size-4 shrink-0 rounded-[var(--radius-sm)] border-[var(--color-line)]"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        <label htmlFor={id} className="text-sm text-[var(--color-ink-soft)]">
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}
