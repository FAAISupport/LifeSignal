# FaithSignal Builder V3 Setup

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment

1. Copy `.env.example` to `.env.local`.
2. Fill Supabase, Stripe, Twilio, and OpenAI credentials.
3. Ensure `CRON_SECRET` is at least 24 characters.

## 3) Run Supabase migrations

```bash
supabase db push
```

## 4) Start locally

```bash
npm run dev
```

## 5) Vercel deployment

1. Import repository into Vercel.
2. Set all environment variables from `.env.example` in Vercel project settings.
3. Deploy and verify `/builder`, `/api/webhooks/stripe`, and `/api/twilio/sms` endpoints.

## 6) Stripe webhook setup

1. In Stripe dashboard, add endpoint: `https://YOUR_DOMAIN/api/webhooks/stripe`.
2. Subscribe to events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
3. Copy webhook secret into `STRIPE_WEBHOOK_SECRET`.

## 7) Twilio webhook setup

1. Set phone number webhook URL for SMS to:
   - `https://YOUR_DOMAIN/api/twilio/sms`
2. Set voice webhook URL to:
   - `https://YOUR_DOMAIN/api/twilio/voice`
3. Ensure Twilio can reach your public domain and that callbacks use HTTPS.

## 8) Operational go-live checklist

- Run builder flow end-to-end (`/builder` → results → proposal → checkout).
- Complete Stripe test purchase and verify org/subscription sync.
- Login via Supabase auth and onboard first team members.
- Add three monitored members and trigger test check-ins.
- Validate incident creation, escalation acknowledgment, and analytics pages.
