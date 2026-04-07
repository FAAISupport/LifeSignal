import Link from "next/link";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { acceptInvite } from "@/services/team/invites.service";

async function acceptInviteAction(formData: FormData) {
  "use server";

  const token = String(formData.get("token") ?? "").trim();
  if (!token) {
    redirect("/auth/accept-invite?error=Invite%20token%20is%20required");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?message=${encodeURIComponent(`Please log in to accept your invite.`)}&next=${encodeURIComponent(`/auth/accept-invite?token=${token}`)}`);
  }

  try {
    await acceptInvite({ token, userId: user.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to accept invite";
    redirect(`/auth/accept-invite?token=${encodeURIComponent(token)}&error=${encodeURIComponent(message)}`);
  }

  redirect("/builder");
}

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const params = await searchParams;
  const token = params.token ?? "";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center p-6">
      <h1 className="text-2xl font-semibold">Accept team invite</h1>
      <p className="mt-2 text-sm text-gray-600">
        Join your organization and get access based on the role assigned in your invite.
      </p>

      {params.error ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{params.error}</p>
      ) : null}

      {token ? (
        <form action={acceptInviteAction} className="mt-6 space-y-4">
          <input type="hidden" name="token" value={token} />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Accept invite
          </button>
        </form>
      ) : (
        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Missing invite token. Use the invite link from your email.
        </div>
      )}

      <p className="mt-4 text-sm text-gray-600">
        Need to sign in first?{" "}
        <Link className="text-blue-600 hover:text-blue-700" href="/auth/login">
          Log in
        </Link>
      </p>
    </main>
  );
}




