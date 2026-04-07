import { createHmac, timingSafeEqual } from "crypto";

type ParsedSignature = {
  ts: string;
  h1: string;
};

function parsePaddleSignature(header: string | null): ParsedSignature | null {
  if (!header) return null;

  const parts = header.split(";").map((part) => part.trim());
  const map = new Map<string, string>();

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key && value) {
      map.set(key, value);
    }
  }

  const ts = map.get("ts");
  const h1 = map.get("h1");

  if (!ts || !h1) return null;

  return { ts, h1 };
}

export function verifyPaddleWebhook(
  rawBody: string,
  signatureHeader: string | null,
  secret: string
) {
  const parsed = parsePaddleSignature(signatureHeader);

  if (!parsed) {
    return false;
  }

  const signedPayload = `${parsed.ts}:${rawBody}`;
  const expected = createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  try {
    return timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(parsed.h1, "utf8")
    );
  } catch {
    return false;
  }
}

export const verifyPaddleWebhookSignature = verifyPaddleWebhook;
