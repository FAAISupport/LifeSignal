import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const FALLBACK_STATS = {
  confirmations: 12842,
  confirmationsToday: 187,
  escalationsTriggered: 23,
  guardianResponses: 61,
  source: "fallback",
};

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        ok: true,
        stats: FALLBACK_STATS,
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { count: confirmationsCount, error: confirmationsError } = await supabase
      .from("checkins")
      .select("id", { count: "exact", head: true })
      .eq("status", "responded");

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { count: confirmationsTodayCount, error: confirmationsTodayError } = await supabase
      .from("checkins")
      .select("id", { count: "exact", head: true })
      .eq("status", "responded")
      .gte("responded_at", todayStart.toISOString());

    const { count: escalationsCount, error: escalationsError } = await supabase
      .from("escalation_events")
      .select("id", { count: "exact", head: true });

    const { count: guardianResponsesCount, error: guardianResponsesError } = await supabase
      .from("escalation_events")
      .select("id", { count: "exact", head: true })
      .eq("status", "acknowledged");

    if (confirmationsError || confirmationsTodayError || escalationsError || guardianResponsesError) {
      return NextResponse.json({
        ok: true,
        stats: FALLBACK_STATS,
      });
    }

    return NextResponse.json({
      ok: true,
      stats: {
        confirmations: confirmationsCount ?? FALLBACK_STATS.confirmations,
        confirmationsToday: confirmationsTodayCount ?? FALLBACK_STATS.confirmationsToday,
        escalationsTriggered: escalationsCount ?? FALLBACK_STATS.escalationsTriggered,
        guardianResponses: guardianResponsesCount ?? FALLBACK_STATS.guardianResponses,
        source: "live",
      },
    });
  } catch {
    return NextResponse.json({
      ok: true,
      stats: FALLBACK_STATS,
    });
  }
}

