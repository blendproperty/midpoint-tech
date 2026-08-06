import { NextResponse } from "next/server";
import { leasingFormSchema } from "@/lib/validation/leasing-form";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendLeadEmail } from "@/lib/email";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed, retryAfterMs } = checkRateLimit(`leasing:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leasingFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please correct the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const consentTimestamp = new Date().toISOString();

  const result = await sendLeadEmail({
    subject: `${data.isBroker ? "Broker enquiry" : "Leasing enquiry"} — ${data.company}`,
    summary: {
      type: data.isBroker ? "broker" : "leasing",
      company: data.company,
      spaceType: data.spaceType,
      spaceRequired: data.spaceRequired,
      moveInTiming: data.moveInTiming,
      consentTimestamp,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      sourcePage: data.sourcePage,
    },
    bodyText: [
      `New ${data.isBroker ? "broker" : "leasing"} enquiry via Midpoint Tech website`,
      `Name: ${data.fullName}`,
      `Company: ${data.company}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Space type: ${data.spaceType}`,
      `Space required: ${data.spaceRequired}`,
      `Move-in timing: ${data.moveInTiming}`,
      `Message: ${data.message}`,
      `Consent given at: ${consentTimestamp}`,
      `Referrer: ${data.referrer ?? "n/a"}`,
      `Source page: ${data.sourcePage ?? "n/a"}`,
      `UTM: ${data.utmSource ?? "-"} / ${data.utmMedium ?? "-"} / ${data.utmCampaign ?? "-"}`,
    ].join("\n"),
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We could not deliver your enquiry right now. Please call or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
