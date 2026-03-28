export type CareChannel = 'sms' | 'voice';
export type CheckInStatus = 'pending' | 'confirmed' | 'help_requested' | 'escalating' | 'resolved';

export type CareRecipient = {
  id: string;
  fullName: string;
  timezone: string;
  preferredChannels: CareChannel[];
  confirmationKeywords: string[];
  helpKeywords: string[];
  quietHoursStart: string | null;
  quietHoursEnd: string | null;
};

export type EscalationContact = {
  id: string;
  recipientId?: string;
  name: string;
  phone: string;
  role: 'family' | 'caregiver' | 'pastor' | 'responder';
  priority: number;
  canAcknowledge: boolean;
};

export type EscalationStep = {
  stepNumber: number;
  contactId: string;
  channel: 'escalation_sms' | 'escalation_voice';
  delayMinutes: number;
  sentAt: string | null;
};

export type ExpectedCheckIn = {
  id: string;
  recipientId: string;
  scheduledFor: string;
  windowStart: string;
  windowEnd: string;
  channels: CareChannel[];
  attemptsMade: number;
  maxAttempts: number;
  retryDelayMinutes: number;
  escalationDelayMinutes: number;
  status: CheckInStatus;
  confirmedAt: string | null;
  helpRequestedAt: string | null;
  lastAttemptAt: string | null;
  escalationStartedAt: string | null;
};

export function recordAttempt(checkIn: ExpectedCheckIn, atIso: string): ExpectedCheckIn {
  return {
    ...checkIn,
    attemptsMade: checkIn.attemptsMade + 1,
    lastAttemptAt: atIso,
  };
}

export function startEscalation(checkIn: ExpectedCheckIn, startedAtIso: string): ExpectedCheckIn {
  return {
    ...checkIn,
    status: 'escalating',
    escalationStartedAt: startedAtIso,
  };
}

export function resolveIncident(checkIn: ExpectedCheckIn, resolvedAtIso = new Date().toISOString()): ExpectedCheckIn {
  return {
    ...checkIn,
    status: 'resolved',
    confirmedAt: resolvedAtIso,
  };
}

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
  escalationStartedAtIso: string,
  nowIso: string
): EscalationStep | null {
  const startedAt = new Date(escalationStartedAtIso).getTime();
  const now = new Date(nowIso).getTime();

  return (
    [...steps]
      .sort((a, b) => a.stepNumber - b.stepNumber)
      .find((step) => !step.sentAt && startedAt + step.delayMinutes * 60_000 <= now) ?? null
  );
}

export function markEscalationStepSent(
  steps: EscalationStep[],
  stepNumber: number,
  sentAtIso: string
): EscalationStep[] {
  return steps.map((step) => (step.stepNumber === stepNumber ? { ...step, sentAt: sentAtIso } : step));
}

export function determineCareDecision(checkIn: ExpectedCheckIn, nowIso: string): { action: 'send_checkin' | 'retry' | 'start_escalation' | 'wait' } {
  if (checkIn.status === 'pending' && checkIn.attemptsMade === 0) {
    return { action: 'send_checkin' };
  }

  if (checkIn.status === 'pending' && checkIn.attemptsMade < checkIn.maxAttempts) {
    const lastAttempt = checkIn.lastAttemptAt ? new Date(checkIn.lastAttemptAt).getTime() : 0;
    const now = new Date(nowIso).getTime();
    const retryMs = checkIn.retryDelayMinutes * 60_000;
    if (now >= lastAttempt + retryMs) {
      return { action: 'retry' };
    }
  }

  if (checkIn.status === 'pending' && checkIn.attemptsMade >= checkIn.maxAttempts) {
    return { action: 'start_escalation' };
  }

  if (checkIn.status === 'help_requested') {
    return { action: 'start_escalation' };
  }

  return { action: 'wait' };
}

export function applyInboundResponse(
  checkIn: ExpectedCheckIn,
  messageBody: string,
  receivedAt: string,
  recipient: CareRecipient
): { updatedCheckIn: ExpectedCheckIn; decision: { action: 'complete_confirmed' | 'complete_help' | 'ignored' } } {
  const normalized = messageBody.trim().toLowerCase();
  const confirmationWords = recipient.confirmationKeywords.length
    ? recipient.confirmationKeywords.map((item) => item.toLowerCase())
    : ['yes', 'ok', '1'];
  const helpWords = recipient.helpKeywords.length ? recipient.helpKeywords.map((item) => item.toLowerCase()) : ['help', '9'];

  if (confirmationWords.includes(normalized)) {
    return {
      decision: { action: 'complete_confirmed' },
      updatedCheckIn: {
        ...checkIn,
        status: 'confirmed',
        confirmedAt: receivedAt,
      },
    };
  }

  if (helpWords.includes(normalized)) {
    return {
      decision: { action: 'complete_help' },
      updatedCheckIn: {
        ...checkIn,
        status: 'help_requested',
        helpRequestedAt: receivedAt,
      },
    };
  }

  return { decision: { action: 'ignored' }, updatedCheckIn: checkIn };
}
