import { getSupabaseAdmin } from "@/lib/lifesignal/admin";

type ResolutionKind = "safe" | "needs_help";

type ResolveInput = {
  checkinId: string;
  resolution: ResolutionKind;
  source: "sms" | "voice";
  providerSid?: string | null;
  rawText?: string | null;
  digits?: string | null;
  speechResult?: string | null;
  from?: string | null;
};

async function ensureIncidentForHelp(checkinId: string) {
  const supabase = getSupabaseAdmin();

  const { data: existingCheckin, error: checkinError } = await supabase
    .from("checkins")
    .select("id, monitored_person_id")
    .eq("id", checkinId)
    .single();

  if (checkinError || !existingCheckin) {
    throw new Error(checkinError?.message || "Check-in not found");
  }

  const { data: existingIncident, error: existingIncidentError } = await supabase
    .from("incidents")
    .select("id")
    .eq("checkin_id", checkinId)
    .maybeSingle();

  if (existingIncidentError) {
    throw new Error(existingIncidentError.message);
  }

  if (existingIncident?.id) {
    return existingIncident.id;
  }

  const { data: incident, error: incidentError } = await supabase
    .from("incidents")
    .insert({
      checkin_id: checkinId,
      monitored_person_id: existingCheckin.monitored_person_id,
      status: "open",
      severity: "high",
      source: "help_request",
      opened_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (incidentError || !incident) {
    throw new Error(incidentError?.message || "Failed to create incident");
  }

  const { error: escalationError } = await supabase
    .from("escalations")
    .upsert(
      {
        checkin_id: checkinId,
        incident_id: incident.id,
        monitored_person_id: existingCheckin.monitored_person_id,
        status: "active",
        started_at: new Date().toISOString(),
      },
      { onConflict: "checkin_id" }
    );

  if (escalationError) {
    throw new Error(escalationError.message);
  }

  return incident.id;
}

export async function resolveCheckin(input: ResolveInput) {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { data: checkin, error: checkinError } = await supabase
    .from("checkins")
    .select("id, status")
    .eq("id", input.checkinId)
    .single();

  if (checkinError || !checkin) {
    throw new Error(checkinError?.message || "Check-in not found");
  }

  if (checkin.status === "safe" || checkin.status === "needs_help") {
    return {
      ok: true,
      alreadyResolved: true,
      checkinId: input.checkinId,
      status: checkin.status,
    };
  }

  const nextStatus = input.resolution === "safe" ? "safe" : "needs_help";

  const metadata = {
    resolved_at: now,
    resolved_by: input.source,
    provider_sid: input.providerSid ?? null,
    raw_text: input.rawText ?? null,
    digits: input.digits ?? null,
    speech_result: input.speechResult ?? null,
    from: input.from ?? null,
  };

  const { error: updateError } = await supabase
    .from("checkins")
    .update({
      status: nextStatus,
      updated_at: now,
      metadata,
    })
    .eq("id", input.checkinId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  const { error: attemptsError } = await supabase
    .from("checkin_attempts")
    .update({
      status: input.resolution === "safe" ? "responded_safe" : "responded_help",
      responded_at: now,
    })
    .eq("checkin_id", input.checkinId)
    .is("responded_at", null);

  if (attemptsError) {
    throw new Error(attemptsError.message);
  }

  if (input.resolution === "needs_help") {
    const incidentId = await ensureIncidentForHelp(input.checkinId);

    const { error: eventError } = await supabase
      .from("escalation_events")
      .insert({
        checkin_id: input.checkinId,
        incident_id: incidentId,
        event_type: "help_requested",
        payload: {
          source: input.source,
          raw_text: input.rawText ?? null,
          digits: input.digits ?? null,
          speech_result: input.speechResult ?? null,
          from: input.from ?? null,
          created_at: now,
        },
      });

    if (eventError) {
      throw new Error(eventError.message);
    }
  }

  return {
    ok: true,
    checkinId: input.checkinId,
    status: nextStatus,
  };
}
