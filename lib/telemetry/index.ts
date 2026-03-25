import { createClient } from "@supabase/supabase-js";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getSupabase() {
  return createClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}

export type TelemetryInput = {
  personId?: string | null;
  fullName: string;
  phoneE164?: string | null;
  responseRate7d?: number;
  responseRate30d?: number;
  avgResponseMinutes7d?: number;
  avgResponseMinutes30d?: number;
  missedCheckins7d?: number;
  missedCheckins30d?: number;
  lateResponses7d?: number;
  lateResponses30d?: number;
  escalations7d?: number;
  escalations30d?: number;
  guardianInterventions30d?: number;
  trend?: string;
  notes?: string | null;
  metadata?: Record<string, unknown>;
};

export async function createTelemetrySnapshot(input: TelemetryInput) {
  const supabase = getSupabase();

  const avgResponseMinutes7d = input.avgResponseMinutes7d ?? 0;
  const missedCheckins7d = input.missedCheckins7d ?? 0;
  const lateResponses7d = input.lateResponses7d ?? 0;
  const escalations30d = input.escalations30d ?? 0;
  const guardianInterventions30d = input.guardianInterventions30d ?? 0;

  const { data: scoreData, error: scoreError } = await supabase.rpc(
    "calculate_lifesignal_risk",
    {
      p_missed_checkins_7d: missedCheckins7d,
      p_avg_response_minutes_7d: avgResponseMinutes7d,
      p_late_responses_7d: lateResponses7d,
      p_escalations_30d: escalations30d,
      p_guardian_interventions_30d: guardianInterventions30d,
    }
  );

  if (scoreError) {
    throw new Error(`Risk score calculation failed: ${scoreError.message}`);
  }

  const riskScore = Number(scoreData ?? 0);

  const { data: levelData, error: levelError } = await supabase.rpc(
    "calculate_lifesignal_risk_level",
    {
      p_score: riskScore,
    }
  );

  if (levelError) {
    throw new Error(`Risk level calculation failed: ${levelError.message}`);
  }

  const { data, error } = await supabase
    .from("telemetry_snapshots")
    .insert({
      person_id: input.personId ?? null,
      full_name: input.fullName,
      phone_e164: input.phoneE164 ?? null,
      response_rate_7d: input.responseRate7d ?? 100,
      response_rate_30d: input.responseRate30d ?? 100,
      avg_response_minutes_7d: avgResponseMinutes7d,
      avg_response_minutes_30d: input.avgResponseMinutes30d ?? 0,
      missed_checkins_7d: missedCheckins7d,
      missed_checkins_30d: input.missedCheckins30d ?? 0,
      late_responses_7d: lateResponses7d,
      late_responses_30d: input.lateResponses30d ?? 0,
      escalations_7d: input.escalations7d ?? 0,
      escalations_30d: escalations30d,
      guardian_interventions_30d: guardianInterventions30d,
      risk_score: riskScore,
      risk_level: String(levelData ?? "stable"),
      trend: input.trend ?? "stable",
      notes: input.notes ?? null,
      metadata: input.metadata ?? {},
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to create telemetry snapshot: ${error.message}`);
  }

  return data;
}

export async function getLatestTelemetrySnapshots(limit = 12) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("telemetry_snapshots")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch telemetry snapshots: ${error.message}`);
  }

  return data;
}
