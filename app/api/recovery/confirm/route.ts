import { z } from "zod";
import { requireAuth } from "@/lib/auth/guards";
import { confirmFaithSignalyCheckin } from "@/services/checkins/health-modules.service";
import { fail, ok } from "@/utils/api";

const schema = z.object({
  FaithSignalyCheckinId: z.string().uuid(),
  responseChannel: z.enum(["sms", "voice", "app"]).default("app")
});

export async function POST(request: Request) {
  const auth = await requireAuth(["senior", "caregiver", "guardian", "agency_staff", "agency_admin", "platform_admin"]);
  if (auth instanceof Response) return auth;

  const payload = await request.json().catch(() => null);
  const parsed = schema.safeParse(payload);
  if (!parsed.success) return fail("VALIDATION_ERROR", "Invalid FaithSignaly confirmation", 422, parsed.error.flatten());

  const result = await confirmFaithSignalyCheckin({
    FaithSignalyCheckinId: parsed.data.FaithSignalyCheckinId,
    actorProfileId: auth.profileId,
    responseChannel: parsed.data.responseChannel
  });

  return ok({ FaithSignalyCheckin: result });
}


