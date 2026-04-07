import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type OnboardingPayload = {
  churchName?: string;
  adminName?: string;
  adminEmail?: string;
  phone?: string;
  city?: string;
  state?: string;
  attendanceBand?: string;
  carePriorities?: string[];
  selectedFeatureKeys?: string[];
  memberCount?: number;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OnboardingPayload;

    const churchName = normalizeString(body.churchName);
    const adminName = normalizeString(body.adminName);
    const adminEmail = normalizeString(body.adminEmail);
    const phone = normalizeString(body.phone);
    const city = normalizeString(body.city);
    const state = normalizeString(body.state);
    const attendanceBand = normalizeString(body.attendanceBand);
    const carePriorities = normalizeStringArray(body.carePriorities);
    const selectedFeatureKeys = normalizeStringArray(body.selectedFeatureKeys);
    const memberCount =
      typeof body.memberCount === "number" && Number.isFinite(body.memberCount)
        ? Math.max(0, Math.floor(body.memberCount))
        : 0;

    if (!churchName) {
      return NextResponse.json(
        { error: "Church name is required." },
        { status: 400 }
      );
    }

    if (!adminEmail) {
      return NextResponse.json(
        { error: "Admin email is required." },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          error:
            "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: organization, error: organizationError } = await supabase
      .from("organizations")
      .insert({
        name: churchName,
        email: adminEmail,
      })
      .select("id, name, email")
      .single();

    if (organizationError || !organization) {
      return NextResponse.json(
        {
          error:
            organizationError?.message || "Failed to create organization record.",
        },
        { status: 500 }
      );
    }

    const onboardingRecord = {
      organization_id: organization.id,
      church_name: churchName,
      admin_name: adminName || null,
      admin_email: adminEmail,
      phone: phone || null,
      city: city || null,
      state: state || null,
      attendance_band: attendanceBand || null,
      care_priorities: carePriorities,
      selected_feature_keys: selectedFeatureKeys,
      member_count: memberCount,
      updated_at: new Date().toISOString(),
    };

    const { error: onboardingError } = await supabase
      .from("faithsignal_onboarding")
      .upsert(onboardingRecord, { onConflict: "organization_id" });

    if (onboardingError) {
      return NextResponse.json(
        {
          error:
            onboardingError.message ||
            "Failed to save onboarding details.",
        },
        { status: 500 }
      );
    }

    if (selectedFeatureKeys.length > 0) {
      const entitlementRows = selectedFeatureKeys.map((featureKey) => ({
        organization_id: organization.id,
        feature_key: featureKey,
        source: "onboarding",
      }));

      const { error: entitlementError } = await supabase
        .from("feature_entitlements")
        .upsert(entitlementRows, {
          onConflict: "organization_id,feature_key",
        });

      if (entitlementError) {
        return NextResponse.json(
          {
            error:
              entitlementError.message ||
              "Failed to save feature entitlements.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      organizationId: organization.id,
      redirectTo: "/faithsignal/dashboard",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown onboarding error.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}


