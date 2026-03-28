export class CoreCareScheduler {
  async generateCheckInsForDate(_: Date) {
    return {
      generated: 0,
      skipped: 0,
      notes: ['Stub scheduler active in current build.'],
    };
  }
}
