alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table invites enable row level security;
alter table subscriptions enable row level security;
alter table builder_sessions enable row level security;
alter table referrals enable row level security;
alter table monitored_members enable row level security;
alter table care_contacts enable row level security;
alter table checkin_schedules enable row level security;
alter table checkins enable row level security;
alter table incidents enable row level security;
alter table escalation_steps enable row level security;
alter table escalation_events enable row level security;
alter table risk_snapshots enable row level security;
alter table organization_modules enable row level security;
alter table activity_logs enable row level security;

create or replace function public.user_org_ids()
returns setof uuid
language sql
stable
as $$
  select org_id from organization_members where user_id = auth.uid();
$$;

create policy "org scoped read" on organizations for select using (id in (select * from public.user_org_ids()));
create policy "org scoped members read" on organization_members for select using (org_id in (select * from public.user_org_ids()));
create policy "org scoped members write" on organization_members for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));

create policy "org scoped invites" on invites for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "org scoped subs" on subscriptions for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "builder sessions auth read" on builder_sessions for select using (auth.role() = 'authenticated');
create policy "builder sessions insert" on builder_sessions for insert with check (true);
create policy "referrals scoped" on referrals for all using (referrer_org_id in (select * from public.user_org_ids())) with check (referrer_org_id in (select * from public.user_org_ids()));

create policy "members scoped" on monitored_members for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "contacts scoped" on care_contacts for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "schedules scoped" on checkin_schedules for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "checkins scoped" on checkins for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "incidents scoped" on incidents for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "steps scoped" on escalation_steps for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "events scoped" on escalation_events for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "risk scoped" on risk_snapshots for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "org modules scoped" on organization_modules for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
create policy "activity scoped" on activity_logs for all using (org_id in (select * from public.user_org_ids())) with check (org_id in (select * from public.user_org_ids()));
