import "server-only";

import Twilio from "twilio";
import type {
  CheckInMessageContext,
  CoreCareMessenger,
  EscalationMessageContext,
  NotificationResult,
} from "./core-care-orchestrator";
import type { CoreCareSupabaseRepo } from "./core-care-supabase-repo";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getBaseUrl(): string {
  const raw = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  if (!raw) {
    throw new Error("Missing APP_URL or NEXT_PUBLIC_APP_URL.");
  }
  return raw.replace(/\/+$/, "");
}

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | null | undefined>
): string {
  const url = new URL(`${getBaseUrl()}${path}`);

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function truncate(input: string, max = 320): string {
  if (input.length <= max) return input;
  return `${input.slice(0, max - 1)}…`;
}

export class CoreCareTwilioMessenger implements CoreCareMessenger {
  private readonly client: Twilio.Twilio;
  private readonly fromPhone: string;
  private readonly repo: CoreCareSupabaseRepo;

  constructor(repo: CoreCareSupabaseRepo) {
    const sid = getEnv("TWILIO_ACCOUNT_SID");
    const token = getEnv("TWILIO_AUTH_TOKEN");

    this.client = Twilio(sid, token);
    this.fromPhone = getEnv("TWILIO_PHONE_NUMBER");
    this.repo = repo;
  }

  async sendCheckInSms(context: CheckInMessageContext): Promise<NotificationResult> {
    try {
      const to = await this.lookupRecipientPhone(context.recipient.id);

      const body = truncate(
        [
          `Hi ${context.recipient.fullName}, this is your LifeSignal check-in.`,
          `Reply YES if you are okay.`,
          `Reply HELP if you need assistance.`,
        ].join(" ")
      );

      const statusCallback = buildUrl("/api/twilio/sms", {
        mode: "status_callback",
        checkInId: context.checkIn.id,
      });

      const message = await this.client.messages.create({
        to,
        from: this.fromPhone,
        body,
        statusCallback,
      });

      return {
        success: true,
        externalId: message.sid,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async sendCheckInVoice(context: CheckInMessageContext): Promise<NotificationResult> {
    try {
      const to = await this.lookupRecipientPhone(context.recipient.id);

      const call = await this.client.calls.create({
        to,
        from: this.fromPhone,
        url: buildUrl("/api/twilio/voice", {
          mode: "checkin",
          checkInId: context.checkIn.id,
          recipientId: context.recipient.id,
        }),
        method: "POST",
        statusCallback: buildUrl("/api/twilio/voice", {
          mode: "status_callback",
          checkInId: context.checkIn.id,
        }),
        statusCallbackMethod: "POST",
      });

      return {
        success: true,
        externalId: call.sid,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async sendEscalationSms(context: EscalationMessageContext): Promise<NotificationResult> {
    try {
      const body = truncate(
        [
          `LifeSignal alert for ${context.recipient.fullName}.`,
          `A scheduled safety check-in was missed or help was requested.`,
          `Reply ACK ${context.incident.id} to acknowledge.`,
        ].join(" ")
      );

      const message = await this.client.messages.create({
        to: context.contact.phone,
        from: this.fromPhone,
        body,
        statusCallback: buildUrl("/api/twilio/sms", {
          mode: "status_callback",
          incidentId: context.incident.id,
          stepNumber: context.step.stepNumber,
        }),
      });

      return {
        success: true,
        externalId: message.sid,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async sendEscalationVoice(context: EscalationMessageContext): Promise<NotificationResult> {
    try {
      const call = await this.client.calls.create({
        to: context.contact.phone,
        from: this.fromPhone,
        url: buildUrl("/api/twilio/voice", {
          mode: "escalation",
          incidentId: context.incident.id,
          checkInId: context.checkIn.id,
          recipientId: context.recipient.id,
          contactId: context.contact.id,
          stepNumber: context.step.stepNumber,
        }),
        method: "POST",
        statusCallback: buildUrl("/api/twilio/voice", {
          mode: "status_callback",
          incidentId: context.incident.id,
          stepNumber: context.step.stepNumber,
        }),
        statusCallbackMethod: "POST",
      });

      return {
        success: true,
        externalId: call.sid,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async lookupRecipientPhone(recipientId: string): Promise<string> {
    const phone = await this.repo.getRecipientPhoneById(recipientId);

    if (!phone) {
      throw new Error(`Recipient phone not found for ${recipientId}.`);
    }

    return phone;
  }
}
