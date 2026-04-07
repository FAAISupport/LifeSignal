import DemoDashboardShell from "@/components/demo-dashboards/DemoDashboardShell";

export default function FamilyDemoDashboardPage() {
  return (
    <DemoDashboardShell
      eyebrow="LifeSignal Demo Dashboard"
      title="Family Dashboard Demo"
      subtitle="A calm, simple view for family members who want confidence that their loved one is checking in and receiving support when needed."
      badge="Family View"
      stats={[
        { label: "Today’s Check-Ins", value: "12 / 12" },
        { label: "Response Rate", value: "100%" },
        { label: "Open Alerts", value: "0" },
        { label: "Average Response", value: "8 min" }
      ]}
      leftTitle="What families see"
      leftItems={[
        {
          title: "Daily reassurance",
          body: "Family members can quickly confirm whether their loved one checked in successfully today."
        },
        {
          title: "Escalation visibility",
          body: "If a check-in is missed, the dashboard shows where the situation is in the response flow."
        },
        {
          title: "Simple status tracking",
          body: "Designed for low-friction peace of mind, not operational overload."
        }
      ]}
      rightTitle="Primary outcomes"
      rightItems={[
        {
          title: "Confidence",
          body: "Families stop wondering whether someone is okay and gain dependable visibility."
        },
        {
          title: "Faster awareness",
          body: "Missed check-ins surface sooner, reducing the chance that something serious goes unnoticed."
        },
        {
          title: "Shared accountability",
          body: "Family can stay in the loop without manually coordinating every follow-up."
        }
      ]}
    />
  );
}
