begin;

insert into public.care_recipients (
  id,
  full_name,
  phone,
  timezone,
  preferred_channels,
  is_active
) values (
  'recipient_test_001',
  'Test Recipient',
  '+13525550101',
  'America/New_York',
  array['sms','voice']::text[],
  true
)
on conflict (id) do update
set
  full_name = excluded.full_name,
  phone = excluded.phone,
  timezone = excluded.timezone,
  preferred_channels = excluded.preferred_channels,
  is_active = excluded.is_active;

insert into public.care_escalation_contacts (
  id,
  recipient_id,
  name,
  phone,
  role,
  priority,
  can_acknowledge,
  is_active
) values
(
  'contact_test_001',
  'recipient_test_001',
  'Primary Caregiver',
  '+13525550111',
  'caregiver',
  1,
  true,
  true
),
(
  'contact_test_002',
  'recipient_test_001',
  'Backup Family Contact',
  '+13525550112',
  'family',
  2,
  true,
  true
)
on conflict (id) do update
set
  recipient_id = excluded.recipient_id,
  name = excluded.name,
  phone = excluded.phone,
  role = excluded.role,
  priority = excluded.priority,
  can_acknowledge = excluded.can_acknowledge,
  is_active = excluded.is_active;

insert into public.care_checkins (
  id,
  recipient_id,
  scheduled_for,
  window_start,
  window_end,
  channels,
  attempts_made,
  max_attempts,
  retry_delay_minutes,
  escalation_delay_minutes,
  status
) values (
  'checkin_test_001',
  'recipient_test_001',
  timezone('utc', now()),
  timezone('utc', now()) - interval '5 minutes',
  timezone('utc', now()) + interval '25 minutes',
  array['sms','voice']::text[],
  0,
  3,
  5,
  5,
  'pending'
)
on conflict (id) do update
set
  recipient_id = excluded.recipient_id,
  scheduled_for = excluded.scheduled_for,
  window_start = excluded.window_start,
  window_end = excluded.window_end,
  channels = excluded.channels,
  attempts_made = excluded.attempts_made,
  max_attempts = excluded.max_attempts,
  retry_delay_minutes = excluded.retry_delay_minutes,
  escalation_delay_minutes = excluded.escalation_delay_minutes,
  status = excluded.status;

commit;
