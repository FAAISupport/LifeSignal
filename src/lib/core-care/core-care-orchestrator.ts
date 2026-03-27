import {
  CareChannel,
  CareRecipient,
  CheckInStatus,
  EscalationContact,
  EscalationStep,
  ExpectedCheckIn,
  applyInboundResponse,
  buildEscalationSteps,
  determineCareDecision,
  findNextEscalationStepToSend,
  markEscalationStepSent,
  recordAttempt,
  resolveIncident,
  startEscalation,
} from "./core-care-engine";

export type OrchestratorLogger = {
  info: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
};

export type NotificationResult = {
  success: boolean;
  externalId?: string | null;
  error?: string | null;
};

export type EscalationIncident = {
  id: string;
  checkInId: string;
  recipientId: string;
  status: "open" | "acknowledged" | "resolved";
  startedAt: string;
  acknowledgedAt: string | null;
  acknowledgedByContactId: string | null;
  steps: EscalationStep[];
};

export type EscalationAckResult = {
  incident: EscalationIncident;
  updatedCheckIn: ExpectedCheckIn;
};

export type CheckInMessageContext = {
  recipient: CareRecipient;
  checkIn: ExpectedCheckIn;
  attemptNumber: number;
};

export type EscalationMessageContext = {
  incident: EscalationIncident;
  checkIn: ExpectedCheckIn;
  recipient: CareRecipient;
  contact: EscalationContact;
  step: EscalationStep;
};

export interface CoreCareRepository {
  getPendingCheckIns(nowIso: string): Promise<ExpectedCheckIn[]>;
  getRecipientById(recipientId: string): Promise<CareRecipient | null>;
  getEscalationContacts(recipientId: string): Promise<EscalationContact[]>;
  saveCheckIn(checkIn: ExpectedCheckIn): Promise<void>;

  getOpenIncidentByCheckInId(checkInId: string): Promise<EscalationIncident | null>;
  createIncident(incident: EscalationIncident): Promise<void>;
  saveIncident(incident: EscalationIncident): Promise<void>;

  saveEvent(event: {
    type:
      | "checkin_sent"
      | "checkin_retry_sent"
      | "checkin_confirmed"
      | "checkin_help_requested"
      | "checkin_ignored_message"
      | "escalation_started"
      | "escalation_step_sent"
      | "escalation_acknowledged"
      | "incident_resolved"
      | "orchestrator_error";
    checkInId: string;
    recipientId: string;
    incidentId?: string | null;
    stepNumber?: number | null;
    channel?: CareChannel | "escalation_sms" | "escalation_voice" | null;
    occurredAt: string;
    metadata?: Record<string, unknown>;
  }): Promise<void>;
}

export interface CoreCareMessenger {
  sendCheckInSms(context: CheckInMessageContext): Promise<NotificationResult>;
  sendCheckInVoice(context: CheckInMessageContext): Promise<NotificationResult>;
  sendEscalationSms(context: EscalationMessageContext): Promise<NotificationResult>;
  sendEscalationVoice(context: EscalationMessageContext): Promise<NotificationResult>;
}

export type OrchestratorRunSummary = {
  startedAt: string;
  completedAt: string;
  processedCheckIns: number;
  sentInitial: number;
  sentRetries: number;
  startedEscalations: number;
  sentEscalationSteps: number;
  skipped: number;
  errors: number;
  notes: string[];
};

const defaultLogger: OrchestratorLogger = {
  info: (message, meta) => console.log("[core-care][info]", message, meta ?? {}),
  warn: (message, meta) => console.warn("[core-care][warn]", message, meta ?? {}),
  error: (message, meta) => console.error("[core-care][error]", message, meta ?? {}),
};

function uniqueChannels(channels: CareChannel[]): CareChannel[] {
  return [...new Set(channels)];
}

function isStatusTerminal(status: CheckInStatus): boolean {
  return status === "confirmed" || status === "help_requested" || status === "resolved";
}

