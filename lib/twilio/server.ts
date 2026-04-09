import Twilio from "twilio";

export function createTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    throw new Error("Missing Twilio environment variables.");
  }

  return Twilio(accountSid, authToken);
}

export function getTwilioFromNumber() {
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  if (!fromNumber) {
    throw new Error("Missing TWILIO_PHONE_NUMBER.");
  }
  return fromNumber;
}
