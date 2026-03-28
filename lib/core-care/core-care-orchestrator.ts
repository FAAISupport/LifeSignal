export class CoreCareOrchestrator {
  constructor(private readonly deps: Record<string, unknown>) {}

  async run(nowIso: string) {
    return {
      startedAt: nowIso,
      completedAt: new Date().toISOString(),
      processedCheckIns: 0,
      sentInitial: 0,
      sentRetries: 0,
      startedEscalations: 0,
      sentEscalationSteps: 0,
      skipped: 0,
      errors: 0,
      notes: ['Stub orchestrator active in current build.'],
      depsLoaded: Object.keys(this.deps).length,
    };
  }

  async processInboundReply(_: Record<string, unknown>) {
    return { outcome: 'confirmed' as const };
  }

  async acknowledgeIncident(_: Record<string, unknown>) {
    return { ok: true };
  }
}
