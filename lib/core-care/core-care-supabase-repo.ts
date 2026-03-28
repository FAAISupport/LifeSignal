import type { EscalationContact, EscalationStep } from '@/lib/core-care/core-care-engine';

type CheckInRecord = { id: string };
type RecipientRecord = { id: string };
type IncidentRecord = {
  id: string;
  checkInId: string;
  recipientId: string;
  status: string;
  startedAt: string;
  acknowledgedAt: string | null;
  acknowledgedByContactId: string | null;
  steps: EscalationStep[];
};

export class CoreCareSupabaseRepo {
  async getCheckInById(_: string): Promise<CheckInRecord | null> {
    return null;
  }

  async setCheckInEscalating(_: string, __: string) {
    return;
  }

  async getRecipientById(_: string): Promise<RecipientRecord | null> {
    return null;
  }

  async getEscalationContacts(_: string): Promise<EscalationContact[]> {
    return [];
  }

  async createOrGetIncidentForHelpRequest(params: {
    checkIn: { id: string };
    recipientId: string;
    startedAt: string;
    steps: EscalationStep[];
  }): Promise<IncidentRecord> {
    return {
      id: `incident_${params.checkIn.id}`,
      checkInId: params.checkIn.id,
      recipientId: params.recipientId,
      status: 'open',
      startedAt: params.startedAt,
      acknowledgedAt: null,
      acknowledgedByContactId: null,
      steps: params.steps,
    };
  }

  async saveEvent(_: Record<string, unknown>) {
    return;
  }

  async findRecipientByPhone(_: string): Promise<(RecipientRecord & { phone: string }) | null> {
    return null;
  }

  async getLatestActionableCheckInForRecipient(_: string): Promise<CheckInRecord | null> {
    return null;
  }

  async findEscalationContactByPhone(
    _: string
  ): Promise<(EscalationContact & { recipientId: string; canAcknowledge: boolean }) | null> {
    return null;
  }

  async getIncidentById(_: string): Promise<IncidentRecord | null> {
    return null;
  }

  async getLatestOpenIncidentForRecipient(_: string): Promise<IncidentRecord | null> {
    return null;
  }

  async saveIncident(_: Record<string, unknown>) {
    return;
  }
}
