create extension if not exists pgcrypto;

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  email text not null unique,
  interest text not null,
  use_case text,
  status text not null default 'pending',
  referral_code text not null unique,
  referred_by uuid references public.waitlist_entries(id) on delete set null,
  referrals_count integer not null default 0,
  priority_score integer not null default 0
);

create index if not exists waitlist_entries_priority_idx
  on public.waitlist_entries (priority_score desc, created_at asc);

create index if not exists waitlist_entries_referred_by_idx
  on public.waitlist_entries (referred_by);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

DROP TRIGGER IF EXISTS trg_waitlist_entries_updated_at ON public.waitlist_entries;
create trigger trg_waitlist_entries_updated_at
before update on public.waitlist_entries
for each row
execute function public.set_updated_at();

alter table public.waitlist_entries enable row level security;

DROP POLICY IF EXISTS "service role full access waitlist_entries" ON public.waitlist_entries;
create policy "service role full access waitlist_entries"
  on public.waitlist_entries
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
