import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  STRIPE_SECRET_KEY: z.string().min(10),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(10),
  STRIPE_WEBHOOK_SECRET: z.string().min(10),
  OPENAI_API_KEY: z.string().min(10),
  TWILIO_ACCOUNT_SID: z.string().min(10),
  TWILIO_AUTH_TOKEN: z.string().min(10),
  TWILIO_PHONE_NUMBER: z.string().min(8),
  TWILIO_MESSAGING_SERVICE_SID: z.string().min(10),
  TWILIO_STATUS_CALLBACK_BASE_URL: z.string().url(),
  CRON_SECRET: z.string().min(24),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid environment variables', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