function createIncidentId(checkInId: string): string {
  return `incident_${checkInId}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

async function sendCheckInAttempt(
  messenger: CoreCareMessenger,
  recipient: CareRecipient,
  checkIn: ExpectedCheckIn,
  attemptNumber: number,
  logger: OrchestratorLogger
): Promise<boolean> {
  const channels = uniqueChannels(checkIn.channels?.length ? checkIn.channels : recipient.preferredChannels);

  let sentAny = false;

  for (const channel of channels) {
    try {
      let result: NotificationResult;

      if (channel === "sms") {
        result = await messenger.sendCheckInSms({
          recipient,
          checkIn,
          attemptNumber,
        });
      } else {
        result = await messenger.sendCheckInVoice({
          recipient,
          checkIn,
          attemptNumber,
        });
      }

      if (result.success) {
        sentAny = true;
        logger.info("Check-in notification sent.", {
          checkInId: checkIn.id,
          recipientId: recipient.id,
          channel,
          attemptNumber,
          externalId: result.externalId ?? null,
        });
      } else {
        logger.warn("Check-in notification failed.", {
          checkInId: checkIn.id,
          recipientId: recipient.id,
          channel,
          attemptNumber,
          error: result.error ?? "Unknown send failure",
        });
      }
    } catch (error) {
      logger.error("Exception while sending check-in notification.", {
        checkInId: checkIn.id,
        recipientId: recipient.id,
        channel,
        attemptNumber,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return sentAny;
}

async function sendEscalationStep(
  messenger: CoreCareMessenger,
  incident: EscalationIncident,
  checkIn: ExpectedCheckIn,
  recipient: CareRecipient,
  contact: EscalationContact,
  step: EscalationStep,
  logger: OrchestratorLogger
): Promise<boolean> {
  let sentAny = false;

  try {
    const smsResult = await messenger.sendEscalationSms({
      incident,
      checkIn,
      recipient,
      contact,
      step,
    });

    if (smsResult.success) {
      sentAny = true;
      logger.info("Escalation SMS sent.", {
        incidentId: incident.id,
        checkInId: checkIn.id,
        recipientId: recipient.id,
        contactId: contact.id,
        stepNumber: step.stepNumber,
        externalId: smsResult.externalId ?? null,
      });
    } else {
      logger.warn("Escalation SMS failed.", {
        incidentId: incident.id,
        checkInId: checkIn.id,
        recipientId: recipient.id,
        contactId: contact.id,
        stepNumber: step.stepNumber,
        error: smsResult.error ?? "Unknown send failure",
      });
    }
  } catch (error) {
    logger.error("Exception while sending escalation SMS.", {
      incidentId: incident.id,
      checkInId: checkIn.id,
      recipientId: recipient.id,
      contactId: contact.id,
      stepNumber: step.stepNumber,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    const voiceResult = await messenger.sendEscalationVoice({
      incident,
      checkIn,
      recipient,
      contact,
      step,
    });

    if (voiceResult.success) {
      sentAny = true;
      logger.info("Escalation voice call sent.", {
        incidentId: incident.id,
        checkInId: checkIn.id,
        recipientId: recipient.id,
        contactId: contact.id,
        stepNumber: step.stepNumber,
        externalId: voiceResult.externalId ?? null,
      });
    } else {
      logger.warn("Escalation voice call failed.", {
        incidentId: incident.id,
        checkInId: checkIn.id,
        recipientId: recipient.id,
        contactId: contact.id,
        stepNumber: step.stepNumber,
        error: voiceResult.error ?? "Unknown send failure",
      });
    }
  } catch (error) {
    logger.error("Exception while sending escalation voice call.", {
      incidentId: incident.id,
      checkInId: checkIn.id,
      recipientId: recipient.id,
      contactId: contact.id,
      stepNumber: step.stepNumber,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  return sentAny;
}

export class CoreCareOrchestrator {
  private readonly repo: CoreCareRepository;
  private readonly messenger: CoreCareMessenger;
  private readonly logger: OrchestratorLogger;

  constructor(params: {
    repo: CoreCareRepository;
    messenger: CoreCareMessenger;
    logger?: OrchestratorLogger;
  }) {
    this.repo = params.repo;
    this.messenger = params.messenger;
    this.logger = params.logger ?? defaultLogger;
  }

  async run(now = nowIso()): Promise<OrchestratorRunSummary> {
    const summary: OrchestratorRunSummary = {
      startedAt: now,
      completedAt: now,
      processedCheckIns: 0,
      sentInitial: 0,
      sentRetries: 0,
      startedEscalations: 0,
      sentEscalationSteps: 0,
      skipped: 0,
      errors: 0,
      notes: [],
    };

    const checkIns = await this.repo.getPendingCheckIns(now);

    for (const checkIn of checkIns) {
      summary.processedCheckIns += 1;

      try {
        const recipient = await this.repo.getRecipientById(checkIn.recipientId);

        if (!recipient) {
          summary.errors += 1;
          summary.notes.push(`Missing recipient for check-in ${checkIn.id}.`);
          this.logger.warn("Recipient not found for check-in.", {
            checkInId: checkIn.id,
            recipientId: checkIn.recipientId,
          });

          await this.repo.saveEvent({
            type: "orchestrator_error",
            checkInId: checkIn.id,
            recipientId: checkIn.recipientId,
            occurredAt: now,
            metadata: {
              reason: "recipient_not_found",
            },
          });

          continue;
        }

        if (isStatusTerminal(checkIn.status)) {
          summary.skipped += 1;
          continue;
        }

        const decision = determineCareDecision(checkIn, now);

        if (decision.action === "send_checkin") {
          const updatedCheckIn = recordAttempt(checkIn, now);
          const attemptNumber = updatedCheckIn.attemptsMade;

          const sent = await sendCheckInAttempt(
            this.messenger,
            recipient,
            updatedCheckIn,
            attemptNumber,
            this.logger
          );

          await this.repo.saveCheckIn(updatedCheckIn);

          if (sent) {
            summary.sentInitial += 1;
            await this.repo.saveEvent({
              type: "checkin_sent",
              checkInId: updatedCheckIn.id,
              recipientId: recipient.id,
              occurredAt: now,
              channel: updatedCheckIn.channels[0] ?? "sms",
              metadata: {
                attemptNumber,
                channels: updatedCheckIn.channels,
              },
            });
          } else {
            summary.errors += 1;
            await this.repo.saveEvent({
              type: "orchestrator_error",
              checkInId: updatedCheckIn.id,
              recipientId: recipient.id,
              occurredAt: now,
              metadata: {
                reason: "initial_send_failed",
                attemptNumber,
              },
            });
          }

          continue;
        }

        if (decision.action === "retry") {
          const updatedCheckIn = recordAttempt(checkIn, now);
          const attemptNumber = updatedCheckIn.attemptsMade;

          const sent = await sendCheckInAttempt(
            this.messenger,
            recipient,
            updatedCheckIn,
            attemptNumber,
            this.logger
          );

          await this.repo.saveCheckIn(updatedCheckIn);

          if (sent) {
            summary.sentRetries += 1;
            await this.repo.saveEvent({
              type: "checkin_retry_sent",
              checkInId: updatedCheckIn.id,
              recipientId: recipient.id,
              occurredAt: now,
              channel: updatedCheckIn.channels[0] ?? "sms",
              metadata: {
                attemptNumber,
                channels: updatedCheckIn.channels,
              },
            });
          } else {
            summary.errors += 1;
            await this.repo.saveEvent({
              type: "orchestrator_error",
              checkInId: updatedCheckIn.id,
              recipientId: recipient.id,
              occurredAt: now,
              metadata: {
                reason: "retry_send_failed",
                attemptNumber,
              },
            });
          }

          continue;
        }

        if (decision.action === "start_escalation") {
          let incident = await this.repo.getOpenIncidentByCheckInId(checkIn.id);

          if (!incident) {
            const contacts = await this.repo.getEscalationContacts(recipient.id);

            if (!contacts.length) {
              summary.errors += 1;
              summary.notes.push(`No escalation contacts for recipient ${recipient.id}.`);

              await this.repo.saveEvent({
                type: "orchestrator_error",
                checkInId: checkIn.id,
                recipientId: recipient.id,
                occurredAt: now,
                metadata: {
                  reason: "no_escalation_contacts",
                },
              });

              continue;
            }

            const updatedCheckIn = startEscalation(checkIn, now);
            const steps = buildEscalationSteps(contacts, 0, 10);

            incident = {
              id: createIncidentId(checkIn.id),
              checkInId: checkIn.id,
              recipientId: recipient.id,
              status: "open",
              startedAt: now,
              acknowledgedAt: null,
              acknowledgedByContactId: null,
              steps,
            };

            await this.repo.saveCheckIn(updatedCheckIn);
            await this.repo.createIncident(incident);

            summary.startedEscalations += 1;

            await this.repo.saveEvent({
              type: "escalation_started",
              checkInId: checkIn.id,
              recipientId: recipient.id,
              incidentId: incident.id,
              occurredAt: now,
              metadata: {
                contactCount: contacts.length,
                stepCount: steps.length,
              },
            });
          }

          const contacts = await this.repo.getEscalationContacts(recipient.id);
          const nextStep = findNextEscalationStepToSend(incident.steps, incident.startedAt, now);

          if (!nextStep) {
            summary.skipped += 1;
            continue;
          }

          const contact = contacts.find((c) => c.id === nextStep.contactId);

          if (!contact) {
            summary.errors += 1;
            await this.repo.saveEvent({
              type: "orchestrator_error",
              checkInId: checkIn.id,
              recipientId: recipient.id,
              incidentId: incident.id,
              stepNumber: nextStep.stepNumber,
              occurredAt: now,
              metadata: {
                reason: "escalation_contact_not_found",
                contactId: nextStep.contactId,
              },
            });
            continue;
          }

          const sent = await sendEscalationStep(
            this.messenger,
            incident,
            checkIn,
            recipient,
            contact,
            nextStep,
            this.logger
          );

          if (sent) {
            incident.steps = markEscalationStepSent(incident.steps, nextStep.stepNumber, now);
            await this.repo.saveIncident(incident);
            summary.sentEscalationSteps += 1;

            await this.repo.saveEvent({
              type: "escalation_step_sent",
              checkInId: checkIn.id,
              recipientId: recipient.id,
              incidentId: incident.id,
              stepNumber: nextStep.stepNumber,
              occurredAt: now,
              channel: "escalation_sms",
              metadata: {
                contactId: contact.id,
                contactRole: contact.role,
              },
            });
          } else {
            summary.errors += 1;
            await this.repo.saveEvent({
              type: "orchestrator_error",
              checkInId: checkIn.id,
              recipientId: recipient.id,
              incidentId: incident.id,
              stepNumber: nextStep.stepNumber,
              occurredAt: now,
              metadata: {
                reason: "escalation_step_send_failed",
                contactId: contact.id,
              },
            });
          }

          continue;
        }

        summary.skipped += 1;
      } catch (error) {
        summary.errors += 1;
        summary.notes.push(
          `Unhandled orchestrator error for check-in ${checkIn.id}: ${
            error instanceof Error ? error.message : String(error)
          }`
        );

        this.logger.error("Unhandled orchestrator error.", {
          checkInId: checkIn.id,
          recipientId: checkIn.recipientId,
          error: error instanceof Error ? error.message : String(error),
        });

        await this.repo.saveEvent({
          type: "orchestrator_error",
          checkInId: checkIn.id,
          recipientId: checkIn.recipientId,
          occurredAt: now,
          metadata: {
            reason: "unhandled_exception",
            error: error instanceof Error ? error.message : String(error),
          },
        });
      }
    }

    summary.completedAt = nowIso();
    return summary;
  }

  async processInboundReply(params: {
    checkIn: ExpectedCheckIn;
    recipient: CareRecipient;
    messageBody: string;
    receivedAt?: string;
  }): Promise<{
    checkIn: ExpectedCheckIn;
    outcome: "confirmed" | "help_requested" | "ignored";
  }> {
    const receivedAt = params.receivedAt ?? nowIso();

    const { updatedCheckIn, decision } = applyInboundResponse(
      params.checkIn,
      params.messageBody,
      receivedAt,
      params.recipient
    );

    await this.repo.saveCheckIn(updatedCheckIn);

    if (decision.action === "complete_confirmed") {
      const incident = await this.repo.getOpenIncidentByCheckInId(updatedCheckIn.id);

      if (incident) {
        incident.status = "resolved";
        await this.repo.saveIncident(incident);

        await this.repo.saveEvent({
          type: "incident_resolved",
          checkInId: updatedCheckIn.id,
          recipientId: updatedCheckIn.recipientId,
          incidentId: incident.id,
          occurredAt: receivedAt,
          metadata: {
            resolution: "recipient_confirmed",
          },
        });
      }

      await this.repo.saveEvent({
        type: "checkin_confirmed",
        checkInId: updatedCheckIn.id,
        recipientId: updatedCheckIn.recipientId,
        occurredAt: receivedAt,
        metadata: {
          source: "inbound_reply",
          messageBody: params.messageBody,
        },
      });

      return {
        checkIn: updatedCheckIn,
        outcome: "confirmed",
      };
    }

    if (decision.action === "complete_help") {
      await this.repo.saveEvent({
        type: "checkin_help_requested",
        checkInId: updatedCheckIn.id,
        recipientId: updatedCheckIn.recipientId,
        occurredAt: receivedAt,
        metadata: {
          source: "inbound_reply",
          messageBody: params.messageBody,
        },
      });

      return {
        checkIn: updatedCheckIn,
        outcome: "help_requested",
      };
    }

    await this.repo.saveEvent({
      type: "checkin_ignored_message",
      checkInId: updatedCheckIn.id,
      recipientId: updatedCheckIn.recipientId,
      occurredAt: receivedAt,
      metadata: {
        messageBody: params.messageBody,
      },
    });

    return {
      checkIn: updatedCheckIn,
      outcome: "ignored",
    };
  }

  async acknowledgeIncident(params: {
    checkIn: ExpectedCheckIn;
    contactId: string;
    acknowledgedAt?: string;
  }): Promise<EscalationAckResult | null> {
    const acknowledgedAt = params.acknowledgedAt ?? nowIso();
    const incident = await this.repo.getOpenIncidentByCheckInId(params.checkIn.id);

    if (!incident) {
      return null;
    }

    incident.status = "acknowledged";
    incident.acknowledgedAt = acknowledgedAt;
    incident.acknowledgedByContactId = params.contactId;

    const updatedCheckIn = resolveIncident(params.checkIn);

    await this.repo.saveIncident(incident);
    await this.repo.saveCheckIn(updatedCheckIn);

    await this.repo.saveEvent({
      type: "escalation_acknowledged",
      checkInId: params.checkIn.id,
      recipientId: params.checkIn.recipientId,
      incidentId: incident.id,
      occurredAt: acknowledgedAt,
      metadata: {
        contactId: params.contactId,
      },
    });

    await this.repo.saveEvent({
      type: "incident_resolved",
      checkInId: params.checkIn.id,
      recipientId: params.checkIn.recipientId,
      incidentId: incident.id,
      occurredAt: acknowledgedAt,
      metadata: {
        resolution: "caregiver_acknowledged",
        contactId: params.contactId,
      },
    });

    return {
      incident,
      updatedCheckIn,
    };
  }
}
