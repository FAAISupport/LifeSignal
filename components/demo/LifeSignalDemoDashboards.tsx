"use client"

import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarClock,
  Car,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  HeartHandshake,
  Home,
  MapPinned,
  MessageSquare,
  PanelLeft,
  Pill,
  Search,
  Shield,
  Siren,
  Sparkles,
  Stethoscope,
  UserCircle2,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

type RoleKey = "family" | "caregiver" | "recover" | "postop" | "agency";
type IconType = React.ComponentType<{ className?: string }>;

type StatItem = {
  label: string;
  value: string;
  icon: IconType;
  tip: string;
};

type PersonItem = {
  name: string;
  relation: string;
  status: string;
  time: string;
  risk: string;
  phone: string;
  notes: string;
};

type ActionItem = {
  title: string;
  description: string;
  tip: string;
};

type QueueItem = {
  client: string;
  need: string;
  priority: string;
  due: string;
  owner: string;
  tip: string;
};

type PanelCard = {
  title: string;
  body: string;
  icon: IconType;
  tip: string;
};

type AgencyModule = {
  title: string;
  description: string;
  icon: IconType;
  tip: string;
};

type ProgramRow = {
  program: string;
  clients: number;
  completion: string;
  alerts: number;
  owner: string;
};

type CalendarItem = {
  day: string;
  date: string;
  title: string;
  time: string;
  status: string;
  tip: string;
};

type TriggerCell = {
  label: string;
  level: number;
  note: string;
};

type MessageItem = {
  from: string;
  role: string;
  time: string;
  body: string;
  mine?: boolean;
};

type HealingItem = {
  day: string;
  title: string;
  detail: string;
  status: string;
  tip: string;
};

type VitalItem = {
  label: string;
  value: string;
  range: string;
  tip: string;
};

const shellCard = "rounded-3xl border border-slate-200 bg-white shadow-sm";
const darkText = "text-slate-900";

const roleMeta: Record<
  RoleKey,
  { label: string; subtitle: string; icon: IconType; color: string }
> = {
  family: {
    label: "Family Dashboard",
    subtitle:
      "A reassurance-first view for loved ones who want simple visibility and fast alerts.",
    icon: HeartHandshake,
    color: "from-sky-500 to-cyan-400",
  },
  caregiver: {
    label: "Caregiver Dashboard",
    subtitle:
      "A daily operations view for caregivers managing multiple check-ins, medication routines, and escalations.",
    icon: Stethoscope,
    color: "from-violet-500 to-fuchsia-400",
  },
  recover: {
    label: "LifeSignal Recover",
    subtitle:
      "A recovery-focused dashboard for accountability, wellness tracking, relapse prevention, sponsor visibility, and structured daily progress.",
    icon: CheckCircle2,
    color: "from-amber-500 to-orange-400",
  },
  postop: {
    label: "LifeSignal PostOP",
    subtitle:
      "A recovery monitoring dashboard for patients during the post-surgery period tracking pain, medication adherence, mobility, and complications.",
    icon: Stethoscope,
    color: "from-rose-500 to-pink-400",
  },
  agency: {
    label: "Agency Dashboard",
    subtitle:
      "A command-center view for teams, coordinators, and agencies rolling out LifeSignal across many clients.",
    icon: Building2,
    color: "from-emerald-500 to-teal-400",
  },
};

const familyData: {
  stats: StatItem[];
  people: PersonItem[];
  timeline: string[];
  actions: ActionItem[];
} = {
  stats: [
    {
      label: "Loved ones monitored",
      value: "3",
      icon: Users,
      tip: "Shows how many people this family account is currently following.",
    },
    {
      label: "Today's successful check-ins",
      value: "2 / 3",
      icon: CheckCircle2,
      tip: "Quick snapshot of who has responded today and who still needs attention.",
    },
    {
      label: "Active alerts",
      value: "1",
      icon: Bell,
      tip: "Important issues that need the family's review right now.",
    },
    {
      label: "Upcoming reminders",
      value: "4",
      icon: CalendarClock,
      tip: "Scheduled check-ins, medication nudges, and routine reminders coming later today.",
    },
  ],
  people: [
    {
      name: "Mary Spence",
      relation: "Mother",
      status: "Checked in",
      time: "8:14 AM",
      risk: "Stable",
      phone: "SMS + Voice",
      notes: "Responded YES on first prompt. No follow-up needed.",
    },
    {
      name: "Tom Spence",
      relation: "Father",
      status: "Reminder sent",
      time: "10:05 AM",
      risk: "Watch",
      phone: "Voice preferred",
      notes: "Missed first outreach. Reminder and family notification triggered.",
    },
    {
      name: "Linda Brooks",
      relation: "Aunt",
      status: "Checked in",
      time: "7:42 AM",
      risk: "Stable",
      phone: "SMS",
      notes: "Requested later medication reminder at 1:00 PM.",
    },
  ],
  timeline: [
    "7:42 AM · Linda checked in by text",
    "8:14 AM · Mary checked in by text",
    "9:30 AM · Tom missed first check-in window",
    "10:05 AM · Reminder sent to Tom",
    "10:12 AM · Family alert posted to dashboard",
  ],
  actions: [
    {
      title: "View loved one profile",
      description:
        "Open routines, preferred contact method, notes, and alert history.",
      tip: "Families can review profile details without changing deeper program settings.",
    },
    {
      title: "Acknowledge alert",
      description:
        "Mark that a family member is responding so others know follow-up is underway.",
      tip: "This helps reduce duplicate calls and confusion during missed check-ins.",
    },
    {
      title: "Send reassurance message",
      description:
        "Quick-send a caring SMS or reminder message from the dashboard.",
      tip: "Useful when a family member wants to personally follow up after an automated reminder.",
    },
    {
      title: "Emergency contact panel",
      description:
        "Instantly see and call all emergency contacts for a loved one.",
      tip: "Designed for quick action if something looks wrong.",
    },
    {
      title: "Live wellbeing indicator",
      description:
        "Visual indicator showing stability trends over recent days.",
      tip: "Helps families notice subtle changes in response behavior.",
    },
    {
      title: "Daily reassurance summary",
      description:
        "Receive a simple summary message showing everyone checked in.",
      tip: "Removes the need to manually verify every person.",
    },
    {
      title: "Routine builder",
      description:
        "Create custom check-in routines for mornings, evenings, or medication.",
      tip: "Families can tailor routines for each loved one.",
    },
    {
      title: "Care circle management",
      description:
        "Add siblings, neighbors, or friends into the safety loop.",
      tip: "Shared responsibility reduces caregiver burnout.",
    },
    {
      title: "Voice reassurance calls",
      description:
        "Trigger a quick automated call asking if everything is okay.",
      tip: "Helpful for seniors who prefer voice over texting.",
    },
  ],
};

