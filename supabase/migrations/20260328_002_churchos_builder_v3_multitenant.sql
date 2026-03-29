begin;

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_user_id uuid not null references auth.users(id) on delete restrict,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint organizations_name_chk check (char_length(trim(name)) >= 2),
  constraint organizations_slug_chk check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null,
  status text not null default 'active',
  invited_by_user_id uuid null references auth.users(id) on delete set null,
  joined_at timestamptz null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint organization_members_role_chk check (role in ('owner', 'admin', 'manager', 'member', 'viewer')),
  constraint organization_members_status_chk check (status in ('invited', 'active', 'suspended', 'removed')),
  constraint organization_members_unique unique (org_id, user_id)
);

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  role text not null,
  invited_by_user_id uuid not null references auth.users(id) on delete restrict,
  token uuid not null default gen_random_uuid(),
  status text not null default 'pending',
  expires_at timestamptz not null,
  accepted_by_user_id uuid null references auth.users(id) on delete set null,
  accepted_at timestamptz null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint invites_email_chk check (position('@' in email) > 1),
  constraint invites_role_chk check (role in ('owner', 'admin', 'manager', 'member', 'viewer')),
  constraint invites_status_chk check (status in ('pending', 'accepted', 'revoked', 'expired')),
  constraint invites_token_unique unique (token),
  constraint invites_unique_pending unique nulls not distinct (org_id, email, status)
);

create table if not exists public.builder_sessions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  created_by_user_id uuid not null references auth.users(id) on delete restrict,
  status text not null default 'draft',
  needs_assessment jsonb not null default '{}'::jsonb,
  selected_modules text[] not null default array[]::text[],
  pricing_snapshot jsonb not null default '{}'::jsonb,
  assigned_tier text null,
  referral_code text null,
  expires_at timestamptz null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint builder_sessions_status_chk check (status in ('draft', 'submitted', 'quoted', 'converted', 'expired')),
  constraint builder_sessions_assigned_tier_chk check (assigned_tier is null or assigned_tier in ('starter', 'growth', 'pro', 'enterprise'))
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  referrer_user_id uuid not null references auth.users(id) on delete restrict,
  referral_code text not null,
  referred_email text null,
  referred_org_id uuid null references public.organizations(id) on delete set null,
  builder_session_id uuid null references public.builder_sessions(id) on delete set null,
  status text not null default 'created',
  reward_cents integer not null default 0,
  rewarded_at timestamptz null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint referrals_status_chk check (status in ('created', 'attributed', 'qualified', 'rewarded', 'void')),
  constraint referrals_reward_cents_chk check (reward_cents >= 0),
  constraint referrals_referral_code_chk check (char_length(trim(referral_code)) >= 4),
  constraint referrals_referral_code_unique unique (referral_code)
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text not null,
  status text not null,
  plan_key text not null,
  active_modules text[] not null default array[]::text[],
  seat_count integer not null default 1,
  current_period_start timestamptz null,
  current_period_end timestamptz null,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint subscriptions_status_chk check (status in ('incomplete', 'trialing', 'active', 'past_due', 'canceled', 'unpaid')),
  constraint subscriptions_seat_count_chk check (seat_count >= 1),
  constraint subscriptions_org_unique unique (org_id),
  constraint subscriptions_customer_unique unique (stripe_customer_id),
  constraint subscriptions_subscription_unique unique (stripe_subscription_id)
);

create table if not exists public.monitored_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  external_member_id text null,
  full_name text not null,
  phone_e164 text not null,
  timezone text not null default 'America/New_York',
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint monitored_members_status_chk check (status in ('active', 'paused', 'inactive')),
  constraint monitored_members_phone_chk check (phone_e164 ~ '^\+[1-9][0-9]{7,14}$'),
  constraint monitored_members_unique_phone unique (org_id, phone_e164)
);

