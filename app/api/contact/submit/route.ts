import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

async function parseRequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    return {
      name: String(body.name ?? ""),
      email: String(body.email ?? ""),
      interest: String(body.interest ?? ""),
      message: String(body.message ?? ""),
    };
  }

  const formData = await request.formData();

  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    interest: String(formData.get("interest") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function getOrigin(request: Request) {
  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`;
  }

  return url.origin;
}

function wantsJson(request: Request) {
  const accept = request.headers.get("accept") || "";
  const contentType = request.headers.get("content-type") || "";
  return accept.includes("application/json") || contentType.includes("application/json");
}

export async function POST(request: Request) {
  try {
    const input = await parseRequest(request);

    const name = input.name.trim();
    const email = normalizeEmail(input.email);
    const interest = input.interest.trim();
    const message = input.message.trim();
    const origin = getOrigin(request);

    if (!name || !email || !message) {
      const errorPayload = { error: "Name, email, and message are required." };

      if (wantsJson(request)) {
        return NextResponse.json(errorPayload, { status: 400 });
      }

      return NextResponse.redirect(
        new URL("/contact?error=missing-required-fields", origin),
        { status: 303 }
      );
    }

    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name,
      email,
      interest: interest || null,
      message,
      metadata: {},
    });

    if (error) {
      throw error;
    }

    if (wantsJson(request)) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.redirect(new URL("/contact/success", origin), {
      status: 303,
    });
  } catch (error) {
    console.error("contact submit error", error);

    const origin = getOrigin(request);

    if (wantsJson(request)) {
      return NextResponse.json(
        { error: "Unable to submit the contact form right now." },
        { status: 500 }
      );
    }

    return NextResponse.redirect(new URL("/contact?error=submit-failed", origin), {
      status: 303,
    });
  }
}


