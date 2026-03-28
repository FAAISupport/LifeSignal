import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { env } from '@/lib/env';
import { calculateSubscriptionTotal, type ChurchAddon, type ChurchPlan } from '@/lib/churchos/modules';

export async function createCheckout(params: {
  sessionId: string;
  orgId?: string;
  orgName: string;
  orgSlug: string;
  plan: ChurchPlan;
  addons: ChurchAddon[];
  selectedModules: string[];
  email: string;
}) {
  const pricing = calculateSubscriptionTotal(params.plan, params.addons);

  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: params.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          recurring: { interval: 'month' },
          product_data: { name: `ChurchOS ${params.plan.toUpperCase()} Subscription` },
          unit_amount: Math.round(pricing.total * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/builder/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/builder/checkout?sessionId=${params.sessionId}`,
    metadata: {
      orgId: params.orgId ?? null,
      orgName: params.orgName,
      orgSlug: params.orgSlug,
      plan: params.plan,
      addons: params.addons.join(','),
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

const legacyPlanToChurchPlan: Record<'family' | 'caregiver' | 'enterprise', ChurchPlan> = {
  family: 'core',
  caregiver: 'growth',
  enterprise: 'care',
};

export async function createCheckoutSession(params: {
  profileId: string;
  email: string;
  plan: 'family' | 'caregiver' | 'enterprise';
}) {
  const mappedPlan = legacyPlanToChurchPlan[params.plan];
  const pricing = calculateSubscriptionTotal(mappedPlan, []);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: params.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          recurring: { interval: 'month' },
          product_data: { name: `LifeSignal ${params.plan} plan` },
          unit_amount: Math.round(pricing.total * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/billing?checkout=success`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/billing?checkout=cancelled`,
    metadata: {
      profileId: params.profileId,
      plan: mappedPlan,
      addons: '',
    },
  });

  return { id: session.id, url: session.url };
}
