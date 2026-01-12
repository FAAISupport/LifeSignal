import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server";

function getClientIp(req: Request) {
  // Vercel / proxies typically provide x-forwarded-for
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function hashIp(ip: string) {
  const salt = process.env.CONTACT_RATE_LIMIT_SALT || "lifesignal";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

async function verifyRecaptcha(token: string, ip?: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true as const };

  // Google expects form-urlencoded
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip && ip !== "unknown") body.set("remoteip", ip);

  const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!resp.ok) return { ok: false as const, error: "reCAPTCHA verification failed." };

  const data = (await resp.json()) as any;
  if (!data?.success) return { ok: false as const, error: "reCAPTCHA failed. Please try again." };

  return { ok: true as const };
}

async function enforceRateLimit(sb: any, ipHash: string) {
  // 5 requests per 15 minutes per IP hash
  const limit = Number(process.env.CONTACT_RATE_LIMIT_MAX || "5");
  const windowMinutes = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MIN || "15");

  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMinutes * 60 * 1000);

  const { data: row, error: readErr } = await sb
    .from("contact_rate_limits")
    .select("ip_hash, window_start, count")
    .eq("ip_hash", ipHash)
    .maybeSingle();

  if (readErr) {
    // If the table doesn't exist yet, don't hard-fail; just allow.
    return { ok: true as const };
  }

  if (!row) {
    const { error: insErr } = await sb.from("contact_rate_limits").insert({
      ip_hash: ipHash,
      window_start: now.toISOString(),
      count: 1,
    });
    if (insErr) return { ok: true as const };
    return { ok: true as const };
  }

  const rowWindowStart = row.window_start ? new Date(row.window_start) : new Date(0);
  if (rowWindowStart < windowStart) {
    const { error: updErr } = await sb
      .from("contact_rate_limits")
      .update({ window_start: now.toISOString(), count: 1 })
      .eq("ip_hash", ipHash);
    if (updErr) return { ok: true as const };
    return { ok: true as const };
  }

  const currentCount = Number(row.count || 0);
  if (currentCount >= limit) {
    return { ok: false as const, error: "Too many requests. Please try again in a bit." };
  }

  const { error: updErr } = await sb
    .from("contact_rate_limits")
    .update({ count: currentCount + 1 })
    .eq("ip_hash", ipHash);

  if (updErr) return { ok: true as const };
  return { ok: true as const };
}

async function notifySlack(payload: { name: string; email: string; phone?: string; message: string }) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;

  const text =
    `📩 *New LifeSignal Contact Message*\n` +
    `*Name:* ${payload.name}\n` +
    `*Email:* ${payload.email}\n` +
    (payload.phone ? `*Phone:* ${payload.phone}\n` : "") +
    `*Message:*\n${payload.message}`;

  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

async function notifyEmail(payload: { name: string; email: string; phone?: string; message: string }) {
  // Uses Resend (no dependency) if configured
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "LifeSignal <no-reply@lifesignal.app>";
  if (!apiKey || !to) return;

  const subject = `New Contact Message — ${payload.name}`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.4">
      <h2>New LifeSignal Contact Message</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      ${payload.phone ? `<p><strong>Phone:</strong> ${payload.phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <pre style="background:#f6f6f6;padding:12px;border-radius:8px;white-space:pre-wrap">${payload.message}</pre>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      reply_to: payload.email,
    }),
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return NextResponse.redirect(new URL("/contact?error=Missing%20required%20fields", req.url), 303);
  }

  const ip = getClientIp(req);
  const ipHash = hashIp(ip);

  const sb = await supabaseServer();

  // Rate limit (best effort; requires contact_rate_limits table)
  const rl = await enforceRateLimit(sb as any, ipHash);
  if (!rl.ok) {
    return NextResponse.redirect(new URL(`/contact?error=${encodeURIComponent(rl.error)}`, req.url), 303);
  }

  // reCAPTCHA (optional; requires RECAPTCHA_SECRET_KEY + form token)
  const token = String(formData.get("g-recaptcha-response") || "").trim();
  if (process.env.RECAPTCHA_SECRET_KEY) {
    if (!token) {
      return NextResponse.redirect(new URL("/contact?error=Please%20complete%20the%20reCAPTCHA", req.url), 303);
    }
    const vr = await verifyRecaptcha(token, ip);
    if (!vr.ok) {
      return NextResponse.redirect(new URL(`/contact?error=${encodeURIComponent(vr.error)}`, req.url), 303);
    }
  }

  // Store message (requires contact_messages table)
  const { error } = await sb.from("contact_messages").insert({
    name,
    email,
    phone: phone || null,
    message,
    ip_hash: ipHash,
    created_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.redirect(new URL("/contact?error=Unable%20to%20save%20message", req.url), 303);
  }

  // Notify Slack / Email (optional)
  await Promise.allSettled([
    notifySlack({ name, email, phone: phone || undefined, message }),
    notifyEmail({ name, email, phone: phone || undefined, message }),
  ]);

  return NextResponse.redirect(new URL("/contact?sent=1", req.url), 303);
}
