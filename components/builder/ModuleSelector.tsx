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

  function toggleModule(moduleKey: string, nextChecked: boolean) {
    if (nextChecked) {
      if (selectedSet.has(moduleKey)) return;
      onChange([...selected, moduleKey]);
      return;
    }

    onChange(selected.filter((item) => item !== moduleKey));
  }

  return (
    <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Choose your modules</h2>
          <p className="text-sm text-slate-600">
            Every feature can be purchased a la carte. Add only what you want, then check out with Stripe.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          {selected.length} in cart
        </div>
      </div>

      <div className="space-y-3">
        {BUILDER_MODULES.map((module) => {
          const checked = selectedSet.has(module.key);
          return (
            <label
              key={module.key}
              className={`block rounded-2xl border p-4 transition ${
                checked
                  ? "border-sky-300 bg-sky-50/70 shadow-sm"
                  : "border-gray-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => toggleModule(module.key, event.currentTarget.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-base font-semibold text-gray-900">{module.label}</p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{module.description}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        toggleModule(module.key, !checked);
                      }}
                      className={`inline-flex min-w-[148px] items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                        checked
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "border border-sky-200 bg-sky-600 text-white hover:bg-sky-700"
                      }`}
                    >
                      {checked ? `In cart · $${module.monthlyPrice}/mo` : `Add to cart · $${module.monthlyPrice}/mo`}
                    </button>
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}


