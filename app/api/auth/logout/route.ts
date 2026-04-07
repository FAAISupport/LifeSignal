import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth/session";

export async function POST() {
  try {
    await clearAuthCookies();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

