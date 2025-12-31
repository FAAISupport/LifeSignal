import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Next.js 16+ runs this "proxy" for every request (replaces middleware convention).
 */
export default function proxy(req: NextRequest) {
  return NextResponse.next();
}
