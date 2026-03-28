create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan text not null default 'starter',
  status text not null default 'pending',
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists organization_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','pastor','care_manager','volunteer','viewer')),
  created_at timestamptz not null default now(),
  unique(org_id, user_id)
);

create table if not exists invites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  email text not null,
  role text not null,
  invited_by text not null,
  token text not null unique,
  status text not null default 'pending',
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete set null,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status text not null,
  amount_monthly numeric not null default 0,
  currency text not null default 'usd',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists builder_sessions (
  id uuid primary key default gen_random_uuid(),
  profile jsonb not null,
  pains text[] not null,
  selected_modules text[] not null,
  suggested_tier text not null,
  monthly_total numeric not null,
  referral_code text,
  stripe_checkout_session_id text,
  converted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_org_id uuid references organizations(id) on delete cascade,
  referred_builder_session_id uuid references builder_sessions(id) on delete cascade,
  code text not null,
  converted boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists monitored_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  full_name text not null,
  phone text not null,
  status text not null default 'active',
  timezone text not null default 'America/New_York',
  risk_level text not null default 'stable',
  living_situation text,
  preferred_contact_channel text not null default 'sms',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists care_contacts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  member_id uuid not null references monitored_members(id) on delete cascade,
  full_name text not null,
  relationship text not null,
  phone text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists checkin_schedules (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  member_id uuid not null references monitored_members(id) on delete cascade,
  timezone text not null,
  window_start_hour smallint not null,
  window_end_hour smallint not null,
  retries smallint not null default 2,
  quiet_hours_start smallint,
  quiet_hours_end smallint,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  member_id uuid not null references monitored_members(id) on delete cascade,
  channel text not null check (channel in ('sms','voice')),
  status text not null check (status in ('pending','confirmed','missed','escalated','resolved')),
  response_text text,
  sent_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists incidents (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  member_id uuid not null references monitored_members(id) on delete cascade,
  source text not null,
  severity text not null,
  escalation_status text not null default 'open',
  notes text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists escalation_steps (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  step_order int not null,
  action_type text not null,
  delay_minutes int not null default 10,
  created_at timestamptz not null default now()
);

create table if not exists escalation_events (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  member_id uuid not null references monitored_members(id) on delete cascade,
  incident_id uuid references incidents(id) on delete cascade,
  checkin_id uuid references checkins(id) on delete cascade,
  event_type text not null,
  detail text,
  ack_token text default encode(gen_random_bytes(12), 'hex'),
  acknowledged_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists risk_snapshots (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  member_id uuid not null references monitored_members(id) on delete cascade,
  risk_band text not null,
  score int not null,
  inputs jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists organization_modules (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  module_key text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (org_id, module_key)
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  actor_user_id uuid,
  event_type text not null,
  object_type text not null,
  object_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_org_members_org_id on organization_members(org_id);
create index if not exists idx_members_org_id on monitored_members(org_id);
create index if not exists idx_checkins_org_status on checkins(org_id, status);
create index if not exists idx_incidents_org_status on incidents(org_id, escalation_status);
create index if not exists idx_risk_snapshots_org_member on risk_snapshots(org_id, member_id, created_at desc);
create index if not exists idx_builder_referral_code on builder_sessions(referral_code);
