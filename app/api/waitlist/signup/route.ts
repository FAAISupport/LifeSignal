import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json(
        {
          ok: false,
          error: "Server misconfiguration: missing Supabase environment variables",
        },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const body = await request.json()
    console.log("WAITLIST BODY:", body)

    const firstName =
      typeof body.firstName === "string" ? body.firstName.trim() : ""
    const lastName =
      typeof body.lastName === "string" ? body.lastName.trim() : ""
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const phone =
      typeof body.phone === "string" ? body.phone.trim() : ""
    const interest =
      typeof body.interest === "string" ? body.interest.trim() : ""
    const notes =
      typeof body.message === "string"
        ? body.message.trim()
        : typeof body.notes === "string"
        ? body.notes.trim()
        : ""
    const referralCode =
      typeof body.referralCode === "string" ? body.referralCode.trim() : ""

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required" },
        { status: 400 }
      )
    }

    const { error } = await supabase.from("waitlist_signups").insert([
      {
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
        interest,
        notes,
        referral_code: referralCode || null,
      },
    ])

    if (error) {
      console.error("SUPABASE ERROR:", error)
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("WAITLIST ERROR:", error)
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    )
  }
}
