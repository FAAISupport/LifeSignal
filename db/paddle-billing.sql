create extension if not exists pgcrypto;

create table if not exists billing_customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  paddle_customer_id text not null unique,
  email text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  paddle_subscription_id text not null unique,
  paddle_customer_id text null,
  status text not null default 'unknown',
  product_id text null,
  product_name text null,
  price_id text null,
  current_billing_period_starts_at timestamptz null,
  current_billing_period_ends_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists billing_events (
  id uuid primary key default gen_random_uuid(),
  event_id text not null unique,
  event_type text not null,
  occurred_at timestamptz null,
  payload_json jsonb not null,
  processed_at timestamptz null,
  created_at timestamptz not null default now()
);

create index if not exists idx_billing_events_event_type
  on billing_events (event_type);

create index if not exists idx_subscriptions_customer
  on subscriptions (paddle_customer_id);

create index if not exists idx_subscriptions_status
  on subscriptions (status);
