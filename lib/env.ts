import { z } from "zod";

const fallbackAppUrl = "http://localhost:3000";
const fallbackSupabaseUrl = "https://example.supabase.co";
const fallbackAnonKey = "development-anon-key";
const fallbackCronSecret = "development-cron-secret-token-000000";

const optionalString = z.string().min(1).optional();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default(fallbackAppUrl),
  APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default(fallbackSupabaseUrl),
  SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default(fallbackAnonKey),
  SUPABASE_SERVICE_ROLE_KEY: optionalString,
  CRON_SECRET: z.string().min(24).default(fallbackCronSecret),
  CRON_BEARER_TOKEN: optionalString,
  STRIPE_SECRET_KEY: optionalString,
  STRIPE_WEBHOOK_SECRET: optionalString,
  STRIPE_PRICE_FAMILY: optionalString,
  STRIPE_PRICE_CAREGIVER: optionalString,
  STRIPE_PRICE_ENTERPRISE: optionalString,
  TWILIO_ACCOUNT_SID: optionalString,
  TWILIO_AUTH_TOKEN: optionalString,
  TWILIO_MESSAGING_SERVICE_SID: optionalString,
  TWILIO_PHONE_NUMBER: optionalString,
  TWILIO_STATUS_CALLBACK_BASE_URL: z.string().url().default(fallbackAppUrl),
  OPENAI_API_KEY: optionalString,
  OPENAI_MODEL: optionalString,
});

const parsed = envSchema.safeParse(process.env);

function buildSafeEnv() {
  if (parsed.success) {
    return parsed.data;
  }

  const issues = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  if (process.env.NODE_ENV !== "production") {
    console.warn(`[env] Falling back to development defaults. ${issues}`);
  }

  return envSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? fallbackAppUrl,
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? fallbackSupabaseUrl,
    SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? fallbackAnonKey,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    CRON_SECRET: process.env.CRON_SECRET ?? fallbackCronSecret,
    CRON_BEARER_TOKEN: process.env.CRON_BEARER_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRICE_FAMILY: process.env.STRIPE_PRICE_FAMILY,
    STRIPE_PRICE_CAREGIVER: process.env.STRIPE_PRICE_CAREGIVER,
    STRIPE_PRICE_ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_MESSAGING_SERVICE_SID: process.env.TWILIO_MESSAGING_SERVICE_SID,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    TWILIO_STATUS_CALLBACK_BASE_URL:
      process.env.TWILIO_STATUS_CALLBACK_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? fallbackAppUrl,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
  });
}

export const env = buildSafeEnv();
export const clientEnv = {
  NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export function requireServerEnv<K extends keyof typeof env>(...keys: K[]) {
  const missing = keys.filter((key) => {
    const value = env[key];
    return typeof value !== "string" || value.trim().length === 0;
  });

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return env as typeof env & Record<K, string>;
}

export type Env = typeof env;

