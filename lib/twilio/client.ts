import twilio from "twilio";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error("Missing required environment variable: " + name);
  }
  return value;
}

export function getTwilioClient() {
  return twilio(
    requireEnv("TWILIO_ACCOUNT_SID"),
    requireEnv("TWILIO_AUTH_TOKEN"),
  );
}

export function getTwilioMessagingConfig() {
  return {
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID || "",
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || "",
    smsStatusCallbackUrl:
      process.env.TWILIO_STATUS_CALLBACK_URL ||
      ((process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "") +
        "/api/twilio/sms/status"),
    voiceStatusCallbackUrl:
      process.env.TWILIO_VOICE_STATUS_CALLBACK_URL ||
      ((process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "") +
        "/api/twilio/voice/status"),
  };
}

export async function sendLifeSignalSms(args: {
  to: string;
  body: string;
  statusCallback?: string;
}) {
  const client = getTwilioClient();
  const config = getTwilioMessagingConfig();

  const payload: Record<string, string> = {
    to: args.to,
    body: args.body,
    statusCallback: args.statusCallback || config.smsStatusCallbackUrl,
  };

  if (config.messagingServiceSid) {
    payload.messagingServiceSid = config.messagingServiceSid;
  } else if (config.phoneNumber) {
    payload.from = config.phoneNumber;
  } else {
    throw new Error("Missing TWILIO_MESSAGING_SERVICE_SID or TWILIO_PHONE_NUMBER");
  }

  return client.messages.create(payload);
}

export async function placeLifeSignalCall(args: {
  to: string;
  twimlUrl?: string;
  statusCallback?: string;
}) {
  const client = getTwilioClient();
  const config = getTwilioMessagingConfig();

  if (!config.phoneNumber) {
    throw new Error("Missing TWILIO_PHONE_NUMBER for voice calls");
  }

  const appUrl = (process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
  const url = args.twimlUrl || appUrl + "/api/twilio/voice/incoming";

  return client.calls.create({
    to: args.to,
    from: config.phoneNumber,
    url,
    statusCallback: args.statusCallback || config.voiceStatusCallbackUrl,
    statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
    statusCallbackMethod: "POST",
  });
}
