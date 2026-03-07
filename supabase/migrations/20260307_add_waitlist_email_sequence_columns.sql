-- Add email sequence tracking fields to waitlist_entries.
alter table public.waitlist_entries
  add column if not exists welcome_sent_at timestamptz null,
  add column if not exists referral_sent_at timestamptz null,
  add column if not exists story_sent_at timestamptz null,
  add column if not exists early_access_sent_at timestamptz null,
  add column if not exists beta_invited_at timestamptz null,
  add column if not exists beta_invite_link text null;

create index if not exists idx_waitlist_entries_email on public.waitlist_entries(email);
create index if not exists idx_waitlist_entries_referral_code on public.waitlist_entries(referral_code);
create index if not exists idx_waitlist_entries_created_at on public.waitlist_entries(created_at);
