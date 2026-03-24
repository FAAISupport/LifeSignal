import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { maskName } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

type LeaderboardRow = {
  name: string;
  referral_code: string;
  referrals_count: number;
  created_at: string;
};

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("waitlist_entries")
      .select("name, referral_code, referrals_count, created_at")
      .order("referrals_count", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(10);

    if (error) {
      throw error;
    }

    const leaderboard = ((data ?? []) as LeaderboardRow[]).map((entry, index) => ({
      rank: index + 1,
      name: maskName(entry.name),
      referralCode: entry.referral_code,
      referralsCount: entry.referrals_count ?? 0,
    }));

    return NextResponse.json({
      leaderboard,
    });
  } catch (error) {
    console.error("waitlist leaderboard error", error);
    return NextResponse.json({ leaderboard: [] }, { status: 500 });
  }
}
