import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};
    await supabaseAdmin.from('organizations').upsert({
      slug: metadata.orgSlug,
      name: metadata.orgName,
      plan: 'growth',
      status: 'active',
      stripe_customer_id: session.customer,
    }, { onConflict: 'slug' });

    await supabaseAdmin.from('subscriptions').upsert({
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      status: 'active',
      amount_monthly: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency ?? 'usd',
    }, { onConflict: 'stripe_subscription_id' });

    await supabaseAdmin.from('builder_sessions').update({ converted_at: new Date().toISOString() }).eq('id', metadata.builderSessionId);
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription;
    await supabaseAdmin
      .from('subscriptions')
      .update({ status: sub.status, current_period_end: new Date(sub.current_period_end * 1000).toISOString() })
      .eq('stripe_subscription_id', sub.id);
  }

  return NextResponse.json({ received: true });
}
