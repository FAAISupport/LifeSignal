import twilio from "twilio";

export function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    throw new Error("Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN");
  }

  return twilio(accountSid, authToken);
}

export function getBaseUrl() {
  const url =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "";

  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_APP_URL or APP_URL");
  }

  return url.replace(/\/$/, "");
}

export function getTwilioFromNumber() {
  const from = process.env.TWILIO_PHONE_NUMBER || "";
  if (!from) {
    throw new Error("Missing TWILIO_PHONE_NUMBER");
  }
  return from;
}

export function getTestToNumber() {
  const to = process.env.LIFESIGNAL_TEST_TO || "";
  if (!to) {
    throw new Error("Missing LIFESIGNAL_TEST_TO");
  }
  return to;
}
