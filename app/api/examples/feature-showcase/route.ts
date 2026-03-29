import { NextResponse } from 'next/server';
import { featureShowcase } from '@/lib/churchos/feature-showcase';

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    items: featureShowcase,
  });
}
