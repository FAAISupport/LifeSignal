export type FeatureCategory =
  | "core"
  | "care"
  | "advanced"
  | "engagement"
  | "health"
  | "operations";

export type ChurchFeatureKey =
  | "daily_checkins"
  | "sos_help"
  | "prayer_requests"
  | "medication_reminders"
  | "volunteer_dispatch"
  | "risk_dashboard"
  | "absence_detection"
  | "weekly_reports"
  | "care_timeline"
  | "broadcast_messaging"
  | "daily_devotional"
  | "small_group_tracking"
  | "missed_sunday_trigger"
  | "senior_priority_mode"
  | "post_hospital_FaithSignaly"
  | "cognitive_decline_signals"
  | "neighbor_network"
  | "meal_care_delivery"
  | "pastoral_followup_prompts"
  | "event_attendance_confirmation";

export type ChurchFeature = {
  key: ChurchFeatureKey;
  label: string;
  short: string;
  category: FeatureCategory;
  tier: "core" | "care" | "advanced" | "full";
  description: string;
  valuePitch: string;
};

export type ChurchDemoConfig = {
  slug: string;
  churchName: string;
  city: string;
  state: string;
  audienceType: string;
  pilotSize: number;
  checkInTime: string;
  responseWindowMinutes: number;
  escalationDelayMinutes: number;
  coordinatorName: string;
  pastorName: string;
  careMinistryName: string;
  primaryGoal: string;
  notes: string;
  enabledFeatures: ChurchFeatureKey[];
};

