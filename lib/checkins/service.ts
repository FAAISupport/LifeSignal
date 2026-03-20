import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { env } from '@/lib/env';
import { normalizePhoneNumber } from '@/lib/phone';
import { placeVoiceCall, sendSms } from '@/lib/twilio';

export type CheckInStatus = 'pending' | 'sent' | 'responded_ok' | 'responded_help' | 'missed' | 'escalated' | 'resolved' | 'failed';

const RESPONSE_MAP: Record<string, CheckInStatus> = {
  yes: 'responded_ok',
  y: 'responded_ok',
  ok: 'responded_ok',
  safe: 'responded_ok',
  1: 'responded_ok',
  help: 'responded_help',
  no: 'responded_help',
  sos: 'responded_help',
  emergency: 'responded_help',
  2: 'responded_help',
};

export function parseInboundResponse(message: string): CheckInStatus | null {
  const normalized = message.trim().toLowerCase();
  return RESPONSE_MAP[normalized] ?? null;
}

export async function logCronRun(jobName: string, details: Record<string, unknown>) {
  const { error } = await supabaseAdmin.from('cron_runs').insert({
    job_name: jobName,
    details,
  });

  if (error) throw error;
}

export async function materializeDueCheckIns(now = new Date()) {
  const isoNow = now.toISOString();
  const { data: schedules, error } = await supabaseAdmin
    .from('checkin_schedules')
    .select('id, senior_id, timezone, channel, message_template, grace_period_minutes, escalation_delay_minutes, seniors!inner(id, full_name, phone, status)')
    .eq('active', true)
    .lte('next_check_in_at', isoNow);

  if (error) throw error;

  let created = 0;

  for (const schedule of schedules ?? []) {
    const senior = Array.isArray(schedule.seniors) ? schedule.seniors[0] : schedule.seniors;
    if (!senior || senior.status !== 'active') continue;

    const { error: insertError } = await supabaseAdmin.from('checkins').insert({
      senior_id: schedule.senior_id,
      schedule_id: schedule.id,
      status: 'pending',
      channel: schedule.channel,
      prompt: schedule.message_template,
      due_at: isoNow,
      response_deadline_at: new Date(now.getTime() + (schedule.grace_period_minutes ?? 90) * 60000).toISOString(),
      escalation_at: new Date(now.getTime() + ((schedule.grace_period_minutes ?? 90) + (schedule.escalation_delay_minutes ?? 15)) * 60000).toISOString(),
    });

    if (insertError && insertError.code !== '23505') throw insertError;
    if (!insertError) created += 1;

    const next = new Date(now.getTime() + 24 * 60 * 60000).toISOString();
    const { error: updateError } = await supabaseAdmin
      .from('checkin_schedules')
      .update({ last_materialized_at: isoNow, next_check_in_at: next })
      .eq('id', schedule.id);

    if (updateError) throw updateError;
  }

  await logCronRun('materialize-checkins', { created, at: isoNow });
  return { created };
}

async function insertMessageEvent(values: Record<string, unknown>) {
  const { error } = await supabaseAdmin.from('message_events').insert(values);
  if (error) throw error;
}

