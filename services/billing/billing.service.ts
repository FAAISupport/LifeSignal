import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { env } from '@/lib/env';

export async function createCheckout(params: {
  sessionId: string;
  orgName: string;
  orgSlug: string;
  amount: number;
  selectedModules: string[];
  email: string;
}) {
  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: params.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          recurring: { interval: 'month' },
          product_data: { name: 'ChurchOS Builder V3 Subscription' },
          unit_amount: Math.round(params.amount * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/builder/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/builder/checkout?sessionId=${params.sessionId}`,
    metadata: {
      orgName: params.orgName,
      orgSlug: params.orgSlug,
      selectedModules: params.selectedModules.join(','),
      builderSessionId: params.sessionId,
    },
  });

  await supabaseAdmin
    .from('builder_sessions')
    .update({ stripe_checkout_session_id: stripeSession.id })
    .eq('id', params.sessionId);

  return stripeSession;
}
