create extension if not exists "pgcrypto";

create table if not exists seniors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  timezone text not null default 'America/New_York',
  checkin_hour int not null,
  checkin_minute int not null,
  created_at timestamptz default now()
);

create table if not exists caregivers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  is_active boolean not null default false,
  stripe_customer_id text,
  stripe_subscription_status text,
  created_at timestamptz default now()
);

create table if not exists senior_caregiver_links (
  id uuid primary key default gen_random_uuid(),
  senior_id uuid references seniors(id) on delete cascade,
  caregiver_id uuid references caregivers(id) on delete cascade
);

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  senior_id uuid references seniors(id) on delete cascade,
  scheduled_for timestamptz not null,
  token text not null unique,
  status text not null default 'pending',
  created_at timestamptz default now(),
  responded_at timestamptz
);

create index if not exists idx_checkins_senior_scheduled
  on checkins (senior_id, scheduled_for);

create index if not exists idx_checkins_status_scheduled
  on checkins (status, scheduled_for);
