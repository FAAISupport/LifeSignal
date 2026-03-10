import { NextResponse } from 'next/server';
import {
  buildReferralLink,
  createWaitlistEntry,
  REFERRAL_PRIORITY_BONUS,
} from '@/lib/waitlist';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      interest?: string;
      useCase?: string;
      referredBy?: string;
    };

    if (!body.fullName?.trim()) {
      return NextResponse.json({ ok: false, message: 'Full name is required.' }, { status: 400 });
    }

    if (!body.email?.trim()) {
      return NextResponse.json({ ok: false, message: 'Email address is required.' }, { status: 400 });
    }

    if (!body.interest?.trim()) {
      return NextResponse.json({ ok: false, message: 'Please choose the vertical you care about most.' }, { status: 400 });
    }

    const { entry, position, alreadyJoined } = await createWaitlistEntry({
      fullName: body.fullName,
      email: body.email,
      interest: body.interest,
      useCase: body.useCase,
      referredBy: body.referredBy,
    });

    return NextResponse.json({
      ok: true,
      alreadyJoined,
      position,
      referrals: entry.referrals_count,
      referralCode: entry.referral_code,
      referralLink: buildReferralLink(entry.referral_code),
      pointsPerReferral: REFERRAL_PRIORITY_BONUS,
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to join the waitlist right now.' },
      { status: 500 },
    );
  }
}
