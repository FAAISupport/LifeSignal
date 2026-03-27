import { NextResponse } from "next/server";
import { CoreCareOrchestrator } from "@/lib/core-care/core-care-orchestrator";
import { CoreCareSupabaseRepo } from "@/lib/core-care/core-care-supabase-repo";
import { CoreCareTwilioMessenger } from "@/lib/core-care/core-care-twilio-messenger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const expected = process.env.CRON_BEARER_TOKEN;
  if (!expected) {
    throw new Error("Missing CRON_BEARER_TOKEN.");
  }

  const auth = request.headers.get("authorization") ?? "";
  return auth === `Bearer ${expected}`;
}

async function handle(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const repo = new CoreCareSupabaseRepo();
    const messenger = new CoreCareTwilioMessenger(repo);
    const orchestrator = new CoreCareOrchestrator({ repo, messenger });

    const summary = await orchestrator.run(new Date().toISOString());

    return NextResponse.json(
      {
        ok: true,
        summary,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown cron error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}

