create extension if not exists pgcrypto;

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  name text not null,
  email text not null unique,
  phone text not null,

  use_case text null,
  referral_code text null,
  referred_by text null,

  notes text null,

  referral_count integer not null default 0,
  waitlist_position integer null,

  metadata jsonb not null default '{}'::jsonb
);

create index if not exists idx_waitlist_email on public.waitlist_signups (email);
create index if not exists idx_waitlist_referral_code on public.waitlist_signups (referral_code);
create index if not exists idx_waitlist_created_at on public.waitlist_signups (created_at desc);

create or replace function public.set_updated_at_waitlist()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_waitlist_updated_at on public.waitlist_signups;
create trigger trg_waitlist_updated_at
before update on public.waitlist_signups
for each row
execute function public.set_updated_at_waitlist();

alter table public.waitlist_signups enable row level security;

-- service role full access
create policy "service_role_full_access_waitlist"
on public.waitlist_signups
for all
to service_role
using (true)
with check (true);

-- OPTIONAL: public insert (if you ever call directly from client)
-- create policy "public_insert_waitlist"
-- on public.waitlist_signups
-- for insert
-- to anon
-- with check (true);
