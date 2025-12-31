-- Paddle migration: add provider + ids to subscriptions
alter table if exists public.subscriptions
  add column if not exists provider text default 'stripe',
  add column if not exists paddle_customer_id text,
  add column if not exists paddle_subscription_id text,
  add column if not exists paddle_last_transaction_id text;

-- Optional: if you previously only allowed Stripe enums, ensure status is flexible text.
-- (Keep your existing status type if it is already text.)
