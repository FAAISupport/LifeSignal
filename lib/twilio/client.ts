import twilio from "twilio";

type SendLifeSignalSmsArgs = {
  to: string;
  body: string;
  from?: string;
  mediaUrl?: string[];
  statusCallback?: string;
};

type PlaceLifeSignalCallArgs = {
  to: string;
  twiml?: string;
  url?: string;
  from?: string;
  statusCallback?: string;
  machineDetection?: "Enable" | "DetectMessageEnd";
};

export function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    throw new Error("Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN");
  }

  return twilio(accountSid, authToken);
}

function getSmsFromNumber(explicitFrom?: string) {
  const from =
    explicitFrom ||
    process.env.TWILIO_SMS_FROM ||
    process.env.TWILIO_PHONE_NUMBER;

  if (!from) {
    throw new Error("Missing TWILIO_SMS_FROM or TWILIO_PHONE_NUMBER");
  }

  return from;
}

function getVoiceFromNumber(explicitFrom?: string) {
  const from =
    explicitFrom ||
    process.env.TWILIO_VOICE_FROM ||
    process.env.TWILIO_PHONE_NUMBER;

  if (!from) {
    throw new Error("Missing TWILIO_VOICE_FROM or TWILIO_PHONE_NUMBER");
  }

  return from;
}

export async function sendLifeSignalSms(args: SendLifeSignalSmsArgs) {
  const client = getTwilioClient();

  const payload = {
    to: args.to,
    from: getSmsFromNumber(args.from),
    body: args.body,
    ...(args.mediaUrl && args.mediaUrl.length > 0 ? { mediaUrl: args.mediaUrl } : {}),
    ...(args.statusCallback ? { statusCallback: args.statusCallback } : {}),
  };

  return client.messages.create(payload);
}

export async function placeLifeSignalCall(args: PlaceLifeSignalCallArgs) {
  const client = getTwilioClient();

  if (!args.twiml && !args.url) {
    throw new Error("placeLifeSignalCall requires either twiml or url");
  }

  const payload = {
    to: args.to,
    from: getVoiceFromNumber(args.from),
    ...(args.twiml ? { twiml: args.twiml } : {}),
    ...(args.url ? { url: args.url } : {}),
    ...(args.statusCallback ? { statusCallback: args.statusCallback } : {}),
    ...(args.machineDetection ? { machineDetection: args.machineDetection } : {}),
  };

  return client.calls.create(payload);
}

export function getTwilioPublicConfig() {
  return {
    smsFrom: process.env.TWILIO_SMS_FROM || process.env.TWILIO_PHONE_NUMBER || null,
    voiceFrom: process.env.TWILIO_VOICE_FROM || process.env.TWILIO_PHONE_NUMBER || null,
    hasAccountSid: Boolean(process.env.TWILIO_ACCOUNT_SID),
    hasAuthToken: Boolean(process.env.TWILIO_AUTH_TOKEN),
  };
}
