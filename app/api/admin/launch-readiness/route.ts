import { NextResponse } from 'next/server';
import { getEnvAudit } from '@/lib/env';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  try {
    const envAudit = getEnvAudit();
    const tables = ['seniors', 'caregivers', 'escalation_contacts', 'checkin_schedules', 'checkins', 'escalations', 'incidents', 'cron_runs', 'analytics_daily', 'risk_snapshots', 'weekly_reports'];
    const tableChecks = await Promise.all(
      tables.map(async (table) => {
        const { error, count } = await supabaseAdmin.from(table).select('*', { count: 'estimated', head: true });
        return {
          table,
          ready: !error,
          rowCountEstimate: error ? null : count ?? 0,
          error: error?.message ?? null,
        };
      })
    );

    return NextResponse.json({
      ok: true,
      envAudit,
      tableChecks,
      ready: envAudit.every((entry) => entry.configured) && tableChecks.every((entry) => entry.ready),
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error.' }, { status: 500 });
  }
}
