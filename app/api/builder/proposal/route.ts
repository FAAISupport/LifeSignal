import { NextResponse } from "next/server";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const requestSchema = z.object({
  sessionId: z.string().uuid(),
});

const modulePrices: Record<string, number> = {
  lifesignal_core: 79,
  incident_center: 59,
  escalation_workflows: 69,
  analytics_pack: 49,
  team_collaboration: 39,
};

function buildPricing(selectedModules: string[]) {
  const monthly = selectedModules.reduce((sum, moduleKey) => sum + (modulePrices[moduleKey] ?? 0), 0);

  let tier = "starter";
  if (monthly >= 800) tier = "enterprise";
  else if (monthly >= 500) tier = "pro";
  else if (monthly >= 250) tier = "growth";

  return {
    monthly,
    annual: monthly * 12,
    tier,
  };
}

async function resolveAuthorizedSession(sessionId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 }) };
  }

  const { data: membership, error: membershipError } = await supabase
    .from("organization_members")
    .select("org_id")
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1)
    .maybeSingle<{ org_id: string }>();

  if (membershipError || !membership) {
    return { error: NextResponse.json({ ok: false, error: "No active organization membership found" }, { status: 403 }) };
  }

  const { data: session, error: sessionError } = await supabase
    .from("builder_sessions")
    .select("id, org_id, selected_modules")
    .eq("id", sessionId)
    .eq("org_id", membership.org_id)
    .maybeSingle<{ id: string; org_id: string; selected_modules: string[] | null }>();

  if (sessionError || !session) {
    return { error: NextResponse.json({ ok: false, error: "Builder session not found" }, { status: 404 }) };
  }

  return { supabase, session };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  const parsed = requestSchema.safeParse({ sessionId });
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid or missing sessionId" }, { status: 400 });
  }

  const resolved = await resolveAuthorizedSession(parsed.data.sessionId);
  if ("error" in resolved) {
    return resolved.error;
  }

  const selectedModules = resolved.session.selected_modules ?? [];
  const pricing = buildPricing(selectedModules);

  return NextResponse.json(
    {
      ok: true,
      proposal: {
        sessionId: resolved.session.id,
        tier: pricing.tier,
        monthly: pricing.monthly,
        annual: pricing.annual,
        selectedModules,
        summary:
          selectedModules.length === 0
            ? "No modules selected yet. Start with LifeSignal Core to unlock monitoring workflows."
            : `Your ${pricing.tier} plan includes ${selectedModules.length} module(s) for church care operations.`,
      },
    },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  try {
    const parsed = requestSchema.parse(await request.json());
    const resolved = await resolveAuthorizedSession(parsed.sessionId);
    if ("error" in resolved) {
      return resolved.error;
    }

    const selectedModules = resolved.session.selected_modules ?? [];
    const pricing = buildPricing(selectedModules);

    const { error: updateError } = await resolved.supabase
      .from("builder_sessions")
      .update({
        status: "quoted",
        assigned_tier: pricing.tier,
        pricing_snapshot: pricing,
      })
      .eq("id", resolved.session.id)
      .eq("org_id", resolved.session.org_id);

    if (updateError) {
      return NextResponse.json({ ok: false, error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        ok: true,
        proposal: {
          sessionId: resolved.session.id,
          tier: pricing.tier,
          monthly: pricing.monthly,
          annual: pricing.annual,
          selectedModules,
          summary:
            selectedModules.length === 0
              ? "No modules selected yet. Start with LifeSignal Core to unlock monitoring workflows."
              : `Your ${pricing.tier} plan includes ${selectedModules.length} module(s) for church care operations.`,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Invalid request payload", issues: error.issues }, { status: 400 });
    }

    return NextResponse.json({ ok: false, error: "Unexpected server error" }, { status: 500 });
  }
}
