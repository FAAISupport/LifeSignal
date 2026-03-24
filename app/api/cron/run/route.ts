import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const testUser = {
    name: "Test User",
    phone: "+13524809565"
  };

  try {
    const result = await client.messages.create({
      body: `Hi ${testUser.name}, this is your LifeSignal check-in. Reply YES to confirm you're okay.`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: testUser.phone
    });

    return NextResponse.json({
      success: true,
      sid: result.sid
    });
  } catch (error) {
    console.error("Cron send error:", error);
    return NextResponse.json(
      { error: "Failed to send check-in" },
      { status: 500 }
    );
  }
}
