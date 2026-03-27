import DemoDashboardShell from "@/components/demo-dashboards/DemoDashboardShell";

export default function PostOpDemoDashboardPage() {
  return (
    <DemoDashboardShell
      eyebrow="LifeSignal Demo Dashboard"
      title="PostOp Dashboard Demo"
      subtitle="A recovery-focused dashboard built specifically for post-operative monitoring, follow-up cadence, symptom watch, and faster escalation when recovery patterns drift."
      badge="PostOp View"
      stats={[
        { label: "Patients in Recovery", value: "16" },
        { label: "Critical Follow-Ups", value: "2" },
        { label: "Medication Confirmations", value: "91%" },
        { label: "Recovery Window", value: "7–30 days" }
      ]}
      leftTitle="What PostOp teams see"
      leftItems={[
        {
          title: "Recovery cohort tracking",
          body: "View all current post-op patients by day-in-recovery, status, and check-in compliance."
        },
        {
          title: "Symptom and routine monitoring",
          body: "Track medication confirmations, symptom prompts, missed responses, and recovery adherence."
        },
        {
          title: "Escalation for concern patterns",
          body: "Higher-risk post-op behavior can surface sooner for staff review and outreach."
        }
      ]}
      rightTitle="Primary outcomes"
      rightItems={[
        {
          title: "Safer recovery",
          body: "Structured follow-up helps reduce the risk that a struggling patient quietly slips through the cracks."
        },
        {
          title: "Better post-discharge consistency",
          body: "Care teams gain a repeatable process during the most vulnerable recovery window."
        },
        {
          title: "Stronger documentation",
          body: "Recovery outreach, responses, and escalations become easier to review and explain."
        }
      ]}
      ctaHref="/church-demo/setup"
      ctaLabel="Build Custom Recovery Demo"
    />
  );
}
