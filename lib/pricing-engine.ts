export function calculateChurchPricing(memberCount: number, features: string[]) {
  let base = memberCount * 9;

  let multiplier = 1;

  if (features.length > 8) multiplier = 1.5;
  else if (features.length > 5) multiplier = 1.25;

  return {
    monthly: Math.round(base * multiplier),
    annual: Math.round(base * multiplier * 12)
  };
}
