export type FeatureCategory =
  | "core"
  | "care"
  | "advanced"
  | "engagement"
  | "health"
  | "operations";

export type ChurchFeature = {
  key: string;
  label: string;
  category: FeatureCategory;
  tier: "core" | "care" | "advanced" | "full";
  description: string;
  value: string;
};

export const allChurchFeatures: ChurchFeature[] = [
  {
    key: "daily_checkins",
    label: "Daily Safety Check-Ins",
    category: "core",
    tier: "core",
    description: "Daily SMS or voice safety confirmations",
    value: "Ensures every member is accounted for daily"
  },
  {
    key: "sos_help",
    label: "HELP Emergency Trigger",
    category: "core",
    tier: "core",
    description: "Members can trigger immediate alerts",
    value: "24/7 emergency coverage"
  },
  {
    key: "prayer_requests",
    label: "Prayer Request Intake",
    category: "care",
    tier: "care",
    description: "Text-based prayer routing",
    value: "Deepens pastoral connection"
  },
  {
    key: "volunteer_dispatch",
    label: "Volunteer Dispatch",
    category: "operations",
    tier: "advanced",
    description: "Assign responders in real-time",
    value: "Turns church into response network"
  },
  {
    key: "risk_dashboard",
    label: "Routine Stability Dashboard",
    category: "advanced",
    tier: "advanced",
    description: "Detect declining engagement",
    value: "Catch problems early"
  },
  {
    key: "medication_reminders",
    label: "Medication Tracking",
    category: "health",
    tier: "care",
    description: "Daily compliance reminders",
    value: "Supports recovery & health"
  },
  {
    key: "absence_detection",
    label: "Absence Detection",
    category: "engagement",
    tier: "care",
    description: "Flags disengaged members",
    value: "No one falls through the cracks"
  },
  {
    key: "weekly_reports",
    label: "Weekly Reports",
    category: "operations",
    tier: "core",
    description: "Leadership visibility",
    value: "Structured ministry oversight"
  },
  {
    key: "care_timeline",
    label: "Care Timeline",
    category: "operations",
    tier: "core",
    description: "Full audit log",
    value: "Continuity of care"
  },
  {
    key: "neighbor_network",
    label: "Neighbor Check System",
    category: "operations",
    tier: "advanced",
    description: "Nearby responders",
    value: "Hyper-local care response"
  }
];
