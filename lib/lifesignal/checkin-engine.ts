import { twilioClient } from '@/lib/twilio';
import { env } from '@/lib/env';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { CheckinExecutionResult } from '@/types/lifesignal';

export async function executeCheckin(args: { orgId: string; memberId: string; channel: 'sms' | 'voice'; message: string }): Promise<CheckinExecutionResult> {
  const { data: checkin, error } = await supabaseAdmin
    .from('checkins')
    .insert({
      org_id: args.orgId,
      member_id: args.memberId,
      channel: args.channel,
      status: 'pending',
      sent_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (error) throw error;

  const { data: member } = await supabaseAdmin.from('monitored_members').select('phone').eq('id', args.memberId).single();
  if (!member?.phone) throw new Error('Member phone not found');

  if (args.channel === 'sms') {
    const sent = await twilioClient.messages.create({
      to: member.phone,
      from: env.TWILIO_PHONE_NUMBER,
      messagingServiceSid: env.TWILIO_MESSAGING_SERVICE_SID,
      body: `${args.message} Reply YES to confirm or HELP for immediate assistance.`,
      statusCallback: `${env.TWILIO_STATUS_CALLBACK_BASE_URL}/api/twilio/sms`,
    });
    return { checkinId: checkin.id, status: 'pending', providerSid: sent.sid };
  }

  const call = await twilioClient.calls.create({
    to: member.phone,
    from: env.TWILIO_PHONE_NUMBER,
    url: `${env.TWILIO_STATUS_CALLBACK_BASE_URL}/api/twilio/voice?checkinId=${checkin.id}`,
  });
  return { checkinId: checkin.id, status: 'pending', providerSid: call.sid };
}
