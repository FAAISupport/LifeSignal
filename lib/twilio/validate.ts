import twilio from "twilio";
import type { NextRequest } from "next/server";

function buildRequestUrl(req: NextRequest) {
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = forwardedHost || req.headers.get("host") || req.nextUrl.host;
  const protocol = forwardedProto || req.nextUrl.protocol.replace(":", "") || "https";
  return protocol + "://" + host + req.nextUrl.pathname + req.nextUrl.search;
}

export async function validateTwilioRequest(req: NextRequest, params: Record<string, string>) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) {
    throw new Error("Missing TWILIO_AUTH_TOKEN");
  }

  const signature = req.headers.get("x-twilio-signature");
  if (!signature) {
    return false;
  }

  const url = buildRequestUrl(req);

  return twilio.validateRequest(authToken, signature, url, params);
}

export async function readTwilioForm(req: NextRequest) {
  const form = await req.formData();
  const data: Record<string, string> = {};

  for (const [key, value] of form.entries()) {
    data[String(key)] = String(value);
  }

  return data;
}

export function xml(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