const caregiverData: {
  stats: StatItem[];
  queue: QueueItem[];
  panelCards: PanelCard[];
} = {
  stats: [
    {
      label: "Clients on roster",
      value: "18",
      icon: Users,
      tip: "Total active clients assigned to this caregiver.",
    },
    {
      label: "Pending check-ins",
      value: "5",
      icon: Clock3,
      tip: "Clients still awaiting response within today's outreach window.",
    },
    {
      label: "Medication tasks",
      value: "12",
      icon: Pill,
      tip: "Medication reminders or follow-up confirmations due today.",
    },
    {
      label: "Escalations in progress",
      value: "2",
      icon: Siren,
      tip: "Cases requiring direct caregiver action or secondary contact outreach.",
    },
  ],
  queue: [
    {
      client: "Robert Neal",
      need: "Missed morning check-in",
      priority: "High",
      due: "Now",
      owner: "J. Carter",
      tip: "High-priority items should trigger direct caregiver review and rapid follow-up.",
    },
    {
      client: "Janice Bell",
      need: "Medication confirmation",
      priority: "Medium",
      due: "11:30 AM",
      owner: "You",
      tip: "Medication workflows can be tracked separately from general safety check-ins.",
    },
    {
      client: "Marco Diaz",
      need: "Post-hospital recovery check",
      priority: "Medium",
      due: "1:00 PM",
      owner: "You",
      tip: "Recovery plans can include extra check-ins for a defined period after discharge.",
    },
    {
      client: "Elaine Porter",
      need: "Update caregiver note",
      priority: "Low",
      due: "2:15 PM",
      owner: "You",
      tip: "Notes help preserve continuity across shifts and team members.",
    },
  ],
  panelCards: [
    {
      title: "Daily care board",
      body: "See who needs attention first, what reminders are due, and which escalations need action.",
      icon: ClipboardList,
      tip: "Think of this as the caregiver's operational queue for the day.",
    },
    {
      title: "Medication oversight",
      body: "Track reminder status, confirmations, and missed medication acknowledgements.",
      icon: Pill,
      tip: "Medication support is visible as a separate workflow.",
    },
    {
      title: "Care notes and handoff",
      body: "Document status updates, concerns, observations, and next steps for other caregivers.",
      icon: FileText,
      tip: "Handoff notes matter when multiple people support the same client across different times of day.",
    },
    {
      title: "Client stability scoring",
      body: "AI-assisted scoring highlighting potential wellbeing changes.",
      icon: Activity,
      tip: "Helps caregivers prioritize people who may need attention.",
    },
    {
      title: "Transportation coordination",
      body: "Track rides to appointments, therapy, or pharmacy pickups.",
      icon: Car,
      tip: "Ensures clients maintain essential routines.",
    },
    {
      title: "Emergency escalation console",
      body: "One-click escalation to family, neighbors, or emergency services.",
      icon: Siren,
      tip: "Critical response control during urgent events.",
    },
  ],
};

const recoverData: {
  stats: StatItem[];
  queue: QueueItem[];
  panelCards: PanelCard[];
  milestones: ActionItem[];
  streak: { day: string; score: number }[];
  calendar: CalendarItem[];
  heatmap: TriggerCell[];
  messages: MessageItem[];
} = {
  stats: [
    {
      label: "Days sober",
      value: "143",
      icon: CheckCircle2,
      tip: "Tracks the current recovery streak and reinforces momentum.",
    },
    {
      label: "Meetings this week",
      value: "4 / 5",
      icon: CalendarClock,
      tip: "Shows meeting attendance progress against the weekly goal.",
    },
    {
      label: "Sponsor check-ins",
      value: "3",
      icon: MessageSquare,
      tip: "Counts completed sponsor or accountability partner touchpoints.",
    },
    {
      label: "Risk alerts",
      value: "1",
      icon: AlertTriangle,
      tip: "Flags wellness or missed-accountability events needing attention.",
    },
  ],
  queue: [
    {
      client: "Marcus Hill",
      need: "Missed evening recovery check-in",
      priority: "High",
      due: "Now",
      owner: "Sponsor",
      tip: "High-risk missed check-ins can trigger sponsor outreach and accountability escalation.",
    },
    {
      client: "Renee Brooks",
      need: "Log meeting attendance",
      priority: "Medium",
      due: "6:00 PM",
      owner: "You",
      tip: "Attendance logging helps create structure and measurable consistency.",
    },
    {
      client: "Devon Ross",
      need: "Craving alert follow-up",
      priority: "High",
      due: "5:15 PM",
      owner: "Coach",
      tip: "Craving alerts create an opportunity for immediate support before relapse.",
    },
  ],
  panelCards: [
    {
      title: "Sobriety tracker",
      body: "Monitor streaks, reset history, and major recovery milestones over time.",
      icon: CheckCircle2,
      tip: "Gives users and sponsors a clear picture of consistency and progress.",
    },
    {
      title: "Craving and trigger log",
      body: "Capture cravings, triggers, moods, and intervention notes in one place.",
      icon: Bell,
      tip: "This helps identify patterns that may predict relapse risk.",
    },
    {
      title: "Meeting attendance board",
      body: "Track support-group meetings, appointments, and accountability sessions.",
      icon: CalendarClock,
      tip: "Recovery often improves when structure and attendance stay visible.",
    },
    {
      title: "Sponsor connection hub",
      body: "Log sponsor outreach, missed contacts, and same-day follow-up needs.",
      icon: HeartHandshake,
      tip: "Sponsors and accountability partners play a central role in the Recover workflow.",
    },
    {
      title: "Relapse prevention plan",
      body: "Store the personal intervention plan, emergency contacts, and coping steps.",
      icon: Shield,
      tip: "Users can quickly revisit their plan when they feel vulnerable.",
    },
  ],
  milestones: [
    {
      title: "30-day milestone",
      description: "Celebrate the first major consistency milestone with supportive outreach.",
      tip: "Milestones help reinforce effort and remind the user how far they have come.",
    },
    {
      title: "Sponsor accountability cadence",
      description: "Set the target frequency for sponsor check-ins each week.",
      tip: "Structured accountability reduces drift and creates a dependable rhythm.",
    },
    {
      title: "Trigger response plan",
      description: "Document what happens when cravings, isolation, or emotional lows appear.",
      tip: "The faster a plan can be followed, the easier it is to interrupt risky behavior.",
    },
  ],
  streak: [
    { day: "Mon", score: 78 },
    { day: "Tue", score: 82 },
    { day: "Wed", score: 76 },
    { day: "Thu", score: 88 },
    { day: "Fri", score: 91 },
    { day: "Sat", score: 86 },
    { day: "Sun", score: 93 },
  ],
  calendar: [
    {
      day: "Mon",
      date: "Mar 16",
      title: "Morning meeting",
      time: "8:00 AM",
      status: "Attended",
      tip: "Support-group attendance is a core Recover accountability metric.",
    },
    {
      day: "Tue",
      date: "Mar 17",
      title: "Sponsor call",
      time: "6:30 PM",
      status: "Scheduled",
      tip: "Sponsor calls provide real-time accountability and emotional support.",
    },
    {
      day: "Wed",
      date: "Mar 18",
      title: "Therapy session",
      time: "2:00 PM",
      status: "Scheduled",
      tip: "Therapy appointments are part of the broader recovery support system.",
    },
  ],
  heatmap: [
    { label: "Stress", level: 3, note: "Work pressure increased Tuesday afternoon." },
    { label: "Isolation", level: 2, note: "Skipped one social touchpoint this week." },
    { label: "Sleep", level: 4, note: "Two nights below target sleep duration." },
    { label: "Cravings", level: 5, note: "Highest risk around 5 PM and payday." },
  ],
  messages: [
    {
      from: "Sarah M.",
      role: "Sponsor",
      time: "4:42 PM",
      body: "Checking in before the evening window. How are you feeling right now?",
    },
    {
      from: "You",
      role: "Recover User",
      time: "4:45 PM",
      body: "A little stressed, but still on track. I am going to the 7 PM meeting.",
      mine: true,
    },
    {
      from: "Sarah M.",
      role: "Sponsor",
      time: "4:46 PM",
      body: "Good. Text me once you arrive. If cravings spike before then, use your response plan and call me.",
    },
  ],
};

