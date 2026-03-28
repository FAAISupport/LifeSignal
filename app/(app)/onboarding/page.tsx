import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function OnboardingPage() {
  return (
    <DashboardShell title='Onboarding'>
      <ol className='space-y-3 rounded-2xl border bg-white p-6'>
        <li>1. Complete organization profile and care model.</li>
        <li>2. Invite team members and assign roles.</li>
        <li>3. Add first 3 monitored members.</li>
        <li>4. Configure first check-in schedule and escalation ladder.</li>
        <li>5. Send a live SMS test check-in and verify responses.</li>
      </ol>
    </DashboardShell>
  );
}
