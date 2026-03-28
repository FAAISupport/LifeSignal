import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createInvite } from '@/services/team/invites.service';
import { requireOrgContext } from '@/lib/supabase/org';
import { hasPermission } from '@/lib/permissions';
import type { OrgRole } from '@/types/team';

const schema = z.object({ email: z.string().email(), role: z.enum(['owner', 'admin', 'pastor', 'care_manager', 'volunteer', 'viewer']) });

export async function POST(req: Request) {
  try {
    const context = await requireOrgContext();
    if (!hasPermission(context.role as OrgRole, 'team:invite')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { email, role } = schema.parse(await req.json());
    const invite = await createInvite(context.orgId, email, role, context.userId);
    return NextResponse.json({ invite });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invite failed' }, { status: 400 });
  }
}
