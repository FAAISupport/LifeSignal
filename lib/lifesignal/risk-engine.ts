import type { RiskBand } from '@/types/lifesignal';

export function computeRiskBand(input: {
  missed7d: number;
  missed30d: number;
  avgResponseMinutes: number;
  recentEscalations: number;
  missedMedicationReminders: number;
}): RiskBand {
  const score =
    input.missed7d * 2 +
    Math.floor(input.missed30d / 2) +
    (input.avgResponseMinutes > 120 ? 2 : input.avgResponseMinutes > 45 ? 1 : 0) +
    input.recentEscalations * 2 +
    input.missedMedicationReminders;

  if (score <= 2) return 'stable';
  if (score <= 5) return 'caution';
  if (score <= 8) return 'elevated';
  return 'high';
}
