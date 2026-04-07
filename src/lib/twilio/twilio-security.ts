import "server-only";

import Twilio from "twilio";

function getPublicBaseUrl(request: Request): string {
  const configured = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function validateTwilioWebhook(request: Request): Promise<{
  isValid: boolean;
  form: Record<string, string>;
  signature: string;
  url: string;
}> {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) {
    throw new Error("Missing TWILIO_AUTH_TOKEN.");
  }

  const signature = request.headers.get("x-twilio-signature") ?? "";
  const formData = await request.formData();

  const form: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    form[key] = String(value);
  }

  const requestUrl = new URL(request.url);
  const publicUrl = `${getPublicBaseUrl(request)}${requestUrl.pathname}${requestUrl.search}`;

  const isValid = Twilio.validateRequest(authToken, signature, publicUrl, form);

  return {
    isValid,
    form,
    signature,
    url: publicUrl,
  };
}
