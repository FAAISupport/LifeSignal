import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ ALWAYS allow these routes (CRITICAL FIX)
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // 🔐 Example protected routes
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/app");

  if (isProtected) {
    const isLoggedIn = false; // TODO: replace with real session check

    if (!isLoggedIn) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("error", "You must be logged in");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
