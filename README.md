# LifeSignal

Daily safety check-ins for seniors via SMS and/or voice calls, with family escalation if missed.

## Plans
- **Check-In**: Simple daily check-ins for one loved one.
- **Assurance**: Redundant options + more contacts + “Help” path.
- **Facility**: Built for care teams and communities.

## Stack
Next.js 16 (App Router) + Supabase (Postgres/RLS/Auth) + Twilio (SMS/Voice) + Stripe (subs) + Vercel.

---

## 1) Supabase setup
1. Create a Supabase project.
2. In SQL Editor, run: `supabase/schema.sql`
3. Auth:
   - Enable Email/Password provider.
4. Get keys:
   - Project URL
   - anon key
   - service_role key

## 2) Twilio setup
1. Buy a Twilio number that supports SMS + Voice.
2. Configure webhooks:
   - Incoming SMS webhook:
     - `https://YOUR_DOMAIN/api/twilio/sms`
3. For local dev, use ngrok and set webhook URLs to your ngrok URL.

## 3) Stripe setup (6 prices)
Create **six** recurring Prices in Stripe (Products can be one product with 6 prices, or 3 products with 2 prices each).

Recommended setup (3 Products):
- Product: **LifeSignal — Check-In**
  - Price: Check-In Monthly (recurring monthly)
  - Price: Check-In Yearly (recurring yearly)
- Product: **LifeSignal — Assurance**
  - Price: Assurance Monthly
  - Price: Assurance Yearly
- Product: **LifeSignal — Facility**
  - Price: Facility Monthly
  - Price: Facility Yearly

Copy each Price ID into env vars:
- `STRIPE_PRICE_CHECKIN_MONTHLY`
- `STRIPE_PRICE_CHECKIN_ANNUAL`
- `STRIPE_PRICE_ASSURANCE_MONTHLY`
- `STRIPE_PRICE_ASSURANCE_ANNUAL`
- `STRIPE_PRICE_FACILITY_MONTHLY`
- `STRIPE_PRICE_FACILITY_ANNUAL`

### Stripe webhooks
Create a webhook endpoint in Stripe:
- URL: `https://YOUR_DOMAIN/api/stripe/webhook`
- Events:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

## 4) Environment variables
Copy `.env.example` to `.env.local` and fill all values.

## 5) Run locally
```bash
npm install
npm run dev
```

## 6) Pricing + Checkout
- Pricing: `/pricing` (Monthly/Yearly toggle)
- Checkout detail page: `/checkout?tier=checkin&cadence=monthly`
- Stripe checkout redirect:
  - `/api/stripe/checkout?tier=checkin&cadence=monthly`
  - tiers: `checkin | assurance | facility`
  - cadence: `monthly | annual`

## 7) Cron jobs (Vercel Cron or external)
Hit these every 5 minutes:
- `GET /api/cron/run-checkins?token=CRON_SECRET_TOKEN`
- `GET /api/cron/run-escalations?token=CRON_SECRET_TOKEN`

## 8) Deployment (GitHub → Vercel)
1. Push to GitHub main.
2. Import to Vercel.
3. Add env vars in Vercel project settings.
4. Set `APP_BASE_URL` to your production domain (e.g. `https://lifesignal.app`).
5. Redeploy.

## 9) Quick test plan
1. Create account at `/signup`
2. Add a senior and family contact in dashboard
3. Ensure senior has `beta_override = true` (via admin) **OR** subscribe to any plan
4. Trigger check-ins manually:
   - `GET /api/cron/run-checkins?token=...`
5. Reply YES from the senior phone number:
   - marks latest pending checkin as responded_ok
6. Leave pending for > wait window and run escalations:
   - `GET /api/cron/run-escalations?token=...`
   - sends family SMS
7. Text STOP from the senior phone:
   - messaging is disabled for that senior and logged

## Admin role
To make yourself admin, in Supabase SQL editor:
```sql
update public.profiles set role='admin' where user_id='YOUR_AUTH_USER_ID';
```


## Paddle Billing (Migration Patch)

### What changed
- Checkout now uses **Paddle Checkout (overlay)** instead of Stripe Checkout.
- A server endpoint creates a Paddle **transaction** (`POST /api/paddle/transaction`), then the browser opens Paddle checkout with `transactionId`.
- Webhooks are received at `POST /api/paddle/webhook` and update the `subscriptions` table.

### Required Paddle setup (Sandbox or Production)
1. In Paddle, create:
   - Products + Prices for:
     - Check-In (monthly + annual)
     - Assurance (monthly + annual)
     - Facility (monthly + annual)
2. Copy each **price id** (looks like `pri_...`) into environment variables below.
3. Create an **API key** (server-side) and set it as `PADDLE_API_KEY`. The Paddle API uses Bearer auth. citeturn1search1
4. Create a **notification destination** (webhook endpoint) in Paddle:
   - URL: `https://YOUR_DOMAIN/api/paddle/webhook`
   - Subscribe to (at minimum): `transaction.completed`, `subscription.created`, `subscription.activated`, `subscription.canceled`. citeturn2search2turn0search1turn2search0turn2search1
   - Copy the destination **secret** into `PADDLE_WEBHOOK_SECRET`.
   - Webhook signature verification uses the `Paddle-Signature` header + raw body (don’t transform it). citeturn3view0
5. Create a **client-side token** in Paddle for Paddle.js and set it as `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`. Client-side tokens are safe to publish; API keys are not. citeturn1search13

### Environment variables (add to Vercel)
```bash
# Paddle
NEXT_PUBLIC_PADDLE_ENV="sandbox"                # or "production"
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN="pca_..."
PADDLE_API_KEY="pdl_live_apikey_..."            # server-only
PADDLE_WEBHOOK_SECRET="ntf_..."                 # notification destination secret

PADDLE_PRICE_CHECKIN_MONTHLY="pri_..."
PADDLE_PRICE_CHECKIN_ANNUAL="pri_..."
PADDLE_PRICE_ASSURANCE_MONTHLY="pri_..."
PADDLE_PRICE_ASSURANCE_ANNUAL="pri_..."
PADDLE_PRICE_FACILITY_MONTHLY="pri_..."
PADDLE_PRICE_FACILITY_ANNUAL="pri_..."

# Existing
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
TWILIO_FROM_NUMBER="+1..."
CRON_SECRET_TOKEN="..."
APP_BASE_URL="https://lifesignal.app"
```

### Notes
- The Paddle API creates transactions via `POST https://api.paddle.com/transactions`. citeturn3view2
- Paddle Checkout can be opened using `Paddle.Checkout.open({ transactionId })`. citeturn3view3