export const allChurchFeatures: ChurchFeature[] = [
  {
    key: "daily_checkins",
    label: "Daily Safety Check-Ins",
    short: "SMS or voice wellness confirmation",
    category: "core",
    tier: "core",
    description: "Members receive a daily text or automated voice call asking them to confirm they are safe.",
    valuePitch: "Creates dependable daily contact for seniors and members living alone."
  },
  {
    key: "sos_help",
    label: "HELP / SOS Escalation",
    short: "Member-initiated emergency trigger",
    category: "core",
    tier: "core",
    description: "Members can text HELP at any time to trigger an immediate alert and escalation workflow.",
    valuePitch: "Gives the church a 24/7 emergency pathway without requiring an app."
  },
  {
    key: "weekly_reports",
    label: "Weekly Leadership Reports",
    short: "Executive visibility for staff",
    category: "operations",
    tier: "core",
    description: "Provides leadership with summary metrics, outcomes, and operational visibility.",
    valuePitch: "Makes the program feel structured, measurable, and leadership-ready."
  },
  {
    key: "care_timeline",
    label: "Member Care Timeline",
    short: "Auditable care history",
    category: "operations",
    tier: "core",
    description: "Records check-ins, responses, escalations, and interventions in one timeline per member.",
    valuePitch: "Creates continuity across staff, volunteers, and family contacts."
  },
  {
    key: "prayer_requests",
    label: "Prayer Request Intake",
    short: "Text-based prayer request routing",
    category: "care",
    tier: "care",
    description: "Members can submit prayer requests by text or form and route them to the right ministry team.",
    valuePitch: "Adds a pastoral care layer that feels familiar and deeply personal."
  },
  {
    key: "medication_reminders",
    label: "Medication / Routine Reminders",
    short: "Simple DONE-style confirmations",
    category: "health",
    tier: "care",
    description: "Scheduled reminders can ask members to confirm medications,  routines, or daily tasks.",
    valuePitch: "Useful for FaithSignaly ministry, elder care, and higher-risk member support."
  },
  {
    key: "absence_detection",
    label: "Absence Detection",
    short: "Flags quiet disengagement",
    category: "engagement",
    tier: "care",
    description: "Highlights members who stop responding consistently and may need outreach or follow-up.",
    valuePitch: "Helps the church notice when someone quietly disappears from daily life."
  },
  {
    key: "broadcast_messaging",
    label: "Ministry Broadcast Messaging",
    short: "Opt-in updates and notices",
    category: "engagement",
    tier: "care",
    description: "Send ministry-related alerts like schedule changes, event reminders, and urgent notices.",
    valuePitch: "Keeps members informed through the same communication channel they already use."
  },
  {
    key: "daily_devotional",
    label: "Daily Devotional Check-In",
    short: "Spiritual engagement plus response tracking",
    category: "care",
    tier: "care",
    description: "Send a short devotional and simple reply prompt to blend spiritual care with daily check-ins.",
    valuePitch: "Improves engagement while making check-ins feel more personal and ministry-centered."
  },
  {
    key: "small_group_tracking",
    label: "Small Group Wellness Tracking",
    short: "Group leader care visibility",
    category: "engagement",
    tier: "care",
    description: "Assign members to small groups and allow leaders to monitor response patterns and follow-up needs.",
    valuePitch: "Pushes care deeper into the congregation without increasing staff load."
  },
  {
    key: "missed_sunday_trigger",
    label: "Missed Sunday Trigger",
    short: "Follow up when attendance drops",
    category: "engagement",
    tier: "care",
    description: "Flag regular attendees who disengage or stop responding and prompt timely outreach.",
    valuePitch: "Helps churches identify quiet disengagement before it becomes complete disconnection."
  },
  {
    key: "senior_priority_mode",
    label: "Senior Priority Monitoring Mode",
    short: "Higher care sensitivity",
    category: "health",
    tier: "advanced",
    description: "Allows higher-priority members to receive faster escalation, tighter response windows, or more frequent contact.",
    valuePitch: "Provides stronger coverage for members with greater vulnerability."
  },
  {
    key: "post_hospital_FaithSignaly",
    label: "Post-Hospital FaithSignaly Protocol",
    short: "Structured FaithSignaly workflows",
    category: "health",
    tier: "advanced",
    description: "Create short-term structured outreach for members returning home after hospital stays, procedures, or health events.",
    valuePitch: "Turns the church into a more dependable FaithSignaly support system."
  },
  {
    key: "cognitive_decline_signals",
    label: "Cognitive Decline Signals",
    short: "Early change detection",
    category: "health",
    tier: "advanced",
    description: "Track response delays, inconsistency, and behavioral changes that may indicate emerging cognitive concerns.",
    valuePitch: "Helps leaders and families notice pattern changes earlier."
  },
  {
    key: "volunteer_dispatch",
    label: "Volunteer Dispatch",
    short: "Real-time response coordination",
    category: "operations",
    tier: "advanced",
    description: "Escalations can notify volunteers and allow them to accept, respond, and close the loop.",
    valuePitch: "Turns the church care team into an organized, rapid-response network."
  },
  {
    key: "risk_dashboard",
    label: "Routine Stability Dashboard",
    short: "Early warning visibility",
    category: "advanced",
    tier: "advanced",
    description: "Tracks missed check-ins, slow responses, and repeated escalations to identify higher-risk members.",
    valuePitch: "Helps leaders spot concerns before they become crises."
  },
  {
    key: "neighbor_network",
    label: "Neighbor Check System",
    short: "Hyper-local backup responders",
    category: "operations",
    tier: "advanced",
    description: "Assign nearby members or trusted responders to check in physically when a higher-risk escalation occurs.",
    valuePitch: "Creates a fast local care net that feels natural in church communities."
  },
  {
    key: "meal_care_delivery",
    label: "Meal / Care Delivery Coordination",
    short: "Volunteer care assignments",
    category: "operations",
    tier: "advanced",
    description: "Coordinate follow-up care tasks like meals, check-ins, and support visits through structured alerts.",
    valuePitch: "Transforms response into practical support, not just notification."
  },
  {
    key: "pastoral_followup_prompts",
    label: "Pastoral Follow-Up Prompts",
    short: "Pastor and staff nudges",
    category: "care",
    tier: "advanced",
    description: "Generate follow-up prompts for pastors or staff when members show concerning patterns or repeated missed responses.",
    valuePitch: "Improves consistency in pastoral care without relying on memory alone."
  },
  {
    key: "event_attendance_confirmation",
    label: "Event Attendance Confirmation",
    short: "YES/NO ministry RSVP by text",
    category: "engagement",
    tier: "full",
    description: "Allow members to confirm attendance for events, Bible studies, or ministry gatherings by SMS.",
    valuePitch: "Extends the platform into engagement and participation workflows."
  }
];

