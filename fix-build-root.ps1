Write-Host "=== LifeSignal build repair script ==="

# Ensure we're at repo root
if (!(Test-Path "./package.json")) {
  Write-Error "package.json not found. Run this from repo root."
  exit 1
}

if (!(Test-Path "./lib")) {
  Write-Error "lib/ folder not found. Run this from repo root."
  exit 1
}

# --------------------------------------------------
# 1) Fix package.json UTF-8 BOM
# --------------------------------------------------
Write-Host "Fixing package.json encoding..."

$pkgPath = "./package.json"
$bytes = [System.IO.File]::ReadAllBytes($pkgPath)

# UTF-8 BOM = EF BB BF
if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
  Copy-Item $pkgPath "$pkgPath.bak" -Force
  $bytes = $bytes[3..($bytes.Length - 1)]
  [System.IO.File]::WriteAllBytes($pkgPath, $bytes)
  Write-Host "✔ Removed BOM from package.json (backup: package.json.bak)"
} else {
  Write-Host "✔ package.json already clean"
}

# --------------------------------------------------
# 2) Replace lib/env.ts completely
# --------------------------------------------------
$envPath = "./lib/env.ts"
Write-Host "Replacing lib/env.ts..."

if (Test-Path $envPath) {
  Copy-Item $envPath "$envPath.bak" -Force
}

@'
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

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(10).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(10).optional(),

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

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

  PADDLE_API_KEY: process.env.PADDLE_API_KEY,
  PADDLE_WEBHOOK_SECRET: process.env.PADDLE_WEBHOOK_SECRET,

  PADDLE_PRICE_CHECKIN_MONTHLY: process.env.PADDLE_PRICE_CHECKIN_MONTHLY,
  PADDLE_PRICE_CHECKIN_ANNUAL: process.env.PADDLE_PRICE_CHECKIN_ANNUAL,
  PADDLE_PRICE_ASSURANCE_MONTHLY: process.env.PADDLE_PRICE_ASSURANCE_MONTHLY,
  PADDLE_PRICE_ASSURANCE_ANNUAL: process.env.PADDLE_PRICE_ASSURANCE_ANNUAL,
  PADDLE_PRICE_FACILITY_MONTHLY: process.env.PADDLE_PRICE_FACILITY_MONTHLY,
  PADDLE_PRICE_FACILITY_ANNUAL: process.env.PADDLE_PRICE_FACILITY_ANNUAL,
});

export function requireStripeWebhookSecret() {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  return env.STRIPE_WEBHOOK_SECRET;
}

export function requirePaddleWebhookSecret() {
  if (!env.PADDLE_WEBHOOK_SECRET) {
    throw new Error("PADDLE_WEBHOOK_SECRET is not set");
  }
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
'@ | Set-Content $envPath -Encoding UTF8

Write-Host "✔ lib/env.ts replaced (backup: lib/env.ts.bak)"

Write-Host "=== Fixes applied successfully ==="
Write-Host "Next step: npm run build"
