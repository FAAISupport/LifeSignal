import { CoreCareOrchestrator } from "@/lib/core-care/core-care-orchestrator";
import { buildEscalationSteps, findNextEscalationStepToSend, markEscalationStepSent } from "@/lib/core-care/core-care-engine";
import { CoreCareSupabaseRepo } from "@/lib/core-care/core-care-supabase-repo";
import { CoreCareTwilioMessenger } from "@/lib/core-care/core-care-twilio-messenger";
import { validateTwilioWebhook } from "@/lib/twilio/twilio-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function xmlResponse(xml: string) {
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildGatherResponse(params: {
  actionUrl: string;
  intro: string[];
  timeout?: number;
  numDigits?: number;
}) {
  const intro = params.intro.map((line) => `<Say voice="alice">${escapeXml(line)}</Say>`).join("");
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<Response>`,
    `<Gather input="dtmf" numDigits="${params.numDigits ?? 1}" timeout="${params.timeout ?? 6}" action="${escapeXml(params.actionUrl)}" method="POST">`,
    intro,
    `</Gather>`,
    `<Say voice="alice">We did not receive a response. Goodbye.</Say>`,
    `<Hangup/>`,
    `</Response>`,
  ].join("");

  return xmlResponse(xml);
}

function buildSimpleVoiceResponse(lines: string[]) {
  const body = lines.map((line) => `<Say voice="alice">${escapeXml(line)}</Say>`).join("");
  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?><Response>${body}<Hangup/></Response>`);
}

