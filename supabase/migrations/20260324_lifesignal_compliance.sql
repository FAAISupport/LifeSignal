create extension if not exists pgcrypto;

create table if not exists public.message_consent_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  phone_e164 text not null,
  email text null,
  full_name text null,
  source text not null check (source in ('website','beta_form','caregiver_enrollment','manual_admin','inbound_sms','voice_opt_in')),
  status text not null check (status in ('opted_in','opted_out','help_requested','pending')),
  channel text not null check (channel in ('sms','voice','both')) default 'both',
  consent_text text not null,
  consent_version text not null default 'v1',
  consent_url text null,
  ip_address inet null,
  user_agent text null,
  form_path text null,
  referrer text null,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists idx_message_consent_logs_phone on public.message_consent_logs (phone_e164);
create index if not exists idx_message_consent_logs_created_at on public.message_consent_logs (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_message_consent_logs_updated_at on public.message_consent_logs;
create trigger trg_message_consent_logs_updated_at
before update on public.message_consent_logs
for each row
execute function public.set_updated_at();

create or replace view public.current_message_consent as
with ranked as (
  select
    mcl.*,
    row_number() over (
      partition by mcl.phone_e164
      order by mcl.created_at desc, mcl.id desc
    ) as rn
  from public.message_consent_logs mcl
)
select
  id,
  created_at,
  updated_at,
  phone_e164,
  email,
  full_name,
  source,
  status,
  channel,
  consent_text,
  consent_version,
  consent_url,
  ip_address,
  user_agent,
  form_path,
  referrer,
  metadata
from ranked
where rn = 1;

alter table public.message_consent_logs enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'message_consent_logs'
      and policyname = 'service_role_full_access_message_consent_logs'
  ) then
    create policy service_role_full_access_message_consent_logs
      on public.message_consent_logs
      for all
      to service_role
      using (true)
      with check (true);
  end if;
end
$$;