import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckout } from '@/services/billing/billing.service';
import { supabaseAdmin } from '@/lib/supabase/admin';

const schema = z.object({ sessionId: z.string().uuid() });

export async function POST(req: Request) {
  try {
    const { sessionId } = schema.parse(await req.json());
    const { data: session, error } = await supabaseAdmin.from('builder_sessions').select('*').eq('id', sessionId).single();
    if (error || !session) throw new Error('Builder session missing');

    const orgSlug = session.profile.churchName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const checkout = await createCheckout({
      sessionId,
      orgName: session.profile.churchName,
      orgSlug,
      amount: session.monthly_total,
      selectedModules: session.selected_modules,
      email: session.profile.contactEmail,
    });

    return NextResponse.json({ id: checkout.id, url: checkout.url });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Checkout failed' }, { status: 400 });
  }
}
