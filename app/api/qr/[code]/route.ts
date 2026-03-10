import { NextResponse } from "next/server";
import QRCode from "qrcode";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const cleanCode = (code || "").trim().toUpperCase();

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    new URL(request.url).origin;

  const targetUrl = `${origin}/join/${encodeURIComponent(cleanCode)}`;

  const svg = await QRCode.toString(targetUrl, {
    type: "svg",
    margin: 1,
    width: 512,
    color: {
      dark: "#0F172A",
      light: "#FFFFFF",
    },
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}