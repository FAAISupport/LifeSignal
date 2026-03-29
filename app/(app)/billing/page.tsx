import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SubscriptionCard } from '@/components/billing/SubscriptionCard';

export default function BillingPage() {
  return (
    <DashboardShell title='Billing'>
      <SubscriptionCard subscription={{ plan: 'growth', status: 'active', amount_monthly: 799 }} />
    </DashboardShell>
  );
}
