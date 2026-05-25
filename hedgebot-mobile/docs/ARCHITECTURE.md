# HedgeBot Mobile Architecture (v1 foundation)

## Client
- Expo Router + React Native TypeScript app
- Zustand for fast local session/role state
- React Query for async orchestration and caching
- Screen shells preconfigured for dark neon design language
- Prepared for offline-first repositories (SQLite + sync queue as phase 2)

## Backend
- Supabase Postgres with strict tenant isolation by `tenant_id`
- RLS on every business table
- Edge functions (planned) for:
  - AI receptionist orchestration (Twilio + OpenAI)
  - estimate generation and pricing suggestions
  - dispatch optimization + weather triggered Storm Mode
  - review engine and marketing campaign automation

## Domain modules
1. Lead Management: scoring, stages, follow-up automations.
2. Scheduling: route-aware dispatch and calendar sync.
3. Crew Command: GPS, check-ins, job telemetry.
4. AI Copilot: forecasting, scripts, recommendation cards.
5. Marketing + Reputation: campaign triggers and review loops.

## Security baseline
- JWT auth via Supabase Auth
- DB row-level security with tenant scoping
- Auditable event stream tables planned in phase 2
- Secret management via Supabase + Vercel env secrets

## Delivery roadmap
- Phase A: foundation scaffold (this commit)
- Phase B: auth + onboarding + tenant bootstrap
- Phase C: core CRM / dispatch / job execution
- Phase D: AI receptionist and automation workflows
- Phase E: financial analytics, gamification, and hardening