const postopData: {
  stats: StatItem[];
  tasks: ActionItem[];
  painTrend: { day: string; score: number }[];
  healingTimeline: HealingItem[];
  vitals: VitalItem[];
  messages: MessageItem[];
  riskModules: ActionItem[];
} = {
  stats: [
    {
      label: "Days since surgery",
      value: "6",
      icon: CalendarClock,
      tip: "Tracks the number of days since surgery.",
    },
    {
      label: "Medication adherence",
      value: "92%",
      icon: Pill,
      tip: "Measures how consistently medications were confirmed.",
    },
    {
      label: "Pain level today",
      value: "3 / 10",
      icon: Activity,
      tip: "Daily pain score submitted by the patient.",
    },
    {
      label: "Complication alerts",
      value: "0",
      icon: AlertTriangle,
      tip: "Potential warning signs detected by the system.",
    },
  ],
  tasks: [
    {
      title: "Morning pain check-in",
      description: "Patient submitted pain score and mobility report.",
      tip: "Daily symptom tracking helps detect complications.",
    },
    {
      title: "Medication confirmation",
      description: "Antibiotic dose confirmed at 9:00 AM.",
      tip: "Medication adherence supports healing.",
    },
    {
      title: "Mobility exercise",
      description: "Light walking exercise logged for rehabilitation.",
      tip: "Mobility tracking ensures recovery progress.",
    },
    {
      title: "Wound photo upload",
      description: "Patient submitted incision image for review.",
      tip: "Photo monitoring allows remote wound assessment.",
    },
  ],
  painTrend: [
    { day: "Day 1", score: 7 },
    { day: "Day 2", score: 6 },
    { day: "Day 3", score: 6 },
    { day: "Day 4", score: 5 },
    { day: "Day 5", score: 4 },
    { day: "Day 6", score: 3 },
  ],
  healingTimeline: [
    {
      day: "Day 1",
      title: "Procedure complete",
      detail: "Discharge instructions reviewed and first recovery plan activated.",
      status: "Complete",
      tip: "The recovery timeline starts with surgery day and initial discharge guidance.",
    },
    {
      day: "Day 2",
      title: "Pain and mobility baseline",
      detail: "Pain score logged. Assisted walking started with no acute warning signs.",
      status: "Complete",
      tip: "PostOP establishes an early baseline so worsening symptoms are easier to spot.",
    },
    {
      day: "Day 4",
      title: "Incision review",
      detail: "Photo submitted. Mild swelling noted but within expected range.",
      status: "Reviewed",
      tip: "Remote incision review helps the care team spot concerns without an unnecessary trip.",
    },
  ],
  vitals: [
    {
      label: "Temperature",
      value: "98.4°F",
      range: "Normal",
      tip: "Elevated temperature can be an early infection signal after surgery.",
    },
    {
      label: "Blood pressure",
      value: "124 / 78",
      range: "Stable",
      tip: "Blood pressure trends can help clinicians monitor recovery tolerance and medication response.",
    },
    {
      label: "Oxygen saturation",
      value: "97%",
      range: "Normal",
      tip: "Oxygen tracking is especially useful after procedures affecting breathing or mobility.",
    },
    {
      label: "Heart rate",
      value: "76 bpm",
      range: "Stable",
      tip: "Heart rate shifts can help identify pain spikes or dehydration.",
    },
  ],
  messages: [
    {
      from: "Nurse Elena",
      role: "PostOP Nurse",
      time: "10:20 AM",
      body: "Thanks for sending the incision photo. Swelling looks mild and expected today. Keep the area clean and dry.",
    },
    {
      from: "You",
      role: "Patient",
      time: "10:24 AM",
      body: "Pain is lower this morning. I walked twice and took the antibiotic on time.",
      mine: true,
    },
    {
      from: "Dr. Shah",
      role: "Surgeon",
      time: "10:31 AM",
      body: "Good progress. Continue the mobility plan and message us right away if fever, drainage, or sharp pain increases.",
    },
  ],
  riskModules: [
    {
      title: "Complication AI detector",
      description: "Analyzes symptoms, vitals, wound notes, and recovery changes for early concern signals.",
      tip: "This module flags infection risk, mobility setbacks, and symptom combinations that deserve clinician review.",
    },
    {
      title: "30-day readmission risk predictor",
      description: "Estimates near-term readmission risk based on adherence, symptoms, vitals, and recovery friction points.",
      tip: "Helps care teams intervene before minor issues turn into a hospital return.",
    },
  ],
};

const agencyData: {
  stats: StatItem[];
  modules: AgencyModule[];
  table: ProgramRow[];
} = {
  stats: [
    {
      label: "Active clients",
      value: "246",
      icon: Users,
      tip: "Total people actively enrolled across the agency.",
    },
    {
      label: "Team members",
      value: "17",
      icon: UserCircle2,
      tip: "Care coordinators, admins, and frontline staff with access to the platform.",
    },
    {
      label: "Sites or programs",
      value: "6",
      icon: Home,
      tip: "Different offices, communities, or program groups being managed in one place.",
    },
    {
      label: "Today's response rate",
      value: "94%",
      icon: Activity,
      tip: "Agency-level performance across check-ins for the day.",
    },
  ],
  modules: [
    {
      title: "Portfolio overview",
      description:
        "Monitor check-in completion, missed-response trends, and active programs from one screen.",
      icon: PanelLeft,
      tip: "Leadership gets a top-down view instead of needing to check each client manually.",
    },
    {
      title: "Staff routing and permissions",
      description:
        "Assign clients, control access by role, and manage who can edit alerts or account settings.",
      icon: Shield,
      tip: "Agency dashboards need role-based controls so people only see what fits their responsibilities.",
    },
    {
      title: "Reporting and compliance",
      description:
        "Review engagement rates, missed-check patterns, and operational activity logs.",
      icon: FileText,
      tip: "Useful for proving service quality, internal operations, and program outcomes.",
    },
    {
      title: "Community rollout toolkit",
      description:
        "Tools for launching LifeSignal across senior communities.",
      icon: Home,
      tip: "Designed for multi-site deployment.",
    },
    {
      title: "Program performance analytics",
      description: "Compare engagement and safety metrics across programs.",
      icon: BarChart3,
      tip: "Helps leadership improve program outcomes.",
    },
  ],
  table: [
    {
      program: "The Villages Pilot",
      clients: 48,
      completion: "96%",
      alerts: 3,
      owner: "M. Harris",
    },
    {
      program: "Recovery Support East",
      clients: 61,
      completion: "91%",
      alerts: 7,
      owner: "J. Patel",
    },
    {
      program: "Family Care Circle",
      clients: 39,
      completion: "95%",
      alerts: 2,
      owner: "S. Romero",
    },
  ],
};

