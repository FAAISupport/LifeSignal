export type FaithSignalFeature = {
  key: string;
  title: string;
  description: string;
  category: string;
  monthlyPrice: number;
  badge?: string;
  recommended?: boolean;
};

export const featureCatalog: FaithSignalFeature[] = [
  {
    key: "member_checkins",
    title: "Daily Member Check-Ins",
    description:
      "Automated daily text and voice check-ins for members who live alone, are homebound, or need regular follow-up.",
    category: "Care",
    monthlyPrice: 49,
    badge: "Core",
    recommended: true,
  },
  {
    key: "care_rounds",
    title: "Pastoral Care Rounds",
    description:
      "Organizes recurring care touchpoints and assignment queues for staff and trained volunteers.",
    category: "Care",
    monthlyPrice: 59,
    recommended: true,
  },
  {
    key: "prayer_triage",
    title: "Prayer Request Triage",
    description:
      "Routes incoming prayer requests by urgency, theme, and confidentiality level while tracking ownership.",
    category: "Care",
    monthlyPrice: 45,
    recommended: true,
  },
  {
    key: "absence_detection",
    title: "Absence Detection",
    description:
      "Flags missed check-ins and possible care gaps so your church can respond before situations worsen.",
    category: "Care",
    monthlyPrice: 39,
    recommended: true,
  },
  {
    key: "volunteer_dispatch",
    title: "Volunteer Dispatch",
    description:
      "Coordinates meals, rides, wellness visits, and simple response tasks across your volunteer network.",
    category: "Care",
    monthlyPrice: 55,
  },
  {
    key: "weekly_reports",
    title: "Weekly Care Reports",
    description:
      "Gives leadership a simple weekly summary of open care needs, recent activity, and unresolved issues.",
    category: "Care",
    monthlyPrice: 35,
  },
  {
    key: "first_time_guest_followup",
    title: "First-Time Guest Follow-Up",
    description:
      "Automates warm outreach to first-time guests and helps your church follow up consistently.",
    category: "Engagement",
    monthlyPrice: 42,
  },
  {
    key: "member_reengagement",
    title: "Member Re-Engagement",
    description:
      "Identifies members drifting away and triggers thoughtful follow-up before they disconnect completely.",
    category: "Engagement",
    monthlyPrice: 47,
  },
  {
    key: "event_followup",
    title: "Event Follow-Up Sequences",
    description:
      "Sends tailored follow-up messages after church events, classes, and ministry gatherings.",
    category: "Engagement",
    monthlyPrice: 34,
  },
  {
    key: "volunteer_recruiting",
    title: "Volunteer Recruiting",
    description:
      "Helps identify needs, invite the right people, and track response status for volunteer opportunities.",
    category: "Engagement",
    monthlyPrice: 38,
  },
  {
    key: "sermon_response_tracking",
    title: "Sermon Response Tracking",
    description:
      "Tracks prayer requests, decisions, and follow-up actions connected to sermon response moments.",
    category: "Engagement",
    monthlyPrice: 31,
  },
  {
    key: "giving_followup",
    title: "Giving Follow-Up",
    description:
      "Creates respectful follow-up and donor care sequences for generosity campaigns and stewardship efforts.",
    category: "Engagement",
    monthlyPrice: 36,
  },
  {
    key: "homebound_communion_tracking",
    title: "Homebound Communion Tracking",
    description:
      "Tracks homebound visits, communion delivery, and related pastoral care touchpoints.",
    category: "Pastoral",
    monthlyPrice: 44,
  },
  {
    key: "hospital_followup",
    title: "Hospital Follow-Up",
    description:
      "Triggers immediate and scheduled outreach after hospitalization or serious health events.",
    category: "Pastoral",
    monthlyPrice: 59,
    badge: "High Impact",
    recommended: true,
  },
  {
    key: "bereavement_pathways",
    title: "Bereavement Support Pathways",
    description:
      "Automates a structured follow-up sequence for grieving families over the weeks after a loss.",
    category: "Pastoral",
    monthlyPrice: 39,
  },
  {
    key: "care_timeline",
    title: "Care Timeline",
    description:
      "Provides a chronological view of care interactions, outreach attempts, and member responses.",
    category: "Pastoral",
    monthlyPrice: 41,
  },
  {
    key: "elder_alerts",
    title: "Elder Alerts",
    description:
      "Sends urgent care alerts to designated leaders when a member needs a fast response.",
    category: "Pastoral",
    monthlyPrice: 52,
  },
  {
    key: "confidential_case_notes",
    title: "Confidential Case Notes",
    description:
      "Keeps private pastoral notes and care observations organized and easier to review.",
    category: "Pastoral",
    monthlyPrice: 46,
  },
  {
    key: "family_notifications",
    title: "Family Notifications",
    description:
      "Notifies approved family members when key care events or missed check-ins occur.",
    category: "Safety",
    monthlyPrice: 43,
  },
  {
    key: "escalation_workflows",
    title: "Escalation Workflows",
    description:
      "Moves unresolved care situations through a clear escalation chain until someone responds.",
    category: "Safety",
    monthlyPrice: 62,
    badge: "Core",
    recommended: true,
  },
  {
    key: "incident_logging",
    title: "Incident Logging",
    description:
      "Captures and organizes incidents, outcomes, and response details for accountability and review.",
    category: "Safety",
    monthlyPrice: 37,
  },
  {
    key: "wellness_call_queue",
    title: "Wellness Call Queue",
    description:
      "Creates a prioritized queue of members who need direct phone follow-up from staff or volunteers.",
    category: "Safety",
    monthlyPrice: 40,
  },
  {
    key: "medication_reminders",
    title: "Medication Reminders",
    description:
      "Sends simple medication reminder messages and tracks acknowledgment for members who opt in.",
    category: "Safety",
    monthlyPrice: 48,
  },
  {
    key: "transportation_coordination",
    title: "Transportation Coordination",
    description:
      "Helps organize rides for appointments, services, and urgent member support needs.",
    category: "Safety",
    monthlyPrice: 44,
  },
  {
    key: "meal_train_coordination",
    title: "Meal Train Coordination",
    description:
      "Makes it easy to organize meal support for families facing illness, recovery, or crisis.",
    category: "Operations",
    monthlyPrice: 33,
  },
  {
    key: "task_assignment_boards",
    title: "Task Assignment Boards",
    description:
      "Tracks who owns what across staff and volunteers so care tasks do not get lost.",
    category: "Operations",
    monthlyPrice: 35,
  },
  {
    key: "staff_digest",
    title: "Staff Digest",
    description:
      "Delivers a concise summary of care actions, alerts, and upcoming needs to ministry leaders.",
    category: "Operations",
    monthlyPrice: 29,
  },
  {
    key: "multi_campus_visibility",
    title: "Multi-Campus Visibility",
    description:
      "Gives regional or multi-campus churches visibility into care activity across locations.",
    category: "Operations",
    monthlyPrice: 69,
  },
  {
    key: "role_based_access",
    title: "Role-Based Access",
    description:
      "Controls what pastors, staff, and volunteers can view or manage in the system.",
    category: "Operations",
    monthlyPrice: 32,
  },
  {
    key: "audit_history",
    title: "Audit History",
    description:
      "Maintains a traceable record of major actions for accountability and operational clarity.",
    category: "Operations",
    monthlyPrice: 28,
  },
  {
    key: "care_center_dashboard",
    title: "Care Center Dashboard",
    description:
      "Puts active signals, unresolved follow-ups, and key care metrics in one central view.",
    category: "Insights",
    monthlyPrice: 58,
    badge: "Popular",
    recommended: true,
  },
  {
    key: "care_health_scores",
    title: "Care Health Scores",
    description:
      "Shows which members or households may need attention based on recent engagement and response patterns.",
    category: "Insights",
    monthlyPrice: 51,
  },
  {
    key: "leader_metrics",
    title: "Leader Metrics",
    description:
      "Helps church leadership understand care load, response speed, and follow-through over time.",
    category: "Insights",
    monthlyPrice: 37,
  },
  {
    key: "ministry_performance",
    title: "Ministry Performance Views",
    description:
      "Compares activity and follow-up patterns across ministries, teams, or campuses.",
    category: "Insights",
    monthlyPrice: 42,
  },
  {
    key: "trend_reports",
    title: "Trend Reports",
    description:
      "Highlights patterns in member needs, missed check-ins, and volunteer activity over time.",
    category: "Insights",
    monthlyPrice: 34,
  },
  {
    key: "custom_exports",
    title: "Custom Exports",
    description:
      "Exports your church's care data for reporting, board review, or offline analysis.",
    category: "Insights",
    monthlyPrice: 27,
  },
];

export const featureCategories = Array.from(
  new Set(featureCatalog.map((feature) => feature.category))
);

export const recommendedFeatureKeys = featureCatalog
  .filter((feature) => feature.recommended)
  .map((feature) => feature.key);

export function getFeatureByKey(key: string) {
  return featureCatalog.find((feature) => feature.key === key) ?? null;
}

export type FeatureCategory = string;

export const FEATURE_CATALOG = featureCatalog;

export const FEATURE_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  featureCategories.map((category) => [category, category])
);
