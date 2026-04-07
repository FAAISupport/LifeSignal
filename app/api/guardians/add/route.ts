import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const guardianSchema = z.object({
  monitoredPersonId: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(25),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  relationship: z.string().trim().min(2).max(80),
  priority: z.coerce.number().int().min(1).max(25),
  notifySms: z.coerce.boolean().optional().default(true),
  notifyVoice: z.coerce.boolean().optional().default(false),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

function cleanPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits || null;
}

function cleanOptionalString(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = guardianSchema.parse(body);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return json(500, {
        ok: false,
        error: "Missing Supabase environment variables.",
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const cleanedPhone = cleanPhone(parsed.phone);
    if (!cleanedPhone) {
      return json(400, {
        ok: false,
        error: "Guardian phone number is invalid.",
      });
    }

    const email = cleanOptionalString(parsed.email)?.toLowerCase() ?? null;
    const notes = cleanOptionalString(parsed.notes);
    const relationship = parsed.relationship.trim();

    const { data: monitoredPerson, error: monitoredPersonError } = await supabase
      .from("monitored_people")
      .select("id, is_active")
      .eq("id", parsed.monitoredPersonId)
      .maybeSingle();

    if (monitoredPersonError) {
      return json(500, {
        ok: false,
        error: "Failed checking monitored person.",
        details: monitoredPersonError.message,
      });
    }

    if (!monitoredPerson) {
      return json(404, {
        ok: false,
        error: "Monitored person not found.",
      });
    }

    if (monitoredPerson.is_active === false) {
      return json(400, {
        ok: false,
        error: "Cannot add guardian to an inactive monitored person.",
      });
    }

    const { data: existingGuardian, error: existingGuardianError } = await supabase
      .from("guardians")
      .select("id, monitored_person_id, name, phone, email, relationship, priority, notify_sms, notify_voice, notes, is_active, created_at")
      .eq("monitored_person_id", parsed.monitoredPersonId)
      .eq("phone", cleanedPhone)
      .maybeSingle();

    if (existingGuardianError) {
      return json(500, {
        ok: false,
        error: "Failed checking for an existing guardian.",
        details: existingGuardianError.message,
      });
    }

    if (existingGuardian) {
      return json(200, {
        ok: true,
        alreadyExists: true,
        message: "Guardian already exists for this monitored person.",
        data: existingGuardian,
      });
    }

    const insertPayload = {
      monitored_person_id: parsed.monitoredPersonId,
      name: parsed.name.trim(),
      phone: cleanedPhone,
      email,
      relationship,
      priority: parsed.priority,
      notify_sms: parsed.notifySms,
      notify_voice: parsed.notifyVoice,
      notes,
      is_active: true,
    };

    const { data: insertedGuardian, error: insertError } = await supabase
      .from("guardians")
      .insert(insertPayload)
      .select("id, monitored_person_id, name, phone, email, relationship, priority, notify_sms, notify_voice, notes, is_active, created_at")
      .single();

    if (insertError) {
      return json(500, {
        ok: false,
        error: "Failed inserting guardian.",
        details: insertError.message,
      });
    }

    return json(200, {
      ok: true,
      alreadyExists: false,
      message: "Guardian added successfully.",
      data: insertedGuardian,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json(400, {
        ok: false,
        error: "Invalid request body.",
        issues: error.issues,
      });
    }

    return json(500, {
      ok: false,
      error: "Unexpected server error.",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