export const churchDemoConfigs: Record<string, ChurchDemoConfig> = {
  fairway: {
    slug: "fairway",
    churchName: "Fairway Christian Church",
    city: "The Villages",
    state: "FL",
    audienceType: "Senior-heavy congregation with care ministry potential",
    pilotSize: 50,
    checkInTime: "9:00 AM",
    responseWindowMinutes: 45,
    escalationDelayMinutes: 20,
    coordinatorName: "Judd Spence",
    pastorName: "Church Leadership Team",
    careMinistryName: "Member Care Team",
    primaryGoal: "Provide reliable daily wellness coverage for members living alone.",
    notes: "Position the pilot as a modern extension of congregational care with zero app download friction.",
    enabledFeatures: [
      "daily_checkins",
      "sos_help",
      "weekly_reports",
      "care_timeline",
      "prayer_requests",
      "volunteer_dispatch",
      "neighbor_network",
      "pastoral_followup_prompts"
    ]
  },
  "new-covenant": {
    slug: "new-covenant",
    churchName: "New Covenant United Methodist Church",
    city: "The Villages",
    state: "FL",
    audienceType: "Pastoral care and structured member outreach",
    pilotSize: 40,
    checkInTime: "9:30 AM",
    responseWindowMinutes: 60,
    escalationDelayMinutes: 20,
    coordinatorName: "Judd Spence",
    pastorName: "Church Leadership Team",
    careMinistryName: "Congregational Care Team",
    primaryGoal: "Create a measurable care system for routine wellness and member follow-up.",
    notes: "Emphasize ministry stewardship, consistent care visibility, and stronger family peace of mind.",
    enabledFeatures: [
      "daily_checkins",
      "prayer_requests",
      "weekly_reports",
      "care_timeline",
      "absence_detection",
      "risk_dashboard",
      "daily_devotional",
      "small_group_tracking"
    ]
  },
  "north-lake": {
    slug: "north-lake",
    churchName: "North Lake Presbyterian Church",
    city: "Lady Lake",
    state: "FL",
    audienceType: "Community-centered church with pastoral care opportunities",
    pilotSize: 30,
    checkInTime: "10:00 AM",
    responseWindowMinutes: 60,
    escalationDelayMinutes: 25,
    coordinatorName: "Judd Spence",
    pastorName: "Church Leadership Team",
    careMinistryName: "Care Ministry Team",
    primaryGoal: "Ensure no vulnerable member goes unnoticed during the week.",
    notes: "Present LifeSignal as a calm, reliable care infrastructure layer for members and families.",
    enabledFeatures: [
      "daily_checkins",
      "sos_help",
      "care_timeline",
      "weekly_reports",
      "broadcast_messaging",
      "meal_care_delivery",
      "missed_sunday_trigger"
    ]
  }
};

export function getChurchConfig(slug: string): ChurchDemoConfig | null {
  return churchDemoConfigs[slug] ?? null;
}

export function getFeatureDetails(keys: ChurchFeatureKey[]) {
  return allChurchFeatures.filter((feature) => keys.includes(feature.key));
}

export function getGroupedFeatures() {
  return {
    core: allChurchFeatures.filter((feature) => feature.category === "core"),
    care: allChurchFeatures.filter((feature) => feature.category === "care"),
    advanced: allChurchFeatures.filter(
      (feature) =>
        feature.category === "advanced" ||
        feature.category === "operations" ||
        feature.tier === "advanced" ||
        feature.tier === "full"
    ),
    engagement: allChurchFeatures.filter((feature) => feature.category === "engagement"),
    health: allChurchFeatures.filter((feature) => feature.category === "health"),
    operations: allChurchFeatures.filter((feature) => feature.category === "operations")
  };
}

export function getChurchTier(featureCount: number) {
  if (featureCount >= 12) return "Full Church OS";
  if (featureCount >= 8) return "Advanced Care System";
  if (featureCount >= 5) return "Expanded Care System";
  return "Core Care System";
}

export function calculateChurchPricing(memberCount: number, features: ChurchFeatureKey[]) {
  const basePerMember = 9;
  const featureCount = features.length;

  let multiplier = 1;
  if (featureCount >= 12) multiplier = 1.65;
  else if (featureCount >= 8) multiplier = 1.35;
  else if (featureCount >= 5) multiplier = 1.18;

  const monthly = Math.round(memberCount * basePerMember * multiplier);
  const annual = monthly * 12;
  const perMember = Number((monthly / Math.max(memberCount, 1)).toFixed(2));

  return { monthly, annual, perMember };
}

export function getCoverageLabels(features: ChurchFeatureKey[]) {
  const selected = getFeatureDetails(features);
  const categories = Array.from(new Set(selected.map((item) => item.category)));

  return {
    care: categories.includes("care") || categories.includes("core"),
    engagement: categories.includes("engagement"),
    health: categories.includes("health"),
    operations: categories.includes("operations"),
    advanced: categories.includes("advanced")
  };
}

export function slugifyChurchName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

