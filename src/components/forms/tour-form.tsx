"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { tourFormSchema, type TourFormValues, spaceRequiredLabels, moveInTimingLabels } from "@/lib/validation/tour-form";
import { TextField, SelectField, TextAreaField, CheckboxField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { captureAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";

export function TourForm({ defaultSpace }: { defaultSpace?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const startedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TourFormValues>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: {
      message: defaultSpace ? `I'm interested in ${defaultSpace}.` : "",
    },
  });

  function onFocusFirstField() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("start_tour_form");
    }
  }

  async function onSubmit(values: TourFormValues) {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/forms/tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...captureAttribution() }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      trackEvent("submit_tour_form");
      reset();
    } catch {
      setStatus("error");
      setServerError("We couldn't reach the server. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-success)] bg-[var(--color-success)]/5 p-6">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
        <div>
          <p className="font-medium">Thank you — your tour request has been sent.</p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">The leasing team will be in touch to confirm a time that suits you.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div aria-hidden="true" className="hidden">
        <label htmlFor="tour-website">Leave this field blank</label>
        <input id="tour-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" required error={errors.fullName?.message} onFocus={onFocusFirstField} {...register("fullName")} />
        <TextField label="Company" required error={errors.company?.message} {...register("company")} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Work email" type="email" required error={errors.workEmail?.message} {...register("workEmail")} />
        <TextField label="Phone" type="tel" required error={errors.phone?.message} {...register("phone")} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Approximate space required" required error={errors.spaceRequired?.message} {...register("spaceRequired")}>
          <option value="">Select an option</option>
          {Object.entries(spaceRequiredLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </SelectField>
        <SelectField label="Preferred move-in timing" required error={errors.moveInTiming?.message} {...register("moveInTiming")}>
          <option value="">Select an option</option>
          {Object.entries(moveInTimingLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </SelectField>
      </div>
      <TextField label="Preferred visit date" type="date" required error={errors.preferredVisitDate?.message} {...register("preferredVisitDate")} />
      <TextAreaField label="Message (optional)" error={errors.message?.message} {...register("message")} />
      <CheckboxField
        label="I consent to Midpoint Tech contacting me about this enquiry, in line with the privacy policy."
        error={errors.consent?.message}
        {...register("consent")}
      />

      {status === "error" && serverError && (
        <div role="alert" className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-error)] bg-[var(--color-error)]/5 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[var(--color-error)]" aria-hidden="true" />
          {serverError}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Request a tour"}
      </Button>
    </form>
  );
}
