import { supabaseAdmin } from '@/lib/supabase/admin';
import { executeCheckin } from '@/lib/lifesignal/checkin-engine';
import { computeRiskBand } from '@/lib/lifesignal/risk-engine';
import { twilioClient } from '@/lib/twilio';
import { env } from '@/lib/env';

const moduleKeys = {
  carePastoralRounds: 'care_pastoral_rounds',
  bereavementSupport: 'care_bereavement_pathways',
  hospitalDischargeFollowUp: 'care_hospital_followup',
  dailySafetyCheckin: 'safety_daily_checkin',
  severeWeather: 'safety_weather_welfare',
  absenceRecovery: 'engagement_absence_recovery',
  firstTimeGuest: 'engagement_first_time_path',
  smallGroupMatch: 'engagement_small_group_match',
  volunteerReengagement: 'engagement_volunteer_reengage',
  spiritualDropoff: 'intel_dropoff_detection',
  volunteerTrainingPaths: 'volunteer_training_paths',
  volunteerAppreciationCycles: 'volunteer_appreciation_cycles',
  voiceBroadcast: 'comm_voice_broadcast',
} as const;

async function getActiveModuleSet(orgId: string) {
  const { data, error } = await supabaseAdmin
    .from('organization_modules')
    .select('module_key')
    .eq('org_id', orgId)
    .eq('active', true);

  if (error) throw error;
  return new Set((data ?? []).map((row) => row.module_key));
}

async function listOrgMembers(orgId: string) {
  const { data, error } = await supabaseAdmin
    .from('monitored_members')
    .select('*')
    .eq('org_id', orgId)
    .eq('status', 'active');
  if (error) throw error;
  return data ?? [];
}

async function logActivity(orgId: string, eventType: string, metadata: Record<string, unknown>) {
  await supabaseAdmin.from('activity_logs').insert({
    org_id: orgId,
    event_type: eventType,
    object_type: 'module_run',
    metadata,
  });
}

