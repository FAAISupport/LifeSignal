export class CoreCareTwilioMessenger {
  constructor(private readonly repo: unknown) {
    void this.repo;
  }

  async sendEscalationSms(_: Record<string, unknown>) {
    return { success: true, externalId: 'stub_sms' };
  }

  async sendEscalationVoice(_: Record<string, unknown>) {
    return { success: true, externalId: 'stub_voice' };
  }

  async sendCheckInSms(_: Record<string, unknown>) {
    return { success: true, externalId: 'stub_checkin_sms' };
  }

  async sendCheckInVoice(_: Record<string, unknown>) {
    return { success: true, externalId: 'stub_checkin_voice' };
  }
}
