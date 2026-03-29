# FaithSignal Builder V3

FaithSignal Builder V3 is a multi-tenant SaaS platform for churches and care ministries. It combines:

- a guided **Builder** (assessment → recommendations → proposal → checkout)
- **LifeSignal Core** automation (check-ins, escalations, incidents, risk)
- organization-level tenancy with Supabase Auth + RLS
- Stripe subscriptions and billing portal
- Twilio SMS/Voice workflows

## Tech Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS
- Supabase (Postgres, Auth, RLS)
- Stripe (Checkout, Subscriptions, Billing Portal, Webhooks)
- Twilio (SMS + Voice)
- OpenAI API (recommendation generation)
- zod (env + request validation)

## Key Product Areas

### 1) Public Builder Experience

- `/builder`
- `/builder/results`
- `/builder/proposal`
- `/builder/checkout`
- `/builder/success`

### 2) Authenticated Multi-tenant App

- `/dashboard`
- `/members`
- `/checkins`
- `/incidents`
- `/analytics`
- `/team`
- `/billing`
- `/settings`
- `/onboarding`

### 3) LifeSignal Core APIs

- `POST /api/lifesignal/checkins/run`
- `POST /api/lifesignal/checkins/respond`
- `POST /api/lifesignal/escalations/acknowledge`
- `POST /api/lifesignal/modules/run`

### 4) Builder + Billing APIs

- `POST /api/builder/save`
- `POST /api/builder/recommend`
- `POST /api/builder/proposal`
- `POST /api/builder/checkout`
- `POST /api/billing/portal`
- `POST /api/webhooks/stripe`

### 5) Twilio Webhooks

- `POST /api/twilio/sms`
- `GET|POST /api/twilio/voice`

## Environment Setup

Copy `.env.example` to `.env.local` and fill values:

```bash
cp .env.example .env.local
```

Required variables include Supabase, Stripe, Twilio, OpenAI, and `CRON_SECRET`.

## Local Development

```bash
npm install
supabase db push
npm run dev
```

## Testing

```bash
npm run test
```

> Note: `npm run typecheck` may currently fail due to pre-existing issues in legacy files under `src/lib/core-care/*`.

## Deploying to Vercel

1. Import repo into Vercel.
2. Add all env vars from `.env.example`.
3. Deploy.
4. Configure Stripe and Twilio webhooks:
   - Stripe: `https://YOUR_DOMAIN/api/webhooks/stripe`
   - Twilio SMS: `https://YOUR_DOMAIN/api/twilio/sms`
   - Twilio Voice: `https://YOUR_DOMAIN/api/twilio/voice`

## Database

Supabase migrations are under:

- `supabase/migrations/001_initial.sql`
- `supabase/migrations/002_rls.sql`
- `supabase/migrations/003_seed_modules.sql`

## Module Engine

`lib/lifesignal/modules/module-engine.ts` executes configured organization modules for care, safety, engagement, intelligence, volunteer coordination, and communication workflows.

Trigger via:

```http
POST /api/lifesignal/modules/run
```

Example payload:

```json
{
  "severeWeatherAlert": true,
  "voiceMessage": "Church care team update: please call us if you need support."
}
```
