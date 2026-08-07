"use server";

import { headers } from "next/headers";
import {
  tourFormSchema,
  leasingFormSchema,
  generalEnquirySchema,
} from "@/content/schema";
import { getMailAdapter } from "@/lib/mail/adapter";
import { isRateLimited } from "@/lib/rate-limit";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, unknown>;
};

async function guard(): Promise<string | null> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return "Too many submissions. Please try again in a minute.";
  }
  return null;
}

function toValues(formData: FormData): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    if (key === "consent") {
      values[key] = value === "on" || value === "true";
    } else {
      values[key] = value;
    }
  });
  return values;
}

export async function submitTourForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const limited = await guard();
  if (limited) return { status: "error", message: limited };

  const values = toValues(formData);
  const parsed = tourFormSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }
  if (parsed.data.honeypot) {
    // Silently "succeed" for bots without sending anything.
    return { status: "success", message: "Thanks — we'll be in touch to confirm your visit." };
  }

  const adapter = getMailAdapter();
  const result = await adapter.send({
    formType: "tour",
    fields: parsed.data,
    sourcePage: parsed.data.sourcePage,
    submittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "We couldn't send your request. Please try again or call the leasing team directly.",
      values,
    };
  }
  return { status: "success", message: "Thanks — we'll be in touch to confirm your visit." };
}

export async function submitLeasingForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const limited = await guard();
  if (limited) return { status: "error", message: limited };

  const values = toValues(formData);
  const parsed = leasingFormSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }
  if (parsed.data.honeypot) {
    return { status: "success", message: "Thanks — the leasing team will be in touch shortly." };
  }

  const adapter = getMailAdapter();
  const result = await adapter.send({
    formType: "leasing",
    fields: parsed.data,
    sourcePage: parsed.data.sourcePage,
    submittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "We couldn't send your enquiry. Please try again or email leasing directly.",
      values,
    };
  }
  return { status: "success", message: "Thanks — the leasing team will be in touch shortly." };
}

export async function submitGeneralEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const limited = await guard();
  if (limited) return { status: "error", message: limited };

  const values = toValues(formData);
  const parsed = generalEnquirySchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }
  if (parsed.data.honeypot) {
    return { status: "success", message: "Thanks for reaching out — we'll respond shortly." };
  }

  const adapter = getMailAdapter();
  const result = await adapter.send({
    formType: "general",
    fields: parsed.data,
    sourcePage: parsed.data.sourcePage,
    submittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    return { status: "error", message: "We couldn't send your message. Please try again shortly.", values };
  }
  return { status: "success", message: "Thanks for reaching out — we'll respond shortly." };
}
