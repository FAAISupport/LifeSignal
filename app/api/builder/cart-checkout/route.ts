import { NextResponse } from "next/server";
import { z } from "zod";

import { BUILDER_MODULES } from "@/components/builder/ModuleSelector";
import { env } from "@/lib/env";
import { getStripeClient } from "@/lib/stripe";

const checkoutSchema = z.object({
  modules: z.array(z.string().min(1)).min(1),
  attendeeCount: z.number().int().min(0).max(100000).default(0),
  referralCode: z.string().trim().min(1).max(64).optional(),
});

export async function POST(request: Request) {
  try {
    const { modules, attendeeCount, referralCode } = checkoutSchema.parse(await request.json());
    const stripe = getStripeClient();
    const catalog = new Map(BUILDER_MODULES.map((module) => [module.key, module]));

    const normalizedKeys = [...new Set(modules)];
    const selectedModules = normalizedKeys
      .map((key) => catalog.get(key))
      .filter((item): item is (typeof BUILDER_MODULES)[number] => Boolean(item));

    if (selectedModules.length === 0) {
      return NextResponse.json({ ok: false, error: "No valid modules were selected" }, { status: 400 });
    }

    const usageComponent = attendeeCount <= 0 ? 0 : Math.ceil(attendeeCount / 25) * 15;
    const lineItems = selectedModules.map((module) => ({
      price_data: {
        currency: "usd",
        recurring: { interval: "month" as const },
        product_data: {
          name: module.label,
          description: module.description,
          metadata: {
            module_key: module.key,
            source: "builder_alacarte",
          },
        },
        unit_amount: module.monthlyPrice * 100,
      },
      quantity: 1,
    }));

    if (usageComponent > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          recurring: { interval: "month" as const },
          product_data: {
            name: "Member coverage usage",
            description: `Coverage allocation for approximately ${attendeeCount} monitored members.`,
            metadata: {
              module_key: "member_coverage",
              source: "builder_alacarte",
            },
          },
          unit_amount: usageComponent * 100,
        },
        quantity: 1,
      });
    }

    const monthlyTotal = selectedModules.reduce((sum, module) => sum + module.monthlyPrice, 0) + usageComponent;
    const successUrl = `${env.NEXT_PUBLIC_APP_URL}/builder/results?checkout=success`;
    const cancelUrl = `${env.NEXT_PUBLIC_APP_URL}/builder?checkout=cancelled`;

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        source: "builder_alacarte",
        modules: selectedModules.map((module) => module.key).join(","),
        module_labels: selectedModules.map((module) => module.label).join(", "),
        estimated_monthly_total: String(monthlyTotal),
        referral_code: referralCode ?? "",
      },
      subscription_data: {
        metadata: {
          source: "builder_alacarte",
          modules: selectedModules.map((module) => module.key).join(","),
          referral_code: referralCode ?? "",
        },
      },
    });

    if (!checkout.url) {
      return NextResponse.json({ ok: false, error: "Failed to create checkout session" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, url: checkout.url, checkoutSessionId: checkout.id }, { status: 200 });
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

    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}






