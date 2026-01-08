import { z } from "zod";

/**
 * Server-only environment variables
 * Safe for route handlers, server components, and cron jobs
 */
const schema = z.object({
  // App
  APP_BASE_URL: z.string().url().optional(),
  CRON_SECRET_TOKEN: z.string().min(10).optional(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),

  // Twilio
  TWILIO_ACCOUNT_SID: z.string().min(5).optional(),
  TWILIO_AUTH_TOKEN: z.string().min(5).optional(),
  TWILIO_FROM_NUMBER: z.string().min(5).optional(),

  // Paddle
  PADDLE_API_KEY: z.string().min(10).optional(),
  PADDLE_WEBHOOK_SECRET: z.string().min(10).optional(),

  // Paddle price IDs
  PADDLE_PRICE_CHECKIN_MONTHLY: z.string().optional(),
  PADDLE_PRICE_CHECKIN_ANNUAL: z.string().optional(),
  PADDLE_PRICE_ASSURANCE_MONTHLY: z.string().optional(),
  PADDLE_PRICE_ASSURANCE_ANNUAL: z.string().optional(),
  PADDLE_PRICE_FACILITY_MONTHLY: z.string().optional(),
  PADDLE_PRICE_FACILITY_ANNUAL: z.string().optional(),
});

export const env = schema.parse({
  APP_BASE_URL: process.env.APP_BASE_URL,
  CRON_SECRET_TOKEN: process.env.CRON_SECRET_TOKEN,

  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER: process.env.TWILIO_FROM_NUMBER,


  PADDLE_API_KEY: process.env.PADDLE_API_KEY,
  PADDLE_WEBHOOK_SECRET: process.env.PADDLE_WEBHOOK_SECRET,

  PADDLE_PRICE_CHECKIN_MONTHLY: process.env.PADDLE_PRICE_CHECKIN_MONTHLY,
  PADDLE_PRICE_CHECKIN_ANNUAL: process.env.PADDLE_PRICE_CHECKIN_ANNUAL,
  PADDLE_PRICE_ASSURANCE_MONTHLY: process.env.PADDLE_PRICE_ASSURANCE_MONTHLY,
  PADDLE_PRICE_ASSURANCE_ANNUAL: process.env.PADDLE_PRICE_ASSURANCE_ANNUAL,
  PADDLE_PRICE_FACILITY_MONTHLY: process.env.PADDLE_PRICE_FACILITY_MONTHLY,
  PADDLE_PRICE_FACILITY_ANNUAL: process.env.PADDLE_PRICE_FACILITY_ANNUAL,
});

/** Existing imports expect this name */
export function requireCronToken() {
  const token = env.CRON_SECRET_TOKEN;
  if (!token) throw new Error("CRON_SECRET_TOKEN is not set");
  return token;
}

/** Existing imports expect this name */
export function requirePaddle() {
  if (!env.PADDLE_API_KEY) throw new Error("PADDLE_API_KEY is not set");
  if (!env.PADDLE_WEBHOOK_SECRET) throw new Error("PADDLE_WEBHOOK_SECRET is not set");
  return { apiKey: env.PADDLE_API_KEY, webhookSecret: env.PADDLE_WEBHOOK_SECRET };
}



export function requirePaddleWebhookSecret() {
  if (!env.PADDLE_WEBHOOK_SECRET) throw new Error("PADDLE_WEBHOOK_SECRET is not set");
  return env.PADDLE_WEBHOOK_SECRET;
}

export function requireTwilio() {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_FROM_NUMBER) {
    throw new Error("Twilio environment variables are not fully set");
  }
  return {
    accountSid: env.TWILIO_ACCOUNT_SID,
    authToken: env.TWILIO_AUTH_TOKEN,
    fromNumber: env.TWILIO_FROM_NUMBER,
  };
}
