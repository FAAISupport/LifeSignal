import { NextRequest } from "next/server";
import {
  getTwilioComplianceReply,
  syncInboundKeywordConsent,
} from "@/lib/compliance/consent";

function xml(message: string) {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`,
    {
      status: 200,
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    }
  );
}

function escapeXml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const from = String(formData.get("From") ?? "");
  const body = String(formData.get("Body") ?? "").trim();

  const complianceReply = getTwilioComplianceReply(body);

  if (complianceReply) {
    await syncInboundKeywordConsent(from, body);
    return xml(complianceReply);
  }

  return xml("LifeSignal received your message. If this is a safety check-in, reply YES. Reply HELP for help or STOP to opt out.");
}