const aiCards: ActionItem[] = [
  {
    title: "AI Safety Score",
    description: "Overall wellbeing confidence indicator.",
    tip: "A composite score calculated from check-in reliability, routine changes, and response patterns.",
  },
  {
    title: "Behavior Change Detection",
    description: "Flags subtle shifts in daily patterns.",
    tip: "Detects behavioral changes such as missed routines, slower responses, or irregular schedules.",
  },
  {
    title: "Loneliness Signal",
    description: "Alerts when someone may need social contact.",
    tip: "Identifies signs of social isolation based on reduced engagement and communication patterns.",
  },
  {
    title: "Fall-Risk Prediction",
    description: "Helps caregivers intervene earlier.",
    tip: "Predicts elevated fall risk based on missed check-ins, mobility reports, and health events.",
  },
  {
    title: "Medication Adherence AI",
    description: "Identifies patterns of missed medication.",
    tip: "Tracks medication response confirmations and missed doses to calculate adherence trends.",
  },
  {
    title: "Emergency Simulation Mode",
    description: "Demonstrates how LifeSignal responds to critical events.",
    tip: "Simulated emergency scenario showing how alerts escalate through family, caregivers, and emergency contacts.",
  },
];

const visualizationCards: ActionItem[] = [
  {
    title: "Escalation Visualization",
    description: "Animated chain showing how alerts travel through the safety network.",
    tip: "Shows the chain of escalation when a check-in is missed: system to family to caregiver to emergency contact.",
  },
  {
    title: "Community Safety Map",
    description: "Map view showing where people are being monitored.",
    tip: "Displays monitored users across homes, communities, or facilities on a geographic map.",
  },
  {
    title: "Safety Circle Graph",
    description: "Visual network of the people connected around one person's care.",
    tip: "Illustrates how family, neighbors, caregivers, and agencies form a human safety network.",
  },
  {
    title: "Neighbor Response Alerts",
    description: "Shows when a nearby trusted contact is the next responder in the chain.",
    tip: "Useful in communities where a nearby neighbor can check in faster than distant family.",
  },
  {
    title: "Day-in-the-Life Simulation",
    description: "Demonstrates automated check-ins throughout a typical day.",
    tip: "Simulates a full day of LifeSignal activity including check-ins, reminders, and escalations.",
  },
];

const demoTestCases = [
  "Switch between all five roles and confirm the hero title updates.",
  "Hover over any stat card and verify the info balloon appears.",
  "Open a non-Overview section from the sidebar and confirm the detail panel renders.",
  "Confirm Recover and PostOP charts render without runtime errors.",
  "Confirm the Community Safety Map, Safety Circle Graph, and Neighbor Response Alerts render.",
  "Type in the search field and verify the yellow helper message appears.",
];

function InfoBalloon({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-slate-700 shadow-xl">
      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-sky-200 bg-sky-50" />
      {text}
    </div>
  );
}

function HoverExplain({
  children,
  text,
  className = "",
}: {
  children: React.ReactNode;
  text: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open ? <InfoBalloon text={text} /> : null}
    </div>
  );
}

