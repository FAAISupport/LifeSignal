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

create table if not exists public.care_recipients (
  id text primary key,
  full_name text not null,
  phone text not null unique,
  timezone text not null default 'America/New_York',
  preferred_channels text[] not null default array['sms']::text[],
  confirmation_keywords text[] not null default array['yes','ok','okay','1','y','safe']::text[],
  help_keywords text[] not null default array['help','sos','911','emergency','urgent']::text[],
  quiet_hours_start text null,
  quiet_hours_end text null,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint care_recipients_phone_chk check (length(phone) >= 10),
  constraint care_recipients_preferred_channels_chk check (
    preferred_channels <@ array['sms','voice']::text[]
  )
);

create table if not exists public.care_checkins (
  id text primary key,
  recipient_id text not null references public.care_recipients(id) on delete cascade,
  scheduled_for timestamptz not null,
  window_start timestamptz not null,
  window_end timestamptz not null,
  channels text[] not null default array['sms']::text[],
  attempts_made integer not null default 0,
  max_attempts integer not null default 3,
  retry_delay_minutes integer not null default 15,
  escalation_delay_minutes integer not null default 10,
  status text not null default 'pending',
  confirmed_at timestamptz null,
  help_requested_at timestamptz null,
  last_attempt_at timestamptz null,
  escalation_started_at timestamptz null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint care_checkins_status_chk check (
    status in ('pending','confirmed','missed','help_requested','escalating','resolved')
  ),
  constraint care_checkins_channels_chk check (
    channels <@ array['sms','voice']::text[]
  ),
  constraint care_checkins_attempts_chk check (
    attempts_made >= 0 and max_attempts >= 1 and attempts_made <= 50 and max_attempts <= 50
  ),
  constraint care_checkins_delay_chk check (
    retry_delay_minutes >= 0 and escalation_delay_minutes >= 0
  ),
  constraint care_checkins_window_chk check (
    window_start <= window_end
  )
);

create table if not exists public.care_escalation_contacts (
  id text primary key,
  recipient_id text not null references public.care_recipients(id) on delete cascade,
  name text not null,
  phone text not null,
  role text not null,
  priority integer not null,
  can_acknowledge boolean not null default true,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint care_escalation_contacts_role_chk check (
    role in ('guardian','family','caregiver','neighbor','facility_staff','emergency_contact')
  ),
  constraint care_escalation_contacts_priority_chk check (
    priority >= 1 and priority <= 100
  ),
  constraint care_escalation_contacts_phone_chk check (
    length(phone) >= 10
  ),
  constraint care_escalation_contacts_unique_priority unique (recipient_id, priority),
  constraint care_escalation_contacts_unique_phone unique (recipient_id, phone)
);

create table if not exists public.care_incidents (
  id text primary key,
  check_in_id text not null references public.care_checkins(id) on delete cascade,
  recipient_id text not null references public.care_recipients(id) on delete cascade,
  status text not null default 'open',
  started_at timestamptz not null,
  acknowledged_at timestamptz null,
  acknowledged_by_contact_id text null references public.care_escalation_contacts(id) on delete set null,
  steps jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint care_incidents_status_chk check (
    status in ('open','acknowledged','resolved')
  ),
  constraint care_incidents_steps_array_chk check (
    jsonb_typeof(steps) = 'array'
  )
);

create table if not exists public.care_events (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  check_in_id text not null references public.care_checkins(id) on delete cascade,
  recipient_id text not null references public.care_recipients(id) on delete cascade,
  incident_id text null references public.care_incidents(id) on delete set null,
  step_number integer null,
  channel text null,
  occurred_at timestamptz not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  constraint care_events_type_chk check (
    type in (
      'checkin_sent',
      'checkin_retry_sent',
      'checkin_confirmed',
      'checkin_help_requested',
      'checkin_ignored_message',
      'escalation_started',
      'escalation_step_sent',
      'escalation_acknowledged',
      'incident_resolved',
      'orchestrator_error'
    )
  ),
  constraint care_events_channel_chk check (
    channel is null or channel in ('sms','voice','escalation_sms','escalation_voice')
  ),
  constraint care_events_step_number_chk check (
    step_number is null or step_number >= 1
  )
);

create index if not exists idx_care_recipients_is_active
  on public.care_recipients (is_active);

create index if not exists idx_care_recipients_phone
  on public.care_recipients (phone);

create index if not exists idx_care_checkins_recipient_id
  on public.care_checkins (recipient_id);

create index if not exists idx_care_checkins_status
  on public.care_checkins (status);

create index if not exists idx_care_checkins_window_start
  on public.care_checkins (window_start);

create index if not exists idx_care_checkins_scheduled_for
  on public.care_checkins (scheduled_for desc);

create index if not exists idx_care_checkins_recipient_status_scheduled
  on public.care_checkins (recipient_id, status, scheduled_for desc);

create index if not exists idx_care_escalation_contacts_recipient_id
  on public.care_escalation_contacts (recipient_id);

create index if not exists idx_care_escalation_contacts_phone
  on public.care_escalation_contacts (phone);

create index if not exists idx_care_incidents_check_in_id
  on public.care_incidents (check_in_id);

create index if not exists idx_care_incidents_recipient_id
  on public.care_incidents (recipient_id);

create index if not exists idx_care_incidents_status
  on public.care_incidents (status);

create index if not exists idx_care_events_check_in_id
  on public.care_events (check_in_id);

create index if not exists idx_care_events_recipient_id
  on public.care_events (recipient_id);

create index if not exists idx_care_events_incident_id
  on public.care_events (incident_id);

create index if not exists idx_care_events_occurred_at
  on public.care_events (occurred_at desc);

drop trigger if exists trg_care_recipients_updated_at on public.care_recipients;
create trigger trg_care_recipients_updated_at
before update on public.care_recipients
for each row
execute function public.set_updated_at();

drop trigger if exists trg_care_checkins_updated_at on public.care_checkins;
create trigger trg_care_checkins_updated_at
before update on public.care_checkins
for each row
execute function public.set_updated_at();

drop trigger if exists trg_care_escalation_contacts_updated_at on public.care_escalation_contacts;
create trigger trg_care_escalation_contacts_updated_at
before update on public.care_escalation_contacts
for each row
execute function public.set_updated_at();

drop trigger if exists trg_care_incidents_updated_at on public.care_incidents;
create trigger trg_care_incidents_updated_at
before update on public.care_incidents
for each row
execute function public.set_updated_at();

comment on table public.care_recipients is 'Monitored users receiving LifeSignal check-ins.';
comment on table public.care_checkins is 'Each expected check-in instance for a recipient.';
comment on table public.care_escalation_contacts is 'Priority-ordered contacts notified when a check-in fails or help is requested.';
comment on table public.care_incidents is 'Escalation incidents tied to a check-in.';
comment on table public.care_events is 'Immutable event log for check-ins and escalation activity.';

commit;
