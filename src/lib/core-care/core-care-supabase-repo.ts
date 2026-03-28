import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  CareRecipient,
  EscalationContact,
  EscalationStep,
  ExpectedCheckIn,
} from "./core-care-engine";
import type {
  CoreCareRepository,
  EscalationIncident,
} from "./core-care-orchestrator";

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

type CareRecipientRow = {
  id: string;
  full_name: string;
  phone: string;
  timezone: string;
  preferred_channels: string[] | null;
  confirmation_keywords: string[] | null;
  help_keywords: string[] | null;
  quiet_hours_start: string | null;
  quiet_hours_end: string | null;
  is_active: boolean | null;
};

type CareCheckInRow = {
  id: string;
  recipient_id: string;
  scheduled_for: string;
  window_start: string;
  window_end: string;
  channels: string[] | null;
  attempts_made: number;
  max_attempts: number;
  retry_delay_minutes: number;
  escalation_delay_minutes: number;
  status: string;
  confirmed_at: string | null;
  help_requested_at: string | null;
  last_attempt_at: string | null;
  escalation_started_at: string | null;
  created_at?: string | null;
};

type EscalationContactRow = {
  id: string;
  recipient_id: string;
  name: string;
  phone: string;
  role: EscalationContact["role"];
  priority: number;
  can_acknowledge: boolean;
  is_active: boolean | null;
};

type IncidentRow = {
  id: string;
  check_in_id: string;
  recipient_id: string;
  status: EscalationIncident["status"];
  started_at: string;
  acknowledged_at: string | null;
  acknowledged_by_contact_id: string | null;
  steps: Json | null;
  created_at?: string | null;
};

function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";
  return input.trim().startsWith("+") ? `+${digits}` : digits;
}

function mapRecipient(row: CareRecipientRow): CareRecipient {
  return {
    id: row.id,
    fullName: row.full_name,
    timezone: row.timezone,
    preferredChannels: (row.preferred_channels ?? ["sms"]).filter(
      (value): value is "sms" | "voice" => value === "sms" || value === "voice"
    ),
    confirmationKeywords: row.confirmation_keywords ?? [],
    helpKeywords: row.help_keywords ?? [],
    quietHoursStart: row.quiet_hours_start,
    quietHoursEnd: row.quiet_hours_end,
  };
}

function mapCheckIn(row: CareCheckInRow): ExpectedCheckIn {
  return {
    id: row.id,
    recipientId: row.recipient_id,
    scheduledFor: row.scheduled_for,
    windowStart: row.window_start,
    windowEnd: row.window_end,
    channels: (row.channels ?? ["sms"]).filter(
      (value): value is "sms" | "voice" => value === "sms" || value === "voice"
    ),
    attemptsMade: row.attempts_made,
    maxAttempts: row.max_attempts,
    retryDelayMinutes: row.retry_delay_minutes,
    escalationDelayMinutes: row.escalation_delay_minutes,
    status: row.status as ExpectedCheckIn["status"],
    confirmedAt: row.confirmed_at,
    helpRequestedAt: row.help_requested_at,
    lastAttemptAt: row.last_attempt_at,
    escalationStartedAt: row.escalation_started_at,
  };
}

function mapContact(row: EscalationContactRow): EscalationContact {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    role: row.role,
    priority: row.priority,
    canAcknowledge: row.can_acknowledge,
  };
}

function mapIncident(row: IncidentRow): EscalationIncident {
  const steps = Array.isArray(row.steps) ? (row.steps as unknown as EscalationStep[]) : [];

  return {
    id: row.id,
    checkInId: row.check_in_id,
    recipientId: row.recipient_id,
    status: row.status,
    startedAt: row.started_at,
    acknowledgedAt: row.acknowledged_at,
    acknowledgedByContactId: row.acknowledged_by_contact_id,
    steps,
  };
}

function serializeCheckIn(checkIn: ExpectedCheckIn) {
  return {
    id: checkIn.id,
    recipient_id: checkIn.recipientId,
    scheduled_for: checkIn.scheduledFor,
    window_start: checkIn.windowStart,
    window_end: checkIn.windowEnd,
    channels: checkIn.channels,
    attempts_made: checkIn.attemptsMade,
    max_attempts: checkIn.maxAttempts,
    retry_delay_minutes: checkIn.retryDelayMinutes,
    escalation_delay_minutes: checkIn.escalationDelayMinutes,
    status: checkIn.status,
    confirmed_at: checkIn.confirmedAt,
    help_requested_at: checkIn.helpRequestedAt,
    last_attempt_at: checkIn.lastAttemptAt,
    escalation_started_at: checkIn.escalationStartedAt,
  };
}

