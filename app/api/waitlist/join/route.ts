import { NextRequest, NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"

function makeReferralCode(name: string, email: string) {
  const baseName = (name || "guest")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10)

  const baseEmail = (email || "")
    .toLowerCase()
    .split("@")[0]
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 6)

  const seed = baseName || baseEmail || "guest"
  const suffix = Math.random().toString(36).slice(2, 8)

  return `${seed}-${suffix}`
}

async function parseBody(req: NextRequest) {
  const contentType = req.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return await req.json()
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await req.formData()
    return Object.fromEntries(formData.entries())
  }

  const text = await req.text()

  if (!text) return {}

  try {
    return JSON.parse(text)
  } catch {
    const params = new URLSearchParams(text)
    return Object.fromEntries(params.entries())
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Use POST to join the waitlist." },
    { status: 405 }
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req)

    const name = String(body.name ?? "").trim()
    const email = String(body.email ?? "").trim().toLowerCase()
    const phone = String(body.phone ?? "").trim()
    const consentSource = String(body.consentSource ?? "website").trim()

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      )
    }

    const supabase = createSupabaseAdminClient()

    const { data: existing, error: existingError } = await supabase
      .from("waitlist_entries")
      .select("id, email, referral_code")
      .eq("email", email)
      .maybeSingle()

    if (existingError) {
      return NextResponse.json(
        { ok: false, error: existingError.message },
        { status: 500 }
      )
    }

    if (existing) {
      return NextResponse.json({
        ok: true,
        duplicate: true,
        message: "This email is already on the waitlist.",
        data: existing,
      })
    }

    const referralCode = makeReferralCode(name, email)

    const { data, error } = await supabase
      .from("waitlist_entries")
      .insert({
        name,
        email,
        phone: phone || null,
        consent_source: consentSource,
        referral_code: referralCode,
      })
      .select("id, email, referral_code")
      .single()

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      message: "Waitlist join received.",
      data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

