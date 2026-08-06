"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourFormSchema, type TourFormValues } from "@/content/schema";
import { submitTourForm } from "@/app/actions/leads";
import { FormField, inputClasses } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

const moveInOptions = [
  { value: "immediate", label: "Immediately" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-months-plus", label: "6+ months" },
  { value: "just-exploring", label: "Just exploring" },
] as const;

export function TourForm({ presetSpace }: { presetSpace?: string }) {
  const [pending, setPending] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TourFormValues>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: {
      spaceRequired: presetSpace ? `Interested in: ${presetSpace}` : "",
      moveInTiming: "just-exploring",
      consent: undefined as unknown as true,
    },
  });

  async function onSubmit(values: TourFormValues) {
    setPending(true);
    setServerMessage(null);
    track("start_tour_form", {});

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) formData.set(key, String(value));
    });
    formData.set("sourcePage", typeof window !== "undefined" ? window.location.pathname : "");

    const result = await submitTourForm({ status: "idle", message: "" }, formData);
    setPending(false);

    if (result.status === "success") {
      setServerMessage({ type: "success", text: result.message });
      track("submit_tour_form", {});
      reset();
    } else {
      setServerMessage({ type: "error", text: result.message });
    }
  }

  if (serverMessage?.type === "success") {
    return (
      <div role="status" className="border border-teal-500/30 bg-teal-500/5 p-6 text-teal-700">
        {serverMessage.text}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="tour-name" required error={errors.fullName?.message}>
          <input id="tour-name" className={inputClasses} {...register("fullName")} autoComplete="name" />
        </FormField>
        <FormField label="Company" htmlFor="tour-company" required error={errors.company?.message}>
          <input id="tour-company" className={inputClasses} {...register("company")} autoComplete="organization" />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Work email" htmlFor="tour-email" required error={errors.workEmail?.message}>
          <input id="tour-email" type="email" className={inputClasses} {...register("workEmail")} autoComplete="email" />
        </FormField>
        <FormField label="Phone" htmlFor="tour-phone" required error={errors.phone?.message}>
          <input id="tour-phone" type="tel" className={inputClasses} {...register("phone")} autoComplete="tel" />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Approximate space required" htmlFor="tour-space" required error={errors.spaceRequired?.message} hint="e.g. 150–200 m², or 10 desks">
          <input id="tour-space" className={inputClasses} {...register("spaceRequired")} />
        </FormField>
        <FormField label="Preferred move-in timing" htmlFor="tour-timing" required>
          <select id="tour-timing" className={inputClasses} {...register("moveInTiming")}>
            {moveInOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </FormField>
      </div>
      <FormField label="Preferred visit date" htmlFor="tour-date" required error={errors.preferredDate?.message}>
        <input id="tour-date" type="date" className={inputClasses} {...register("preferredDate")} />
      </FormField>
      <FormField label="Message (optional)" htmlFor="tour-message">
        <textarea id="tour-message" rows={3} className={inputClasses} {...register("message")} />
      </FormField>

      {/* Honeypot — hidden from real users, visible to bots */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="tour-hp">Leave blank</label>
        <input id="tour-hp" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-700">
        <input type="checkbox" className="mt-1" {...register("consent")} />
        <span>
          I agree to be contacted by the Midpoint Tech leasing team about this enquiry.
          {errors.consent && <span role="alert" className="mt-1 block text-xs font-medium text-red-700">{errors.consent.message}</span>}
        </span>
      </label>

      {serverMessage?.type === "error" && (
        <p role="alert" className="text-sm font-medium text-red-700">{serverMessage.text}</p>
      )}

      <Button type="submit" variant="primary" className="justify-center" icon={false}>
        {pending ? "Sending…" : "Request a tour"}
      </Button>
    </form>
  );
}
