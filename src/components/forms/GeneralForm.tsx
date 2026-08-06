"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalEnquirySchema, type GeneralEnquiryValues } from "@/content/schema";
import { submitGeneralEnquiry } from "@/app/actions/leads";
import { FormField, inputClasses } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export function GeneralForm() {
  const [pending, setPending] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<GeneralEnquiryValues>({
    resolver: zodResolver(generalEnquirySchema),
    defaultValues: { consent: undefined as unknown as true },
  });

  async function onSubmit(values: GeneralEnquiryValues) {
    setPending(true);
    setServerMessage(null);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) formData.set(key, String(value));
    });
    formData.set("sourcePage", typeof window !== "undefined" ? window.location.pathname : "");

    const result = await submitGeneralEnquiry({ status: "idle", message: "" }, formData);
    setPending(false);

    if (result.status === "success") {
      setServerMessage({ type: "success", text: result.message });
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
      <FormField label="Full name" htmlFor="gen-name" required error={errors.fullName?.message}>
        <input id="gen-name" className={inputClasses} {...register("fullName")} autoComplete="name" />
      </FormField>
      <FormField label="Email" htmlFor="gen-email" required error={errors.email?.message}>
        <input id="gen-email" type="email" className={inputClasses} {...register("email")} autoComplete="email" />
      </FormField>
      <FormField label="Phone (optional)" htmlFor="gen-phone">
        <input id="gen-phone" type="tel" className={inputClasses} {...register("phone")} autoComplete="tel" />
      </FormField>
      <FormField label="Message" htmlFor="gen-message" required error={errors.message?.message}>
        <textarea id="gen-message" rows={4} className={inputClasses} {...register("message")} />
      </FormField>

      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="gen-hp">Leave blank</label>
        <input id="gen-hp" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-700">
        <input type="checkbox" className="mt-1" {...register("consent")} />
        <span>
          I agree to be contacted by Midpoint Tech about this enquiry.
          {errors.consent && <span role="alert" className="mt-1 block text-xs font-medium text-red-700">{errors.consent.message}</span>}
        </span>
      </label>

      {serverMessage?.type === "error" && (
        <p role="alert" className="text-sm font-medium text-red-700">{serverMessage.text}</p>
      )}

      <Button type="submit" variant="primary" className="justify-center" icon={false}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