export async function dispatchPendingCheckIns(now = new Date()) {
  const isoNow = now.toISOString();
  const { data: checkins, error } = await supabaseAdmin
    .from('checkins')
    .select('id, senior_id, channel, prompt, response_deadline_at, seniors!inner(id, full_name, phone)')
    .eq('status', 'pending')
    .lte('due_at', isoNow);

  if (error) throw error;

  const sentIds: string[] = [];
  const failedIds: string[] = [];

  for (const checkin of checkins ?? []) {
    const senior = Array.isArray(checkin.seniors) ? checkin.seniors[0] : checkin.seniors;
    const phone = senior?.phone ? normalizePhoneNumber(senior.phone) : null;

    if (!phone) {
      await supabaseAdmin.from('checkins').update({ status: 'failed', failure_reason: 'Missing or invalid senior phone number.' }).eq('id', checkin.id);
      failedIds.push(checkin.id);
      continue;
    }

    try {
      const body = checkin.prompt || `Hi ${senior.full_name}, this is your LifeSignal check-in. Reply YES if you are safe or HELP if you need assistance.`;
      let twilioSid: string | null = null;

      if (checkin.channel === 'voice' && env.enableVoiceCalls) {
        const callback = `${env.publicAppUrl}/api/twilio/status`;
        const twimlUrl = `${env.publicAppUrl}/api/twilio/inbound?checkInId=${checkin.id}&mode=voice`;
        const result = await placeVoiceCall({ to: phone, twimlUrl, statusCallback: callback });
        twilioSid = result.sid;
      } else {
        const callback = `${env.publicAppUrl}/api/twilio/status`;
        const result = await sendSms({ to: phone, body, statusCallback: callback });
        twilioSid = result.sid;
      }

      await supabaseAdmin.from('checkins').update({ status: 'sent', sent_at: isoNow, twilio_message_sid: twilioSid }).eq('id', checkin.id);
      await insertMessageEvent({ checkin_id: checkin.id, event_type: 'outbound_sent', provider_sid: twilioSid, payload: { channel: checkin.channel, phone } });
      sentIds.push(checkin.id);
    } catch (dispatchError) {
      await supabaseAdmin.from('checkins').update({ status: 'failed', failure_reason: dispatchError instanceof Error ? dispatchError.message : 'Unknown dispatch error.' }).eq('id', checkin.id);
      failedIds.push(checkin.id);
    }
  }

  await logCronRun('process-checkins', { sentIds, failedIds, at: isoNow });
  return { sentIds, failedIds };
}

export async function resolveCheckInResponse(input: {
  checkInId?: string;
  fromPhone: string;
  body: string;
  providerSid?: string;
  rawPayload?: unknown;
}) {
  const responseStatus = parseInboundResponse(input.body);
  if (!responseStatus) {
    return { matched: false, action: 'ignored' as const };
  }

  const normalizedPhone = normalizePhoneNumber(input.fromPhone);
  let checkInId = input.checkInId;

  if (!checkInId) {
    const { data: senior, error: seniorError } = await supabaseAdmin
      .from('seniors')
      .select('id')
      .eq('phone', normalizedPhone)
      .maybeSingle();

    if (seniorError) throw seniorError;
    if (!senior) return { matched: false, action: 'no_senior' as const };

    const { data: checkin, error: checkinError } = await supabaseAdmin
      .from('checkins')
      .select('id')
      .eq('senior_id', senior.id)
      .in('status', ['sent', 'missed', 'escalated'])
      .order('due_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (checkinError) throw checkinError;
    if (!checkin) return { matched: false, action: 'no_checkin' as const };
    checkInId = checkin.id;
  }

  if (!checkInId) {
    return { matched: false, action: 'no_checkin' as const };
  }

  const resolvedCheckInId = checkInId;
  const resolvedAt = new Date().toISOString();
  const nextStatus: CheckInStatus = responseStatus === 'responded_help' ? 'escalated' : 'resolved';

  const { data: checkin, error: currentError } = await supabaseAdmin
    .from('checkins')
    .select('id, senior_id, status')
    .eq('id', resolvedCheckInId)
    .single();

  if (currentError) throw currentError;

  if (['resolved', 'responded_ok', 'responded_help'].includes(checkin.status)) {
    await insertMessageEvent({ checkin_id: resolvedCheckInId, event_type: 'inbound_duplicate', provider_sid: input.providerSid ?? null, payload: input.rawPayload ?? { body: input.body } });
    return { matched: true, action: 'duplicate' as const, status: checkin.status };
  }

  const { error: updateError } = await supabaseAdmin.from('checkins').update({
    status: responseStatus,
    responded_at: resolvedAt,
    response_text: input.body,
    resolution_notes: responseStatus === 'responded_help' ? 'Senior requested help.' : 'Senior confirmed safety.',
  }).eq('id', resolvedCheckInId);

  if (updateError) throw updateError;

  await insertMessageEvent({ checkin_id: resolvedCheckInId, event_type: 'inbound_response', provider_sid: input.providerSid ?? null, payload: input.rawPayload ?? { body: input.body } });

  if (responseStatus === 'responded_help') {
    await createEscalationForCheckIn(resolvedCheckInId, 'senior_requested_help');
  } else {
    await resolveIncidentForCheckIn(resolvedCheckInId, 'Senior replied and closed the loop.');
    await supabaseAdmin.from('checkins').update({ status: nextStatus }).eq('id', resolvedCheckInId);
  }

  return { matched: true, action: 'updated' as const, status: responseStatus };
}

export async function markMissedCheckIns(now = new Date()) {
  const isoNow = now.toISOString();
  const { data, error } = await supabaseAdmin
    .from('checkins')
    .update({ status: 'missed' })
    .in('status', ['pending', 'sent'])
    .lte('response_deadline_at', isoNow)
    .select('id');

  if (error) throw error;
  return (data ?? []).map((row) => row.id as string);
}

export async function createEscalationForCheckIn(checkInId: string, reason: string) {
  const { data: existing, error: existingError } = await supabaseAdmin
    .from('escalations')
    .select('id')
    .eq('checkin_id', checkInId)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) return existing.id;

  const { data: checkin, error: checkinError } = await supabaseAdmin
    .from('checkins')
    .select('id, senior_id')
    .eq('id', checkInId)
    .single();

  if (checkinError) throw checkinError;

  const { data, error } = await supabaseAdmin.from('escalations').insert({
    checkin_id: checkInId,
    senior_id: checkin.senior_id,
    reason,
    status: 'pending',
  }).select('id').single();

  if (error) throw error;

  await supabaseAdmin.from('incidents').insert({
    checkin_id: checkInId,
    senior_id: checkin.senior_id,
    severity: reason === 'senior_requested_help' ? 'high' : 'medium',
    status: 'open',
    summary: reason === 'senior_requested_help' ? 'Senior explicitly asked for help.' : 'No check-in response received before the deadline.',
  });

  return data.id as string;
}

