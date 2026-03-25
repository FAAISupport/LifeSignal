create extension if not exists pgcrypto;

alter table public.waitlist_signups
  add column if not exists personal_referral_code text,
  add column if not exists referred_by_code text,
  add column if not exists joined_via_referral boolean not null default false;

create unique index if not exists idx_waitlist_personal_referral_code
  on public.waitlist_signups (personal_referral_code);

create index if not exists idx_waitlist_referred_by_code
  on public.waitlist_signups (referred_by_code);

create or replace function public.generate_referral_code(input_text text)
returns text
language plpgsql
as $$
declare
  base text;
  candidate text;
  suffix text;
begin
  base := upper(regexp_replace(coalesce(input_text, 'USER'), '[^A-Za-z0-9]', '', 'g'));
  base := left(base, 6);

  if length(base) < 3 then
    base := 'USER';
  end if;

  loop
    suffix := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
    candidate := base || suffix;

    exit when not exists (
      select 1
      from public.waitlist_signups
      where personal_referral_code = candidate
    );
  end loop;

  return candidate;
end;
$$;

create or replace function public.assign_missing_referral_codes()
returns void
language plpgsql
as $$
begin
  update public.waitlist_signups
  set personal_referral_code = public.generate_referral_code(name)
  where personal_referral_code is null;
end;
$$;

create or replace function public.recalculate_referral_counts()
returns void
language plpgsql
as $$
begin
  update public.waitlist_signups w
  set referral_count = coalesce(r.ref_count, 0)
  from (
    select referred_by_code, count(*)::int as ref_count
    from public.waitlist_signups
    where referred_by_code is not null
    group by referred_by_code
  ) r
  where w.personal_referral_code = r.referred_by_code;

  update public.waitlist_signups
  set referral_count = 0
  where personal_referral_code is not null
    and personal_referral_code not in (
      select distinct referred_by_code
      from public.waitlist_signups
      where referred_by_code is not null
    );
end;
$$;

create or replace function public.recalculate_waitlist_positions()
returns void
language plpgsql
as $$
begin
  with ranked as (
    select
      id,
      row_number() over (
        order by referral_count desc, created_at asc, id asc
      ) as new_position
    from public.waitlist_signups
  )
  update public.waitlist_signups w
  set waitlist_position = ranked.new_position
  from ranked
  where w.id = ranked.id;
end;
$$;

create or replace function public.refresh_waitlist_rankings()
returns void
language plpgsql
as $$
begin
  perform public.assign_missing_referral_codes();
  perform public.recalculate_referral_counts();
  perform public.recalculate_waitlist_positions();
end;
$$;

create or replace function public.handle_waitlist_signup_defaults()
returns trigger
language plpgsql
as $$
begin
  if new.personal_referral_code is null or length(trim(new.personal_referral_code)) = 0 then
    new.personal_referral_code := public.generate_referral_code(new.name);
  end if;

  if new.referred_by_code is not null and length(trim(new.referred_by_code)) > 0 then
    new.joined_via_referral := true;
  else
    new.joined_via_referral := false;
    new.referred_by_code := null;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_waitlist_signup_defaults on public.waitlist_signups;
create trigger trg_waitlist_signup_defaults
before insert on public.waitlist_signups
for each row
execute function public.handle_waitlist_signup_defaults();

create or replace function public.handle_waitlist_ranking_refresh()
returns trigger
language plpgsql
as $$
begin
  perform public.refresh_waitlist_rankings();
  return null;
end;
$$;

drop trigger if exists trg_waitlist_ranking_refresh_insert on public.waitlist_signups;
create trigger trg_waitlist_ranking_refresh_insert
after insert on public.waitlist_signups
for each statement
execute function public.handle_waitlist_ranking_refresh();

drop trigger if exists trg_waitlist_ranking_refresh_update on public.waitlist_signups;
create trigger trg_waitlist_ranking_refresh_update
after update on public.waitlist_signups
for each statement
execute function public.handle_waitlist_ranking_refresh();

select public.refresh_waitlist_rankings();