function Sidebar({
  role,
  setRole,
  active,
  setActive,
}: {
  role: RoleKey;
  setRole: (role: RoleKey) => void;
  active: string;
  setActive: (value: string) => void;
}) {
  const menus: Record<RoleKey, string[]> = {
    family: ["Overview", "Loved Ones", "Alerts", "Messages", "Schedule"],
    caregiver: ["Overview", "Care Board", "Medication", "Notes", "Escalations"],
    recover: ["Overview", "Action Board", "Meetings", "Triggers", "Milestones"],
    postop: ["Overview", "Pain", "Healing", "Vitals", "Messages"],
    agency: ["Overview", "Programs", "Staff", "Reports", "Settings"],
  };

  return (
    <aside className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3 rounded-2xl bg-slate-950 p-4 text-white">
        <div className="rounded-2xl bg-white/10 p-2">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-slate-300">Demo Workspace</p>
          <p className="text-lg font-semibold">LifeSignal Preview</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {(Object.entries(roleMeta) as [RoleKey, (typeof roleMeta)[RoleKey]][]).map(
          ([key, meta]) => {
            const Icon = meta.icon;
            const selected = role === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setRole(key);
                  setActive("Overview");
                }}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  selected
                    ? "bg-sky-50 text-slate-900 ring-2 ring-sky-300"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <div>
                  <div className="text-base font-semibold">{meta.label}</div>
                  <div className="text-sm text-slate-500">Click to explore this role</div>
                </div>
              </button>
            );
          }
        )}
      </div>

      <div className="mt-6">
        <p className="px-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Sections
        </p>
        <div className="mt-3 space-y-2">
          {menus[role].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base transition ${
                active === item
                  ? "bg-slate-950 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{item}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function StatCard({ item }: { item: StatItem }) {
  const Icon = item.icon;
  return (
    <HoverExplain text={item.tip}>
      <div className={`${shellCard} p-6`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-medium text-slate-500">{item.label}</p>
            <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{item.value}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </HoverExplain>
  );
}

function FamilyView({ active }: { active: string }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {familyData.stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className={`${shellCard} overflow-visible`}>
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Loved ones overview</h3>
                <p className="mt-2 text-lg text-slate-600">
                  Click through the family experience and see how each person's status is shown.
                </p>
              </div>
              <HoverExplain text="This section shows the people a family account is watching over today.">
                <button className="rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white">
                  Add loved one
                </button>
              </HoverExplain>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {familyData.people.map((person) => (
              <HoverExplain
                key={person.name}
                text="Open a person's profile to view routine details, contact preferences, recent check-ins, and follow-up notes."
              >
                <button className="flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-slate-50">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-slate-100 p-3">
                      <UserCircle2 className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-slate-900">{person.name}</div>
                      <div className="mt-1 text-base text-slate-500">
                        {person.relation} · {person.phone}
                      </div>
                      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                        {person.notes}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                      {person.status}
                    </div>
                    <div className="mt-3 text-base text-slate-500">{person.time}</div>
                    <div className="mt-1 text-sm text-slate-400">Risk: {person.risk}</div>
                  </div>
                </button>
              </HoverExplain>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className={`${shellCard} p-6`}>
            <h3 className="text-2xl font-bold text-slate-900">Today's activity</h3>
            <div className="mt-5 space-y-3">
              {familyData.timeline.map((line) => (
                <HoverExplain
                  key={line}
                  text="This running timeline helps family members understand what happened today without guessing."
                >
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-base text-slate-700">
                    {line}
                  </div>
                </HoverExplain>
              ))}
            </div>
          </div>

          <div className={`${shellCard} p-6`}>
            <h3 className="text-2xl font-bold text-slate-900">What families can do</h3>
            <div className="mt-5 space-y-4">
              {familyData.actions.map((action) => (
                <HoverExplain key={action.title} text={action.tip}>
                  <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:bg-slate-50">
                    <div>
                      <div className="text-lg font-semibold text-slate-900">{action.title}</div>
                      <div className="mt-1 text-base text-slate-600">{action.description}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </button>
                </HoverExplain>
              ))}
            </div>
          </div>
        </div>
      </div>

      {active !== "Overview" ? (
        <div className={`${shellCard} p-8`}>
          <h3 className="text-2xl font-bold text-slate-900">{active}</h3>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            This demo section shows how the family account can drill into specific areas such as alerts, direct messages, and recurring schedules.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function CaregiverView({ active }: { active: string }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {caregiverData.stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className={`${shellCard} p-6`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Care board</h3>
              <p className="mt-2 text-lg text-slate-600">
                Prioritized tasks for today, organized by urgency and type of follow-up.
              </p>
            </div>
            <HoverExplain text="The care board helps a caregiver decide what to do first instead of hunting through different screens.">
              <div className="rounded-2xl bg-violet-100 px-4 py-3 text-base font-semibold text-violet-700">
                Shift: 8:00 AM - 4:00 PM
              </div>
            </HoverExplain>
          </div>

          <div className="mt-6 space-y-4">
            {caregiverData.queue.map((item) => (
              <HoverExplain key={`${item.client}-${item.need}`} text={item.tip}>
                <button className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 text-left transition hover:bg-slate-50">
                  <div>
                    <div className="text-xl font-semibold text-slate-900">{item.client}</div>
                    <div className="mt-1 text-base text-slate-600">{item.need}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        Priority: {item.priority}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        Due: {item.due}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        Owner: {item.owner}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </button>
              </HoverExplain>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {caregiverData.panelCards.map((card) => {
            const Icon = card.icon;
            return (
              <HoverExplain key={card.title} text={card.tip}>
                <div className={`${shellCard} p-6`}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-slate-600">{card.body}</p>
                </div>
              </HoverExplain>
            );
          })}
        </div>
      </div>

      {active !== "Overview" ? (
        <div className={`${shellCard} p-8`}>
          <h3 className="text-2xl font-bold text-slate-900">{active}</h3>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            This module preview shows how caregivers can click deeper into medication workflows, notes, and escalations.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function RecoverView({ active }: { active: string }) {
  const heatColors = [
    "bg-emerald-100",
    "bg-lime-100",
    "bg-amber-100",
    "bg-orange-100",
    "bg-rose-100",
  ];
  const heatText = [
    "text-emerald-700",
    "text-lime-700",
    "text-amber-700",
    "text-orange-700",
    "text-rose-700",
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {recoverData.stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className={`${shellCard} p-6`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Recover action board</h3>
              <p className="mt-2 text-lg text-slate-600">
                Daily accountability items, sponsor follow-up, and relapse-prevention actions.
              </p>
            </div>
            <HoverExplain text="This queue keeps the user's recovery day structured and visible.">
              <div className="rounded-2xl bg-amber-100 px-4 py-3 text-base font-semibold text-amber-700">
                Focus window: 4:00 PM - 9:00 PM
              </div>
            </HoverExplain>
          </div>

          <div className="mt-6 space-y-4">
            {recoverData.queue.map((item) => (
              <HoverExplain key={`${item.client}-${item.need}`} text={item.tip}>
                <button className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 text-left transition hover:bg-slate-50">
                  <div>
                    <div className="text-xl font-semibold text-slate-900">{item.client}</div>
                    <div className="mt-1 text-base text-slate-600">{item.need}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        Priority: {item.priority}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        Due: {item.due}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        Owner: {item.owner}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </button>
              </HoverExplain>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {recoverData.panelCards.map((card) => {
            const Icon = card.icon;
            return (
              <HoverExplain key={card.title} text={card.tip}>
                <div className={`${shellCard} p-6`}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-slate-600">{card.body}</p>
                </div>
              </HoverExplain>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className={`${shellCard} p-6`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Sobriety streak chart</h3>
              <p className="mt-2 text-lg text-slate-600">
                A simple weekly resilience trend showing consistency, stability, and momentum.
              </p>
            </div>
            <HoverExplain text="This chart gives users and sponsors a more human sense of recovery momentum.">
              <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-base font-semibold text-emerald-700">
                Current streak: 143 days
              </div>
            </HoverExplain>
          </div>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recoverData.streak}>
                <defs>
                  <linearGradient id="recoverStreak" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#d97706"
                  strokeWidth={3}
                  fill="url(#recoverStreak)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${shellCard} p-6`}>
          <h3 className="text-2xl font-bold text-slate-900">Meeting calendar</h3>
          <p className="mt-2 text-lg text-slate-600">
            Attendance, accountability sessions, and recovery appointments in one weekly timeline.
          </p>
          <div className="mt-6 space-y-3">
            {recoverData.calendar.map((item) => (
              <HoverExplain key={`${item.date}-${item.title}`} text={item.tip}>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {item.day} · {item.date}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-1 text-base text-slate-600">{item.time}</div>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                    {item.status}
                  </div>
                </div>
              </HoverExplain>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className={`${shellCard} p-6`}>
          <h3 className="text-2xl font-bold text-slate-900">Trigger heatmap</h3>
          <p className="mt-2 text-lg text-slate-600">
            A quick risk snapshot showing where relapse pressure is building right now.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {recoverData.heatmap.map((item) => {
              const idx = Math.max(0, Math.min(4, item.level - 1));
              return (
                <HoverExplain key={item.label} text={item.note}>
                  <div className={`rounded-2xl border border-slate-200 p-4 ${heatColors[idx]}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-lg font-semibold text-slate-900">{item.label}</div>
                      <div className={`rounded-full px-3 py-1 text-sm font-semibold ${heatText[idx]} bg-white/70`}>
                        Risk {item.level}/5
                      </div>
                    </div>
                    <div className="mt-3 h-3 w-full overflow-visible rounded-full bg-white/70">
                      <div
                        className="h-full rounded-full bg-slate-900/70"
                        style={{ width: `${item.level * 20}%` }}
                      />
                    </div>
                    <p className="mt-3 text-base text-slate-700">{item.note}</p>
                  </div>
                </HoverExplain>
              );
            })}
          </div>
        </div>

        <div className={`${shellCard} p-6`}>
          <h3 className="text-2xl font-bold text-slate-900">Sponsor message thread</h3>
          <p className="mt-2 text-lg text-slate-600">
            A realistic sponsor conversation view for accountability, reassurance, and intervention.
          </p>
          <div className="mt-6 space-y-4">
            {recoverData.messages.map((msg, index) => (
              <div
                key={`${msg.time}-${index}`}
                className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
              >
                <HoverExplain text="Recover can support guided sponsor communication, not just automated reminders.">
                  <div
                    className={`max-w-[85%] rounded-3xl px-5 py-4 ${
                      msg.mine ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${msg.mine ? "text-amber-50" : "text-slate-500"}`}>
                      {msg.from} · {msg.role}
                    </div>
                    <p className="mt-2 text-base leading-7">{msg.body}</p>
                    <div className={`mt-2 text-sm ${msg.mine ? "text-amber-50/90" : "text-slate-500"}`}>
                      {msg.time}
                    </div>
                  </div>
                </HoverExplain>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${shellCard} p-6`}>
        <h3 className="text-2xl font-bold text-slate-900">Recovery milestones and structure</h3>
        <p className="mt-2 max-w-3xl text-lg text-slate-600">
          The Recover dashboard emphasizes consistency, emotional awareness, and relapse prevention.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recoverData.milestones.map((item) => (
            <HoverExplain key={item.title} text={item.tip}>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-lg font-semibold text-slate-900">{item.title}</div>
                <p className="mt-2 text-base text-slate-600">{item.description}</p>
              </div>
            </HoverExplain>
          ))}
        </div>
      </div>

      {active !== "Overview" ? (
        <div className={`${shellCard} p-8`}>
          <h3 className="text-2xl font-bold text-slate-900">{active}</h3>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            This module preview shows how LifeSignal Recover can drill into sponsor communication, emotional wellness trends, milestone history, and recovery safety alerts.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function PostOpView({ active }: { active: string }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {postopData.stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className={`${shellCard} p-6`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Post-surgery recovery tasks</h3>
              <p className="mt-2 text-lg text-slate-600">
                Structured daily recovery tracking to reduce complications and support clinicians.
              </p>
            </div>
            <HoverExplain text="This queue shows what the patient or care team needs to complete during the critical recovery window.">
              <div className="rounded-2xl bg-rose-100 px-4 py-3 text-base font-semibold text-rose-700">
                High-risk window: Days 1 - 14
              </div>
            </HoverExplain>
          </div>

          <div className="mt-6 space-y-4">
            {postopData.tasks.map((task) => (
              <HoverExplain key={task.title} text={task.tip}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="text-lg font-semibold text-slate-900">{task.title}</div>
                  <p className="mt-2 text-base text-slate-600">{task.description}</p>
                </div>
              </HoverExplain>
            ))}
          </div>
        </div>

        <div className={`${shellCard} p-6`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Pain trend chart</h3>
              <p className="mt-2 text-lg text-slate-600">
                Daily pain reporting helps the care team spot whether recovery discomfort is improving normally.
              </p>
            </div>
            <HoverExplain text="Pain should usually trend down over time. A sudden reversal can signal a complication or medication issue.">
              <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-base font-semibold text-emerald-700">
                Trend improving
              </div>
            </HoverExplain>
          </div>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={postopData.painTrend}>
                <defs>
                  <linearGradient id="postOpPain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#e11d48"
                  strokeWidth={3}
                  fill="url(#postOpPain)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className={`${shellCard} p-6`}>
          <h3 className="text-2xl font-bold text-slate-900">Incision healing timeline</h3>
          <p className="mt-2 text-lg text-slate-600">
            Milestone-based recovery tracking makes incision healing easier to review over time.
          </p>
          <div className="mt-6 space-y-4">
            {postopData.healingTimeline.map((item) => (
              <HoverExplain key={`${item.day}-${item.title}`} text={item.tip}>
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex w-20 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-sm font-semibold text-rose-700">
                    {item.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-lg font-semibold text-slate-900">{item.title}</div>
                      <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        {item.status}
                      </div>
                    </div>
                    <p className="mt-2 text-base text-slate-600">{item.detail}</p>
                  </div>
                </div>
              </HoverExplain>
            ))}
          </div>
        </div>

        <div className={`${shellCard} p-6`}>
          <h3 className="text-2xl font-bold text-slate-900">Vitals monitoring</h3>
          <p className="mt-2 text-lg text-slate-600">
            Daily vital signs help surface silent issues before they become urgent complications.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {postopData.vitals.map((item) => (
              <HoverExplain key={item.label} text={item.tip}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="text-base font-medium text-slate-500">{item.label}</div>
                  <div className="mt-2 text-3xl font-bold text-slate-900">{item.value}</div>
                  <div className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {item.range}
                  </div>
                </div>
              </HoverExplain>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className={`${shellCard} p-6`}>
          <h3 className="text-2xl font-bold text-slate-900">PostOP intelligence</h3>
          <p className="mt-2 text-lg text-slate-600">
            Predictive modules help the care team focus on the patients most likely to need intervention.
          </p>
          <div className="mt-6 space-y-4">
            {postopData.riskModules.map((item) => (
              <HoverExplain key={item.title} text={item.tip}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="text-lg font-semibold text-slate-900">{item.title}</div>
                  <p className="mt-2 text-base text-slate-600">{item.description}</p>
                </div>
              </HoverExplain>
            ))}
          </div>
        </div>

        <div className={`${shellCard} p-6`}>
          <h3 className="text-2xl font-bold text-slate-900">Surgeon and nurse messaging</h3>
          <p className="mt-2 text-lg text-slate-600">
            Keep the patient connected to the surgical team with guided post-op communication.
          </p>
          <div className="mt-6 space-y-4">
            {postopData.messages.map((msg, index) => (
              <div
                key={`${msg.time}-${index}`}
                className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
              >
                <HoverExplain text="Secure messaging can reduce anxiety, improve adherence, and surface complications earlier.">
                  <div
                    className={`max-w-[85%] rounded-3xl px-5 py-4 ${
                      msg.mine ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${msg.mine ? "text-rose-50" : "text-slate-500"}`}>
                      {msg.from} · {msg.role}
                    </div>
                    <p className="mt-2 text-base leading-7">{msg.body}</p>
                    <div className={`mt-2 text-sm ${msg.mine ? "text-rose-50/90" : "text-slate-500"}`}>
                      {msg.time}
                    </div>
                  </div>
                </HoverExplain>
              </div>
            ))}
          </div>
        </div>
      </div>

      {active !== "Overview" ? (
        <div className={`${shellCard} p-8`}>
          <h3 className="text-2xl font-bold text-slate-900">{active}</h3>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            The PostOP dashboard focuses on surgical recovery monitoring including pain trends, incision healing, vitals, medication adherence, messaging, and early complication detection.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function AgencyView({ active }: { active: string }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {agencyData.stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          {agencyData.modules.map((module) => {
            const Icon = module.icon;
            return (
              <HoverExplain key={module.title} text={module.tip}>
                <div className={`${shellCard} p-6`}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{module.title}</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-slate-600">{module.description}</p>
                </div>
              </HoverExplain>
            );
          })}
        </div>

        <div className={`${shellCard} overflow-visible`}>
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Program performance</h3>
                <p className="mt-2 text-lg text-slate-600">
                  Agency-level visibility across pilot groups, communities, and service lines.
                </p>
              </div>
              <HoverExplain text="Reporting lets agencies compare response rates and active alerts across multiple programs.">
                <button className="rounded-2xl bg-emerald-600 px-5 py-3 text-base font-semibold text-white">
                  Export report
                </button>
              </HoverExplain>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-50 text-base text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Program</th>
                  <th className="px-6 py-4 font-semibold">Clients</th>
                  <th className="px-6 py-4 font-semibold">Completion</th>
                  <th className="px-6 py-4 font-semibold">Alerts</th>
                  <th className="px-6 py-4 font-semibold">Owner</th>
                </tr>
              </thead>
              <tbody>
                {agencyData.table.map((row) => (
                  <tr
                    key={row.program}
                    className="border-t border-slate-200 text-base text-slate-700 transition hover:bg-slate-50"
                    title="Clicking a row would normally open a deeper program dashboard with staff assignments, client trends, and rollout settings."
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.program}</td>
                    <td className="px-6 py-4">{row.clients}</td>
                    <td className="px-6 py-4">{row.completion}</td>
                    <td className="px-6 py-4">{row.alerts}</td>
                    <td className="px-6 py-4">{row.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {active !== "Overview" ? (
        <div className={`${shellCard} p-8`}>
          <h3 className="text-2xl font-bold text-slate-900">{active}</h3>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            This preview area demonstrates how agencies can click into staff management, reports, settings, and program dashboards.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function FeatureGrid({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: ActionItem[];
}) {
  return (
    <div className={`${shellCard} p-6`}>
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-3xl text-lg text-slate-600">{subtitle}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <HoverExplain key={item.title} text={item.tip}>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-lg font-semibold text-slate-900">{item.title}</div>
              <p className="mt-2 text-base text-slate-600">{item.description}</p>
            </div>
          </HoverExplain>
        ))}
      </div>
    </div>
  );
}

function SafetyCircleVisuals() {
  const mapPoints = [
    { name: "Mary", x: "52%", y: "42%" },
    { name: "Neighbor", x: "37%", y: "48%" },
    { name: "Daughter", x: "70%", y: "30%" },
    { name: "Caregiver", x: "68%", y: "62%" },
    { name: "Agency", x: "27%", y: "24%" },
  ];

  const escalationSteps = [
    { label: "Check-in missed", state: "active" },
    { label: "Reminder sent", state: "active" },
    { label: "Family alerted", state: "active" },
    { label: "Neighbor dispatched", state: "active" },
    { label: "Caregiver backup", state: "idle" },
  ] as const;

  const neighborAlerts = [
    {
      title: "Neighbor response requested",
      detail:
        "Elaine Morris is 0.3 miles away and marked as available for same-day welfare checks.",
      time: "10:18 AM",
    },
    {
      title: "Door knock completed",
      detail:
        "Neighbor reported lights on and confirmed Mary is safe after a missed phone response.",
      time: "10:29 AM",
    },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <div className={`${shellCard} p-6`}>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
              <MapPinned className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Community Safety Map</h3>
              <p className="mt-1 text-lg text-slate-600">
                A simple geographic-style preview showing how one person's support network is distributed.
              </p>
            </div>
          </div>
          <div className="relative mt-6 h-80 overflow-visible rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_50%_30%,rgba(14,165,233,0.14),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)]">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {mapPoints.map((point) => (
              <HoverExplain
                key={point.name}
                text={`${point.name} is shown here as part of the community response network.`}
              >
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: point.x, top: point.y }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-sky-500 ring-4 ring-sky-200" />
                    <div className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                      {point.name}
                    </div>
                  </div>
                </div>
              </HoverExplain>
            ))}
          </div>
        </div>

        <div className={`${shellCard} p-6`}>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Safety Circle Graph</h3>
              <p className="mt-1 text-lg text-slate-600">
                The care network around one member, visually connecting loved ones, neighbors, and professional support.
              </p>
            </div>
          </div>
          <div className="relative mt-6 h-80 rounded-[28px] border border-slate-200 bg-white">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 320" fill="none">
              <line x1="300" y1="150" x2="140" y2="90" stroke="#cbd5e1" strokeWidth="3" />
              <line x1="300" y1="150" x2="470" y2="90" stroke="#cbd5e1" strokeWidth="3" />
              <line x1="300" y1="150" x2="150" y2="245" stroke="#cbd5e1" strokeWidth="3" />
              <line x1="300" y1="150" x2="455" y2="235" stroke="#cbd5e1" strokeWidth="3" />
              <line x1="300" y1="150" x2="300" y2="38" stroke="#cbd5e1" strokeWidth="3" />
            </svg>
            <HoverExplain text="This central member is the person being protected by the Safety Circle.">
              <div className="absolute left-[50%] top-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 px-5 py-4 text-base font-bold text-white shadow-lg">
                Mary
              </div>
            </HoverExplain>
            <HoverExplain text="Primary family contact receives the first alert after the automated reminder stage.">
              <div className="absolute left-[23%] top-[18%] rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
                Daughter
              </div>
            </HoverExplain>
            <HoverExplain text="Local neighbor can perform a rapid in-person check when appropriate.">
              <div className="absolute left-[22%] top-[70%] rounded-full bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800">
                Neighbor
              </div>
            </HoverExplain>
            <HoverExplain text="Caregiver is the professional fallback when family or neighbor response is delayed.">
              <div className="absolute left-[70%] top-[67%] rounded-full bg-violet-100 px-4 py-3 text-sm font-semibold text-violet-800">
                Caregiver
              </div>
            </HoverExplain>
            <HoverExplain text="Agency keeps the broader program informed and can escalate staffing or dispatch decisions.">
              <div className="absolute left-[68%] top-[18%] rounded-full bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800">
                Agency
              </div>
            </HoverExplain>
            <HoverExplain text="Emergency support remains available as the final escalation tier if contact cannot be made.">
              <div className="absolute left-[46%] top-[6%] rounded-full bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-800">
                Emergency
              </div>
            </HoverExplain>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className={`${shellCard} p-6`}>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
              <Siren className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Escalation Path Animation</h3>
              <p className="mt-1 text-lg text-slate-600">
                A visual explanation of how LifeSignal moves from automation to human response.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {escalationSteps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                    step.state === "active"
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="text-lg font-semibold text-slate-900">{step.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${shellCard} p-6`}>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Neighbor Response Alerts</h3>
              <p className="mt-1 text-lg text-slate-600">
                How nearby trusted contacts can become part of a calm, fast support response.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {neighborAlerts.map((alert) => (
              <HoverExplain
                key={alert.title}
                text="Neighbor alerts are especially effective in senior communities and close-knit neighborhoods."
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-lg font-semibold text-slate-900">{alert.title}</div>
                    <div className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                      {alert.time}
                    </div>
                  </div>
                  <p className="mt-3 text-base leading-7 text-slate-600">{alert.detail}</p>
                </div>
              </HoverExplain>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VerticalShowcase({
  role,
  setRole,
  setActive,
}: {
  role: RoleKey;
  setRole: (role: RoleKey) => void;
  setActive: (value: string) => void;
}) {
  const verticals: {
    key: RoleKey;
    eyebrow: string;
    summary: string;
    bullets: string[];
  }[] = [
    {
      key: "family",
      eyebrow: "For loved ones",
      summary: "Show families how simple daily reassurance, missed check-in visibility, and care-circle coordination all work together.",
      bullets: ["Loved one status", "Alert acknowledgement", "Family messaging"],
    },
    {
      key: "caregiver",
      eyebrow: "For care teams",
      summary: "Demonstrate how professional caregivers manage multiple clients, medication workflows, and urgent escalations from one board.",
      bullets: ["Care board", "Medication oversight", "Escalation tasks"],
    },
    {
      key: "recover",
      eyebrow: "For recovery programs",
      summary: "Let users preview sobriety tracking, sponsor communication, trigger monitoring, and accountability structure in one recovery-focused dashboard.",
      bullets: ["Streak chart", "Meeting calendar", "Sponsor thread"],
    },
    {
      key: "postop",
      eyebrow: "For surgical follow-up",
      summary: "Preview post-op monitoring with pain trends, incision healing, vitals, nurse messaging, and risk prediction during the recovery window.",
      bullets: ["Pain trend", "Healing timeline", "Vitals review"],
    },
    {
      key: "agency",
      eyebrow: "For operators",
      summary: "Show executives and coordinators the portfolio-level view across programs, staff, communities, and performance metrics.",
      bullets: ["Program metrics", "Reporting", "Rollout oversight"],
    },
  ];

  return (
    <div className={`${shellCard} p-6`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Explore each dashboard by vertical</h3>
          <p className="mt-2 max-w-3xl text-lg text-slate-600">
            Each section below is now wired to open its matching demo dashboard so visitors can immediately see the product experience for that market.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          Active preview: {roleMeta[role].label}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {verticals.map((item) => {
          const meta = roleMeta[item.key];
          const Icon = meta.icon;
          const selected = role === item.key;
          return (
            <div
              key={item.key}
              className={`rounded-3xl border p-5 transition ${
                selected
                  ? "border-sky-300 bg-sky-50 shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className={`inline-flex rounded-2xl bg-gradient-to-r ${meta.color} p-3 text-white`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                {item.eyebrow}
              </div>
              <h4 className="mt-2 text-xl font-bold text-slate-900">{meta.label}</h4>
              <p className="mt-3 text-base leading-7 text-slate-600">{item.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setRole(item.key);
                  setActive("Overview");
                  const el = document.getElementById("dashboard-preview");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`mt-5 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-base font-semibold transition ${
                  selected
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                View dashboard
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LifeSignalDemoDashboards({ initialRole = "family" }: { initialRole?: RoleKey }) {
  const [role, setRole] = useState<RoleKey>(initialRole);
  const [active, setActive] = useState("Overview");
  const [search, setSearch] = useState("");

  const meta = roleMeta[role];
  const RoleIcon = meta.icon;

  const view = useMemo(() => {
    if (role === "family") return <FamilyView active={active} />;
    if (role === "caregiver") return <CaregiverView active={active} />;
    if (role === "recover") return <RecoverView active={active} />;
    if (role === "postop") return <PostOpView active={active} />;
    return <AgencyView active={active} />;
  }, [role, active]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 overflow-visible rounded-[32px] border border-slate-200 bg-white">
          <div className={`bg-gradient-to-r ${meta.color} p-8 text-white md:p-10`}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                  <Sparkles className="h-4 w-4" />
                  Interactive demo experience
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                    <RoleIcon className="h-8 w-8" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{meta.label}</h1>
                </div>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/90 md:text-xl">
                  {meta.subtitle}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <HoverExplain text="Use the role switcher on the left to experience the product from the perspective of a family, caregiver, recovery, PostOP, or agency user.">
                  <div className="rounded-2xl bg-white/15 px-5 py-4 text-base font-medium backdrop-blur">
                    Guided role switching built in
                  </div>
                </HoverExplain>
                <HoverExplain text="Hover or focus on major cards, rows, and buttons to see explanation balloons describing what that function does.">
                  <div className="rounded-2xl bg-white/15 px-5 py-4 text-base font-medium backdrop-blur">
                    Balloon help on interactive elements
                  </div>
                </HoverExplain>
              </div>
            </div>
          </div>
        </div>

        <VerticalShowcase role={role} setRole={setRole} setActive={setActive} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
          <Sidebar role={role} setRole={setRole} active={active} setActive={setActive} />

          <div className="space-y-6">
            <div className={`${shellCard} p-5`}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-base font-medium text-slate-500">Current demo role</p>
                  <h2 className={`mt-1 text-3xl font-bold ${darkText}`}>{meta.label}</h2>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search demo modules"
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-sky-400 sm:w-72"
                    />
                  </div>
                  <HoverExplain text="This button would open an onboarding-style walkthrough for first-time visitors exploring the dashboard.">
                    <button className="rounded-2xl bg-slate-950 px-5 py-3 text-base font-semibold text-white">
                      Start guided tour
                    </button>
                  </HoverExplain>
                </div>
              </div>

              {search ? (
                <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-base text-amber-800">
                  Demo search is visual only in this preview. In production, it can jump visitors directly to modules like alerts, medication, reports, or loved one profiles.
                </div>
              ) : null}
            </div>

            <div id="dashboard-preview">{view}</div>

            <FeatureGrid
              title="AI Safety Intelligence"
              subtitle="LifeSignal includes predictive safety tools designed to identify subtle risks before they become emergencies."
              items={aiCards}
            />

            <FeatureGrid
              title="Platform Visualizations"
              subtitle="These interactive previews help visitors understand how LifeSignal operates across a full safety network."
              items={visualizationCards}
            />

            <SafetyCircleVisuals />

            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Demo note</h3>
                  <p className="mt-2 max-w-4xl text-base leading-7 text-slate-600">
                    This interactive preview is designed to help prospects click through the Family, Caregiver, Recover, PostOP, and Agency experiences before creating an account. The tooltips explain the purpose of each module, while the sections simulate what each customer tier will be able to do inside the finished product.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${shellCard} p-6`}>
              <h3 className="text-xl font-bold text-slate-900">Demo QA checklist</h3>
              <ul className="mt-4 space-y-2 text-base text-slate-600">
                {demoTestCases.map((test) => (
                  <li key={test}>• {test}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