export async function processEscalations(now = new Date()) {
  const isoNow = now.toISOString();
  const missedCheckins = await markMissedCheckIns(now);

  for (const checkinId of missedCheckins) {
    await createEscalationForCheckIn(checkinId, 'missed_checkin');
  }

  const { data: escalations, error } = await supabaseAdmin
    .from('escalations')
    .select('id, reason, status, senior_id, checkin_id, seniors!inner(full_name), checkins!inner(id), escalation_contacts(id, full_name, phone, notification_method, priority)')
    .eq('status', 'pending');

  if (error) throw error;

  const processedIds: string[] = [];

  for (const escalation of escalations ?? []) {
    const contacts = [...(escalation.escalation_contacts ?? [])].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
    const senior = Array.isArray(escalation.seniors) ? escalation.seniors[0] : escalation.seniors;

    for (const contact of contacts) {
      const phone = normalizePhoneNumber(contact.phone);
      const body = `LifeSignal alert: ${senior?.full_name ?? 'Your loved one'} missed a scheduled check-in. Please follow up right away.`;
      const result = await sendSms({ to: phone, body, statusCallback: `${env.publicAppUrl}/api/twilio/status` });
      await insertMessageEvent({ checkin_id: escalation.checkin_id, escalation_id: escalation.id, event_type: 'escalation_sent', provider_sid: result.sid, payload: { contactId: contact.id, phone } });
    }

    await supabaseAdmin.from('escalations').update({ status: 'notified', notified_at: isoNow }).eq('id', escalation.id);
    await supabaseAdmin.from('checkins').update({ status: 'escalated' }).eq('id', escalation.checkin_id);
    processedIds.push(escalation.id);
  }

  await logCronRun('process-escalations', { processedIds, at: isoNow, missedCheckins });
  return { processedIds, missedCheckins };
}

export async function resolveIncidentForCheckIn(checkInId: string, resolution: string) {
  const { error } = await supabaseAdmin
    .from('incidents')
    .update({ status: 'resolved', resolved_at: new Date().toISOString(), resolution_notes: resolution })
    .eq('checkin_id', checkInId)
    .eq('status', 'open');

  if (error) throw error;
}

