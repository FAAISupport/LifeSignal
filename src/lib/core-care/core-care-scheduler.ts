import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type CareChannel = "sms" | "voice";

type RecipientRow = {
  id: string;
  organization_id: string | null;
  timezone: string;
  preferred_channels: string[] | null;
  is_active: boolean | null;
};

type ScheduleRow = {
  id: string;
  organization_id: string | null;
  recipient_id: string;
  name: string;
  is_active: boolean;
  timezone: string;
  channel_primary: CareChannel;
  channel_fallback: CareChannel | null;
  weekdays: number[];
  time_of_day: string;
  window_minutes: number;
  max_attempts: number;
  retry_delay_minutes: number;
  escalation_delay_minutes: number;
  starts_on: string | null;
  ends_on: string | null;
};

type ExceptionRow = {
  id: string;
  organization_id: string | null;
  recipient_id: string;
  schedule_id: string | null;
  exception_date: string;
  mode: "skip" | "replace";
  override_time_of_day: string | null;
  override_channels: CareChannel[] | null;
  override_window_minutes: number | null;
};

export type GenerateCheckInsSummary = {
  runDate: string;
  created: number;
  skippedExisting: number;
  skippedInactive: number;
  skippedByException: number;
  notes: string[];
};

function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL.");
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function parseTimeOfDay(input: string): { hour: number; minute: number } {
  const match = input.match(/^(\d{2}):(\d{2})$/);
  if (!match) throw new Error(`Invalid time_of_day: ${input}`);
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

function toLocalDateParts(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const parts = fmt.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    dateString: `${get("year")}-${get("month")}-${get("day")}`,
    weekday: weekdayMap[get("weekday")] ?? 0,
  };
}

function zonedLocalToUtcIso(params: {
  dateString: string;
  timeOfDay: string;
  timeZone: string;
}): string {
  const { year, month, day } = (() => {
    const [y, m, d] = params.dateString.split("-").map(Number);
    return { year: y, month: m, day: d };
  })();

  const { hour, minute } = parseTimeOfDay(params.timeOfDay);

  const approxUtc = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

  const localFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: params.timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = localFmt.formatToParts(approxUtc);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const actualLocal = {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    second: Number(get("second")),
  };

  const desiredUtcMs = Date.UTC(year, month - 1, day, hour, minute, 0);
  const actualUtcMsIfTreatedAsLocal = Date.UTC(
    actualLocal.year,
    actualLocal.month - 1,
    actualLocal.day,
    actualLocal.hour,
    actualLocal.minute,
    actualLocal.second
  );

  const diffMs = desiredUtcMs - actualUtcMsIfTreatedAsLocal;
  return new Date(approxUtc.getTime() + diffMs).toISOString();
}

function addMinutes(iso: string, minutes: number): string {
  const d = new Date(iso);
  d.setUTCMinutes(d.getUTCMinutes() + minutes);
  return d.toISOString();
}

function sameOrAfter(dateA: string, dateB: string): boolean {
  return dateA >= dateB;
}

function sameOrBefore(dateA: string, dateB: string): boolean {
  return dateA <= dateB;
}

export class CoreCareScheduler {
  private readonly supabase: SupabaseClient;

  constructor(supabase?: SupabaseClient) {
    this.supabase = supabase ?? getSupabaseAdmin();
  }

