import { CoreCareOrchestrator } from "@/lib/core-care/core-care-orchestrator";
import { buildEscalationSteps, findNextEscalationStepToSend, markEscalationStepSent } from "@/lib/core-care/core-care-engine";
import { CoreCareSupabaseRepo } from "@/lib/core-care/core-care-supabase-repo";
import { CoreCareTwilioMessenger } from "@/lib/core-care/core-care-twilio-messenger";
import { validateTwilioWebhook } from "@/lib/twilio/twilio-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function twimlMessage(message?: string) {
  const body = message
    ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`
    : `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;

  return new Response(body, {
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

function parseAckIncidentId(body: string): string | null {
  const normalized = body.trim();
  const match = normalized.match(/\b(?:ACK|YES)\s+([A-Za-z0-9_\-]+)\b/i);
  return match?.[1] ?? null;
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
      source: "help_request",
      contactCount: contacts.length,
    },
  });

  const nextStep = findNextEscalationStepToSend(incident.steps, incident.startedAt, params.startedAt);
  if (!nextStep) return;

  const contact = contacts.find((item) => item.id === nextStep.contactId);
  if (!contact) return;

  const sent = await params.messenger.sendEscalationSms({
    incident,
    checkIn,
    recipient,
    contact,
    step: nextStep,
  });

  const sentVoice = await params.messenger.sendEscalationVoice({
    incident,
    checkIn,
    recipient,
    contact,
    step: nextStep,
  });

  if (sent.success || sentVoice.success) {
    incident.steps = markEscalationStepSent(incident.steps, nextStep.stepNumber, params.startedAt);
    await params.repo.saveIncident(incident);

    await params.repo.saveEvent({
      type: "escalation_step_sent",
      checkInId: checkIn.id,
      recipientId: params.recipientId,
      incidentId: incident.id,
      stepNumber: nextStep.stepNumber,
      channel: "escalation_sms",
      occurredAt: params.startedAt,
      organizationId: null,
      metadata: {
        contactId: contact.id,
        contactRole: contact.role,
        source: "help_request",
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode") ?? "inbound";

    const validated = await validateTwilioWebhook(request);
    if (!validated.isValid) {
      return new Response("Invalid Twilio signature", { status: 403 });
    }

    if (mode === "status_callback") {
      return twimlMessage();
    }

    const from = String(validated.form["From"] ?? "").trim();
    const body = String(validated.form["Body"] ?? "").trim();
    const receivedAt = new Date().toISOString();

    const repo = new CoreCareSupabaseRepo();
    const messenger = new CoreCareTwilioMessenger(repo);
    const orchestrator = new CoreCareOrchestrator({ repo, messenger });

    const recipient = await repo.findRecipientByPhone(from);

    if (recipient) {
      const checkIn = await repo.getLatestActionableCheckInForRecipient(recipient.id);

      if (!checkIn) {
        return twimlMessage("We received your message, but there is no active check-in right now.");
      }

      const result = await orchestrator.processInboundReply({
        checkIn,
        recipient,
        messageBody: body,
        receivedAt,
      });

      if (result.outcome === "confirmed") {
        return twimlMessage("Thank you. Your safety check-in has been recorded.");
      }

      if (result.outcome === "help_requested") {
        await triggerImmediateHelpEscalation({
          repo,
          messenger,
          checkInId: checkIn.id,
          recipientId: recipient.id,
          startedAt: receivedAt,
        });

        return twimlMessage("Help request received. We are notifying your care contacts now.");
      }

      return twimlMessage("Message received. Reply YES if you are okay, or HELP if you need assistance.");
    }

    const contact = await repo.findEscalationContactByPhone(from);

    if (contact?.canAcknowledge) {
      const explicitIncidentId = parseAckIncidentId(body);
      const incident =
        (explicitIncidentId ? await repo.getIncidentById(explicitIncidentId) : null) ??
        (await repo.getLatestOpenIncidentForRecipient(contact.recipientId));

      if (!incident) {
        return twimlMessage("No open LifeSignal incident was found to acknowledge.");
      }

      if (incident.recipientId !== contact.recipientId) {
        return twimlMessage("That incident could not be acknowledged from this number.");
      }

      const checkIn = await repo.getCheckInById(incident.checkInId);
      if (!checkIn) {
        return twimlMessage("Incident found, but the related check-in record is missing.");
      }

      await orchestrator.acknowledgeIncident({
        checkIn,
        contactId: contact.id,
        acknowledgedAt: receivedAt,
      });

      return twimlMessage("Acknowledged. This LifeSignal incident has been marked as received.");
    }

    return twimlMessage("Your message was received, but this number is not assigned to an active LifeSignal user or contact.");
  } catch (error) {
    return twimlMessage(
      `LifeSignal webhook error: ${error instanceof Error ? error.message : "unknown error"}`
    );
  }
}
