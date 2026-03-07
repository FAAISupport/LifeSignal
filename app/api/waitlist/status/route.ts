import { NextResponse } from 'next/server';
import { buildReferralLink, getWaitlistStatus, REFERRAL_PRIORITY_BONUS } from '@/lib/waitlist';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email')?.trim();

    if (!email) {
      return NextResponse.json({ ok: false, message: 'Email address is required.' }, { status: 400 });
    }

    const status = await getWaitlistStatus(email);
    if (!status) {
      return NextResponse.json({ ok: false, message: 'Waitlist entry not found.' }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      position: status.position,
      referrals: status.entry.referrals_count,
      referralCode: status.entry.referral_code,
      referralLink: buildReferralLink(status.entry.referral_code),
      pointsPerReferral: REFERRAL_PRIORITY_BONUS,
    });
  } catch (error) {
    console.error('Waitlist status error:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to fetch waitlist status right now.' },
      { status: 500 },
    );
  }
}
