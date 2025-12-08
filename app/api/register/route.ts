import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      seniorName,
      seniorPhone,
      timezone,
      checkinHour,
      checkinMinute,
      caregiverName,
      caregiverPhone,
      caregiverEmail,
    } = body;

    if (!caregiverEmail) {
      return NextResponse.json(
        { error: "Caregiver email is required for billing" },
        { status: 400 }
      );
    }

    const { data: existingCg, error: cgLookupErr } = await supabaseAdmin
      .from("caregivers")
      .select("*")
      .eq("email", caregiverEmail)
      .maybeSingle();

    if (cgLookupErr) {
      console.error(cgLookupErr);
      return NextResponse.json(
        { error: "Error looking up caregiver" },
        { status: 500 }
      );
    }

    if (existingCg && !existingCg.is_active) {
      return NextResponse.json(
        {
          needsPayment: true,
          email: caregiverEmail,
        },
        { status: 402 }
      );
    }

    let caregiver = existingCg;

    if (!caregiver) {
      const { data: newCg, error: cgErr } = await supabaseAdmin
        .from("caregivers")
        .insert({
          full_name: caregiverName,
          phone: caregiverPhone,
          email: caregiverEmail,
          is_active: false,
        })
        .select()
        .single();

      if (cgErr) {
        console.error(cgErr);
        return NextResponse.json(
          { error: "Could not create caregiver" },
          { status: 500 }
        );
      }

      caregiver = newCg;

      return NextResponse.json(
        {
          needsPayment: true,
          email: caregiverEmail,
        },
        { status: 402 }
      );
    }

    if (!seniorName || !seniorPhone || timezone == null || checkinHour == null || checkinMinute == null) {
      return NextResponse.json(
        { error: "Missing required senior fields" },
        { status: 400 }
      );
    }

    const { data: senior, error: sErr } = await supabaseAdmin
      .from("seniors")
      .insert({
        full_name: seniorName,
        phone: seniorPhone,
        timezone,
        checkin_hour: checkinHour,
        checkin_minute: checkinMinute,
      })
      .select()
      .single();

    if (sErr) {
      console.error(sErr);
      return NextResponse.json(
        { error: "Could not create senior" },
        { status: 500 }
      );
    }

    await supabaseAdmin.from("senior_caregiver_links").insert({
      senior_id: senior.id,
      caregiver_id: caregiver.id,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
