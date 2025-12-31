-- LifeSignal schema + RLS
-- Run in Supabase SQL editor

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.seniors (
  id uuid primary key default uuid_generate_v4(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,

  name text not null,
  phone_e164 text not null,
  timezone text not null default 'America/New_York',
  checkin_time text not null default '09:00', -- HH:MM local time
  channel_pref text not null default 'sms' check (channel_pref in ('sms','voice','both')),

  wait_minutes int not null default 30,
  enabled boolean not null default true,
  messaging_enabled boolean not null default true,

  consented_at timestamptz,
  consent_ip text,
  consent_version text,

  beta_override boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists seniors_owner_idx on public.seniors(owner_user_id);
create index if not exists seniors_enabled_idx on public.seniors(enabled, messaging_enabled);

create table if not exists public.family_contacts (
  id uuid primary key default uuid_generate_v4(),
  senior_id uuid not null references public.seniors(id) on delete cascade,
  name text not null,
  phone_e164 text,
  email text,
  verified boolean not null default false,
  notify_on_miss boolean not null default true,
  notify_on_help boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists family_contacts_senior_idx on public.family_contacts(senior_id);

create table if not exists public.invites (
  token text primary key,
  senior_id uuid not null references public.seniors(id) on delete cascade,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists invites_senior_idx on public.invites(senior_id);

create table if not exists public.checkins (
  id uuid primary key default uuid_generate_v4(),
  senior_id uuid not null references public.seniors(id) on delete cascade,
  scheduled_for timestamptz not null,
  status text not null default 'pending' check (status in ('pending','responded_ok','responded_help','missed')),
  responded_at timestamptz,
  response_type text,
  channel text,
  created_at timestamptz not null default now()
);

create index if not exists checkins_senior_sched_idx on public.checkins(senior_id, scheduled_for desc);
create index if not exists checkins_status_sched_idx on public.checkins(status, scheduled_for);

create table if not exists public.checkin_attempts (
  id uuid primary key default uuid_generate_v4(),
  checkin_id uuid not null references public.checkins(id) on delete cascade,
  attempt_type text not null check (attempt_type in ('sms','voice','family_sms')),
  twilio_sid text,
  status text not null default 'sent' check (status in ('sent','delivered','failed','received')),
  error text,
  created_at timestamptz not null default now()
);

create index if not exists attempts_checkin_idx on public.checkin_attempts(checkin_id);

create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  senior_id uuid references public.seniors(id) on delete set null,
  direction text not null check (direction in ('in','out')),
  from_e164 text,
  to_e164 text,
  body text,
  twilio_sid text,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists messages_senior_idx on public.messages(senior_id, created_at desc);

create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'inactive',
  plan_tier text,
  plan_cadence text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_user_id uuid references auth.users(id) on delete set null,
  senior_id uuid references public.seniors(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_created_idx on public.audit_logs(created_at desc);
create index if not exists audit_senior_idx on public.audit_logs(senior_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists seniors_updated_at on public.seniors;
create trigger seniors_updated_at before update on public.seniors
for each row execute function public.set_updated_at();

drop trigger if exists family_updated_at on public.family_contacts;
create trigger family_updated_at before update on public.family_contacts
for each row execute function public.set_updated_at();

drop trigger if exists subs_updated_at on public.subscriptions;
create trigger subs_updated_at before update on public.subscriptions
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.seniors enable row level security;
alter table public.family_contacts enable row level security;
alter table public.invites enable row level security;
alter table public.checkins enable row level security;
alter table public.checkin_attempts enable row level security;
alter table public.messages enable row level security;
alter table public.subscriptions enable row level security;
alter table public.audit_logs enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role = 'admin'
  );
$$;

drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update" on public.profiles;
create policy "profiles_update" on public.profiles
for update using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "seniors_select" on public.seniors;
create policy "seniors_select" on public.seniors
for select using (owner_user_id = auth.uid() or public.is_admin());

drop policy if exists "seniors_write" on public.seniors;
create policy "seniors_write" on public.seniors
for all using (owner_user_id = auth.uid() or public.is_admin())
with check (owner_user_id = auth.uid() or public.is_admin());

drop policy if exists "family_select" on public.family_contacts;
create policy "family_select" on public.family_contacts
for select using (
  public.is_admin() or exists (
    select 1 from public.seniors s
    where s.id = family_contacts.senior_id and s.owner_user_id = auth.uid()
  )
);

drop policy if exists "family_write" on public.family_contacts;
create policy "family_write" on public.family_contacts
for all using (
  public.is_admin() or exists (
    select 1 from public.seniors s
    where s.id = family_contacts.senior_id and s.owner_user_id = auth.uid()
  )
)
with check (
  public.is_admin() or exists (
    select 1 from public.seniors s
    where s.id = family_contacts.senior_id and s.owner_user_id = auth.uid()
  )
);

drop policy if exists "invites_select" on public.invites;
create policy "invites_select" on public.invites
for select using (
  public.is_admin() or exists (
    select 1 from public.seniors s
    where s.id = invites.senior_id and s.owner_user_id = auth.uid()
  )
);

drop policy if exists "checkins_select" on public.checkins;
create policy "checkins_select" on public.checkins
for select using (
  public.is_admin() or exists (
    select 1 from public.seniors s
    where s.id = checkins.senior_id and s.owner_user_id = auth.uid()
  )
);

drop policy if exists "attempts_select" on public.checkin_attempts;
create policy "attempts_select" on public.checkin_attempts
for select using (
  public.is_admin() or exists (
    select 1 from public.checkins c
    join public.seniors s on s.id = c.senior_id
    where c.id = checkin_attempts.checkin_id and s.owner_user_id = auth.uid()
  )
);

drop policy if exists "messages_select" on public.messages;
create policy "messages_select" on public.messages
for select using (
  public.is_admin() or exists (
    select 1 from public.seniors s
    where s.id = messages.senior_id and s.owner_user_id = auth.uid()
  )
);

drop policy if exists "subs_select" on public.subscriptions;
create policy "subs_select" on public.subscriptions
for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "audit_select" on public.audit_logs;
create policy "audit_select" on public.audit_logs
for select using (
  public.is_admin() or exists (
    select 1 from public.seniors s
    where s.id = audit_logs.senior_id and s.owner_user_id = auth.uid()
  )
);