export async function writeAnalyticsRollup(day = new Date()) {
  const date = day.toISOString().slice(0, 10);
  const { count: total, error: totalError } = await supabaseAdmin.from('checkins').select('*', { count: 'exact', head: true }).gte('due_at', `${date}T00:00:00.000Z`).lt('due_at', `${date}T23:59:59.999Z`);
  if (totalError) throw totalError;

  const { count: resolved, error: resolvedError } = await supabaseAdmin.from('checkins').select('*', { count: 'exact', head: true }).in('status', ['responded_ok', 'resolved']).gte('due_at', `${date}T00:00:00.000Z`).lt('due_at', `${date}T23:59:59.999Z`);
  if (resolvedError) throw resolvedError;

  const { count: escalated, error: escalatedError } = await supabaseAdmin.from('checkins').select('*', { count: 'exact', head: true }).eq('status', 'escalated').gte('due_at', `${date}T00:00:00.000Z`).lt('due_at', `${date}T23:59:59.999Z`);
  if (escalatedError) throw escalatedError;

  const { error } = await supabaseAdmin.from('analytics_daily').upsert({
    day: date,
    total_checkins: total ?? 0,
    resolved_checkins: resolved ?? 0,
    escalated_checkins: escalated ?? 0,
  }, { onConflict: 'day' });

  if (error) throw error;
  await logCronRun('analytics-rollup', { day: date, total, resolved, escalated });
  return { day: date, total: total ?? 0, resolved: resolved ?? 0, escalated: escalated ?? 0 };
}

export async function closeStaleIncidents(now = new Date()) {
  const threshold = new Date(now.getTime() - 7 * 24 * 60 * 60000).toISOString();
  const { data, error } = await supabaseAdmin
    .from('incidents')
    .update({ status: 'stale', resolution_notes: 'Automatically marked stale after 7 days without manual resolution.' })
    .eq('status', 'open')
    .lt('created_at', threshold)
    .select('id');

  if (error) throw error;
  await logCronRun('stale-incidents', { staleIds: data?.map((row) => row.id) ?? [] });
  return data ?? [];
}

export async function writeRiskSnapshots(now = new Date()) {
  const snapshotDate = now.toISOString();
  const { data: seniors, error } = await supabaseAdmin
    .from('seniors')
    .select('id, full_name, checkins(status)');

  if (error) throw error;

  for (const senior of seniors ?? []) {
    const checkins = senior.checkins ?? [];
    const openCount = checkins.filter((row: { status: string }) => ['missed', 'escalated', 'failed'].includes(row.status)).length;
    const riskLevel = openCount >= 3 ? 'high' : openCount >= 1 ? 'medium' : 'low';

    const { error: snapshotError } = await supabaseAdmin.from('risk_snapshots').insert({
      senior_id: senior.id,
      risk_level: riskLevel,
      open_issue_count: openCount,
      snapshot_at: snapshotDate,
    });

    if (snapshotError) throw snapshotError;
  }

  await logCronRun('risk-snapshots', { snapshotAt: snapshotDate, seniorCount: seniors?.length ?? 0 });
  return { snapshotAt: snapshotDate, seniorCount: seniors?.length ?? 0 };
}

export async function generateWeeklyReports(now = new Date()) {
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60000).toISOString();
  const end = now.toISOString();
  const { data: seniors, error } = await supabaseAdmin.from('seniors').select('id, full_name');
  if (error) throw error;

  for (const senior of seniors ?? []) {
    const { count: total, error: totalError } = await supabaseAdmin.from('checkins').select('*', { count: 'exact', head: true }).eq('senior_id', senior.id).gte('due_at', start).lte('due_at', end);
    if (totalError) throw totalError;

    const { count: escalated, error: escalatedError } = await supabaseAdmin.from('checkins').select('*', { count: 'exact', head: true }).eq('senior_id', senior.id).eq('status', 'escalated').gte('due_at', start).lte('due_at', end);
    if (escalatedError) throw escalatedError;

    const summary = `${senior.full_name}: ${total ?? 0} check-ins, ${escalated ?? 0} escalations in the last 7 days.`;
    const { error: insertError } = await supabaseAdmin.from('weekly_reports').insert({
      senior_id: senior.id,
      window_start: start,
      window_end: end,
      summary,
    });
    if (insertError) throw insertError;
  }

  await logCronRun('weekly-reports', { start, end, seniorCount: seniors?.length ?? 0 });
  return { start, end, seniorCount: seniors?.length ?? 0 };
}
