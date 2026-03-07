import { NextRequest, NextResponse } from "next/server"
import { sendWelcomeEmail } from "@/lib/email"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

function generateReferralCode(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

async function createUniqueReferralCode() {
  for (let i = 0; i < 10; i++) {
    const code = generateReferralCode()
    const { data, error } = await supabaseAdmin
      .from("waitlist_entries")
      .select("id")
      .eq("referral_code", code)
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    if (!data) {
      return code
    }
  }

  throw new Error("Unable to generate a unique referral code.")
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const rawEmail = typeof body?.email === "string" ? body.email : ""
    const rawReferralCode = typeof body?.referralCode === "string" ? body.referralCode : ""

    const email = normalizeEmail(rawEmail)
    const incomingReferralCode = rawReferralCode.trim().toUpperCase()

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    const { data: existingEntry, error: existingEntryError } = await supabaseAdmin
      .from("waitlist_entries")
      .select("id,email,referral_code,priority_score,referral_count,created_at")
      .eq("email", email)
      .maybeSingle()

    if (existingEntryError) {
      return NextResponse.json({ error: existingEntryError.message }, { status: 500 })
    }

    if (existingEntry) {
      const referralLink = `${(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "")}/beta?ref=${existingEntry.referral_code}`

      return NextResponse.json(
        {
          ok: true,
          alreadyJoined: true,
          message: "This email is already on the waitlist.",
          entry: {
            email: existingEntry.email,
            referralCode: existingEntry.referral_code,
            referralLink,
            priorityScore: existingEntry.priority_score ?? 0,
            referralCount: existingEntry.referral_count ?? 0,
            createdAt: existingEntry.created_at,
          },
        },
        { status: 200 }
      )
    }

    let referredBy: string | null = null

    if (incomingReferralCode) {
      const { data: referrer, error: referrerError } = await supabaseAdmin
        .from("waitlist_entries")
        .select("id,referral_code")
        .eq("referral_code", incomingReferralCode)
        .maybeSingle()

      if (referrerError) {
        return NextResponse.json({ error: referrerError.message }, { status: 500 })
      }

      if (referrer) {
        referredBy = referrer.referral_code
      }
    }

    const referralCode = await createUniqueReferralCode()
    const startingPriority = referredBy ? 3 : 0

    const { data: insertedEntry, error: insertError } = await supabaseAdmin
      .from("waitlist_entries")
      .insert({
        email,
        referral_code: referralCode,
        referred_by: referredBy,
        priority_score: startingPriority,
        referral_count: 0,
      })
      .select("id,email,referral_code,referred_by,priority_score,referral_count,created_at,welcome_sent_at")
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 })
    }

    if (referredBy) {
      const { data: referrerRow, error: referrerLookupError } = await supabaseAdmin
        .from("waitlist_entries")
        .select("id,referral_count,priority_score")
        .eq("referral_code", referredBy)
        .maybeSingle()

      if (referrerLookupError) {
        return NextResponse.json({ error: referrerLookupError.message }, { status: 500 })
      }

      if (referrerRow) {
        const { error: referrerUpdateError } = await supabaseAdmin
          .from("waitlist_entries")
          .update({
            referral_count: (referrerRow.referral_count ?? 0) + 1,
            priority_score: (referrerRow.priority_score ?? 0) + 3,
          })
          .eq("id", referrerRow.id)

        if (referrerUpdateError) {
          return NextResponse.json({ error: referrerUpdateError.message }, { status: 500 })
        }
      }
    }

    try {
      await sendWelcomeEmail(email, insertedEntry.referral_code)

      await supabaseAdmin
        .from("waitlist_entries")
        .update({
          welcome_sent_at: new Date().toISOString(),
        })
        .eq("id", insertedEntry.id)
    } catch (emailError) {
      console.error("Welcome email send failed:", emailError)
    }

    const referralLink = `${(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "")}/beta?ref=${insertedEntry.referral_code}`

    return NextResponse.json(
      {
        ok: true,
        message: "Successfully joined the waitlist.",
        entry: {
          email: insertedEntry.email,
          referralCode: insertedEntry.referral_code,
          referralLink,
          referredBy: insertedEntry.referred_by,
          priorityScore: insertedEntry.priority_score ?? 0,
          referralCount: insertedEntry.referral_count ?? 0,
          createdAt: insertedEntry.created_at,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Waitlist signup error:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unexpected error occurred.",
      },
      { status: 500 }
    )
  }
}
