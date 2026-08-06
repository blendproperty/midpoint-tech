"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { leasingFormSchema, type LeasingFormValues } from "@/lib/validation/leasing-form";
import { spaceRequiredLabels, moveInTimingLabels } from "@/lib/validation/tour-form";
import { TextField, SelectField, TextAreaField, CheckboxField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { captureAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";

export function LeasingForm({ defaultSpace, isBroker = false }: { defaultSpace?: string; isBroker?: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeasingFormValues>({
    resolver: zodResolver(leasingFormSchema),
    defaultValues: {
      message: defaultSpace ? `I'm interested in ${defaultSpace}.` : "",
      isBroker,
    },
  });

  async function onSubmit(values: LeasingFormValues) {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/forms/leasing", {
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
      trackEvent("submit_leasing_enquiry", { isBroker });
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
          <p className="font-medium">Thank you — your enquiry has been sent.</p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">The leasing team will respond as soon as possible.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div aria-hidden="true" className="hidden">
        <label htmlFor="leasing-website">Leave this field blank</label>
        <input id="leasing-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("isBroker")} value={isBroker ? "true" : ""} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" required error={errors.fullName?.message} {...register("fullName")} />
        <TextField label="Company" required error={errors.company?.message} {...register("company")} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" type="email" required error={errors.email?.message} {...register("email")} />
        <TextField label="Phone" type="tel" required error={errors.phone?.message} {...register("phone")} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Space type" required error={errors.spaceType?.message} {...register("spaceType")}>
          <option value="">Select an option</option>
          <option value="office">Office</option>
          <option value="serviced-office">Serviced office</option>
          <option value="studio">Studio</option>
          <option value="flex-suite">Flex suite</option>
          <option value="not-sure">Not sure yet</option>
        </SelectField>
        <SelectField label="Approximate space required" required error={errors.spaceRequired?.message} {...register("spaceRequired")}>
          <option value="">Select an option</option>
          {Object.entries(spaceRequiredLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </SelectField>
      </div>
      <SelectField label="Preferred move-in timing" required error={errors.moveInTiming?.message} {...register("moveInTiming")}>
        <option value="">Select an option</option>
        {Object.entries(moveInTimingLabels).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </SelectField>
      <TextAreaField label="Message" required error={errors.message?.message} {...register("message")} />
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
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
