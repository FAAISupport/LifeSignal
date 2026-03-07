# LifeSignal Website

This version includes:

- Supabase-backed beta waitlist form
- Referral / priority waitlist logic
- API routes for signup and waitlist status
- Supabase migration for `waitlist_entries`
- `.env.example` for required environment variables

## Environment variables

Copy `.env.example` to `.env.local` and fill in your project values.

## Run locally

```powershell
npm install
npm run dev
```

## Supabase setup

Run the SQL in:

```powershell
.\supabase\migrations\20260307_create_waitlist_entries.sql
```

or paste it into the Supabase SQL editor.

## Referral logic

- Every signup gets a unique referral code
- `/beta?ref=CODE` credits the referring user when a new user joins from that link
- Each successful referral adds 3 priority points to the referrer
- Waitlist position is sorted by `priority_score DESC, created_at ASC`
