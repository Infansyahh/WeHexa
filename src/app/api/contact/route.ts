import { NextResponse } from "next/server";
import { z } from "zod";

const serviceValues = ["web", "ai", "design", "consulting"] as const;
const budgetValues = ["5-10", "10-25", "25-50", "50+"] as const;

const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().max(40).optional().default(""),
  serviceType: z.enum(serviceValues),
  projectBudget: z.enum(budgetValues),
  projectDetails: z.string().trim().min(20).max(4000),
});

type ContactPayload = z.infer<typeof contactSchema>;

// shortcut: per-instance memory limiter, replace with Upstash/Redis when running multi-region
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + 60_000 });
    if (hits.size > 500) {
      for (const [mapKey, value] of hits) {
        if (value.resetAt < now) hits.delete(mapKey);
      }
    }
    return false;
  }

  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "company" in body &&
    typeof body.company === "string" &&
    body.company.length > 0
  ) {
    // Honeypot filled: pretend success so bots do not retry.
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) {
        errors[key] = issue.message;
      }
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        errors,
      },
      { status: 422 },
    );
  }

  const lead: ContactPayload = parsed.data;
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "wehexa-contact",
          submittedAt: new Date().toISOString(),
          lead,
        }),
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded ${response.status}`);
      }
    } catch (error) {
      console.error("[contact] webhook delivery failed", error);
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not deliver your brief. Please email hello@wehexa.io.",
        },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact] lead captured (no CONTACT_WEBHOOK_URL set)", {
      fullName: lead.fullName,
      email: lead.email,
      whatsapp: lead.whatsapp,
      serviceType: lead.serviceType,
      projectBudget: lead.projectBudget,
    });
  }

  return NextResponse.json({ ok: true });
}
