import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/env";

/**
 * Next 16 typing note:
 * In some builds, `cookies()` is typed/treated like a Promise, which breaks
 * attempts to reference `ReturnType<typeof cookies>["set"]` for option types.
 *
 * So we define a simple compatible cookie options type instead.
 */
type CookieOptions = {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

type CookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

export async function supabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options as any);
            });
          } catch {
            // Some server component contexts disallow set(); proxy.ts should refresh cookies anyway.
          }
        },
      },
    }
  );
}
