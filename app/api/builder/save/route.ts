import { NextResponse } from "next/server";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { normalizeReferralCode, persistReferralAttribution } from "@/lib/referrals";

const saveSchema = z.object({
  needsAssessment: z
    .object({
      attendeeCount: z.number().int().min(0),
      hasCareTeam: z.boolean(),
      needsIncidentTracking: z.boolean(),
      needsAutomations: z.boolean(),
    })
    .strict(),
  selectedModules: z.array(z.string()).default([]),
  pricing: z
    .object({
      monthly: z.number().min(0),
      annual: z.number().min(0),
      tier: z.enum(["starter", "growth", "pro", "enterprise"]),
    })
    .strict(),
  tier: z.enum(["starter", "growth", "pro", "enterprise"]),
  referralCode: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const payload = saveSchema.parse(await request.json());
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { data: membership, error: membershipError } = await supabase
      .from("organization_members")
      .select("org_id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .limit(1)
      .maybeSingle<{ org_id: string }>();

    if (membershipError || !membership) {
      return NextResponse.json({ ok: false, error: "No active organization membership found" }, { status: 403 });
    }

    const normalizedReferralCode = normalizeReferralCode(payload.referralCode);

    const { data: session, error: sessionError } = await supabase
      .from("builder_sessions")
      .insert({
        org_id: membership.org_id,
        created_by_user_id: user.id,
        status: "submitted",
        needs_assessment: payload.needsAssessment,
        selected_modules: payload.selectedModules,
        pricing_snapshot: payload.pricing,
        assigned_tier: payload.tier,
        referral_code: normalizedReferralCode,
      })
      .select("id")
      .single<{ id: string }>();

    if (sessionError || !session) {
      return NextResponse.json(
        { ok: false, error: sessionError?.message ?? "Failed to save builder session" },
        { status: 500 },
      );
    }

    if (normalizedReferralCode) {
      await persistReferralAttribution({
        orgId: membership.org_id,
        builderSessionId: session.id,
        referralCode: normalizedReferralCode,
        referrerUserId: user.id,
      });
    }

    return NextResponse.json({ ok: true, sessionId: session.id, referralCode: normalizedReferralCode }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid request payload",
          issues: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: false, error: "Unexpected server error" }, { status: 500 });
  }
}
