import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createInvite } from '@/services/team/invites.service';
import { requireOrgContext } from '@/lib/supabase/org';
import { hasPermission } from '@/lib/permissions';
import type { OrgRole } from '@/types/team';

const roleSchema = z.enum(['owner', 'admin', 'pastor', 'care_manager', 'volunteer', 'viewer']);
const bodySchema = z.object({ email: z.string().email(), role: roleSchema });

export async function POST(req: Request) {
  try {
    const context = await requireOrgContext();
    const actorRole = roleSchema.parse(context.role) as OrgRole;

    if (!hasPermission(actorRole, 'team:invite')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { email, role } = bodySchema.parse(await req.json());
    const invite = await createInvite(context.orgId, email, role, context.userId);
    return NextResponse.json({ invite });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invite failed';
    const status = message === 'Unauthorized' ? 401 : message === 'No organization membership found' ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
