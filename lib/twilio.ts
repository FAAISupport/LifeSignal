import twilio from "twilio";
import { env } from "@/lib/env";

/**
 * Lazily create the Twilio client so builds don't crash during module evaluation.
 */
export function getTwilioClient() {
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;

  if (!sid || !token) {
    throw new Error(
      "Missing Twilio env vars: TWILIO_ACCOUNT_SID and/or TWILIO_AUTH_TOKEN"
    );
  }
  if (!sid.startsWith("AC")) {
    throw new Error("Invalid TWILIO_ACCOUNT_SID: must start with 'AC'");
  }

  return twilio(sid, token);
}

export function getTwilioFromNumber() {
  const from = env.TWILIO_FROM_NUMBER;
  if (!from) throw new Error("Missing Twilio env var: TWILIO_FROM_NUMBER");
  return from;
}

/**
 * Keep the old API name `sendSms` so existing routes keep working.
 */
export async function sendSms(to: string, body: string) {
  const client = getTwilioClient();
  const from = getTwilioFromNumber();

  return client.messages.create({
    from,
    to,
    body,
  });
}
