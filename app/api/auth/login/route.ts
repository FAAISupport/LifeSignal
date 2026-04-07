import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ACCESS_COOKIE = "fs-access-token";
const REFRESH_COOKIE = "fs-refresh-token";

export async function POST(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing Supabase environment variables.",
          debug: {
            hasUrl: Boolean(url),
            hasAnonKey: Boolean(anonKey),
          },
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      console.error("SUPABASE LOGIN ERROR:", {
        message: error?.message,
        status: error?.status,
        name: error?.name,
        code: (error as { code?: string } | null)?.code,
      });

      return NextResponse.json(
        {
          success: false,
          error: error?.message ?? "Login failed.",
          debug: {
            supabaseUrlHost: (() => {
              try {
                return new URL(url).host;
              } catch {
                return "invalid-url";
              }
            })(),
            hasAnonKey: Boolean(anonKey),
            emailAttempted: email,
            errorName: error?.name ?? null,
            errorStatus: error?.status ?? null,
            errorCode: (error as { code?: string } | null)?.code ?? null,
          },
        },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });

    response.cookies.set(ACCESS_COOKIE, data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    response.cookies.set(REFRESH_COOKIE, data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}


