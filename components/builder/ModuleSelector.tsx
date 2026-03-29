"use client";

export type BuilderModule = {
  key: string;
  label: string;
  description: string;
  monthlyPrice: number;
};

export const BUILDER_MODULES: BuilderModule[] = [
  {
    key: "lifesignal_core",
    label: "LifeSignal Core",
    description: "Scheduled check-ins and member response tracking.",
    monthlyPrice: 79,
  },
  {
    key: "incident_center",
    label: "Incident Center",
    description: "Create, assign, and resolve incidents with audit history.",
    monthlyPrice: 59,
  },
  {
    key: "escalation_workflows",
    label: "Escalation Workflows",
    description: "Multi-step escalation plans with acknowledgment.",
    monthlyPrice: 69,
  },
  {
    key: "analytics_pack",
    label: "Analytics Pack",
    description: "Risk and response trend dashboards.",
    monthlyPrice: 49,
  },
  {
    key: "team_collaboration",
    label: "Team Collaboration",
    description: "Role-based team operations and assignments.",
    monthlyPrice: 39,
  },
];

export function ModuleSelector({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const selectedSet = new Set(selected);

  return (
    <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="text-lg font-semibold">Select modules</h2>

      <div className="space-y-3">
        {BUILDER_MODULES.map((module) => {
          const checked = selectedSet.has(module.key);
          return (
            <label key={module.key} className="block rounded-md border border-gray-200 p-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => {
                    if (event.currentTarget.checked) {
                      onChange([...selected, module.key]);
                      return;
                    }
                    onChange(selected.filter((item) => item !== module.key));
                  }}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{module.label}</p>
                  <p className="text-sm text-gray-600">{module.description}</p>
                  <p className="mt-1 text-xs text-gray-500">${module.monthlyPrice}/month</p>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
