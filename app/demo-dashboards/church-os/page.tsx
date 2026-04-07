import DemoDashboardShell from "@/components/demo-dashboards/DemoDashboardShell";

export default function ChurchOsDemoDashboardPage() {
  return (
    <DemoDashboardShell
      eyebrow="LifeSignal Demo Dashboard"
      title="Church OS Dashboard Demo"
      subtitle="A dedicated operational dashboard for churches to monitor member care, volunteer response, ministry visibility, and engagement workflows from one unified view."
      badge="Church OS View"
      stats={[
        { label: "Members in Pilot", value: "50" },
        { label: "Today’s Check-Ins", value: "47 / 50" },
        { label: "Volunteer Responses", value: "6" },
        { label: "Open Care Cases", value: "3" }
      ]}
      leftTitle="What churches see"
      leftItems={[
        {
          title: "Member care visibility",
          body: "Church leadership and care teams can see who checked in, who needs follow-up, and which care workflows are active."
        },
        {
          title: "Volunteer coordination",
          body: "Church OS supports structured volunteer response instead of ad hoc texting and memory-based follow-up."
        },
        {
          title: "Ministry-aware operations",
          body: "Prayer intake, follow-up prompts, engagement signals, and care workflows can live inside one system."
        }
      ]}
      rightTitle="Primary outcomes"
      rightItems={[
        {
          title: "Scalable pastoral care",
          body: "Churches gain a way to extend care without adding operational chaos."
        },
        {
          title: "Better leadership visibility",
          body: "The dashboard gives decision-makers a clearer picture of care activity and member needs."
        },
        {
          title: "Distinct Church OS identity",
          body: "This gives Church OS its own clear home instead of feeling hidden behind other LifeSignal demos."
        }
      ]}
      ctaHref="/church-demo/setup"
      ctaLabel="Build Church OS Demo"
    />
  );
}