export async function runConfiguredModules(orgId: string, options: { severeWeatherAlert?: boolean; voiceMessage?: string }) {
  const activeModules = await getActiveModuleSet(orgId);
  const members = await listOrgMembers(orgId);

  const runSummary: Record<string, number> = {};
  const increment = (key: string, count = 1) => {
    runSummary[key] = (runSummary[key] ?? 0) + count;
  };

  if (activeModules.has(moduleKeys.carePastoralRounds)) {
    for (const member of members) {
      await logActivity(orgId, 'care_pastoral_round_created', { memberId: member.id, note: 'Added to weekly pastoral rounds queue.' });
      increment(moduleKeys.carePastoralRounds);
    }
  }

  if (activeModules.has(moduleKeys.bereavementSupport)) {
    const targets = members.filter((m) => String(m.notes ?? '').toLowerCase().includes('bereavement'));
    for (const member of targets) {
      await logActivity(orgId, 'bereavement_touchpoint_scheduled', { memberId: member.id, sequence: 'week_1_to_12' });
      increment(moduleKeys.bereavementSupport);
    }
  }

  if (activeModules.has(moduleKeys.hospitalDischargeFollowUp)) {
    const targets = members.filter((m) => String(m.notes ?? '').toLowerCase().includes('discharge'));
    for (const member of targets) {
      await executeCheckin({ orgId, memberId: member.id, channel: 'sms', message: 'How are you feeling after your hospital discharge? Reply YES if you are okay or HELP for support.' });
      await logActivity(orgId, 'hospital_follow_up_sent', { memberId: member.id });
      increment(moduleKeys.hospitalDischargeFollowUp);
    }
  }

  if (activeModules.has(moduleKeys.dailySafetyCheckin)) {
    for (const member of members) {
      const channel = member.preferred_contact_channel === 'voice' ? 'voice' : 'sms';
      await executeCheckin({ orgId, memberId: member.id, channel, message: 'Daily safety check-in from your church care team.' });
      increment(moduleKeys.dailySafetyCheckin);
    }
  }

  if (activeModules.has(moduleKeys.severeWeather) && options.severeWeatherAlert) {
    for (const member of members) {
      await twilioClient.messages.create({
        to: member.phone,
        from: env.TWILIO_PHONE_NUMBER,
        messagingServiceSid: env.TWILIO_MESSAGING_SERVICE_SID,
        body: 'Severe weather advisory: please reply YES if safe, or HELP if you need assistance.',
        statusCallback: `${env.TWILIO_STATUS_CALLBACK_BASE_URL}/api/twilio/sms`,
      });
      increment(moduleKeys.severeWeather);
    }
  }

  if (activeModules.has(moduleKeys.absenceRecovery)) {
    const { data: staleCheckins } = await supabaseAdmin
      .from('checkins')
      .select('member_id, status')
      .eq('org_id', orgId)
      .eq('status', 'missed')
      .gte('created_at', new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString());

    const memberIds = Array.from(new Set((staleCheckins ?? []).map((c) => c.member_id)));
    for (const memberId of memberIds) {
      await logActivity(orgId, 'absence_recovery_outreach_queued', { memberId });
      increment(moduleKeys.absenceRecovery);
    }
  }

  if (activeModules.has(moduleKeys.firstTimeGuest)) {
    const newMembers = members.filter((m) => new Date(m.created_at).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 30);
    for (const member of newMembers) {
      await logActivity(orgId, 'first_time_guest_followup_started', { memberId: member.id, cadence: '30_day' });
      increment(moduleKeys.firstTimeGuest);
    }
  }

  if (activeModules.has(moduleKeys.smallGroupMatch)) {
    for (const member of members) {
      await logActivity(orgId, 'small_group_match_recommendation', { memberId: member.id, recommendationBasis: 'location_and_life_stage' });
      increment(moduleKeys.smallGroupMatch);
    }
  }

  if (activeModules.has(moduleKeys.volunteerReengagement)) {
    const volunteerMembers = members.filter((m) => String(m.notes ?? '').toLowerCase().includes('volunteer'));
    for (const member of volunteerMembers) {
      await logActivity(orgId, 'volunteer_reengagement_prompt', { memberId: member.id });
      increment(moduleKeys.volunteerReengagement);
    }
  }

  if (activeModules.has(moduleKeys.spiritualDropoff)) {
    for (const member of members) {
      const { data: recent } = await supabaseAdmin
        .from('checkins')
        .select('status, created_at, responded_at')
        .eq('org_id', orgId)
        .eq('member_id', member.id)
        .order('created_at', { ascending: false })
        .limit(30);

      const checkins = recent ?? [];
      const missed7d = checkins.filter((c) => c.status === 'missed' && new Date(c.created_at).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7).length;
      const missed30d = checkins.filter((c) => c.status === 'missed').length;
      const responseDelays = checkins
        .filter((c) => c.responded_at)
        .map((c) => (new Date(c.responded_at as string).getTime() - new Date(c.created_at).getTime()) / 60000);
      const avgResponseMinutes = responseDelays.length ? responseDelays.reduce((a, b) => a + b, 0) / responseDelays.length : 180;

      const riskBand = computeRiskBand({
        missed7d,
        missed30d,
        avgResponseMinutes,
        recentEscalations: checkins.filter((c) => c.status === 'escalated').length,
        missedMedicationReminders: 0,
      });

      await supabaseAdmin.from('risk_snapshots').insert({
        org_id: orgId,
        member_id: member.id,
        risk_band: riskBand,
        score: riskBand === 'high' ? 9 : riskBand === 'elevated' ? 7 : riskBand === 'caution' ? 4 : 1,
        inputs: { missed7d, missed30d, avgResponseMinutes },
      });
      increment(moduleKeys.spiritualDropoff);
    }
  }

  if (activeModules.has(moduleKeys.volunteerTrainingPaths)) {
    await logActivity(orgId, 'volunteer_training_cycle_started', { message: 'Quarterly role-based training reminders queued.' });
    increment(moduleKeys.volunteerTrainingPaths);
  }

  if (activeModules.has(moduleKeys.volunteerAppreciationCycles)) {
    await logActivity(orgId, 'volunteer_appreciation_cycle_started', { message: 'Monthly appreciation and recognition reminders queued.' });
    increment(moduleKeys.volunteerAppreciationCycles);
  }

  if (activeModules.has(moduleKeys.voiceBroadcast) && options.voiceMessage) {
    for (const member of members) {
      await twilioClient.calls.create({
        to: member.phone,
        from: env.TWILIO_PHONE_NUMBER,
        twiml: `<Response><Say>${options.voiceMessage}</Say></Response>`,
      });
      increment(moduleKeys.voiceBroadcast);
    }
  }

  await logActivity(orgId, 'module_engine_run_completed', { runSummary, timestamp: new Date().toISOString() });
  return runSummary;
}
