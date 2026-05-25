create extension if not exists "pgcrypto";

create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand_primary text not null default '#43FF83',
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key,
  tenant_id uuid not null references tenants(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('owner','office_admin','dispatcher','crew_lead','crew_member','sales_rep','customer')),
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  customer_name text not null,
  status text not null default 'new',
  score int not null default 0,
  source text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table tenants enable row level security;
alter table profiles enable row level security;
alter table leads enable row level security;

create policy "tenant scoped tenants" on tenants
for select using (id in (select tenant_id from profiles where id = auth.uid()));

create policy "tenant scoped profiles" on profiles
for all using (tenant_id in (select tenant_id from profiles where id = auth.uid()));

create policy "tenant scoped leads" on leads
for all using (tenant_id in (select tenant_id from profiles where id = auth.uid()));
