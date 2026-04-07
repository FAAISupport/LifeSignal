import DemoDashboardShell from "@/components/demo-dashboards/DemoDashboardShell";

export default function CaregiverDemoDashboardPage() {
  return (
    <DemoDashboardShell
      eyebrow="LifeSignal Demo Dashboard"
      title="Caregiver Dashboard Demo"
      subtitle="A more operational dashboard for caregivers and care teams who need visibility into response timing, alerts, and member status across a roster."
      badge="Caregiver View"
      stats={[
        { label: "Active Clients", value: "28" },
        { label: "Pending Follow-Ups", value: "3" },
        { label: "Escalations Today", value: "2" },
        { label: "Average Closure", value: "18 min" }
      ]}
      leftTitle="What caregivers see"
      leftItems={[
        {
          title: "Roster visibility",
          body: "Caregivers can monitor multiple members at once and quickly identify who needs attention."
        },
        {
          title: "Workflow state",
          body: "The dashboard highlights who responded, who missed check-ins, and which cases remain active."
        },
        {
          title: "Operational readiness",
          body: "Designed for people responsible for day-to-day follow-up and care coordination."
        }
      ]}
      rightTitle="Primary outcomes"
      rightItems={[
        {
          title: "Higher efficiency",
          body: "Care teams spend less time manually checking status and more time responding where it matters."
        },
        {
          title: "Better response speed",
          body: "Escalations become easier to triage, assign, and close."
        },
        {
          title: "Documented care",
          body: "Teams gain more consistent visibility across many members without losing continuity."
        }
      ]}
    />
  );
}
