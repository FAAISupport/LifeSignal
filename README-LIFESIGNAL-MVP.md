# LifeSignal MVP (Core Files Only)

This folder contains the core LifeSignal logic (check-ins, escalation, Twilio, Supabase, and cron config) meant to be dropped into an existing Next.js (App Router) project.

## Contents

- `app/start/page.tsx` – onboarding form with paywall-aware flow
- `app/thanks/page.tsx` – confirmation page
- `app/checkin/*` – check-in confirmation/invalid pages
- `app/admin/page.tsx` – simple admin view of seniors + latest check-ins
- `app/api/register/route.ts` – registers senior + caregiver, enforces paywall
- `app/api/cron/send-checkins/route.ts` – sends SMS check-in links
- `app/api/cron/escalate/route.ts` – sends caregiver alerts on missed check-ins
- `app/api/checkins/confirm/route.ts` – handles check-in confirmation links
- `lib/supabaseServer.ts` – Supabase admin client
- `lib/twilio.ts` – Twilio client helper
- `lib/timeWindow.ts` – helper to determine if check-in window applies
- `supabase/lifesignal_schema.sql` – schema for Supabase
- `vercel.json` – Vercel cron config
- `env.example` – required environment variables

## Usage

1. Copy these files into your existing Next.js project, preserving paths.
2. Run the SQL in `supabase/lifesignal_schema.sql` on your Supabase instance.
3. Fill in `.env.local` based on `env.example`.
4. Configure Vercel cron from `vercel.json`.
5. Wire up Stripe and Twilio as described in your build notes.
