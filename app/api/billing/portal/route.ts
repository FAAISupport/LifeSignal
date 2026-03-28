import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';
import { z } from 'zod';

const schema = z.object({ customerId: z.string().min(3) });

export async function POST(req: Request) {
  try {
    const { customerId } = schema.parse(await req.json());
    const session = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: `${env.NEXT_PUBLIC_APP_URL}/billing` });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Portal error' }, { status: 400 });
  }
}