create table if not exists public.checkin_schedules (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  member_id uuid not null references public.monitored_members(id) on delete cascade,
  schedule_type text not null default 'daily',
  cron_expression text null,
  local_time text null,
  timezone text not null default 'America/New_York',
  days_of_week smallint[] not null default array[]::smallint[],
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint checkin_schedules_type_chk check (schedule_type in ('daily', 'weekly', 'custom_cron')),
  constraint checkin_schedules_days_of_week_chk check (
    coalesce(array_length(days_of_week, 1), 0) = 0
    or days_of_week <@ array[0,1,2,3,4,5,6]::smallint[]
  )
);

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  member_id uuid not null references public.monitored_members(id) on delete cascade,
  schedule_id uuid null references public.checkin_schedules(id) on delete set null,
  channel text not null default 'sms',
  status text not null default 'pending',
  prompt text null,
  response_text text null,
  response_received_at timestamptz null,
  due_at timestamptz not null,
  sent_at timestamptz null,
  escalated_at timestamptz null,
  resolved_at timestamptz null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint checkins_channel_chk check (channel in ('sms', 'voice')),
  constraint checkins_status_chk check (status in ('pending', 'sent', 'responded', 'help_requested', 'missed', 'escalated', 'resolved'))
);

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  member_id uuid not null references public.monitored_members(id) on delete cascade,
  checkin_id uuid null references public.checkins(id) on delete set null,
  status text not null default 'open',
  severity text not null default 'medium',
  opened_at timestamptz not null default timezone('utc', now()),
  acknowledged_at timestamptz null,
  acknowledged_by_user_id uuid null references auth.users(id) on delete set null,
  resolved_at timestamptz null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint incidents_status_chk check (status in ('open', 'acknowledged', 'resolved', 'closed')),
  constraint incidents_severity_chk check (severity in ('low', 'medium', 'high', 'critical'))
);

create table if not exists public.escalation_steps (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  incident_id uuid not null references public.incidents(id) on delete cascade,
  step_order integer not null,
  contact_name text not null,
  contact_method text not null,
  contact_target text not null,
  status text not null default 'pending',
  notified_at timestamptz null,
  acknowledged_at timestamptz null,
  ack_token uuid not null default gen_random_uuid(),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint escalation_steps_method_chk check (contact_method in ('sms', 'voice', 'email')),
  constraint escalation_steps_status_chk check (status in ('pending', 'notified', 'acknowledged', 'failed', 'skipped')),
  constraint escalation_steps_step_order_chk check (step_order >= 1),
  constraint escalation_steps_unique_order unique (incident_id, step_order),
  constraint escalation_steps_ack_token_unique unique (ack_token)
);

