import { NextRequest, NextResponse } from "next/server";
import { paddleApiFetch } from "@/lib/paddle/api";

type PortalRequest = {
  customerId?: string;
};

type PortalResponse = {
  data?: {
    url?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as PortalRequest;
    const customerId = body.customerId?.trim();

    if (!customerId) {
      return NextResponse.json(
        { ok: false, error: "Missing customerId." },
        { status: 400 }
      );
    }

    const response = await paddleApiFetch<PortalResponse>(
      `/customers/${customerId}/portal-sessions`,
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );

    const url = response?.data?.url;

    if (!url) {
      return NextResponse.json(
        { ok: false, error: "Paddle portal URL was not returned." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to create Paddle portal session.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
