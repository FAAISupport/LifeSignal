export function createReferralCode(seed: string) {
  return seed.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase() + Math.floor(Math.random() * 900 + 100);
}

export function calculateReferralRewards(referralCount: number) {
  return {
    freeMonthFlag: referralCount >= 3,
    premiumOnboardingFlag: referralCount >= 10,
  };
}
