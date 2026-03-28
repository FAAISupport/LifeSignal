import twilio from 'twilio';
import { env } from '@/lib/env';

export const twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
