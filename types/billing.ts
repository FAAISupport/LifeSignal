export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'unpaid';

export type ChurchPlan = 'core' | 'growth' | 'care';
export type ChurchAddon = 'giving' | 'sms';

export interface StripeCheckoutMetadata {
  orgName: string;
  orgSlug: string;
  selectedModules: string;
  builderSessionId: string;
  plan?: ChurchPlan;
  addons?: string;
  orgId?: string;
}
