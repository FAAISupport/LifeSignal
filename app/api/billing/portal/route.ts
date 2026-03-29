import { NextResponse } from "next/server";

import { getStripeClient } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

export async function POST() {
  try {
    const supabase = await createClient();
    const stripe = getStripeClient();

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

    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("org_id", membership.org_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<{ stripe_customer_id: string }>();

    if (subError || !subscription?.stripe_customer_id) {
      return NextResponse.json({ ok: false, error: "No Stripe customer found for organization" }, { status: 404 });
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${env.NEXT_PUBLIC_APP_URL}/billing`,
    });

    return NextResponse.json({ ok: true, url: portal.url }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
