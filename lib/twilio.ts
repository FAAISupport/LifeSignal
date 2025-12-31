import twilio from "twilio";
import { env } from "@/lib/env";

export const twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

export async function sendSms(to: string, body: string) {
  return twilioClient.messages.create({
    from: env.TWILIO_FROM_NUMBER,
    to,
    body
  });
}