function serializeIncident(incident: EscalationIncident) {
  return {
    id: incident.id,
    check_in_id: incident.checkInId,
    recipient_id: incident.recipientId,
    status: incident.status,
    started_at: incident.startedAt,
    acknowledged_at: incident.acknowledgedAt,
    acknowledged_by_contact_id: incident.acknowledgedByContactId,
    steps: incident.steps as unknown as Json,
  };
}

export class CoreCareSupabaseRepo implements CoreCareRepository {
  private readonly supabase: SupabaseClient;

  constructor(supabase?: SupabaseClient) {
    this.supabase = supabase ?? getSupabaseAdmin();
  }

  async getPendingCheckIns(nowIso: string): Promise<ExpectedCheckIn[]> {
    const { data, error } = await this.supabase
      .from("care_checkins")
      .select("*")
      .in("status", ["pending", "escalating"])
      .lte("window_start", nowIso)
      .order("scheduled_for", { ascending: true });

    if (error) {
      throw new Error(`Failed to load pending check-ins: ${error.message}`);
    }

    return (data ?? []).map((row) => mapCheckIn(row as CareCheckInRow));
  }

  async getRecipientById(recipientId: string): Promise<CareRecipient | null> {
    const { data, error } = await this.supabase
      .from("care_recipients")
      .select("*")
      .eq("id", recipientId)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to load recipient ${recipientId}: ${error.message}`);
    }

    return data ? mapRecipient(data as CareRecipientRow) : null;
  }

  async getRecipientPhoneById(recipientId: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from("care_recipients")
      .select("phone")
      .eq("id", recipientId)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to load recipient phone for ${recipientId}: ${error.message}`);
    }

    return data?.phone ? String(data.phone) : null;
  }

  async getEscalationContacts(recipientId: string): Promise<EscalationContact[]> {
    const { data, error } = await this.supabase
      .from("care_escalation_contacts")
      .select("*")
      .eq("recipient_id", recipientId)
      .eq("is_active", true)
      .order("priority", { ascending: true });

    if (error) {
      throw new Error(`Failed to load escalation contacts for ${recipientId}: ${error.message}`);
    }

    return (data ?? []).map((row) => mapContact(row as EscalationContactRow));
  }

  async saveCheckIn(checkIn: ExpectedCheckIn): Promise<void> {
    const payload = serializeCheckIn(checkIn);

    const { error } = await this.supabase
      .from("care_checkins")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      throw new Error(`Failed to save check-in ${checkIn.id}: ${error.message}`);
    }
  }

  async getOpenIncidentByCheckInId(checkInId: string): Promise<EscalationIncident | null> {
    const { data, error } = await this.supabase
      .from("care_incidents")
      .select("*")
      .eq("check_in_id", checkInId)
      .in("status", ["open", "acknowledged"])
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to load incident for check-in ${checkInId}: ${error.message}`);
    }

    return data ? mapIncident(data as IncidentRow) : null;
  }

  async createIncident(incident: EscalationIncident): Promise<void> {
    const { error } = await this.supabase
      .from("care_incidents")
      .insert(serializeIncident(incident));

    if (error) {
      throw new Error(`Failed to create incident ${incident.id}: ${error.message}`);
    }
  }

  async saveIncident(incident: EscalationIncident): Promise<void> {
    const { error } = await this.supabase
      .from("care_incidents")
      .upsert(serializeIncident(incident), { onConflict: "id" });

    if (error) {
      throw new Error(`Failed to save incident ${incident.id}: ${error.message}`);
    }
  }

  async saveEvent(event: {
    type:
      | "checkin_sent"
      | "checkin_retry_sent"
      | "checkin_confirmed"
      | "checkin_help_requested"
      | "checkin_ignored_message"
      | "escalation_started"
      | "escalation_step_sent"
      | "escalation_acknowledged"
      | "incident_resolved"
      | "orchestrator_error";
    checkInId: string;
    recipientId: string;
    incidentId?: string | null;
    stepNumber?: number | null;
    channel?: "sms" | "voice" | "escalation_sms" | "escalation_voice" | null;
    occurredAt: string;
    organizationId?: string | null;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    const { error } = await this.supabase.from("care_events").insert({
      type: event.type,
      check_in_id: event.checkInId,
      recipient_id: event.recipientId,
      incident_id: event.incidentId ?? null,
      step_number: event.stepNumber ?? null,
      channel: event.channel ?? null,
      occurred_at: event.occurredAt,
      organization_id: event.organizationId ?? null,
      metadata: (event.metadata ?? {}) as Json,
    });

    if (error) {
      throw new Error(`Failed to save care event ${event.type}: ${error.message}`);
    }
  }

  async findRecipientByPhone(phone: string): Promise<(CareRecipient & { phone: string }) | null> {
    const normalized = normalizePhone(phone);

    const { data, error } = await this.supabase
      .from("care_recipients")
      .select("*")
      .eq("phone", normalized)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to load recipient by phone: ${error.message}`);
    }

    if (!data) return null;

    const row = data as CareRecipientRow;
    return {
      ...mapRecipient(row),
      phone: row.phone,
    };
  }

  async findEscalationContactByPhone(
    phone: string
  ): Promise<(EscalationContact & { recipientId: string }) | null> {
    const normalized = normalizePhone(phone);

    const { data, error } = await this.supabase
      .from("care_escalation_contacts")
      .select("*")
      .eq("phone", normalized)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to load escalation contact by phone: ${error.message}`);
    }

    if (!data) return null;

    const row = data as EscalationContactRow;
    return {
      ...mapContact(row),
      recipientId: row.recipient_id,
    };
  }

  async getLatestActionableCheckInForRecipient(
    recipientId: string
  ): Promise<ExpectedCheckIn | null> {
    const { data, error } = await this.supabase
      .from("care_checkins")
      .select("*")
      .eq("recipient_id", recipientId)
      .in("status", ["pending", "escalating", "help_requested"])
      .order("scheduled_for", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to load latest actionable check-in for recipient ${recipientId}: ${error.message}`
      );
    }

    return data ? mapCheckIn(data as CareCheckInRow) : null;
  }

  async getCheckInById(checkInId: string): Promise<ExpectedCheckIn | null> {
    const { data, error } = await this.supabase
      .from("care_checkins")
      .select("*")
      .eq("id", checkInId)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to load check-in ${checkInId}: ${error.message}`);
    }

    return data ? mapCheckIn(data as CareCheckInRow) : null;
  }

  async getIncidentById(incidentId: string): Promise<EscalationIncident | null> {
    const { data, error } = await this.supabase
      .from("care_incidents")
      .select("*")
      .eq("id", incidentId)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to load incident ${incidentId}: ${error.message}`);
    }

    return data ? mapIncident(data as IncidentRow) : null;
  }

  async getLatestOpenIncidentForRecipient(
    recipientId: string
  ): Promise<EscalationIncident | null> {
    const { data, error } = await this.supabase
      .from("care_incidents")
      .select("*")
      .eq("recipient_id", recipientId)
      .in("status", ["open", "acknowledged"])
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to load latest open incident for recipient ${recipientId}: ${error.message}`
      );
    }

    return data ? mapIncident(data as IncidentRow) : null;
  }

  async setCheckInEscalating(checkInId: string, escalationStartedAt: string): Promise<void> {
    const { error } = await this.supabase
      .from("care_checkins")
      .update({
        status: "escalating",
        escalation_started_at: escalationStartedAt,
      })
      .eq("id", checkInId);

    if (error) {
      throw new Error(`Failed to set check-in ${checkInId} to escalating: ${error.message}`);
    }
  }

  async createOrGetIncidentForHelpRequest(params: {
    checkIn: ExpectedCheckIn;
    recipientId: string;
    startedAt: string;
    steps: EscalationStep[];
  }): Promise<EscalationIncident> {
    const existing = await this.getOpenIncidentByCheckInId(params.checkIn.id);
    if (existing) return existing;

    const incident: EscalationIncident = {
      id: `incident_${params.checkIn.id}`,
      checkInId: params.checkIn.id,
      recipientId: params.recipientId,
      status: "open",
      startedAt: params.startedAt,
      acknowledgedAt: null,
      acknowledgedByContactId: null,
      steps: params.steps,
    };

    await this.createIncident(incident);
    return incident;
  }
}