create table if not exists public.escalation_events (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  incident_id uuid not null references public.incidents(id) on delete cascade,
  escalation_step_id uuid null references public.escalation_steps(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  constraint escalation_events_event_type_chk check (
    event_type in (
      'incident_opened',
      'step_notified',
      'step_failed',
      'step_acknowledged',
      'incident_acknowledged',
      'incident_resolved'
    )
  )
);

create table if not exists public.risk_snapshots (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  member_id uuid not null references public.monitored_members(id) on delete cascade,
  incident_id uuid null references public.incidents(id) on delete set null,
  risk_score numeric(5,2) not null,
  risk_level text not null,
  factors jsonb not null default '{}'::jsonb,
  snapshot_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint risk_snapshots_score_chk check (risk_score >= 0 and risk_score <= 100),
  constraint risk_snapshots_level_chk check (risk_level in ('low', 'medium', 'high', 'critical'))
);

create index if not exists idx_organization_members_org_id on public.organization_members(org_id);
create index if not exists idx_organization_members_user_id on public.organization_members(user_id);
create index if not exists idx_invites_org_id on public.invites(org_id);
create index if not exists idx_invites_email on public.invites(lower(email));
create index if not exists idx_invites_status on public.invites(status);
create index if not exists idx_builder_sessions_org_id on public.builder_sessions(org_id);
create index if not exists idx_builder_sessions_created_by on public.builder_sessions(created_by_user_id);
create index if not exists idx_builder_sessions_status on public.builder_sessions(status);
create index if not exists idx_referrals_org_id on public.referrals(org_id);
create index if not exists idx_referrals_referrer_user on public.referrals(referrer_user_id);
create index if not exists idx_subscriptions_org_id on public.subscriptions(org_id);
create index if not exists idx_subscriptions_status on public.subscriptions(status);
create index if not exists idx_monitored_members_org_id on public.monitored_members(org_id);
create index if not exists idx_monitored_members_status on public.monitored_members(status);
create index if not exists idx_checkin_schedules_org_member on public.checkin_schedules(org_id, member_id);
create index if not exists idx_checkin_schedules_active on public.checkin_schedules(org_id, is_active);
create index if not exists idx_checkins_org_member on public.checkins(org_id, member_id);
create index if not exists idx_checkins_status_due on public.checkins(org_id, status, due_at desc);
create index if not exists idx_incidents_org_status on public.incidents(org_id, status, opened_at desc);
create index if not exists idx_incidents_member_id on public.incidents(member_id);
create index if not exists idx_escalation_steps_org_incident on public.escalation_steps(org_id, incident_id, step_order);
create index if not exists idx_escalation_events_org_incident on public.escalation_events(org_id, incident_id, occurred_at desc);
create index if not exists idx_risk_snapshots_org_member on public.risk_snapshots(org_id, member_id, snapshot_at desc);
create index if not exists idx_risk_snapshots_level on public.risk_snapshots(org_id, risk_level, snapshot_at desc);

create or replace function public.has_org_access(target_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    auth.role() = 'service_role'
    or exists (
      select 1
      from public.organization_members om
      where om.org_id = target_org_id
        and om.user_id = auth.uid()
        and om.status = 'active'
    );
$$;

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.invites enable row level security;
alter table public.builder_sessions enable row level security;
alter table public.referrals enable row level security;
alter table public.subscriptions enable row level security;
alter table public.monitored_members enable row level security;
alter table public.checkin_schedules enable row level security;
alter table public.checkins enable row level security;
alter table public.incidents enable row level security;
alter table public.escalation_steps enable row level security;
alter table public.escalation_events enable row level security;
alter table public.risk_snapshots enable row level security;

create policy organizations_select on public.organizations
for select
using (
  auth.role() = 'service_role'
  or exists (
    select 1
    from public.organization_members om
    where om.org_id = organizations.id
      and om.user_id = auth.uid()
      and om.status = 'active'
  )
);

create policy organizations_insert on public.organizations
for insert
with check (
  auth.role() = 'service_role'
  or owner_user_id = auth.uid()
);

create policy organizations_update on public.organizations
for update
using (public.has_org_access(id))
with check (public.has_org_access(id));

create policy organizations_delete on public.organizations
for delete
using (public.has_org_access(id));

create policy organization_members_select on public.organization_members
for select
using (public.has_org_access(org_id));

create policy organization_members_insert on public.organization_members
for insert
with check (public.has_org_access(org_id));

create policy organization_members_update on public.organization_members
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy organization_members_delete on public.organization_members
for delete
using (public.has_org_access(org_id));

create policy invites_select on public.invites
for select
using (public.has_org_access(org_id));

create policy invites_insert on public.invites
for insert
with check (public.has_org_access(org_id));

create policy invites_update on public.invites
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy invites_delete on public.invites
for delete
using (public.has_org_access(org_id));

create policy builder_sessions_select on public.builder_sessions
for select
using (public.has_org_access(org_id));

create policy builder_sessions_insert on public.builder_sessions
for insert
with check (public.has_org_access(org_id));

create policy builder_sessions_update on public.builder_sessions
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy builder_sessions_delete on public.builder_sessions
for delete
using (public.has_org_access(org_id));

create policy referrals_select on public.referrals
for select
using (public.has_org_access(org_id));

create policy referrals_insert on public.referrals
for insert
with check (public.has_org_access(org_id));

create policy referrals_update on public.referrals
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy referrals_delete on public.referrals
for delete
using (public.has_org_access(org_id));

create policy subscriptions_select on public.subscriptions
for select
using (public.has_org_access(org_id));

create policy subscriptions_insert on public.subscriptions
for insert
with check (public.has_org_access(org_id));

create policy subscriptions_update on public.subscriptions
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy subscriptions_delete on public.subscriptions
for delete
using (public.has_org_access(org_id));

create policy monitored_members_select on public.monitored_members
for select
using (public.has_org_access(org_id));

create policy monitored_members_insert on public.monitored_members
for insert
with check (public.has_org_access(org_id));

create policy monitored_members_update on public.monitored_members
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy monitored_members_delete on public.monitored_members
for delete
using (public.has_org_access(org_id));

create policy checkin_schedules_select on public.checkin_schedules
for select
using (public.has_org_access(org_id));

create policy checkin_schedules_insert on public.checkin_schedules
for insert
with check (public.has_org_access(org_id));

create policy checkin_schedules_update on public.checkin_schedules
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy checkin_schedules_delete on public.checkin_schedules
for delete
using (public.has_org_access(org_id));

create policy checkins_select on public.checkins
for select
using (public.has_org_access(org_id));

create policy checkins_insert on public.checkins
for insert
with check (public.has_org_access(org_id));

create policy checkins_update on public.checkins
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy checkins_delete on public.checkins
for delete
using (public.has_org_access(org_id));

create policy incidents_select on public.incidents
for select
using (public.has_org_access(org_id));

create policy incidents_insert on public.incidents
for insert
with check (public.has_org_access(org_id));

create policy incidents_update on public.incidents
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy incidents_delete on public.incidents
for delete
using (public.has_org_access(org_id));

create policy escalation_steps_select on public.escalation_steps
for select
using (public.has_org_access(org_id));

create policy escalation_steps_insert on public.escalation_steps
for insert
with check (public.has_org_access(org_id));

create policy escalation_steps_update on public.escalation_steps
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy escalation_steps_delete on public.escalation_steps
for delete
using (public.has_org_access(org_id));

create policy escalation_events_select on public.escalation_events
for select
using (public.has_org_access(org_id));

create policy escalation_events_insert on public.escalation_events
for insert
with check (public.has_org_access(org_id));

create policy escalation_events_update on public.escalation_events
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy escalation_events_delete on public.escalation_events
for delete
using (public.has_org_access(org_id));

create policy risk_snapshots_select on public.risk_snapshots
for select
using (public.has_org_access(org_id));

create policy risk_snapshots_insert on public.risk_snapshots
for insert
with check (public.has_org_access(org_id));

create policy risk_snapshots_update on public.risk_snapshots
for update
using (public.has_org_access(org_id))
with check (public.has_org_access(org_id));

create policy risk_snapshots_delete on public.risk_snapshots
for delete
using (public.has_org_access(org_id));

drop trigger if exists trg_organizations_updated_at on public.organizations;
create trigger trg_organizations_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

drop trigger if exists trg_organization_members_updated_at on public.organization_members;
create trigger trg_organization_members_updated_at
before update on public.organization_members
for each row execute function public.set_updated_at();

drop trigger if exists trg_invites_updated_at on public.invites;
create trigger trg_invites_updated_at
before update on public.invites
for each row execute function public.set_updated_at();

drop trigger if exists trg_builder_sessions_updated_at on public.builder_sessions;
create trigger trg_builder_sessions_updated_at
before update on public.builder_sessions
for each row execute function public.set_updated_at();

drop trigger if exists trg_referrals_updated_at on public.referrals;
create trigger trg_referrals_updated_at
before update on public.referrals
for each row execute function public.set_updated_at();

drop trigger if exists trg_subscriptions_updated_at on public.subscriptions;
create trigger trg_subscriptions_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

drop trigger if exists trg_monitored_members_updated_at on public.monitored_members;
create trigger trg_monitored_members_updated_at
before update on public.monitored_members
for each row execute function public.set_updated_at();

drop trigger if exists trg_checkin_schedules_updated_at on public.checkin_schedules;
create trigger trg_checkin_schedules_updated_at
before update on public.checkin_schedules
for each row execute function public.set_updated_at();

drop trigger if exists trg_checkins_updated_at on public.checkins;
create trigger trg_checkins_updated_at
before update on public.checkins
for each row execute function public.set_updated_at();

drop trigger if exists trg_incidents_updated_at on public.incidents;
create trigger trg_incidents_updated_at
before update on public.incidents
for each row execute function public.set_updated_at();

drop trigger if exists trg_escalation_steps_updated_at on public.escalation_steps;
create trigger trg_escalation_steps_updated_at
before update on public.escalation_steps
for each row execute function public.set_updated_at();

drop trigger if exists trg_risk_snapshots_updated_at on public.risk_snapshots;
create trigger trg_risk_snapshots_updated_at
before update on public.risk_snapshots
for each row execute function public.set_updated_at();

commit;
