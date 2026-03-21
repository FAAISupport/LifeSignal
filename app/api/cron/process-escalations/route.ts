import { NextResponse } from 'next/server';
import { assertAuthorizedCronRequest } from '@/lib/cronAuth';
import { processEscalations } from '@/lib/checkins/service';

export async function POST(request: Request) {
  try {
    assertAuthorizedCronRequest(request);
    const result = await processEscalations();
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    const status = error instanceof Error && error.message.includes('Unauthorized') ? 401 : 500;
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error.' }, { status });
  }
}
