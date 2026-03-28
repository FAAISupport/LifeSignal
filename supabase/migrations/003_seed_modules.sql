insert into organization_modules (org_id, module_key, active)
select '00000000-0000-0000-0000-000000000000'::uuid, 'module_' || lpad((n)::text, 2, '0'), true
from generate_series(1, 50) as n
on conflict do nothing;
