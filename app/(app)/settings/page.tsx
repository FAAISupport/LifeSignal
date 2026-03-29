import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function SettingsPage() {
  return (
    <DashboardShell title='Settings'>
      <div className='rounded-2xl border bg-white p-6'>
        <h2 className='text-lg font-semibold'>Organization settings</h2>
        <p className='mt-2 text-sm text-slate-600'>Manage check-in windows, quiet hours, escalation defaults, and operational preferences.</p>
      </div>
    </DashboardShell>
  );
}
