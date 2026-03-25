create extension if not exists pgcrypto;

create table if not exists public.telemetry_snapshots (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  person_id uuid null,
  full_name text not null,
  phone_e164 text null,

  response_rate_7d numeric not null default 100,
  response_rate_30d numeric not null default 100,

  avg_response_minutes_7d numeric not null default 0,
  avg_response_minutes_30d numeric not null default 0,

  missed_checkins_7d integer not null default 0,
  missed_checkins_30d integer not null default 0,

  late_responses_7d integer not null default 0,
  late_responses_30d integer not null default 0,

  escalations_7d integer not null default 0,
  escalations_30d integer not null default 0,

  guardian_interventions_30d integer not null default 0,

  risk_score integer not null default 0,
  risk_level text not null default 'stable',

  trend text not null default 'stable',
  notes text null,

  metadata jsonb not null default '{}'::jsonb
);

create index if not exists idx_telemetry_snapshots_person_id
  on public.telemetry_snapshots (person_id);

create index if not exists idx_telemetry_snapshots_created_at
  on public.telemetry_snapshots (created_at desc);

create or replace function public.set_updated_at_telemetry_snapshots()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_telemetry_snapshots_updated_at on public.telemetry_snapshots;
create trigger trg_telemetry_snapshots_updated_at
before update on public.telemetry_snapshots
for each row
execute function public.set_updated_at_telemetry_snapshots();

create or replace function public.calculate_lifesignal_risk(
  p_missed_checkins_7d integer,
  p_avg_response_minutes_7d numeric,
  p_late_responses_7d integer,
  p_escalations_30d integer,
  p_guardian_interventions_30d integer
)
returns integer
language plpgsql
as $$
declare
  score integer := 0;
begin
  score := score + least(greatest(p_missed_checkins_7d, 0) * 12, 36);
  score := score + least(greatest(floor(p_avg_response_minutes_7d / 5)::integer, 0) * 2, 24);
  score := score + least(greatest(p_late_responses_7d, 0) * 5, 20);
  score := score + least(greatest(p_escalations_30d, 0) * 10, 20);
  score := score + least(greatest(p_guardian_interventions_30d, 0) * 5, 15);

  return least(score, 100);
end;
$$;

create or replace function public.calculate_lifesignal_risk_level(p_score integer)
returns text
language plpgsql
as $$
begin
  if p_score <= 19 then
    return 'stable';
  elsif p_score <= 39 then
    return 'caution';
  elsif p_score <= 64 then
    return 'elevated';
  else
    return 'high';
  end if;
end;
$$;

alter table public.telemetry_snapshots enable row level security;

drop policy if exists service_role_full_access_telemetry_snapshots on public.telemetry_snapshots;
create policy service_role_full_access_telemetry_snapshots
on public.telemetry_snapshots
for all
to service_role
using (true)
with check (true);
