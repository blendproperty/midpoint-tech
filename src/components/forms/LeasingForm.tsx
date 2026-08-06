"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leasingFormSchema, type LeasingFormValues } from "@/content/schema";
import { submitLeasingForm } from "@/app/actions/leads";
import { FormField, inputClasses } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

const spaceTypeOptions = [
  { value: "office-suite", label: "Office suite" },
  { value: "full-floor", label: "Full floor" },
  { value: "shell-and-core", label: "Shell and core" },
  { value: "co-working-desk", label: "Co-working desk" },
] as const;

const moveInOptions = [
  { value: "immediate", label: "Immediately" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-months-plus", label: "6+ months" },
  { value: "just-exploring", label: "Just exploring" },
] as const;

export function LeasingForm({ presetSpace }: { presetSpace?: string }) {
  const [pending, setPending] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeasingFormValues>({
    resolver: zodResolver(leasingFormSchema),
    defaultValues: {
      spaceSize: presetSpace ? `Interested in: ${presetSpace}` : "",
      spaceType: "office-suite",
      moveInTiming: "just-exploring",
      consent: undefined as unknown as true,
    },
  });

  async function onSubmit(values: LeasingFormValues) {
    setPending(true);
    setServerMessage(null);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) formData.set(key, String(value));
    });
    formData.set("sourcePage", typeof window !== "undefined" ? window.location.pathname : "");

    const result = await submitLeasingForm({ status: "idle", message: "" }, formData);
    setPending(false);

    if (result.status === "success") {
      setServerMessage({ type: "success", text: result.message });
      track("submit_leasing_enquiry", {});
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
        <FormField label="Full name" htmlFor="lease-name" required error={errors.fullName?.message}>
          <input id="lease-name" className={inputClasses} {...register("fullName")} autoComplete="name" />
        </FormField>
        <FormField label="Company" htmlFor="lease-company" required error={errors.company?.message}>
          <input id="lease-company" className={inputClasses} {...register("company")} autoComplete="organization" />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="lease-email" required error={errors.email?.message}>
          <input id="lease-email" type="email" className={inputClasses} {...register("email")} autoComplete="email" />
        </FormField>
        <FormField label="Phone" htmlFor="lease-phone" required error={errors.phone?.message}>
          <input id="lease-phone" type="tel" className={inputClasses} {...register("phone")} autoComplete="tel" />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Space-size requirement" htmlFor="lease-size" required error={errors.spaceSize?.message}>
          <input id="lease-size" className={inputClasses} {...register("spaceSize")} />
        </FormField>
        <FormField label="Space type" htmlFor="lease-type" required>
          <select id="lease-type" className={inputClasses} {...register("spaceType")}>
            {spaceTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </FormField>
      </div>
      <FormField label="Move-in timing" htmlFor="lease-timing" required>
        <select id="lease-timing" className={inputClasses} {...register("moveInTiming")}>
          {moveInOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </FormField>
      <FormField label="Message" htmlFor="lease-message">
        <textarea id="lease-message" rows={4} className={inputClasses} {...register("message")} />
      </FormField>

      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="lease-hp">Leave blank</label>
        <input id="lease-hp" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
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
        {pending ? "Sending…" : "Send leasing enquiry"}
      </Button>
    </form>
  );
}
