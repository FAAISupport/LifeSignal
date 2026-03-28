import { NextResponse } from 'next/server';
import { z } from 'zod';
import { saveBuilderSession } from '@/services/builder/builder.service';

const schema = z.object({
  profile: z.object({
    churchName: z.string().min(2),
    contactName: z.string().min(2),
    contactEmail: z.string().email(),
    phone: z.string().min(7),
    cityState: z.string().min(2),
    attendanceBand: z.string(),
    ministryFocus: z.string().min(2),
  }),
  pains: z.array(z.string()).min(1),
  selectedModules: z.array(z.string()).min(1),
  referralCode: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const parsed = schema.parse(await req.json());
    const session = await saveBuilderSession(parsed);
    return NextResponse.json({ session });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid payload' }, { status: 400 });
  }
}
