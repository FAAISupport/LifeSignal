import { NextRequest, NextResponse } from "next/server"
import {
  sendReferralEmail,
  sendStoryEmail,
  sendEarlyAccessEmail,
  sendBetaInviteEmail,
} from "@/lib/email"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

type WaitlistEntry = {
  id: string
  email: string
  referral_code: string
  created_at: string
  referral_sent_at: string | null
  story_sent_at: string | null
  early_access_sent_at: string | null
  beta_invited_at: string | null
  beta_invite_link: string | null
}

function minutesSince(dateString: string) {
  return (Date.now() - new Date(dateString).getTime()) / 1000 / 60
}

function hoursSince(dateString: string) {
  return (Date.now() - new Date(dateString).getTime()) / 1000 / 60 / 60
}

function daysSince(dateString: string) {
  return (Date.now() - new Date(dateString).getTime()) / 1000 / 60 / 60 / 24
}

export async function GET(req: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET
    const authHeader = req.headers.get("authorization")

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabaseAdmin
      .from("waitlist_entries")
      .select(`
        id,
        email,
        referral_code,
        created_at,
        referral_sent_at,
        story_sent_at,
        early_access_sent_at,
        beta_invited_at,
        beta_invite_link
      `)
      .order("created_at", { ascending: true })
      .limit(500)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const rows = (data ?? []) as WaitlistEntry[]

    let referralSent = 0
    let storySent = 0
    let earlyAccessSent = 0
    let betaSent = 0

    for (const row of rows) {
      try {
        const ageMinutes = minutesSince(row.created_at)
        const ageDays = daysSince(row.created_at)

        if (!row.referral_sent_at && ageMinutes >= 10) {
          await sendReferralEmail(row.email, row.referral_code)
          await supabaseAdmin
            .from("waitlist_entries")
            .update({ referral_sent_at: new Date().toISOString() })
            .eq("id", row.id)
          referralSent++
          continue
        }

        if (!row.story_sent_at && hoursSince(row.created_at) >= 24) {
          await sendStoryEmail(row.email)
          await supabaseAdmin
            .from("waitlist_entries")
            .update({ story_sent_at: new Date().toISOString() })
            .eq("id", row.id)
          storySent++
          continue
        }

        if (!row.early_access_sent_at && ageDays >= 3) {
          await sendEarlyAccessEmail(row.email, row.referral_code)
          await supabaseAdmin
            .from("waitlist_entries")
            .update({ early_access_sent_at: new Date().toISOString() })
            .eq("id", row.id)
          earlyAccessSent++
          continue
        }

        if (!row.beta_invited_at && row.beta_invite_link) {
          await sendBetaInviteEmail(row.email, row.beta_invite_link)
          await supabaseAdmin
            .from("waitlist_entries")
            .update({ beta_invited_at: new Date().toISOString() })
            .eq("id", row.id)
          betaSent++
        }
      } catch (rowError) {
        console.error(`Email sequence failed for ${row.email}:`, rowError)
      }
    }

    return NextResponse.json({
      ok: true,
      processed: rows.length,
      referralSent,
      storySent,
      earlyAccessSent,
      betaSent,
    })
  } catch (error) {
    console.error("Waitlist sequence cron error:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unexpected cron error",
      },
      { status: 500 }
    )
  }
}
