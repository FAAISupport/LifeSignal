import { redirect } from "next/navigation";
import { PaddleCheckoutClient } from "./PaddleCheckoutClient";
import type { PlanTier, PlanCadence } from "@/lib/paddle";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { tier?: string; cadence?: string };
}) {
  const sb = await supabaseServer();

  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) redirect("/login");

  const tier = (searchParams.tier ?? "checkin") as PlanTier;
  const cadence = (searchParams.cadence ?? "monthly") as PlanCadence;

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Card>
        <h1 className="text-xl font-semibold text-brand-navy">
          Complete your subscription
        </h1>

        <div className="mt-6">
          <PaddleCheckoutClient
            tier={tier}
            cadence={cadence}
            customerEmail={user.email ?? ""}
          />
        </div>
      </Card>
    </div>
  );
}
