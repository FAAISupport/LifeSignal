// app/api/subscribe/route.ts
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(request: Request) {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "BACKEND_URL is not configured on the server." },
      { status: 500 }
    );
  }

  const body = await request.json();

  const { name, email, seniorName, seniorLocation, plan } = body || {};

  if (!name || !email || !seniorName || !plan) {
    return NextResponse.json(
      { error: "Missing required fields (name, email, seniorName, plan)." },
      { status: 400 }
    );
  }

  const payload = {
    contact_name: name,
    contact_email: email,
    senior_name: seniorName,
    senior_location: seniorLocation || "",
    plan_code: plan, // "lite" | "standard" | "plus"
    source: "lifesignal-site",
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Backend responded with an error." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error forwarding subscribe request:", err);
    return NextResponse.json(
      { error: "Failed to reach backend service." },
      { status: 500 }
    );
  }
}
