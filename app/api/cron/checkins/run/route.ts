import { NextRequest, NextResponse } from "next/server";

function isAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET || "";
  const auth = req.headers.get("authorization") || "";
  return secret && auth === Bearer ;
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.APP_URL ||
      "";

    if (!baseUrl) {
      return NextResponse.json({ ok: false, error: "Missing app URL" }, { status: 500 });
    }

    const response = await fetch(${baseUrl.replace(/\/$/, "")}/api/checkins/test, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ,
      },
      body: JSON.stringify({ person: "Judd" }),
      cache: "no-store",
    });

    const result = await response.json();

    return NextResponse.json({
      ok: response.ok,
      triggered: true,
      result,
    }, { status: response.ok ? 200 : 500 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
