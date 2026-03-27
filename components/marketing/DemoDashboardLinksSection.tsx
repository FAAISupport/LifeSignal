import Link from "next/link";

const demoCards = [
  {
    title: "Family Dashboard",
    href: "/demo-dashboards/family",
    description:
      "Simple daily visibility for family members who want peace of mind without operational complexity."
  },
  {
    title: "Caregiver Dashboard",
    href: "/demo-dashboards/caregiver",
    description:
      "A more operational dashboard for professional caregivers and response teams."
  },
  {
    title: "PostOp Dashboard",
    href: "/demo-dashboards/postop",
    description:
      "A dedicated recovery dashboard for post-operative monitoring, medication prompts, and escalation visibility."
  },
  {
    title: "Recover Dashboard",
    href: "/demo-dashboards/recover",
    description:
      "A standalone dashboard for LifeSignal Recover with structured recovery adherence and intervention tracking."
  },
  {
    title: "Church OS Dashboard",
    href: "/demo-dashboards/church-os",
    description:
      "A full ministry operations demo for churches managing member care, volunteers, and engagement workflows."
  }
];

export default function DemoDashboardLinksSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Demo Dashboards
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Explore the right view for every audience
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">
            Each dashboard below has its own dedicated route and should be linked directly from your marketing sections and solution cards.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {demoCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{card.description}</p>
              <p className="mt-5 text-sm font-semibold text-sky-700">Open demo →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
