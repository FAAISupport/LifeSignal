import { createClient } from "@supabase/supabase-js";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getSupabase() {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = getEnv("SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function calculateLifeSignalRisk(input: {
  missedCheckins7d: number;
  avgResponseMinutes7d: number;
  lateResponses7d: number;
  escalations30d: number;
  guardianInterventions30d: number;
}) {
  let score = 0;

  score += Math.min(Math.max(input.missedCheckins7d, 0) * 12, 36);
  score += Math.min(Math.max(Math.floor(input.avgResponseMinutes7d / 5), 0) * 2, 24);
  score += Math.min(Math.max(input.lateResponses7d, 0) * 5, 20);
  score += Math.min(Math.max(input.escalations30d, 0) * 10, 20);
  score += Math.min(Math.max(input.guardianInterventions30d, 0) * 5, 15);

  return clamp(score, 0, 100);
}

export function calculateLifeSignalRiskLevel(score: number) {
  if (score <= 19) return "stable";
  if (score <= 39) return "caution";
  if (score <= 64) return "elevated";
  return "high";
}

export async function createTelemetrySnapshot(input: TelemetryInput) {
  const supabase = getSupabase();

  const avgResponseMinutes7d = input.avgResponseMinutes7d ?? 0;
  const missedCheckins7d = input.missedCheckins7d ?? 0;
  const lateResponses7d = input.lateResponses7d ?? 0;
  const escalations30d = input.escalations30d ?? 0;
  const guardianInterventions30d = input.guardianInterventions30d ?? 0;

  const riskScore = calculateLifeSignalRisk({
    missedCheckins7d,
    avgResponseMinutes7d,
    lateResponses7d,
    escalations30d,
    guardianInterventions30d,
  });

  const riskLevel = calculateLifeSignalRiskLevel(riskScore);

  const payload = {
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
    risk_level: riskLevel,
    trend: input.trend ?? "stable",
    notes: input.notes ?? null,
    metadata: input.metadata ?? {},
  };

  const { data, error } = await supabase
    .from("telemetry_snapshots")
    .insert(payload)
    .select("*")
    .maybeSingle();

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

  return data ?? [];
}


