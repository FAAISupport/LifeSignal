import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      env: {
        supabaseUrl: !!env.NEXT_PUBLIC_SUPABASE_URL,
        serviceRoleKey: !!env.SUPABASE_SERVICE_ROLE_KEY,

        // ✅ Correct key name (matches your env typing)
        cronToken: !!env.CRON_SECRET_TOKEN,

        twilioSid: !!env.TWILIO_ACCOUNT_SID,
        twilioAuth: !!env.TWILIO_AUTH_TOKEN,
        twilioFrom: !!env.TWILIO_FROM_NUMBER,

        appBaseUrl: !!env.APP_BASE_URL,
      },
    },
    { status: 200 }
  );
}
