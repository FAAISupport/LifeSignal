"use client";

type NeedsAssessmentValue = {
  attendeeCount: number;
  hasCareTeam: boolean;
  needsIncidentTracking: boolean;
  needsAutomations: boolean;
};

export function NeedsAssessment({
  value,
  onChange,
}: {
  value: NeedsAssessmentValue;
  onChange: (next: NeedsAssessmentValue) => void;
}) {
  return (
    <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="text-lg font-semibold">Needs assessment</h2>

      <label className="block text-sm font-medium text-gray-700" htmlFor="attendeeCount">
        Active members to monitor
      </label>
      <input
        id="attendeeCount"
        type="number"
        min={0}
        value={value.attendeeCount}
        onChange={(event) =>
          onChange({
            ...value,
            attendeeCount: Number.isFinite(event.currentTarget.valueAsNumber)
              ? Math.max(0, event.currentTarget.valueAsNumber)
              : 0,
          })
        }
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={value.hasCareTeam}
          onChange={(event) => onChange({ ...value, hasCareTeam: event.currentTarget.checked })}
        />
        We have a dedicated care team
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={value.needsIncidentTracking}
          onChange={(event) => onChange({ ...value, needsIncidentTracking: event.currentTarget.checked })}
        />
        We need incident tracking and follow-up
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={value.needsAutomations}
          onChange={(event) => onChange({ ...value, needsAutomations: event.currentTarget.checked })}
        />
        We need workflow automations
      </label>
    </section>
  );
}

export type { NeedsAssessmentValue };
