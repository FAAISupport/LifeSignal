import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type CartCheckoutItem = {
  priceId: string;
  quantity?: number;
};

type CartCheckoutBody = {
  items: CartCheckoutItem[];
  successUrl?: string;
  cancelUrl?: string;
  customerEmail?: string;
};

let stripeClient: Stripe | null = null;

function getStripeClient() {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  stripeClient = new Stripe(secretKey);
  return stripeClient;
}

function getBaseUrl(req: NextRequest) {
  const host = req.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripeClient();
    const body = (await req.json()) as CartCheckoutBody;

    if (!body?.items?.length) {
      return NextResponse.json({ ok: false, error: "No items provided" }, { status: 400 });
    }

    const baseUrl = getBaseUrl(req);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: body.items.map((item) => ({
        price: item.priceId,
        quantity: item.quantity ?? 1
      })),
      success_url: body.successUrl || `${baseUrl}/faithsignal/features?success=1`,
      cancel_url: body.cancelUrl || `${baseUrl}/faithsignal/features?canceled=1`
    });

    return NextResponse.json({
      ok: true,
      url: session.url
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Stripe error" }, { status: 500 });
  }
}
