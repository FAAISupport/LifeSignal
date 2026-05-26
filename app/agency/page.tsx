import { createSupabaseServerClient } from "@/lib/supabase/clients";
import {
  Activity,
  ArrowUpRight,
  Calendar,
  FileText,
  Megaphone,
  Phone,
  Settings,
  Sparkles,
  Users,
  Wallet,
  Zap
} from "lucide-react";
import { agencyDashboardData } from "@/services/dashboard/dashboard.service";

const statCards = [
  { label: "Missed Calls Today", value: "12", delta: "-23% vs yesterday", icon: Phone },
  { label: "New Leads", value: "27", delta: "+18% vs yesterday", icon: Users },
  { label: "Quotes Pending", value: "14", delta: "+8% vs yesterday", icon: FileText },
  { label: "Revenue This Week", value: "$18,540", delta: "+32% vs last week", icon: Wallet }
];

const activityFeed = [
  { title: "Storm activity detected in Ocala.", body: "High lead volume expected.", ago: "2m ago", icon: Activity },
  { title: "3 dormant leads eligible for win-back.", body: "Est. revenue: $2,450", ago: "15m ago", icon: Users },
  { title: "Mulch campaign ready to launch.", body: "Targeting 327 homeowners.", ago: "41m ago", icon: Megaphone },
  { title: "Crew #2 schedule optimized.", body: "Saved 1.4 hrs drive time.", ago: "1h ago", icon: Calendar }
];

const smartActions = [
  { title: "Generate Estimate", desc: "Create a new quote in seconds", icon: FileText },
  { title: "Launch Campaign", desc: "Activate a marketing campaign", icon: Megaphone },
  { title: "Call Back Missed Leads", desc: "Recover lost opportunities", icon: Phone },
  { title: "Optimize Crew Routes", desc: "Save time and fuel costs", icon: Users }
];

export default async function AgencyDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <main className="mx-auto max-w-4xl p-6">Please sign in to view your agency dashboard.</main>;
  }

  const data = await agencyDashboardData(user.id);
  const agencyName = data.agency?.name ?? "HedgeBot";

  return (
    <main className="min-h-screen bg-[#050c12] px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold tracking-tight">
          {agencyName} <span className="text-emerald-400">Command Center</span>
        </h1>
        <p className="mt-2 text-lg text-emerald-300">● System Online &nbsp; | &nbsp; AI Standing By</p>

        <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-emerald-900/10 to-slate-900 p-6 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-300">
              <Activity className="h-9 w-9" />
            </div>
            <div>
              <p className="text-3xl font-semibold">Lead intelligence systems online.</p>
              <p className="text-xl text-slate-300">AI dispatch core initialized. All systems go.</p>
            </div>
          </div>
          <button className="rounded-2xl border border-emerald-500/40 bg-black/30 px-6 py-3 text-xl font-medium text-emerald-300">
            View System Health
          </button>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.label} className="rounded-2xl border border-slate-800 bg-[#0a121b] p-5 shadow-lg shadow-black/30">
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-emerald-400" />
                  <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="mt-3 text-xl text-slate-300">{card.label}</p>
                <p className="text-5xl font-semibold">{card.value}</p>
                <p className="mt-2 text-lg text-emerald-400">{card.delta}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-12">
          <article className="rounded-2xl border border-slate-800 bg-[#0a121b] p-5 xl:col-span-4">
            <h2 className="flex items-center gap-2 text-3xl font-semibold">
              <Sparkles className="h-7 w-7 text-emerald-400" /> AI Activity Feed
            </h2>
            <ul className="mt-4 space-y-4">
              {activityFeed.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="rounded-xl border border-slate-800 bg-black/20 p-4">
                    <p className="flex items-center justify-between text-xl font-medium">
                      <span className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-emerald-400" /> {item.title}
                      </span>
                      <span className="text-base text-slate-400">{item.ago}</span>
                    </p>
                    <p className="mt-1 text-lg text-slate-300">{item.body}</p>
                  </li>
                );
              })}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-[#0a121b] p-5 xl:col-span-4">
            <h2 className="text-3xl font-semibold">Lead Heatmap</h2>
            <div className="mt-4 h-[360px] rounded-xl border border-emerald-500/30 bg-[radial-gradient(circle_at_20%_35%,rgba(34,197,94,0.35),transparent_35%),radial-gradient(circle_at_65%_55%,rgba(250,204,21,0.18),transparent_20%),radial-gradient(circle_at_50%_45%,rgba(239,68,68,0.24),transparent_14%),#0a121b]" />
            <p className="mt-3 text-center text-xl text-emerald-400">View Full Map</p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-[#0a121b] p-5 xl:col-span-4">
            <h2 className="flex items-center gap-2 text-3xl font-semibold">
              <Zap className="h-7 w-7 text-emerald-400" /> Smart Actions
            </h2>
            <p className="mt-2 text-lg text-slate-400">Recommended next steps to grow your business.</p>
            <ul className="mt-4 space-y-3">
              {smartActions.map((action) => {
                const Icon = action.icon;
                return (
                  <li key={action.title} className="flex items-center justify-between rounded-xl border border-slate-800 bg-black/20 p-4">
                    <div>
                      <p className="flex items-center gap-2 text-xl font-medium">
                        <Icon className="h-5 w-5 text-emerald-400" /> {action.title}
                      </p>
                      <p className="text-lg text-slate-400">{action.desc}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                  </li>
                );
              })}
            </ul>
          </article>
        </section>

        <nav className="mt-6 grid grid-cols-4 gap-2 rounded-2xl border border-slate-800 bg-[#090f15] p-3 text-center text-sm text-slate-400 md:grid-cols-8">
          {["Dashboard", "Leads", "Schedule", "Crews", "AI", "Customers", "Marketing", "Settings"].map((item) => (
            <span key={item} className={item === "Dashboard" ? "text-emerald-400" : ""}>
              {item === "Settings" ? <Settings className="mx-auto mb-1 h-5 w-5" /> : null}
              {item}
            </span>
          ))}
        </nav>
      </div>
    </main>
  );
}
