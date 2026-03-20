# LifeSignal

LifeSignal now contains both:

- the public marketing / waitlist website
- the backend primitives required to run the daily senior safety check-in loop end to end

## What is implemented

### Marketing / waitlist
- Supabase-backed beta waitlist form
- Referral / priority waitlist logic
- API routes for signup and waitlist status

### Operations backend
- Supabase schema for seniors, caregivers, schedules, check-ins, escalations, incidents, cron runs, analytics, and reports
- Twilio SMS dispatch and optional voice-call dispatch
- Inbound Twilio webhook handling for SMS replies and voice keypad/speech responses
- Cron routes for materialization, delivery, escalation, analytics, stale incidents, risk snapshots, and weekly reports
- Launch-readiness audit endpoint for environment variables + database table checks

## Environment variables

Copy `.env.example` to `.env.local` and fill in your project values.

## Run locally

```bash
npm install
npm run build
npm run dev
```

## Supabase setup

Apply both SQL migrations in order:

```bash
supabase/migrations/20260307_create_waitlist_entries.sql
supabase/migrations/20260320_create_operations_core.sql
```

or paste them into the Supabase SQL editor.

## Core operations flow

1. `POST /api/cron/materialize-checkins`
2. `POST /api/cron/process-checkins`
3. Senior replies through `POST /api/twilio/inbound`
4. `POST /api/cron/process-escalations`
5. Use `GET /api/admin/launch-readiness` to verify env/database readiness

See `docs/launch-readiness.md` for the deployment checklist and smoke-test scenarios.
