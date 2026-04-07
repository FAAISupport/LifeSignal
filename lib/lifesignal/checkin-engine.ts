import { listDueCheckins, markCheckinMissed, markCheckinSent } from "@/services/lifesignal/checkins.service";
import { escalateCheckinIfNeeded } from "@/lib/lifesignal/escalation-engine";

const MISSED_GRACE_MINUTES = 30;

export async function runCheckinEngine(now = new Date()) {
  const nowIso = now.toISOString();
  const dueCheckins = await listDueCheckins(nowIso);

  let sent = 0;
  let escalated = 0;
  let missed = 0;

  for (const checkin of dueCheckins) {
    const dueMs = new Date(checkin.due_at).getTime();
    const nowMs = now.getTime();
    const isPastGrace = nowMs - dueMs >= MISSED_GRACE_MINUTES * 60 * 1000;

    if (checkin.status === "pending") {
      const updated = await markCheckinSent(checkin.id, nowIso);
      if (updated) {
        sent += 1;
      }
    }

    if (isPastGrace && (checkin.status === "pending" || checkin.status === "sent")) {
      const missedCheckin = await markCheckinMissed(checkin.id);
      if (missedCheckin) {
        missed += 1;
        const escalation = await escalateCheckinIfNeeded({
          orgId: missedCheckin.org_id,
          memberId: missedCheckin.member_id,
          checkinId: missedCheckin.id,
          reason: "missed",
        });

        if (escalation.created) {
          escalated += 1;
        }
      }
    }
  }

  return {
    processed: dueCheckins.length,
    sent,
    missed,
    escalated,
    now: nowIso,
  };
}
