import { createSupabaseServerClient } from "@/lib/supabase/server"

type ActionItem = {
  title: string
  type: string
  action: string
}

type DashboardStats = {
  membersAtRisk: number
  missedCheckins: number
  openCareCases: number
  firstTimeGuests: number
  actionItems: ActionItem[]
  trends: {
    attendanceText: string
    engagementText: string
    volunteerText: string
  }
}

export async function getDashboardData(organizationId: string): Promise<DashboardStats> {
  const supabase = await createSupabaseServerClient()

  const [
    riskCountResult,
    missedCheckinsResult,
    careCasesResult,
    guestsResult,
    riskIdsResult,
    missedIdsResult,
  ] = await Promise.all([
    supabase
      .from("member_scores")
      .select("member_id", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .gte("risk_score", 45),

    supabase
      .from("lifesignal_checkins")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .in("status", ["missed", "escalated"]),

    supabase
      .from("care_cases")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .in("status", ["open", "in_progress"]),

    supabase
      .from("members")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .eq("status", "visitor"),

    supabase
      .from("member_scores")
      .select("member_id")
      .eq("organization_id", organizationId)
      .gte("risk_score", 45)
      .limit(3),

    supabase
      .from("lifesignal_checkins")
      .select("member_id")
      .eq("organization_id", organizationId)
      .in("status", ["missed", "escalated"])
      .limit(3),
  ])

  const riskIds = ((riskIdsResult.data ?? []) as Array<{ member_id: string | null }>).map((row) => row.member_id).filter(Boolean)
  const missedIds = ((missedIdsResult.data ?? []) as Array<{ member_id: string | null }>).map((row) => row.member_id).filter(Boolean)

  const [riskMembersResult, missedMembersResult] = await Promise.all([
    riskIds.length
      ? supabase
          .from("members")
          .select("first_name, last_name")
          .eq("organization_id", organizationId)
          .in("id", riskIds)
      : Promise.resolve({ data: [], error: null }),

    missedIds.length
      ? supabase
          .from("members")
          .select("first_name, last_name")
          .eq("organization_id", organizationId)
          .in("id", missedIds)
      : Promise.resolve({ data: [], error: null }),
  ])

  const actionItems: ActionItem[] = []

  for (const member of ((riskMembersResult.data ?? []) as Array<{ first_name: string | null; last_name: string | null }>)) {
    actionItems.push({
      title: `${member.first_name ?? ""} ${member.last_name ?? ""}`.trim() + " is showing disengagement risk",
      type: "risk",
      action: "Follow up",
    })
  }

  for (const member of ((missedMembersResult.data ?? []) as Array<{ first_name: string | null; last_name: string | null }>)) {
    actionItems.push({
      title: `${member.first_name ?? ""} ${member.last_name ?? ""}`.trim() + " missed a LifeSignal check-in",
      type: "urgent",
      action: "Call now",
    })
  }

  const firstTimeGuests = guestsResult.count ?? 0
  if (firstTimeGuests > 0) {
    actionItems.push({
      title: `${firstTimeGuests} first-time guest${firstTimeGuests === 1 ? "" : "s"} need follow-up`,
      type: "guest",
      action: "Welcome",
    })
  }

  if (actionItems.length === 0) {
    actionItems.push({
      title: "No urgent items right now",
      type: "healthy",
      action: "Review dashboard",
    })
  }

  const membersAtRisk = riskCountResult.count ?? 0
  const missedCheckins = missedCheckinsResult.count ?? 0
  const openCareCases = careCasesResult.count ?? 0

  return {
    membersAtRisk,
    missedCheckins,
    openCareCases,
    firstTimeGuests,
    actionItems: actionItems.slice(0, 6),
    trends: {
      attendanceText:
        membersAtRisk > 10
          ? "Attendance risk signals are elevated"
          : "Attendance signals look stable",
      engagementText: `${membersAtRisk} people currently need relational follow-up`,
      volunteerText:
        openCareCases > 5
          ? "Care load is elevated this week"
          : "Care workload looks manageable",
    },
  }
}



