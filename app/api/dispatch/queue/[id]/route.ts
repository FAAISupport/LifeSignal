import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = requireBearerToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await context.params;
    const supabase = createSupabaseAdminClient();

    const { data: existing, error: fetchError } = await supabase
      .from("care_checkins")
      .select("id, status, metadata")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Queue item not found." },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabase
      .from("care_checkins")
      .update({
        status: "resolved",
        updated_at: new Date().toISOString(),
        metadata: {
          ...(existing.metadata || {}),
          deleted_from_dispatch_queue: true,
          deleted_at: new Date().toISOString(),
          deleted_via: "dispatch_console",
        },
      })
      .eq("id", id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json({
      ok: true,
      message: `Queue item ${id} removed successfully.`,
      data: { id },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to delete queue item.",
      },
      { status: 500 }
    );
  }
}