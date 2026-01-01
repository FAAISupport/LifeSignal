import "server-only";
import { z } from "zod";

/**
 * Validate only always-required settings so the app can boot in dev
 * even if billing/cron isn't configured yet.
 *
 * Enforce billing/cron requirements at runtime using require* helpers.
 */
const schema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(10),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(10),

  TWILIO_ACCOUNT_SID: z.string().min(5).optional(),
  TWILIO_AUTH_TOKEN: z.string().min(5).optional(),
  TWILIO_FROM_NUMBER: z.string().min(5).optional(),

  // Stripe (optional if you migrated away)
  STRIPE_SECRET_KEY: z.string().min(5).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(5).optional(),
  STRIPE_PRICE_CHECKIN_MONTHLY: z.string().min(5).optional(),
  STRIPE_PRICE_CHECKIN_ANNUAL: z.string().min(5).optional(),
  STRIPE_PRICE_ASSURANCE_MONTHLY: z.string().min(5).optional(),
  STRIPE_PRICE_ASSURANCE_ANNUAL: z.string().min(5).optional(),
  STRIPE_PRICE_FACILITY_MONTHLY: z.string().min(5).optional(),
  STRIPE_PRICE_FACILITY_ANNUAL: z.string().min(5).optional(),

  // Paddle (optional until configured)
  PADDLE_API_KEY: z.string().min(5).optional(),
  PADDLE_WEBHOOK_SECRET: z.string().min(5).optional(),
  PADDLE_PRICE_CHECKIN_MONTHLY: z.string().min(5).optional(),
  PADDLE_PRICE_CHECKIN_ANNUAL: z.string().min(5).optional(),
  PADDLE_PRICE_ASSURANCE_MONTHLY: z.string().min(5).optional(),
  PADDLE_PRICE_ASSURANCE_ANNUAL: z.string().min(5).optional(),
  PADDLE_PRICE_FACILITY_MONTHLY: z.string().min(5).optional(),
  PADDLE_PRICE_FACILITY_ANNUAL: z.string().min(5).optional(),

  // Cron token (optional until cron configured)
  CRON_SECRET_TOKEN: z.string().min(10).optional(),

  APP_BASE_URL: z.string().url().default("http://localhost:3000")
});

export const env = schema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER: process.env.TWILIO_FROM_NUMBER,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_PRICE_CHECKIN_MONTHLY: process.env.STRIPE_PRICE_CHECKIN_MONTHLY,
  STRIPE_PRICE_CHECKIN_ANNUAL: process.env.STRIPE_PRICE_CHECKIN_ANNUAL,
  STRIPE_PRICE_ASSURANCE_MONTHLY: process.env.STRIPE_PRICE_ASSURANCE_MONTHLY,
  STRIPE_PRICE_ASSURANCE_ANNUAL: process.env.STRIPE_PRICE_ASSURANCE_ANNUAL,
  STRIPE_PRICE_FACILITY_MONTHLY: process.env.STRIPE_PRICE_FACILITY_MONTHLY,
  STRIPE_PRICE_FACILITY_ANNUAL: process.env.STRIPE_PRICE_FACILITY_ANNUAL,

  PADDLE_API_KEY: process.env.PADDLE_API_KEY,
  PADDLE_WEBHOOK_SECRET: process.env.PADDLE_WEBHOOK_SECRET,
  PADDLE_PRICE_CHECKIN_MONTHLY: process.env.PADDLE_PRICE_CHECKIN_MONTHLY,
  PADDLE_PRICE_CHECKIN_ANNUAL: process.env.PADDLE_PRICE_CHECKIN_ANNUAL,
  PADDLE_PRICE_ASSURANCE_MONTHLY: process.env.PADDLE_PRICE_ASSURANCE_MONTHLY,
  PADDLE_PRICE_ASSURANCE_ANNUAL: process.env.PADDLE_PRICE_ASSURANCE_ANNUAL,
  PADDLE_PRICE_FACILITY_MONTHLY: process.env.PADDLE_PRICE_FACILITY_MONTHLY,
  PADDLE_PRICE_FACILITY_ANNUAL: process.env.PADDLE_PRICE_FACILITY_ANNUAL,

  CRON_SECRET_TOKEN: process.env.CRON_SECRET_TOKEN,
  APP_BASE_URL: process.env.APP_BASE_URL
});

export function requireCronToken() {
  if (!env.CRON_SECRET_TOKEN) {
    throw new Error("CRON_SECRET_TOKEN is not set. Add it to .env.local / Vercel env vars.");
  }
  return env.CRON_SECRET_TOKEN;
}

export function requirePaddle() {
  const missing = [
    !process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && "NEXT_PUBLIC_PADDLE_CLIENT_TOKEN",
    !env.PADDLE_API_KEY && "PADDLE_API_KEY",
    !env.PADDLE_WEBHOOK_SECRET && "PADDLE_WEBHOOK_SECRET",
    !env.PADDLE_PRICE_CHECKIN_MONTHLY && "PADDLE_PRICE_CHECKIN_MONTHLY",
    !env.PADDLE_PRICE_CHECKIN_ANNUAL && "PADDLE_PRICE_CHECKIN_ANNUAL",
    !env.PADDLE_PRICE_ASSURANCE_MONTHLY && "PADDLE_PRICE_ASSURANCE_MONTHLY",
    !env.PADDLE_PRICE_ASSURANCE_ANNUAL && "PADDLE_PRICE_ASSURANCE_ANNUAL",
    !env.PADDLE_PRICE_FACILITY_MONTHLY && "PADDLE_PRICE_FACILITY_MONTHLY",
    !env.PADDLE_PRICE_FACILITY_ANNUAL && "PADDLE_PRICE_FACILITY_ANNUAL"
  ].filter(Boolean) as string[];

  if (missing.length) {
    throw new Error(`Paddle billing is not configured. Missing: ${missing.join(", ")}`);
  }
}

export function requireStripe() {
  const missing = [
    !env.STRIPE_SECRET_KEY && "STRIPE_SECRET_KEY",
    !env.STRIPE_WEBHOOK_SECRET && "STRIPE_WEBHOOK_SECRET",
    !env.STRIPE_PRICE_CHECKIN_MONTHLY && "STRIPE_PRICE_CHECKIN_MONTHLY",
    !env.STRIPE_PRICE_CHECKIN_ANNUAL && "STRIPE_PRICE_CHECKIN_ANNUAL",
    !env.STRIPE_PRICE_ASSURANCE_MONTHLY && "STRIPE_PRICE_ASSURANCE_MONTHLY",
    !env.STRIPE_PRICE_ASSURANCE_ANNUAL && "STRIPE_PRICE_ASSURANCE_ANNUAL",
    !env.STRIPE_PRICE_FACILITY_MONTHLY && "STRIPE_PRICE_FACILITY_MONTHLY",
    !env.STRIPE_PRICE_FACILITY_ANNUAL && "STRIPE_PRICE_FACILITY_ANNUAL"
  ].filter(Boolean) as string[];

  if (missing.length) {
    throw new Error(`Stripe billing is not configured. Missing: ${missing.join(", ")}`);
  }
}