  async generateCheckInsForDate(runDate: Date = new Date()): Promise<GenerateCheckInsSummary> {
    const summary: GenerateCheckInsSummary = {
      runDate: runDate.toISOString(),
      created: 0,
      skippedExisting: 0,
      skippedInactive: 0,
      skippedByException: 0,
      notes: [],
    };

    const { data: recipients, error: recipientError } = await this.supabase
      .from("care_recipients")
      .select("id, organization_id, timezone, preferred_channels, is_active")
      .eq("is_active", true);

    if (recipientError) {
      throw new Error(`Failed to load recipients: ${recipientError.message}`);
    }

    for (const recipient of (recipients ?? []) as RecipientRow[]) {
      const timeZone = recipient.timezone || "America/New_York";
      const local = toLocalDateParts(runDate, timeZone);

      const { data: schedules, error: scheduleError } = await this.supabase
        .from("care_recipient_schedules")
        .select("*")
        .eq("recipient_id", recipient.id)
        .eq("is_active", true);

      if (scheduleError) {
        summary.notes.push(`Failed schedules for recipient ${recipient.id}: ${scheduleError.message}`);
        continue;
      }

      if (!schedules?.length) {
        summary.skippedInactive += 1;
        continue;
      }

      for (const schedule of schedules as ScheduleRow[]) {
        if (!schedule.weekdays.includes(local.weekday)) {
          continue;
        }

        if (schedule.starts_on && !sameOrAfter(local.dateString, schedule.starts_on)) {
          continue;
        }

        if (schedule.ends_on && !sameOrBefore(local.dateString, schedule.ends_on)) {
          continue;
        }

        const { data: exceptions, error: exceptionError } = await this.supabase
          .from("care_recipient_schedule_exceptions")
          .select("*")
          .eq("recipient_id", recipient.id)
          .eq("exception_date", local.dateString);

        if (exceptionError) {
          summary.notes.push(`Failed exceptions for recipient ${recipient.id}: ${exceptionError.message}`);
          continue;
        }

        let effectiveTime = schedule.time_of_day;
        let effectiveChannels: CareChannel[] = [
          schedule.channel_primary,
          ...(schedule.channel_fallback ? [schedule.channel_fallback] : []),
        ].filter((v, i, a) => a.indexOf(v) === i) as CareChannel[];
        let effectiveWindowMinutes = schedule.window_minutes;

        const matchingException = (exceptions as ExceptionRow[] | null)?.find(
          (item) => item.schedule_id === null || item.schedule_id === schedule.id
        );

        if (matchingException?.mode === "skip") {
          summary.skippedByException += 1;
          continue;
        }

        if (matchingException?.mode === "replace") {
          if (matchingException.override_time_of_day) {
            effectiveTime = matchingException.override_time_of_day;
          }
          if (matchingException.override_channels?.length) {
            effectiveChannels = matchingException.override_channels;
          }
          if (matchingException.override_window_minutes) {
            effectiveWindowMinutes = matchingException.override_window_minutes;
          }
        }

        const scheduledFor = zonedLocalToUtcIso({
          dateString: local.dateString,
          timeOfDay: effectiveTime,
          timeZone,
        });

        const windowStart = scheduledFor;
        const windowEnd = addMinutes(scheduledFor, effectiveWindowMinutes);

        const checkInId = `checkin_${recipient.id}_${local.dateString}_${schedule.id}`;

        const { data: existing, error: existingError } = await this.supabase
          .from("care_checkins")
          .select("id")
          .eq("id", checkInId)
          .maybeSingle();

        if (existingError) {
          summary.notes.push(`Failed existing check for ${checkInId}: ${existingError.message}`);
          continue;
        }

        if (existing?.id) {
          summary.skippedExisting += 1;
          continue;
        }

        const payload = {
          id: checkInId,
          organization_id: schedule.organization_id ?? recipient.organization_id ?? null,
          recipient_id: recipient.id,
          scheduled_for: scheduledFor,
          window_start: windowStart,
          window_end: windowEnd,
          channels: effectiveChannels,
          attempts_made: 0,
          max_attempts: schedule.max_attempts,
          retry_delay_minutes: schedule.retry_delay_minutes,
          escalation_delay_minutes: schedule.escalation_delay_minutes,
          status: "pending",
          metadata: {
            schedule_id: schedule.id,
            schedule_name: schedule.name,
            generated_for_local_date: local.dateString,
            generated_for_time_zone: timeZone,
          },
        };

        const { error: insertError } = await this.supabase
          .from("care_checkins")
          .insert(payload);

        if (insertError) {
          summary.notes.push(`Failed insert for ${checkInId}: ${insertError.message}`);
          continue;
        }

        summary.created += 1;
      }
    }

    return summary;
  }
}


