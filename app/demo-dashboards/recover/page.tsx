import DemoDashboardShell from "@/components/demo-dashboards/DemoDashboardShell";

export default function RecoverDemoDashboardPage() {
  return (
    <DemoDashboardShell
      eyebrow="LifeSignal Demo Dashboard"
      title="Recover Dashboard Demo"
      subtitle="A dedicated dashboard for LifeSignal Recover, built for ongoing structured recovery support, accountability, routine confirmation, and intervention visibility."
      badge="Recover View"
      stats={[
        { label: "Active Recovery Members", value: "24" },
        { label: "Daily Compliance", value: "88%" },
        { label: "Open Interventions", value: "4" },
        { label: "Care Team Actions", value: "11 today" }
      ]}
      leftTitle="What Recover teams see"
      leftItems={[
        {
          title: "Daily recovery adherence",
          body: "Monitor whether members are completing required check-ins, medication confirmations, and routine prompts."
        },
        {
          title: "Pattern-based visibility",
          body: "Missed confirmations and slower response behavior become easier to spot before they become setbacks."
        },
        {
          title: "Support workflow tracking",
          body: "Shows which recovery members need intervention, coaching, or escalation."
        }
      ]}
      rightTitle="Primary outcomes"
      rightItems={[
        {
          title: "Improved accountability",
          body: "Members in recovery benefit from a more structured rhythm of check-ins and support."
        },
        {
          title: "Better care coordination",
          body: "Teams can see where support is needed and respond more consistently."
        },
        {
          title: "Operational clarity",
          body: "Recover becomes its own distinct service line instead of being buried inside family or caregiver views."
        }
      ]}
      ctaHref="/church-demo/setup"
      ctaLabel="Build Custom Recover Demo"
    />
  );
}
