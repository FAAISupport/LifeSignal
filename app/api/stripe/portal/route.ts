import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { requireUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const user = await requireUser();
  const { data: row } = await supabaseAdmin.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle();
  if (!row?.stripe_customer_id) return NextResponse.redirect(`${env.APP_BASE_URL}/dashboard`);

  const session = await stripe.billingPortal.sessions.create({
    customer: row.stripe_customer_id,
    return_url: `${env.APP_BASE_URL}/dashboard`
  });

  return NextResponse.redirect(session.url);
}
