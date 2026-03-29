export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'unpaid';

export interface StripeCheckoutMetadata {
  orgName: string;
  orgSlug: string;
  selectedModules: string;
  builderSessionId: string;
}
