create extension if not exists pgcrypto;

create type public.senior_status as enum ('active', 'paused', 'inactive');
create type public.checkin_channel as enum ('sms', 'voice');
create type public.checkin_status as enum ('pending', 'sent', 'responded_ok', 'responded_help', 'missed', 'escalated', 'resolved', 'failed');
create type public.notification_method as enum ('sms', 'voice', 'email');
create type public.escalation_status as enum ('pending', 'notified', 'resolved');
create type public.incident_status as enum ('open', 'resolved', 'stale');
create type public.incident_severity as enum ('low', 'medium', 'high');
create type public.risk_level as enum ('low', 'medium', 'high');

create table if not exists public.caregivers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.seniors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null unique,
  timezone text not null default 'UTC',
  status public.senior_status not null default 'active',
  caregiver_id uuid references public.caregivers(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.escalation_contacts (
  id uuid primary key default gen_random_uuid(),
  senior_id uuid not null references public.seniors(id) on delete cascade,
  caregiver_id uuid references public.caregivers(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  notification_method public.notification_method not null default 'sms',
  priority integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.checkin_schedules (
  id uuid primary key default gen_random_uuid(),
  senior_id uuid not null references public.seniors(id) on delete cascade,
  channel public.checkin_channel not null default 'sms',
  timezone text not null default 'UTC',
  check_in_time_local time not null,
  message_template text,
  grace_period_minutes integer not null default 90,
  escalation_delay_minutes integer not null default 15,
  next_check_in_at timestamptz not null,
  last_materialized_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists checkin_schedule_active_per_senior_idx on public.checkin_schedules (senior_id) where active = true;

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  senior_id uuid not null references public.seniors(id) on delete cascade,
  schedule_id uuid references public.checkin_schedules(id) on delete set null,
  channel public.checkin_channel not null default 'sms',
  status public.checkin_status not null default 'pending',
  prompt text,
  due_at timestamptz not null,
  sent_at timestamptz,
  responded_at timestamptz,
  response_deadline_at timestamptz not null,
  escalation_at timestamptz not null,
  twilio_message_sid text unique,
  response_text text,
  failure_reason text,
  resolution_notes text,
  created_at timestamptz not null default now()
);

create unique index if not exists unique_schedule_due_checkin_idx on public.checkins (schedule_id, due_at);
create index if not exists checkins_senior_due_idx on public.checkins (senior_id, due_at desc);
create index if not exists checkins_status_idx on public.checkins (status, due_at);

create table if not exists public.escalations (
  id uuid primary key default gen_random_uuid(),
  checkin_id uuid not null unique references public.checkins(id) on delete cascade,
  senior_id uuid not null references public.seniors(id) on delete cascade,
  reason text not null,
  status public.escalation_status not null default 'pending',
  notified_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  checkin_id uuid not null references public.checkins(id) on delete cascade,
  senior_id uuid not null references public.seniors(id) on delete cascade,
  severity public.incident_severity not null default 'medium',
  status public.incident_status not null default 'open',
  summary text not null,
  resolution_notes text,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.message_events (
  id uuid primary key default gen_random_uuid(),
  checkin_id uuid references public.checkins(id) on delete cascade,
  escalation_id uuid references public.escalations(id) on delete cascade,
  provider_sid text,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.cron_runs (
  id uuid primary key default gen_random_uuid(),
  job_name text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_daily (
  day date primary key,
  total_checkins integer not null default 0,
  resolved_checkins integer not null default 0,
  escalated_checkins integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.risk_snapshots (
  id uuid primary key default gen_random_uuid(),
  senior_id uuid not null references public.seniors(id) on delete cascade,
  risk_level public.risk_level not null,
  open_issue_count integer not null default 0,
  snapshot_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.weekly_reports (
  id uuid primary key default gen_random_uuid(),
  senior_id uuid not null references public.seniors(id) on delete cascade,
  window_start timestamptz not null,
  window_end timestamptz not null,
  summary text not null,
  created_at timestamptz not null default now()
);

alter table public.caregivers enable row level security;
alter table public.seniors enable row level security;
alter table public.escalation_contacts enable row level security;
alter table public.checkin_schedules enable row level security;
alter table public.checkins enable row level security;
alter table public.escalations enable row level security;
alter table public.incidents enable row level security;
alter table public.message_events enable row level security;
alter table public.cron_runs enable row level security;
alter table public.analytics_daily enable row level security;
alter table public.risk_snapshots enable row level security;
alter table public.weekly_reports enable row level security;

drop policy if exists service_role_all_caregivers on public.caregivers;
create policy service_role_all_caregivers on public.caregivers for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_seniors on public.seniors;
create policy service_role_all_seniors on public.seniors for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_escalation_contacts on public.escalation_contacts;
create policy service_role_all_escalation_contacts on public.escalation_contacts for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_checkin_schedules on public.checkin_schedules;
create policy service_role_all_checkin_schedules on public.checkin_schedules for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_checkins on public.checkins;
create policy service_role_all_checkins on public.checkins for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_escalations on public.escalations;
create policy service_role_all_escalations on public.escalations for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_incidents on public.incidents;
create policy service_role_all_incidents on public.incidents for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_message_events on public.message_events;
create policy service_role_all_message_events on public.message_events for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_cron_runs on public.cron_runs;
create policy service_role_all_cron_runs on public.cron_runs for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_analytics_daily on public.analytics_daily;
create policy service_role_all_analytics_daily on public.analytics_daily for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_risk_snapshots on public.risk_snapshots;
create policy service_role_all_risk_snapshots on public.risk_snapshots for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
drop policy if exists service_role_all_weekly_reports on public.weekly_reports;
create policy service_role_all_weekly_reports on public.weekly_reports for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
