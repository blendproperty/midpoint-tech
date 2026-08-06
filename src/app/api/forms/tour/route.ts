import { NextResponse } from "next/server";
import { tourFormSchema, spaceRequiredLabels, moveInTimingLabels } from "@/lib/validation/tour-form";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendLeadEmail } from "@/lib/email";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed, retryAfterMs } = checkRateLimit(`tour:${ip}`);
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

  const parsed = tourFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please correct the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: if filled, silently report success without sending anything.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const consentTimestamp = new Date().toISOString();

  const result = await sendLeadEmail({
    subject: `Tour request — ${data.company}`,
    summary: {
      type: "tour",
      company: data.company,
      spaceRequired: spaceRequiredLabels[data.spaceRequired],
      moveInTiming: moveInTimingLabels[data.moveInTiming],
      preferredVisitDate: data.preferredVisitDate,
      consentTimestamp,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      sourcePage: data.sourcePage,
    },
    bodyText: [
      `New tour request via Midpoint Tech website`,
      `Name: ${data.fullName}`,
      `Company: ${data.company}`,
      `Email: ${data.workEmail}`,
      `Phone: ${data.phone}`,
      `Space required: ${spaceRequiredLabels[data.spaceRequired]}`,
      `Move-in timing: ${moveInTimingLabels[data.moveInTiming]}`,
      `Preferred visit date: ${data.preferredVisitDate}`,
      data.message ? `Message: ${data.message}` : undefined,
      `Consent given at: ${consentTimestamp}`,
      `Referrer: ${data.referrer ?? "n/a"}`,
      `Source page: ${data.sourcePage ?? "n/a"}`,
      `UTM: ${data.utmSource ?? "-"} / ${data.utmMedium ?? "-"} / ${data.utmCampaign ?? "-"}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We could not deliver your request right now. Please call or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
