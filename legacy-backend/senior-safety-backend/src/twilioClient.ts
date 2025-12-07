// src/twilioClient.ts
import Twilio from "twilio";
import * as dotenv from "dotenv";

dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
  console.warn(
    "[Twilio] Missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_FROM_NUMBER in env. SMS will fail."
  );
}

export const twilioClient = TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN
  ? Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  : null;

export async function sendCheckinSms(to: string, body: string) {
  if (!twilioClient || !TWILIO_FROM_NUMBER) {
    throw new Error("Twilio is not configured");
  }

  const message = await twilioClient.messages.create({
    from: TWILIO_FROM_NUMBER,
    to,
    body,
  });

  return message; // has .sid, .status, etc.
}
