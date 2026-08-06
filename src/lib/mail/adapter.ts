export interface LeadPayload {
  formType: "tour" | "leasing" | "general";
  fields: Record<string, unknown>;
  utm?: Record<string, string>;
  sourcePage?: string;
  submittedAt: string;
}

export interface MailAdapter {
  send(lead: LeadPayload): Promise<{ ok: boolean; error?: string }>;
}

/** Development adapter — logs safely, never throws, always "succeeds". */
export class LogMailAdapter implements MailAdapter {
  async send(lead: LeadPayload) {
    const { fields, ...meta } = lead;
    const redacted = { ...fields, workEmail: fields.workEmail ? "[redacted]" : undefined, email: fields.email ? "[redacted]" : undefined };
    console.log("[mail:dev] lead captured", { ...meta, fields: redacted });
    return { ok: true };
  }
}

/**
 * Production adapter placeholder. Wire this up to the client's
 * preferred provider (SMTP, Resend, SendGrid, or a CRM webhook).
 * See docs/content-management.md → "Connecting leads to a CRM".
 */
export class EmailMailAdapter implements MailAdapter {
  async send(lead: LeadPayload) {
    const endpoint = process.env.LEADS_WEBHOOK_URL;
    if (!endpoint) {
      return { ok: false, error: "LEADS_WEBHOOK_URL is not configured" };
    }
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) return { ok: false, error: `Webhook responded ${res.status}` };
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
    }
  }
}

export function getMailAdapter(): MailAdapter {
  return process.env.NODE_ENV === "production" ? new EmailMailAdapter() : new LogMailAdapter();
}
