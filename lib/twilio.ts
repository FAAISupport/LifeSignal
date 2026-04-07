import twilio from "twilio";

type IncomingSmsIntent = "yes" | "help" | "unknown";

type IncomingVoiceIntent = "confirm" | "help" | "unknown";

export function parseSmsIntent(rawBody: string): IncomingSmsIntent {
  const normalized = rawBody.trim().toLowerCase();

  if (["yes", "y", "ok", "okay", "1", "safe"].includes(normalized)) {
    return "yes";
  }

  if (["help", "sos", "911", "urgent", "emergency", "9"].includes(normalized)) {
    return "help";
  }

  return "unknown";
}

export function parseVoiceIntent(rawDigits: string): IncomingVoiceIntent {
  const value = rawDigits.trim();

  if (value === "1") {
    return "confirm";
  }

  if (value === "9") {
    return "help";
  }

  return "unknown";
}

export function buildSmsResponse(message: string) {
  const response = new twilio.twiml.MessagingResponse();
  response.message(message);
  return response.toString();
}

export function buildVoiceGatherResponse(actionUrl: string) {
  const response = new twilio.twiml.VoiceResponse();
  const gather = response.gather({
    input: ["dtmf"],
    numDigits: 1,
    timeout: 6,
    action: actionUrl,
    method: "POST",
  });

  gather.say({ voice: "alice" }, "This is your LifeSignal check-in. Press 1 if you are safe. Press 9 if you need help now.");

  response.say({ voice: "alice" }, "No input was received. Goodbye.");
  response.hangup();

  return response.toString();
}

export function buildVoiceFinalResponse(message: string) {
  const response = new twilio.twiml.VoiceResponse();
  response.say({ voice: "alice" }, message);
  response.hangup();
  return response.toString();
}