function getBaseUrl(request: Request): string {
  const configured = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  if (configured) return configured.replace(/\/+$/, "");
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

async function triggerImmediateHelpEscalation(params: {
  repo: CoreCareSupabaseRepo;
  messenger: CoreCareTwilioMessenger;
  checkInId: string;
  recipientId: string;
  startedAt: string;
}) {
  const checkIn = await params.repo.getCheckInById(params.checkInId);
  if (!checkIn) return;

  await params.repo.setCheckInEscalating(checkIn.id, params.startedAt);

  const recipient = await params.repo.getRecipientById(params.recipientId);
  if (!recipient) return;

  const contacts = await params.repo.getEscalationContacts(params.recipientId);
  if (!contacts.length) return;

  const steps = buildEscalationSteps(contacts, 0, 10);
  const incident = await params.repo.createOrGetIncidentForHelpRequest({
    checkIn,
    recipientId: params.recipientId,
    startedAt: params.startedAt,
    steps,
  });

  await params.repo.saveEvent({
    type: "escalation_started",
    checkInId: checkIn.id,
    recipientId: params.recipientId,
    incidentId: incident.id,
    occurredAt: params.startedAt,
    organizationId: null,
    metadata: {
      source: "voice_help_request",
      contactCount: contacts.length,
    },
  });

  const nextStep = findNextEscalationStepToSend(incident.steps, incident.startedAt, params.startedAt);
  if (!nextStep) return;

  const contact = contacts.find((item) => item.id === nextStep.contactId);
  if (!contact) return;

  const sms = await params.messenger.sendEscalationSms({
    incident,
    checkIn,
    recipient,
    contact,
    step: nextStep,
  });

  const voice = await params.messenger.sendEscalationVoice({
    incident,
    checkIn,
    recipient,
    contact,
    step: nextStep,
  });

  if (sms.success || voice.success) {
    incident.steps = markEscalationStepSent(incident.steps, nextStep.stepNumber, params.startedAt);
    await params.repo.saveIncident(incident);

    await params.repo.saveEvent({
      type: "escalation_step_sent",
      checkInId: checkIn.id,
      recipientId: params.recipientId,
      incidentId: incident.id,
      stepNumber: nextStep.stepNumber,
      channel: "escalation_voice",
      occurredAt: params.startedAt,
      organizationId: null,
      metadata: {
        contactId: contact.id,
        contactRole: contact.role,
        source: "voice_help_request",
      },
    });
  }
}

async function handleCheckIn(request: Request, url: URL, form: Record<string, string>) {
  const digits = String(form["Digits"] ?? "").trim();
  const checkInId = url.searchParams.get("checkInId");
  const recipientId = url.searchParams.get("recipientId");

  if (!checkInId || !recipientId) {
    return buildSimpleVoiceResponse(["This LifeSignal call is missing required identifiers. Goodbye."]);
  }

  const baseUrl = getBaseUrl(request);
  const actionUrl = `${baseUrl}/api/twilio/voice?mode=checkin&checkInId=${encodeURIComponent(checkInId)}&recipientId=${encodeURIComponent(recipientId)}`;

  if (!digits) {
    return buildGatherResponse({
      actionUrl,
      intro: [
        "This is your LifeSignal safety check-in.",
        "Press 1 if you are okay.",
        "Press 9 if you need help now.",
      ],
    });
  }

  const repo = new CoreCareSupabaseRepo();
  const messenger = new CoreCareTwilioMessenger(repo);
  const orchestrator = new CoreCareOrchestrator({ repo, messenger });

  const checkIn = await repo.getCheckInById(checkInId);
  const recipient = await repo.getRecipientById(recipientId);

  if (!checkIn || !recipient) {
    return buildSimpleVoiceResponse(["We could not match this call to an active record. Goodbye."]);
  }

  if (digits === "1") {
    await orchestrator.processInboundReply({
      checkIn,
      recipient,
      messageBody: "1",
      receivedAt: new Date().toISOString(),
    });

    return buildSimpleVoiceResponse([
      "Thank you. Your LifeSignal check-in has been recorded.",
    ]);
  }

  if (digits === "9") {
    const receivedAt = new Date().toISOString();

    await orchestrator.processInboundReply({
      checkIn,
      recipient,
      messageBody: "HELP",
      receivedAt,
    });

    await triggerImmediateHelpEscalation({
      repo,
      messenger,
      checkInId,
      recipientId,
      startedAt: receivedAt,
    });

    return buildSimpleVoiceResponse([
      "Help request received. We are notifying your care contacts now.",
    ]);
  }

  return buildSimpleVoiceResponse([
    "We did not receive a valid selection. Please answer the next call or reply by text.",
  ]);
}

async function handleEscalation(request: Request, url: URL, form: Record<string, string>) {
  const digits = String(form["Digits"] ?? "").trim();

  const incidentId = url.searchParams.get("incidentId");
  const checkInId = url.searchParams.get("checkInId");
  const contactId = url.searchParams.get("contactId");
  const recipientId = url.searchParams.get("recipientId");

  if (!incidentId || !checkInId || !contactId || !recipientId) {
    return buildSimpleVoiceResponse(["This alert call is missing required identifiers. Goodbye."]);
  }

  const baseUrl = getBaseUrl(request);
  const actionUrl = `${baseUrl}/api/twilio/voice?mode=escalation&incidentId=${encodeURIComponent(incidentId)}&checkInId=${encodeURIComponent(checkInId)}&contactId=${encodeURIComponent(contactId)}&recipientId=${encodeURIComponent(recipientId)}`;

  if (!digits) {
    return buildGatherResponse({
      actionUrl,
      intro: [
        "This is a LifeSignal alert.",
        "A monitored check-in was missed or help was requested.",
        "Press 1 to acknowledge this alert.",
      ],
    });
  }

  const repo = new CoreCareSupabaseRepo();
  const messenger = new CoreCareTwilioMessenger(repo);
  const orchestrator = new CoreCareOrchestrator({ repo, messenger });

  const incident = await repo.getIncidentById(incidentId);
  const checkIn = await repo.getCheckInById(checkInId);

  if (!incident || !checkIn) {
    return buildSimpleVoiceResponse(["This alert is no longer active. Goodbye."]);
  }

  if (incident.recipientId !== recipientId) {
    return buildSimpleVoiceResponse(["Recipient mismatch. Goodbye."]);
  }

  if (digits === "1") {
    await orchestrator.acknowledgeIncident({
      checkIn,
      contactId,
      acknowledgedAt: new Date().toISOString(),
    });

    return buildSimpleVoiceResponse([
      "Thank you. This LifeSignal incident has been acknowledged.",
    ]);
  }

  return buildSimpleVoiceResponse([
    "We did not receive a valid selection. Goodbye.",
  ]);
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode") ?? "checkin";

    const validated = await validateTwilioWebhook(request);
    if (!validated.isValid) {
      return new Response("Invalid Twilio signature", { status: 403 });
    }

    if (mode === "status_callback") {
      return buildSimpleVoiceResponse(["Status received. Goodbye."]);
    }

    if (mode === "escalation") {
      return handleEscalation(request, url, validated.form);
    }

    return handleCheckIn(request, url, validated.form);
  } catch (error) {
    return buildSimpleVoiceResponse([
      `LifeSignal voice webhook error: ${error instanceof Error ? error.message : "unknown error"}`,
    ]);
  }
}
