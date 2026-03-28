export type OrganizationPlan = 'starter' | 'growth' | 'enterprise';
export type OrganizationStatus = 'pending' | 'active' | 'disabled';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: OrganizationPlan;
  status: OrganizationStatus;
  created_at: string;
}
