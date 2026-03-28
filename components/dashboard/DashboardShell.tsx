import Link from 'next/link';

const navItems = [
  { label: 'dashboard', href: '/dashboard' },
  { label: 'members', href: '/members' },
  { label: 'checkins', href: '/checkins' },
  { label: 'incidents', href: '/incidents' },
  { label: 'analytics', href: '/analytics' },
  { label: 'team', href: '/team' },
  { label: 'billing', href: '/billing' },
  { label: 'settings', href: '/settings' },
];

export function DashboardShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className='min-h-screen bg-slate-50'>
      <nav className='border-b bg-white'>
        <div className='mx-auto flex max-w-7xl flex-wrap gap-4 px-6 py-4 text-sm'>
          {navItems.map((item) => (
            <Link key={item.label} className='capitalize text-slate-700 hover:text-indigo-700' href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className='mx-auto max-w-7xl p-6'>
        <h1 className='mb-6 text-2xl font-semibold'>{title}</h1>
        {children}
      </div>
    </main>
  );
}
