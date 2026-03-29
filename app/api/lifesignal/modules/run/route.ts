import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireOrgContext } from '@/lib/supabase/org';
import { hasPermission } from '@/lib/permissions';
import type { OrgRole } from '@/types/team';
import { runConfiguredModules } from '@/lib/lifesignal/modules/module-engine';

const schema = z.object({
  severeWeatherAlert: z.boolean().default(false),
  voiceMessage: z.string().min(5).max(300).optional(),
});

export async function POST(req: Request) {
  try {
    const context = await requireOrgContext();
    if (!hasPermission(context.role as OrgRole, 'settings:manage')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const payload = schema.parse(await req.json());
    const summary = await runConfiguredModules(context.orgId, payload);
    return NextResponse.json({ summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Module run failed';
    const status = message === 'Unauthorized' ? 401 : message === 'No organization membership found' ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
