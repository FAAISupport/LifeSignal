import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const ACCESS_COOKIE = "fs-access-token";
export const REFRESH_COOKIE = "fs-refresh-token";

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return { url, anonKey };
}

export function createSupabaseBrowserlessClient(accessToken?: string) {
  const { url, anonKey } = getSupabaseConfig();

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined,
  });
}

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const store = await cookies();

  store.set(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  store.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearAuthCookies() {
  const store = await cookies();

  store.set(ACCESS_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  store.set(REFRESH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

export async function getSessionTokens() {
  const store = await cookies();

  return {
    accessToken: store.get(ACCESS_COOKIE)?.value ?? null,
    refreshToken: store.get(REFRESH_COOKIE)?.value ?? null,
  };
}

export async function getAuthenticatedUser() {
  const { accessToken, refreshToken } = await getSessionTokens();
  const client = createSupabaseBrowserlessClient(accessToken ?? undefined);

  if (accessToken) {
    const { data, error } = await client.auth.getUser(accessToken);
    if (!error && data.user) {
      return { user: data.user, accessToken, refreshToken };
    }
  }

  if (refreshToken) {
    const { data, error } = await client.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (!error && data.session?.access_token && data.session?.refresh_token && data.user) {
      await setAuthCookies(data.session.access_token, data.session.refresh_token);
      return {
        user: data.user,
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
      };
    }
  }

  return { user: null, accessToken: null, refreshToken: null };
}


