import Link from "next/link";

export function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/members", label: "Members" },
    { href: "/checkins", label: "Check-ins" },
    { href: "/incidents", label: "Incidents" },
    { href: "/analytics", label: "Analytics" },
    { href: "/team", label: "Team" },
    { href: "/billing", label: "Billing" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <nav className="flex gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-gray-700 hover:text-gray-900">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl p-6">{children}</section>
    </main>
  );
}
