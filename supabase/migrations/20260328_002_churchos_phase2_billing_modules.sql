alter table subscriptions
  add column if not exists plan text not null default 'core',
  add column if not exists addons text[] not null default '{}';

create unique index if not exists subscriptions_org_id_unique
  on subscriptions(org_id)
  where org_id is not null;

update organizations
set plan = case
  when plan in ('starter', 'family') then 'core'
  when plan in ('growth', 'caregiver') then 'growth'
  when plan in ('enterprise') then 'care'
  else coalesce(plan, 'core')
end;

create table if not exists module_catalog (
  module_key text primary key,
  name text not null,
  subtitle text not null,
  description text not null,
  available_in text[] not null,
  addon_required text,
  created_at timestamptz not null default now()
);

create table if not exists plan_module_mapping (
  plan text not null,
  module_key text not null references module_catalog(module_key) on delete cascade,
  primary key (plan, module_key)
);

insert into module_catalog (module_key, name, subtitle, description, available_in, addon_required)
values
  ('members', 'Members', 'Central member records and households', 'Track member profiles, household relationships, tags, and ministry notes.', '{core,growth,care}', null),
  ('events', 'Events', 'Church events and attendance', 'Plan events, track registrations, and monitor attendance trends over time.', '{core,growth,care}', null),
  ('communications', 'Communications', 'Targeted church communications', 'Send and log outreach messages with templates and communication history.', '{core,growth,care}', null),
  ('volunteers', 'Volunteers', 'Serve team coordination', 'Assign and organize volunteer roles to ensure ministry coverage.', '{core,growth,care}', null),
  ('groups', 'Groups', 'Small group engagement', 'Organize groups and track member participation in discipleship pathways.', '{core,growth,care}', null),
  ('care', 'Care', 'Proactive pastoral care workflows', 'Manage care cases, assignments, and case notes for at-risk members.', '{care}', null),
  ('lifesignal', 'LifeSignal', 'Daily check-ins and missed-check alerts', 'Monitor daily safety check-ins and trigger alerts when members miss responses.', '{care}', null),
  ('analytics', 'Analytics', 'Retention and engagement insights', 'Measure member engagement, volunteer gaps, and retention risk trends.', '{growth,care}', null),
  ('public_engagement', 'Public Engagement', 'Guest follow-up and outreach', 'Capture first-time guest activity and automate follow-up journeys.', '{core,growth,care}', null),
  ('automations', 'Automations', 'Workflow automation engine', 'Build automations that trigger outreach or care tasks from behavior signals.', '{growth,care}', null),
  ('giving', 'Giving', 'Giving analytics and workflows', 'Track giving health and automate follow-up for generosity and donor care.', '{core,growth,care}', 'giving')
on conflict (module_key) do update
set
  name = excluded.name,
  subtitle = excluded.subtitle,
  description = excluded.description,
  available_in = excluded.available_in,
  addon_required = excluded.addon_required;

insert into plan_module_mapping (plan, module_key)
values
  ('core', 'members'),
  ('core', 'events'),
  ('core', 'communications'),
  ('core', 'volunteers'),
  ('core', 'groups'),
  ('core', 'public_engagement'),
  ('growth', 'members'),
  ('growth', 'events'),
  ('growth', 'communications'),
  ('growth', 'volunteers'),
  ('growth', 'groups'),
  ('growth', 'public_engagement'),
  ('growth', 'analytics'),
  ('growth', 'automations'),
  ('care', 'members'),
  ('care', 'events'),
  ('care', 'communications'),
  ('care', 'volunteers'),
  ('care', 'groups'),
  ('care', 'public_engagement'),
  ('care', 'analytics'),
  ('care', 'automations'),
  ('care', 'care'),
  ('care', 'lifesignal')
on conflict (plan, module_key) do nothing;
