import { redirect } from "next/navigation"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActionQueue } from "@/components/dashboard/action-queue"
import { TrendCard } from "@/components/dashboard/trend-card"
import { getDashboardData } from "@/lib/dashboard/get-dashboard-data"
import { getAuthContext } from "@/lib/auth/get-auth-context"

export default async function DashboardPage() {
  const auth = await getAuthContext()

  if (!auth?.user) {
    redirect("/login")
  }

  if (!auth.organizationId) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-zinc-900">No church workspace found</h1>
        <p className="mt-3 text-zinc-600">
          Your account is authenticated, but it is not attached to an organization yet.
        </p>
      </div>
    )
  }

  const data = await getDashboardData(auth.organizationId)

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">FaithSignal Dashboard</h1>
        <p className="text-zinc-600">
          Signed in as {auth.user.email ?? "unknown user"}
        </p>
        <p className="text-sm text-zinc-500">
          Role: {auth.role ?? "member"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Members at risk"
          value={String(data.membersAtRisk)}
          description="People showing disengagement signals"
        />
        <StatCard
          label="Missed check-ins"
          value={String(data.missedCheckins)}
          description="LifeSignal alerts requiring follow-up"
        />
        <StatCard
          label="Open care cases"
          value={String(data.openCareCases)}
          description="Pastoral care in progress"
        />
        <StatCard
          label="First-time guests"
          value={String(data.firstTimeGuests)}
          description="Need immediate follow-up"
        />
      </div>

      <ActionQueue items={data.actionItems} />

      <div className="grid gap-6 md:grid-cols-3">
        <TrendCard title="Attendance Trend" text={data.trends.attendanceText} />
        <TrendCard title="Engagement Signal" text={data.trends.engagementText} />
        <TrendCard title="Care Load" text={data.trends.volunteerText} />
      </div>
    </div>
  )
}
