function get(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function optionalBoolean(name: string, defaultValue = false): boolean {
  const value = process.env[name]?.trim().toLowerCase();
  if (!value) return defaultValue;
  return ['1', 'true', 'yes', 'on'].includes(value);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  siteUrl: get('NEXT_PUBLIC_SITE_URL') || 'http://localhost:3000',
  publicAppUrl: get('NEXT_PUBLIC_APP_URL') || get('NEXT_PUBLIC_SITE_URL') || 'http://localhost:3000',
  supabaseUrl: get('NEXT_PUBLIC_SUPABASE_URL') || 'https://placeholder.supabase.co',
  supabaseAnonKey: get('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: get('SUPABASE_SERVICE_ROLE_KEY') || 'placeholder-service-role-key',
  twilioAccountSid: get('TWILIO_ACCOUNT_SID'),
  twilioAuthToken: get('TWILIO_AUTH_TOKEN'),
  twilioPhoneNumber: get('TWILIO_PHONE_NUMBER'),
  twilioVoiceWebhookSecret: get('TWILIO_VOICE_WEBHOOK_SECRET'),
  stripeSecretKey: get('STRIPE_SECRET_KEY'),
  stripeWebhookSecret: get('STRIPE_WEBHOOK_SECRET'),
  cronSecret: get('CRON_SECRET'),
  sentryDsn: get('SENTRY_DSN'),
  enableVoiceCalls: optionalBoolean('ENABLE_VOICE_CALLS', false),
};

export const requiredProductionEnvKeys = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER',
  'CRON_SECRET',
  'TWILIO_VOICE_WEBHOOK_SECRET',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'SENTRY_DSN',
] as const;

export function getEnvAudit() {
  return requiredProductionEnvKeys.map((key) => ({
    key,
    configured: Boolean(get(key)),
  }));
}

export function assertOperationalEnv(keys: string[]) {
  const missing = keys.filter((key) => !get(key));
  if (missing.length > 0) {
    throw new Error(`Missing required environment variable(s): ${missing.join(', ')}`);
  }
}
