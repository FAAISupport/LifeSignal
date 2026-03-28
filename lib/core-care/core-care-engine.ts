export type CareChannel = 'sms' | 'voice';

export type EscalationContact = {
  id: string;
  recipientId: string;
  fullName: string;
  role: string;
  phone: string;
  canAcknowledge?: boolean;
};

export type EscalationStep = {
  stepNumber: number;
  contactId: string;
  channel: 'escalation_sms' | 'escalation_voice';
  delayMinutes: number;
  sentAt: string | null;
};

export function buildEscalationSteps(
  contacts: EscalationContact[],
  startDelayMinutes = 0,
  stepDelayMinutes = 10
): EscalationStep[] {
  return contacts.flatMap((contact, index) => [
    {
      stepNumber: index * 2 + 1,
      contactId: contact.id,
      channel: 'escalation_sms' as const,
      delayMinutes: startDelayMinutes + index * stepDelayMinutes,
      sentAt: null,
    },
    {
      stepNumber: index * 2 + 2,
      contactId: contact.id,
      channel: 'escalation_voice' as const,
      delayMinutes: startDelayMinutes + index * stepDelayMinutes,
      sentAt: null,
    },
  ]);
}

export function findNextEscalationStepToSend(
  steps: EscalationStep[],
  startedAtIso: string,
  nowIso: string
): EscalationStep | null {
  const startedAt = new Date(startedAtIso).getTime();
  const now = new Date(nowIso).getTime();

  return (
    steps
      .filter((step) => !step.sentAt)
      .sort((a, b) => a.stepNumber - b.stepNumber)
      .find((step) => startedAt + step.delayMinutes * 60_000 <= now) ?? null
  );
}

export function markEscalationStepSent(
  steps: EscalationStep[],
  stepNumber: number,
  sentAtIso: string
): EscalationStep[] {
  return steps.map((step) => (step.stepNumber === stepNumber ? { ...step, sentAt: sentAtIso } : step));
}
