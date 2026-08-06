import "server-only";
import { serverEnv } from "./env";

/**
 * Email delivery abstraction. Swap the provider in production via
 * EMAIL_PROVIDER without touching call sites. The "log" adapter is the
 * default for local development and CI — it never claims delivery
 * succeeded to an end user unless a real send actually occurred.
 */
export type LeadEmail = {
  subject: string;
  toOverride?: string;
  summary: Record<string, string | number | boolean | undefined>;
  bodyText: string;
};

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendLeadEmail(email: LeadEmail): Promise<SendResult> {
  const to = email.toOverride ?? serverEnv.LEASING_TO_EMAIL;

  if (!to) {
    console.warn(
      "[email] LEASING_TO_EMAIL is not configured — lead was validated but not delivered.",
      email.summary,
    );
    return { ok: false, error: "No recipient configured" };
  }

  switch (serverEnv.EMAIL_PROVIDER) {
    case "log": {
      console.info("[email:dev-log] New lead captured", {
        to,
        subject: email.subject,
        ...email.summary,
      });
      return { ok: true };
    }
    case "smtp": {
      console.error("[email:smtp] SMTP provider selected but not implemented in this build.");
      return { ok: false, error: "SMTP provider not implemented" };
    }
    case "resend": {
      if (!serverEnv.RESEND_API_KEY) {
        return { ok: false, error: "RESEND_API_KEY is not configured" };
      }
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${serverEnv.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: serverEnv.LEASING_FROM_EMAIL ?? "Midpoint Tech <no-reply@mid-point.co.za>",
            to,
            subject: email.subject,
            text: email.bodyText,
          }),
        });
        if (!res.ok) {
          return { ok: false, error: `Resend API responded with ${res.status}` };
        }
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : "Unknown send error" };
      }
    }
    default:
      return { ok: false, error: "Unknown email provider" };
  }
}
