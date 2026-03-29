export type RiskBand = 'stable' | 'caution' | 'elevated' | 'high';
export type CheckinStatus = 'pending' | 'confirmed' | 'missed' | 'escalated' | 'resolved';

export interface CheckinExecutionResult {
  checkinId: string;
  status: CheckinStatus;
  providerSid?: string;
}
