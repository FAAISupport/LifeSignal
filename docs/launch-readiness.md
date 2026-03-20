# LifeSignal launch-readiness checklist

This repository originally only contained the marketing site and beta waitlist. The files added in this change turn it into an operational backend for the daily check-in loop.

## Daily check-in loop

1. `POST /api/cron/materialize-checkins`
   - Creates due `checkins` rows from active `checkin_schedules`.
2. `POST /api/cron/process-checkins`
   - Sends the check-in via Twilio SMS by default.
   - Can place voice calls when `ENABLE_VOICE_CALLS=true`.
3. `POST /api/twilio/inbound`
   - Accepts SMS replies and voice gather callbacks.
   - Marks the check-in `responded_ok` or `responded_help`.
4. `POST /api/cron/process-escalations`
   - Marks overdue check-ins as `missed`.
   - Creates escalation and incident rows.
   - Notifies escalation contacts.
5. `POST /api/check-ins/respond`
   - Internal/manual fallback endpoint for testing responses without Twilio.

## Production environment audit

Deploy the app, then call `GET /api/admin/launch-readiness`.
It returns:

- environment variable presence audit
- table readiness checks
- overall `ready` boolean

## Cron jobs to configure in Vercel

Use the same `CRON_SECRET` value as a bearer token or `x-cron-secret` header.

- `/api/cron/materialize-checkins`
- `/api/cron/process-checkins`
- `/api/cron/process-escalations`
- `/api/cron/analytics-rollup`
- `/api/cron/stale-incidents`
- `/api/cron/risk-snapshots`
- `/api/cron/weekly-reports`

## Required database migration

Apply:

- `supabase/migrations/20260307_create_waitlist_entries.sql`
- `supabase/migrations/20260320_create_operations_core.sql`

## Suggested production smoke test scenarios

### Scenario A: success
- Create one caregiver, one senior, one escalation contact, one active schedule.
- Trigger `materialize-checkins` then `process-checkins`.
- Reply `YES` from the senior phone to `/api/twilio/inbound`.
- Confirm the check-in status becomes `resolved`.

### Scenario B: missed check-in
- Create a check-in whose `response_deadline_at` is in the past.
- Trigger `process-escalations`.
- Confirm `escalations.status = notified` and escalation contact message events exist.

### Scenario C: edge cases
- Invalid phone number on a senior should move the check-in to `failed`.
- Duplicate reply should log `message_events.event_type = inbound_duplicate`.
- Reply `HELP` should create an escalation immediately.
- Delayed replies after escalation still flow through `/api/twilio/inbound` and are recorded.
