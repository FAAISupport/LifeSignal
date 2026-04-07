import { NextRequest } from "next/server";

export function requireBearerToken(req: NextRequest) {
  const expected = process.env.CRON_SECRET || process.env.INTERNAL_API_TOKEN || "";
  if (!expected) {
    return { ok: true as const };
  }

  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token || token !== expected) {
    return {
      ok: false as const,
      error: "Unauthorized.",
      status: 401,
    };
  }

  return { ok: true as const };
}
