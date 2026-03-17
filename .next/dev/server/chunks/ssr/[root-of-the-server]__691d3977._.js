module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LifeSignalDemoDashboards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'lucide-react'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'recharts'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
const shellCard = "rounded-3xl border border-slate-200 bg-white shadow-sm";
const darkText = "text-slate-900";
const roleMeta = {
    family: {
        label: "Family Dashboard",
        subtitle: "A reassurance-first view for loved ones who want simple visibility and fast alerts.",
        icon: HeartHandshake,
        color: "from-sky-500 to-cyan-400"
    },
    caregiver: {
        label: "Caregiver Dashboard",
        subtitle: "A daily operations view for caregivers managing multiple check-ins, medication routines, and escalations.",
        icon: Stethoscope,
        color: "from-violet-500 to-fuchsia-400"
    },
    recover: {
        label: "LifeSignal Recover",
        subtitle: "A recovery-focused dashboard for accountability, wellness tracking, relapse prevention, sponsor visibility, and structured daily progress.",
        icon: CheckCircle2,
        color: "from-amber-500 to-orange-400"
    },
    postop: {
        label: "LifeSignal PostOP",
        subtitle: "A recovery monitoring dashboard for patients during the post-surgery period tracking pain, medication adherence, mobility, and complications.",
        icon: Stethoscope,
        color: "from-rose-500 to-pink-400"
    },
    agency: {
        label: "Agency Dashboard",
        subtitle: "A command-center view for teams, coordinators, and agencies rolling out LifeSignal across many clients.",
        icon: Building2,
        color: "from-emerald-500 to-teal-400"
    }
};
const familyData = {
    stats: [
        {
            label: "Loved ones monitored",
            value: "3",
            icon: Users,
            tip: "Shows how many people this family account is currently following."
        },
        {
            label: "Today's successful check-ins",
            value: "2 / 3",
            icon: CheckCircle2,
            tip: "Quick snapshot of who has responded today and who still needs attention."
        },
        {
            label: "Active alerts",
            value: "1",
            icon: Bell,
            tip: "Important issues that need the family's review right now."
        },
        {
            label: "Upcoming reminders",
            value: "4",
            icon: CalendarClock,
            tip: "Scheduled check-ins, medication nudges, and routine reminders coming later today."
        }
    ],
    people: [
        {
            name: "Mary Spence",
            relation: "Mother",
            status: "Checked in",
            time: "8:14 AM",
            risk: "Stable",
            phone: "SMS + Voice",
            notes: "Responded YES on first prompt. No follow-up needed."
        },
        {
            name: "Tom Spence",
            relation: "Father",
            status: "Reminder sent",
            time: "10:05 AM",
            risk: "Watch",
            phone: "Voice preferred",
            notes: "Missed first outreach. Reminder and family notification triggered."
        },
        {
            name: "Linda Brooks",
            relation: "Aunt",
            status: "Checked in",
            time: "7:42 AM",
            risk: "Stable",
            phone: "SMS",
            notes: "Requested later medication reminder at 1:00 PM."
        }
    ],
    timeline: [
        "7:42 AM · Linda checked in by text",
        "8:14 AM · Mary checked in by text",
        "9:30 AM · Tom missed first check-in window",
        "10:05 AM · Reminder sent to Tom",
        "10:12 AM · Family alert posted to dashboard"
    ],
    actions: [
        {
            title: "View loved one profile",
            description: "Open routines, preferred contact method, notes, and alert history.",
            tip: "Families can review profile details without changing deeper program settings."
        },
        {
            title: "Acknowledge alert",
            description: "Mark that a family member is responding so others know follow-up is underway.",
            tip: "This helps reduce duplicate calls and confusion during missed check-ins."
        },
        {
            title: "Send reassurance message",
            description: "Quick-send a caring SMS or reminder message from the dashboard.",
            tip: "Useful when a family member wants to personally follow up after an automated reminder."
        },
        {
            title: "Emergency contact panel",
            description: "Instantly see and call all emergency contacts for a loved one.",
            tip: "Designed for quick action if something looks wrong."
        },
        {
            title: "Live wellbeing indicator",
            description: "Visual indicator showing stability trends over recent days.",
            tip: "Helps families notice subtle changes in response behavior."
        },
        {
            title: "Daily reassurance summary",
            description: "Receive a simple summary message showing everyone checked in.",
            tip: "Removes the need to manually verify every person."
        },
        {
            title: "Routine builder",
            description: "Create custom check-in routines for mornings, evenings, or medication.",
            tip: "Families can tailor routines for each loved one."
        },
        {
            title: "Care circle management",
            description: "Add siblings, neighbors, or friends into the safety loop.",
            tip: "Shared responsibility reduces caregiver burnout."
        },
        {
            title: "Voice reassurance calls",
            description: "Trigger a quick automated call asking if everything is okay.",
            tip: "Helpful for seniors who prefer voice over texting."
        }
    ]
};
const caregiverData = {
    stats: [
        {
            label: "Clients on roster",
            value: "18",
            icon: Users,
            tip: "Total active clients assigned to this caregiver."
        },
        {
            label: "Pending check-ins",
            value: "5",
            icon: Clock3,
            tip: "Clients still awaiting response within today's outreach window."
        },
        {
            label: "Medication tasks",
            value: "12",
            icon: Pill,
            tip: "Medication reminders or follow-up confirmations due today."
        },
        {
            label: "Escalations in progress",
            value: "2",
            icon: Siren,
            tip: "Cases requiring direct caregiver action or secondary contact outreach."
        }
    ],
    queue: [
        {
            client: "Robert Neal",
            need: "Missed morning check-in",
            priority: "High",
            due: "Now",
            owner: "J. Carter",
            tip: "High-priority items should trigger direct caregiver review and rapid follow-up."
        },
        {
            client: "Janice Bell",
            need: "Medication confirmation",
            priority: "Medium",
            due: "11:30 AM",
            owner: "You",
            tip: "Medication workflows can be tracked separately from general safety check-ins."
        },
        {
            client: "Marco Diaz",
            need: "Post-hospital recovery check",
            priority: "Medium",
            due: "1:00 PM",
            owner: "You",
            tip: "Recovery plans can include extra check-ins for a defined period after discharge."
        },
        {
            client: "Elaine Porter",
            need: "Update caregiver note",
            priority: "Low",
            due: "2:15 PM",
            owner: "You",
            tip: "Notes help preserve continuity across shifts and team members."
        }
    ],
    panelCards: [
        {
            title: "Daily care board",
            body: "See who needs attention first, what reminders are due, and which escalations need action.",
            icon: ClipboardList,
            tip: "Think of this as the caregiver's operational queue for the day."
        },
        {
            title: "Medication oversight",
            body: "Track reminder status, confirmations, and missed medication acknowledgements.",
            icon: Pill,
            tip: "Medication support is visible as a separate workflow."
        },
        {
            title: "Care notes and handoff",
            body: "Document status updates, concerns, observations, and next steps for other caregivers.",
            icon: FileText,
            tip: "Handoff notes matter when multiple people support the same client across different times of day."
        },
        {
            title: "Client stability scoring",
            body: "AI-assisted scoring highlighting potential wellbeing changes.",
            icon: Activity,
            tip: "Helps caregivers prioritize people who may need attention."
        },
        {
            title: "Transportation coordination",
            body: "Track rides to appointments, therapy, or pharmacy pickups.",
            icon: Car,
            tip: "Ensures clients maintain essential routines."
        },
        {
            title: "Emergency escalation console",
            body: "One-click escalation to family, neighbors, or emergency services.",
            icon: Siren,
            tip: "Critical response control during urgent events."
        }
    ]
};
const recoverData = {
    stats: [
        {
            label: "Days sober",
            value: "143",
            icon: CheckCircle2,
            tip: "Tracks the current recovery streak and reinforces momentum."
        },
        {
            label: "Meetings this week",
            value: "4 / 5",
            icon: CalendarClock,
            tip: "Shows meeting attendance progress against the weekly goal."
        },
        {
            label: "Sponsor check-ins",
            value: "3",
            icon: MessageSquare,
            tip: "Counts completed sponsor or accountability partner touchpoints."
        },
        {
            label: "Risk alerts",
            value: "1",
            icon: AlertTriangle,
            tip: "Flags wellness or missed-accountability events needing attention."
        }
    ],
    queue: [
        {
            client: "Marcus Hill",
            need: "Missed evening recovery check-in",
            priority: "High",
            due: "Now",
            owner: "Sponsor",
            tip: "High-risk missed check-ins can trigger sponsor outreach and accountability escalation."
        },
        {
            client: "Renee Brooks",
            need: "Log meeting attendance",
            priority: "Medium",
            due: "6:00 PM",
            owner: "You",
            tip: "Attendance logging helps create structure and measurable consistency."
        },
        {
            client: "Devon Ross",
            need: "Craving alert follow-up",
            priority: "High",
            due: "5:15 PM",
            owner: "Coach",
            tip: "Craving alerts create an opportunity for immediate support before relapse."
        }
    ],
    panelCards: [
        {
            title: "Sobriety tracker",
            body: "Monitor streaks, reset history, and major recovery milestones over time.",
            icon: CheckCircle2,
            tip: "Gives users and sponsors a clear picture of consistency and progress."
        },
        {
            title: "Craving and trigger log",
            body: "Capture cravings, triggers, moods, and intervention notes in one place.",
            icon: Bell,
            tip: "This helps identify patterns that may predict relapse risk."
        },
        {
            title: "Meeting attendance board",
            body: "Track support-group meetings, appointments, and accountability sessions.",
            icon: CalendarClock,
            tip: "Recovery often improves when structure and attendance stay visible."
        },
        {
            title: "Sponsor connection hub",
            body: "Log sponsor outreach, missed contacts, and same-day follow-up needs.",
            icon: HeartHandshake,
            tip: "Sponsors and accountability partners play a central role in the Recover workflow."
        },
        {
            title: "Relapse prevention plan",
            body: "Store the personal intervention plan, emergency contacts, and coping steps.",
            icon: Shield,
            tip: "Users can quickly revisit their plan when they feel vulnerable."
        }
    ],
    milestones: [
        {
            title: "30-day milestone",
            description: "Celebrate the first major consistency milestone with supportive outreach.",
            tip: "Milestones help reinforce effort and remind the user how far they have come."
        },
        {
            title: "Sponsor accountability cadence",
            description: "Set the target frequency for sponsor check-ins each week.",
            tip: "Structured accountability reduces drift and creates a dependable rhythm."
        },
        {
            title: "Trigger response plan",
            description: "Document what happens when cravings, isolation, or emotional lows appear.",
            tip: "The faster a plan can be followed, the easier it is to interrupt risky behavior."
        }
    ],
    streak: [
        {
            day: "Mon",
            score: 78
        },
        {
            day: "Tue",
            score: 82
        },
        {
            day: "Wed",
            score: 76
        },
        {
            day: "Thu",
            score: 88
        },
        {
            day: "Fri",
            score: 91
        },
        {
            day: "Sat",
            score: 86
        },
        {
            day: "Sun",
            score: 93
        }
    ],
    calendar: [
        {
            day: "Mon",
            date: "Mar 16",
            title: "Morning meeting",
            time: "8:00 AM",
            status: "Attended",
            tip: "Support-group attendance is a core Recover accountability metric."
        },
        {
            day: "Tue",
            date: "Mar 17",
            title: "Sponsor call",
            time: "6:30 PM",
            status: "Scheduled",
            tip: "Sponsor calls provide real-time accountability and emotional support."
        },
        {
            day: "Wed",
            date: "Mar 18",
            title: "Therapy session",
            time: "2:00 PM",
            status: "Scheduled",
            tip: "Therapy appointments are part of the broader recovery support system."
        }
    ],
    heatmap: [
        {
            label: "Stress",
            level: 3,
            note: "Work pressure increased Tuesday afternoon."
        },
        {
            label: "Isolation",
            level: 2,
            note: "Skipped one social touchpoint this week."
        },
        {
            label: "Sleep",
            level: 4,
            note: "Two nights below target sleep duration."
        },
        {
            label: "Cravings",
            level: 5,
            note: "Highest risk around 5 PM and payday."
        }
    ],
    messages: [
        {
            from: "Sarah M.",
            role: "Sponsor",
            time: "4:42 PM",
            body: "Checking in before the evening window. How are you feeling right now?"
        },
        {
            from: "You",
            role: "Recover User",
            time: "4:45 PM",
            body: "A little stressed, but still on track. I am going to the 7 PM meeting.",
            mine: true
        },
        {
            from: "Sarah M.",
            role: "Sponsor",
            time: "4:46 PM",
            body: "Good. Text me once you arrive. If cravings spike before then, use your response plan and call me."
        }
    ]
};
const postopData = {
    stats: [
        {
            label: "Days since surgery",
            value: "6",
            icon: CalendarClock,
            tip: "Tracks the number of days since surgery."
        },
        {
            label: "Medication adherence",
            value: "92%",
            icon: Pill,
            tip: "Measures how consistently medications were confirmed."
        },
        {
            label: "Pain level today",
            value: "3 / 10",
            icon: Activity,
            tip: "Daily pain score submitted by the patient."
        },
        {
            label: "Complication alerts",
            value: "0",
            icon: AlertTriangle,
            tip: "Potential warning signs detected by the system."
        }
    ],
    tasks: [
        {
            title: "Morning pain check-in",
            description: "Patient submitted pain score and mobility report.",
            tip: "Daily symptom tracking helps detect complications."
        },
        {
            title: "Medication confirmation",
            description: "Antibiotic dose confirmed at 9:00 AM.",
            tip: "Medication adherence supports healing."
        },
        {
            title: "Mobility exercise",
            description: "Light walking exercise logged for rehabilitation.",
            tip: "Mobility tracking ensures recovery progress."
        },
        {
            title: "Wound photo upload",
            description: "Patient submitted incision image for review.",
            tip: "Photo monitoring allows remote wound assessment."
        }
    ],
    painTrend: [
        {
            day: "Day 1",
            score: 7
        },
        {
            day: "Day 2",
            score: 6
        },
        {
            day: "Day 3",
            score: 6
        },
        {
            day: "Day 4",
            score: 5
        },
        {
            day: "Day 5",
            score: 4
        },
        {
            day: "Day 6",
            score: 3
        }
    ],
    healingTimeline: [
        {
            day: "Day 1",
            title: "Procedure complete",
            detail: "Discharge instructions reviewed and first recovery plan activated.",
            status: "Complete",
            tip: "The recovery timeline starts with surgery day and initial discharge guidance."
        },
        {
            day: "Day 2",
            title: "Pain and mobility baseline",
            detail: "Pain score logged. Assisted walking started with no acute warning signs.",
            status: "Complete",
            tip: "PostOP establishes an early baseline so worsening symptoms are easier to spot."
        },
        {
            day: "Day 4",
            title: "Incision review",
            detail: "Photo submitted. Mild swelling noted but within expected range.",
            status: "Reviewed",
            tip: "Remote incision review helps the care team spot concerns without an unnecessary trip."
        }
    ],
    vitals: [
        {
            label: "Temperature",
            value: "98.4°F",
            range: "Normal",
            tip: "Elevated temperature can be an early infection signal after surgery."
        },
        {
            label: "Blood pressure",
            value: "124 / 78",
            range: "Stable",
            tip: "Blood pressure trends can help clinicians monitor recovery tolerance and medication response."
        },
        {
            label: "Oxygen saturation",
            value: "97%",
            range: "Normal",
            tip: "Oxygen tracking is especially useful after procedures affecting breathing or mobility."
        },
        {
            label: "Heart rate",
            value: "76 bpm",
            range: "Stable",
            tip: "Heart rate shifts can help identify pain spikes or dehydration."
        }
    ],
    messages: [
        {
            from: "Nurse Elena",
            role: "PostOP Nurse",
            time: "10:20 AM",
            body: "Thanks for sending the incision photo. Swelling looks mild and expected today. Keep the area clean and dry."
        },
        {
            from: "You",
            role: "Patient",
            time: "10:24 AM",
            body: "Pain is lower this morning. I walked twice and took the antibiotic on time.",
            mine: true
        },
        {
            from: "Dr. Shah",
            role: "Surgeon",
            time: "10:31 AM",
            body: "Good progress. Continue the mobility plan and message us right away if fever, drainage, or sharp pain increases."
        }
    ],
    riskModules: [
        {
            title: "Complication AI detector",
            description: "Analyzes symptoms, vitals, wound notes, and recovery changes for early concern signals.",
            tip: "This module flags infection risk, mobility setbacks, and symptom combinations that deserve clinician review."
        },
        {
            title: "30-day readmission risk predictor",
            description: "Estimates near-term readmission risk based on adherence, symptoms, vitals, and recovery friction points.",
            tip: "Helps care teams intervene before minor issues turn into a hospital return."
        }
    ]
};
const agencyData = {
    stats: [
        {
            label: "Active clients",
            value: "246",
            icon: Users,
            tip: "Total people actively enrolled across the agency."
        },
        {
            label: "Team members",
            value: "17",
            icon: UserCircle2,
            tip: "Care coordinators, admins, and frontline staff with access to the platform."
        },
        {
            label: "Sites or programs",
            value: "6",
            icon: Home,
            tip: "Different offices, communities, or program groups being managed in one place."
        },
        {
            label: "Today's response rate",
            value: "94%",
            icon: Activity,
            tip: "Agency-level performance across check-ins for the day."
        }
    ],
    modules: [
        {
            title: "Portfolio overview",
            description: "Monitor check-in completion, missed-response trends, and active programs from one screen.",
            icon: PanelLeft,
            tip: "Leadership gets a top-down view instead of needing to check each client manually."
        },
        {
            title: "Staff routing and permissions",
            description: "Assign clients, control access by role, and manage who can edit alerts or account settings.",
            icon: Shield,
            tip: "Agency dashboards need role-based controls so people only see what fits their responsibilities."
        },
        {
            title: "Reporting and compliance",
            description: "Review engagement rates, missed-check patterns, and operational activity logs.",
            icon: FileText,
            tip: "Useful for proving service quality, internal operations, and program outcomes."
        },
        {
            title: "Community rollout toolkit",
            description: "Tools for launching LifeSignal across senior communities.",
            icon: Home,
            tip: "Designed for multi-site deployment."
        },
        {
            title: "Program performance analytics",
            description: "Compare engagement and safety metrics across programs.",
            icon: BarChart3,
            tip: "Helps leadership improve program outcomes."
        }
    ],
    table: [
        {
            program: "The Villages Pilot",
            clients: 48,
            completion: "96%",
            alerts: 3,
            owner: "M. Harris"
        },
        {
            program: "Recovery Support East",
            clients: 61,
            completion: "91%",
            alerts: 7,
            owner: "J. Patel"
        },
        {
            program: "Family Care Circle",
            clients: 39,
            completion: "95%",
            alerts: 2,
            owner: "S. Romero"
        }
    ]
};
const aiCards = [
    {
        title: "AI Safety Score",
        description: "Overall wellbeing confidence indicator.",
        tip: "A composite score calculated from check-in reliability, routine changes, and response patterns."
    },
    {
        title: "Behavior Change Detection",
        description: "Flags subtle shifts in daily patterns.",
        tip: "Detects behavioral changes such as missed routines, slower responses, or irregular schedules."
    },
    {
        title: "Loneliness Signal",
        description: "Alerts when someone may need social contact.",
        tip: "Identifies signs of social isolation based on reduced engagement and communication patterns."
    },
    {
        title: "Fall-Risk Prediction",
        description: "Helps caregivers intervene earlier.",
        tip: "Predicts elevated fall risk based on missed check-ins, mobility reports, and health events."
    },
    {
        title: "Medication Adherence AI",
        description: "Identifies patterns of missed medication.",
        tip: "Tracks medication response confirmations and missed doses to calculate adherence trends."
    },
    {
        title: "Emergency Simulation Mode",
        description: "Demonstrates how LifeSignal responds to critical events.",
        tip: "Simulated emergency scenario showing how alerts escalate through family, caregivers, and emergency contacts."
    }
];
const visualizationCards = [
    {
        title: "Escalation Visualization",
        description: "Animated chain showing how alerts travel through the safety network.",
        tip: "Shows the chain of escalation when a check-in is missed: system to family to caregiver to emergency contact."
    },
    {
        title: "Community Safety Map",
        description: "Map view showing where people are being monitored.",
        tip: "Displays monitored users across homes, communities, or facilities on a geographic map."
    },
    {
        title: "Safety Circle Graph",
        description: "Visual network of the people connected around one person's care.",
        tip: "Illustrates how family, neighbors, caregivers, and agencies form a human safety network."
    },
    {
        title: "Neighbor Response Alerts",
        description: "Shows when a nearby trusted contact is the next responder in the chain.",
        tip: "Useful in communities where a nearby neighbor can check in faster than distant family."
    },
    {
        title: "Day-in-the-Life Simulation",
        description: "Demonstrates automated check-ins throughout a typical day.",
        tip: "Simulates a full day of LifeSignal activity including check-ins, reminders, and escalations."
    }
];
const demoTestCases = [
    "Switch between all five roles and confirm the hero title updates.",
    "Hover over any stat card and verify the info balloon appears.",
    "Open a non-Overview section from the sidebar and confirm the detail panel renders.",
    "Confirm Recover and PostOP charts render without runtime errors.",
    "Confirm the Community Safety Map, Safety Circle Graph, and Neighbor Response Alerts render.",
    "Type in the search field and verify the yellow helper message appears."
];
function InfoBalloon({ text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-slate-700 shadow-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-sky-200 bg-sky-50"
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 898,
                columnNumber: 7
            }, this),
            text
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 897,
        columnNumber: 5
    }, this);
}
function HoverExplain({ children, text, className = "" }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className}`,
        onMouseEnter: ()=>setOpen(true),
        onMouseLeave: ()=>setOpen(false),
        onFocus: ()=>setOpen(true),
        onBlur: ()=>setOpen(false),
        children: [
            children,
            open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBalloon, {
                text: text
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 924,
                columnNumber: 15
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 916,
        columnNumber: 5
    }, this);
}
function Sidebar({ role, setRole, active, setActive }) {
    const menus = {
        family: [
            "Overview",
            "Loved Ones",
            "Alerts",
            "Messages",
            "Schedule"
        ],
        caregiver: [
            "Overview",
            "Care Board",
            "Medication",
            "Notes",
            "Escalations"
        ],
        recover: [
            "Overview",
            "Action Board",
            "Meetings",
            "Triggers",
            "Milestones"
        ],
        postop: [
            "Overview",
            "Pain",
            "Healing",
            "Vitals",
            "Messages"
        ],
        agency: [
            "Overview",
            "Programs",
            "Staff",
            "Reports",
            "Settings"
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 rounded-2xl bg-slate-950 p-4 text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl bg-white/10 p-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Shield, {
                            className: "h-6 w-6"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                            lineNumber: 952,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 951,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-300",
                                children: "Demo Workspace"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 955,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-semibold",
                                children: "LifeSignal Preview"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 956,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 954,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 950,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-2",
                children: Object.entries(roleMeta).map(([key, meta])=>{
                    const Icon = meta.icon;
                    const selected = role === key;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setRole(key);
                            setActive("Overview");
                        },
                        className: `flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${selected ? "bg-sky-50 text-slate-900 ring-2 ring-sky-300" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 978,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-base font-semibold",
                                        children: meta.label
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 980,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-slate-500",
                                        children: "Click to explore this role"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 981,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 979,
                                columnNumber: 17
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 966,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 960,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500",
                        children: "Sections"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 990,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 space-y-2",
                        children: menus[role].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActive(item),
                                className: `flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base transition ${active === item ? "bg-slate-950 text-white" : "bg-white text-slate-700 hover:bg-slate-100"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1004,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronRight, {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1005,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 995,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 993,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 989,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 949,
        columnNumber: 5
    }, this);
}
function StatCard({ item }) {
    const Icon = item.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
        text: item.tip,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${shellCard} p-6`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base font-medium text-slate-500",
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1021,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-4xl font-bold tracking-tight text-slate-900",
                                children: item.value
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1022,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1020,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl bg-slate-100 p-3 text-slate-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "h-6 w-6"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                            lineNumber: 1025,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1024,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1019,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
            lineNumber: 1018,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 1017,
        columnNumber: 5
    }, this);
}
function FamilyView({ active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
                children: familyData.stats.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        item: item
                    }, item.label, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1038,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1036,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[1.2fr_0.8fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} overflow-hidden`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-slate-200 p-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold text-slate-900",
                                                    children: "Loved ones overview"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1047,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-lg text-slate-600",
                                                    children: "Click through the family experience and see how each person's status is shown."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1048,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1046,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                            text: "This section shows the people a family account is watching over today.",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white",
                                                children: "Add loved one"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1053,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1052,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1045,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1044,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-slate-200",
                                children: familyData.people.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "Open a person's profile to view routine details, contact preferences, recent check-ins, and follow-up notes.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-slate-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-2xl bg-slate-100 p-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(UserCircle2, {
                                                                className: "h-6 w-6 text-slate-700"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                lineNumber: 1069,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1068,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xl font-semibold text-slate-900",
                                                                    children: person.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1072,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-base text-slate-500",
                                                                    children: [
                                                                        person.relation,
                                                                        " · ",
                                                                        person.phone
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1073,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-3 max-w-2xl text-base leading-7 text-slate-600",
                                                                    children: person.notes
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1076,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1071,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1067,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700",
                                                            children: person.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1082,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-3 text-base text-slate-500",
                                                            children: person.time
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1085,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 text-sm text-slate-400",
                                                            children: [
                                                                "Risk: ",
                                                                person.risk
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1086,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1081,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1066,
                                            columnNumber: 17
                                        }, this)
                                    }, person.name, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1062,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1060,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1043,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${shellCard} p-6`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-slate-900",
                                        children: "Today's activity"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1096,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 space-y-3",
                                        children: familyData.timeline.map((line)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                                text: "This running timeline helps family members understand what happened today without guessing.",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl bg-slate-50 px-4 py-3 text-base text-slate-700",
                                                    children: line
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1103,
                                                    columnNumber: 19
                                                }, this)
                                            }, line, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1099,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1097,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1095,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${shellCard} p-6`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-slate-900",
                                        children: "What families can do"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 space-y-4",
                                        children: familyData.actions.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                                text: action.tip,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:bg-slate-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-lg font-semibold text-slate-900",
                                                                    children: action.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1118,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-base text-slate-600",
                                                                    children: action.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1119,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1117,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRight, {
                                                            className: "h-5 w-5 text-slate-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1121,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1116,
                                                    columnNumber: 19
                                                }, this)
                                            }, action.title, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1115,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1113,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1094,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1042,
                columnNumber: 7
            }, this),
            active !== "Overview" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${shellCard} p-8`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-bold text-slate-900",
                        children: active
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1132,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 max-w-3xl text-lg leading-8 text-slate-600",
                        children: "This demo section shows how the family account can drill into specific areas such as alerts, direct messages, and recurring schedules."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1133,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1131,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 1035,
        columnNumber: 5
    }, this);
}
function CaregiverView({ active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
                children: caregiverData.stats.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        item: item
                    }, item.label, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1147,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[1.1fr_0.9fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: "Care board"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1155,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-lg text-slate-600",
                                                children: "Prioritized tasks for today, organized by urgency and type of follow-up."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1156,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "The care board helps a caregiver decide what to do first instead of hunting through different screens.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-violet-100 px-4 py-3 text-base font-semibold text-violet-700",
                                            children: "Shift: 8:00 AM - 4:00 PM"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1161,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-4",
                                children: caregiverData.queue.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: item.tip,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 text-left transition hover:bg-slate-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xl font-semibold text-slate-900",
                                                            children: item.client
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1172,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 text-base text-slate-600",
                                                            children: item.need
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1173,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-3 flex flex-wrap gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
                                                                    children: [
                                                                        "Priority: ",
                                                                        item.priority
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1175,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
                                                                    children: [
                                                                        "Due: ",
                                                                        item.due
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1178,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
                                                                    children: [
                                                                        "Owner: ",
                                                                        item.owner
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1181,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1174,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1171,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRight, {
                                                    className: "h-5 w-5 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1186,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1170,
                                            columnNumber: 17
                                        }, this)
                                    }, `${item.client}-${item.need}`, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1169,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: caregiverData.panelCards.map((card)=>{
                            const Icon = card.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                text: card.tip,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${shellCard} p-6`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl bg-violet-100 p-3 text-violet-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        className: "h-6 w-6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1201,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1200,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-slate-900",
                                                    children: card.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1203,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1199,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 text-base leading-7 text-slate-600",
                                            children: card.body
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1205,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1198,
                                    columnNumber: 17
                                }, this)
                            }, card.title, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1197,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1193,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1151,
                columnNumber: 7
            }, this),
            active !== "Overview" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${shellCard} p-8`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-bold text-slate-900",
                        children: active
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1215,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 max-w-3xl text-lg leading-8 text-slate-600",
                        children: "This module preview shows how caregivers can click deeper into medication workflows, notes, and escalations."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1216,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1214,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 1144,
        columnNumber: 5
    }, this);
}
function RecoverView({ active }) {
    const heatColors = [
        "bg-emerald-100",
        "bg-lime-100",
        "bg-amber-100",
        "bg-orange-100",
        "bg-rose-100"
    ];
    const heatText = [
        "text-emerald-700",
        "text-lime-700",
        "text-amber-700",
        "text-orange-700",
        "text-rose-700"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
                children: recoverData.stats.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        item: item
                    }, item.label, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1245,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[1.1fr_0.9fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: "Recover action board"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1253,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-lg text-slate-600",
                                                children: "Daily accountability items, sponsor follow-up, and relapse-prevention actions."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1254,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1252,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "This queue keeps the user's recovery day structured and visible.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-amber-100 px-4 py-3 text-base font-semibold text-amber-700",
                                            children: "Focus window: 4:00 PM - 9:00 PM"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1259,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1258,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-4",
                                children: recoverData.queue.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: item.tip,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 text-left transition hover:bg-slate-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xl font-semibold text-slate-900",
                                                            children: item.client
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1270,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 text-base text-slate-600",
                                                            children: item.need
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1271,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-3 flex flex-wrap gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
                                                                    children: [
                                                                        "Priority: ",
                                                                        item.priority
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1273,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
                                                                    children: [
                                                                        "Due: ",
                                                                        item.due
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1276,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
                                                                    children: [
                                                                        "Owner: ",
                                                                        item.owner
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1279,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1272,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1269,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRight, {
                                                    className: "h-5 w-5 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1284,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1268,
                                            columnNumber: 17
                                        }, this)
                                    }, `${item.client}-${item.need}`, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1267,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1265,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: recoverData.panelCards.map((card)=>{
                            const Icon = card.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                text: card.tip,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${shellCard} p-6`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl bg-amber-100 p-3 text-amber-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        className: "h-6 w-6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1299,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1298,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-slate-900",
                                                    children: card.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1301,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1297,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 text-base leading-7 text-slate-600",
                                            children: card.body
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1303,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1296,
                                    columnNumber: 17
                                }, this)
                            }, card.title, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1295,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1291,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: "Sobriety streak chart"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1315,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-lg text-slate-600",
                                                children: "A simple weekly resilience trend showing consistency, stability, and momentum."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1316,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1314,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "This chart gives users and sponsors a more human sense of recovery momentum.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-emerald-100 px-4 py-3 text-base font-semibold text-emerald-700",
                                            children: "Current streak: 143 days"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1321,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1320,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1313,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 h-72 w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ResponsiveContainer, {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(AreaChart, {
                                        data: recoverData.streak,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                    id: "recoverStreak",
                                                    x1: "0",
                                                    y1: "0",
                                                    x2: "0",
                                                    y2: "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "5%",
                                                            stopColor: "#f59e0b",
                                                            stopOpacity: 0.35
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1331,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "95%",
                                                            stopColor: "#f59e0b",
                                                            stopOpacity: 0.05
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1332,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1330,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1329,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CartesianGrid, {
                                                strokeDasharray: "3 3",
                                                stroke: "#e2e8f0"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1335,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(XAxis, {
                                                dataKey: "day",
                                                tickLine: false,
                                                axisLine: false
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1336,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {}, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1337,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Area, {
                                                type: "monotone",
                                                dataKey: "score",
                                                stroke: "#d97706",
                                                strokeWidth: 3,
                                                fill: "url(#recoverStreak)"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1338,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1328,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1327,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1326,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1312,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-slate-900",
                                children: "Meeting calendar"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-lg text-slate-600",
                                children: "Attendance, accountability sessions, and recovery appointments in one weekly timeline."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-3",
                                children: recoverData.calendar.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: item.tip,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-semibold uppercase tracking-[0.18em] text-slate-500",
                                                            children: [
                                                                item.day,
                                                                " · ",
                                                                item.date
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1360,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 text-lg font-semibold text-slate-900",
                                                            children: item.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1363,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 text-base text-slate-600",
                                                            children: item.time
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1364,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1359,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700",
                                                    children: item.status
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1366,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1358,
                                            columnNumber: 17
                                        }, this)
                                    }, `${item.date}-${item.title}`, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1357,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1355,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1350,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1311,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-slate-900",
                                children: "Trigger heatmap"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1378,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-lg text-slate-600",
                                children: "A quick risk snapshot showing where relapse pressure is building right now."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1379,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 grid gap-3 sm:grid-cols-2",
                                children: recoverData.heatmap.map((item)=>{
                                    const idx = Math.max(0, Math.min(4, item.level - 1));
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: item.note,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `rounded-2xl border border-slate-200 p-4 ${heatColors[idx]}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg font-semibold text-slate-900",
                                                            children: item.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1389,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `rounded-full px-3 py-1 text-sm font-semibold ${heatText[idx]} bg-white/70`,
                                                            children: [
                                                                "Risk ",
                                                                item.level,
                                                                "/5"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1390,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1388,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 h-3 w-full overflow-hidden rounded-full bg-white/70",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full rounded-full bg-slate-900/70",
                                                        style: {
                                                            width: `${item.level * 20}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1395,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1394,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 text-base text-slate-700",
                                                    children: item.note
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1400,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1387,
                                            columnNumber: 19
                                        }, this)
                                    }, item.label, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1386,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1382,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1377,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-slate-900",
                                children: "Sponsor message thread"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1409,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-lg text-slate-600",
                                children: "A realistic sponsor conversation view for accountability, reassurance, and intervention."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1410,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-4",
                                children: recoverData.messages.map((msg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex ${msg.mine ? "justify-end" : "justify-start"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                            text: "Recover can support guided sponsor communication, not just automated reminders.",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `max-w-[85%] rounded-3xl px-5 py-4 ${msg.mine ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-900"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `text-sm font-semibold ${msg.mine ? "text-amber-50" : "text-slate-500"}`,
                                                        children: [
                                                            msg.from,
                                                            " · ",
                                                            msg.role
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1425,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-base leading-7",
                                                        children: msg.body
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1428,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `mt-2 text-sm ${msg.mine ? "text-amber-50/90" : "text-slate-500"}`,
                                                        children: msg.time
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1429,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1420,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1419,
                                            columnNumber: 17
                                        }, this)
                                    }, `${msg.time}-${index}`, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1415,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1413,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1408,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1376,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${shellCard} p-6`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-bold text-slate-900",
                        children: "Recovery milestones and structure"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1441,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 max-w-3xl text-lg text-slate-600",
                        children: "The Recover dashboard emphasizes consistency, emotional awareness, and relapse prevention."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1442,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
                        children: recoverData.milestones.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                text: item.tip,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-slate-200 bg-white p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-lg font-semibold text-slate-900",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1449,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-base text-slate-600",
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1450,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1448,
                                    columnNumber: 15
                                }, this)
                            }, item.title, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1447,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1445,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1440,
                columnNumber: 7
            }, this),
            active !== "Overview" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${shellCard} p-8`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-bold text-slate-900",
                        children: active
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1459,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 max-w-3xl text-lg leading-8 text-slate-600",
                        children: "This module preview shows how LifeSignal Recover can drill into sponsor communication, emotional wellness trends, milestone history, and recovery safety alerts."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1460,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1458,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 1242,
        columnNumber: 5
    }, this);
}
function PostOpView({ active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
                children: postopData.stats.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        item: item
                    }, item.label, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1474,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1472,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: "Post-surgery recovery tasks"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1482,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-lg text-slate-600",
                                                children: "Structured daily recovery tracking to reduce complications and support clinicians."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1483,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1481,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "This queue shows what the patient or care team needs to complete during the critical recovery window.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-rose-100 px-4 py-3 text-base font-semibold text-rose-700",
                                            children: "High-risk window: Days 1 - 14"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1488,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1487,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1480,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-4",
                                children: postopData.tasks.map((task)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: task.tip,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-slate-200 bg-white p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-lg font-semibold text-slate-900",
                                                    children: task.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1498,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-base text-slate-600",
                                                    children: task.description
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1499,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1497,
                                            columnNumber: 17
                                        }, this)
                                    }, task.title, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1496,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1494,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1479,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: "Pain trend chart"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1509,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-lg text-slate-600",
                                                children: "Daily pain reporting helps the care team spot whether recovery discomfort is improving normally."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1510,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1508,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "Pain should usually trend down over time. A sudden reversal can signal a complication or medication issue.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-emerald-100 px-4 py-3 text-base font-semibold text-emerald-700",
                                            children: "Trend improving"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1515,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1514,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1507,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 h-72 w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ResponsiveContainer, {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(AreaChart, {
                                        data: postopData.painTrend,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                    id: "postOpPain",
                                                    x1: "0",
                                                    y1: "0",
                                                    x2: "0",
                                                    y2: "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "5%",
                                                            stopColor: "#f43f5e",
                                                            stopOpacity: 0.3
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1525,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                            offset: "95%",
                                                            stopColor: "#f43f5e",
                                                            stopOpacity: 0.05
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1526,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1524,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1523,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CartesianGrid, {
                                                strokeDasharray: "3 3",
                                                stroke: "#e2e8f0"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1529,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(XAxis, {
                                                dataKey: "day",
                                                tickLine: false,
                                                axisLine: false
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1530,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {}, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1531,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Area, {
                                                type: "monotone",
                                                dataKey: "score",
                                                stroke: "#e11d48",
                                                strokeWidth: 3,
                                                fill: "url(#postOpPain)"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1532,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1522,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1521,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1520,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1506,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1478,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-slate-900",
                                children: "Incision healing timeline"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1547,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-lg text-slate-600",
                                children: "Milestone-based recovery tracking makes incision healing easier to review over time."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1548,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-4",
                                children: postopData.healingTimeline.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: item.tip,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4 rounded-2xl border border-slate-200 bg-white p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex w-20 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-sm font-semibold text-rose-700",
                                                    children: item.day
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1555,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap items-center justify-between gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-lg font-semibold text-slate-900",
                                                                    children: item.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1560,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
                                                                    children: item.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 1561,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1559,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-2 text-base text-slate-600",
                                                            children: item.detail
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1565,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1558,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1554,
                                            columnNumber: 17
                                        }, this)
                                    }, `${item.day}-${item.title}`, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1553,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1551,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1546,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-slate-900",
                                children: "Vitals monitoring"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1574,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-lg text-slate-600",
                                children: "Daily vital signs help surface silent issues before they become urgent complications."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1575,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 grid gap-4 sm:grid-cols-2",
                                children: postopData.vitals.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: item.tip,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-slate-200 bg-white p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-base font-medium text-slate-500",
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1582,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-3xl font-bold text-slate-900",
                                                    children: item.value
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1583,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700",
                                                    children: item.range
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1584,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1581,
                                            columnNumber: 17
                                        }, this)
                                    }, item.label, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1580,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1578,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1573,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1545,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[0.9fr_1.1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-slate-900",
                                children: "PostOP intelligence"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1596,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-lg text-slate-600",
                                children: "Predictive modules help the care team focus on the patients most likely to need intervention."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1597,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-4",
                                children: postopData.riskModules.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: item.tip,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-slate-200 bg-white p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-lg font-semibold text-slate-900",
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1604,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-base text-slate-600",
                                                    children: item.description
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1605,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1603,
                                            columnNumber: 17
                                        }, this)
                                    }, item.title, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1602,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1600,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1595,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-slate-900",
                                children: "Surgeon and nurse messaging"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1613,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-lg text-slate-600",
                                children: "Keep the patient connected to the surgical team with guided post-op communication."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1614,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-4",
                                children: postopData.messages.map((msg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex ${msg.mine ? "justify-end" : "justify-start"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                            text: "Secure messaging can reduce anxiety, improve adherence, and surface complications earlier.",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `max-w-[85%] rounded-3xl px-5 py-4 ${msg.mine ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-900"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `text-sm font-semibold ${msg.mine ? "text-rose-50" : "text-slate-500"}`,
                                                        children: [
                                                            msg.from,
                                                            " · ",
                                                            msg.role
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1629,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-base leading-7",
                                                        children: msg.body
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1632,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `mt-2 text-sm ${msg.mine ? "text-rose-50/90" : "text-slate-500"}`,
                                                        children: msg.time
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1633,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1624,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1623,
                                            columnNumber: 17
                                        }, this)
                                    }, `${msg.time}-${index}`, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1619,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1617,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1612,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1594,
                columnNumber: 7
            }, this),
            active !== "Overview" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${shellCard} p-8`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-bold text-slate-900",
                        children: active
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1646,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 max-w-3xl text-lg leading-8 text-slate-600",
                        children: "The PostOP dashboard focuses on surgical recovery monitoring including pain trends, incision healing, vitals, medication adherence, messaging, and early complication detection."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1647,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1645,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 1471,
        columnNumber: 5
    }, this);
}
function AgencyView({ active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
                children: agencyData.stats.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        item: item
                    }, item.label, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1661,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1659,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: agencyData.modules.map((module)=>{
                            const Icon = module.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                text: module.tip,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${shellCard} p-6`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl bg-emerald-100 p-3 text-emerald-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        className: "h-6 w-6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1674,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1673,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-slate-900",
                                                    children: module.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1676,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1672,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 text-base leading-7 text-slate-600",
                                            children: module.description
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1678,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1671,
                                    columnNumber: 17
                                }, this)
                            }, module.title, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1670,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1666,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} overflow-hidden`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-slate-200 p-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold text-slate-900",
                                                    children: "Program performance"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1689,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-lg text-slate-600",
                                                    children: "Agency-level visibility across pilot groups, communities, and service lines."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1690,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1688,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                            text: "Reporting lets agencies compare response rates and active alerts across multiple programs.",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "rounded-2xl bg-emerald-600 px-5 py-3 text-base font-semibold text-white",
                                                children: "Export report"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1695,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1694,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1687,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1686,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "min-w-full text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-slate-50 text-base text-slate-500",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold",
                                                        children: "Program"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1706,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold",
                                                        children: "Clients"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1707,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold",
                                                        children: "Completion"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1708,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold",
                                                        children: "Alerts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1709,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold",
                                                        children: "Owner"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 1710,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1705,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1704,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: agencyData.table.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-t border-slate-200 text-base text-slate-700 transition hover:bg-slate-50",
                                                    title: "Clicking a row would normally open a deeper program dashboard with staff assignments, client trends, and rollout settings.",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 font-semibold text-slate-900",
                                                            children: row.program
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1720,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: row.clients
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1721,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: row.completion
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1722,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: row.alerts
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1723,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: row.owner
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1724,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, row.program, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1715,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1713,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1703,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1702,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1685,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1665,
                columnNumber: 7
            }, this),
            active !== "Overview" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${shellCard} p-8`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-bold text-slate-900",
                        children: active
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1735,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 max-w-3xl text-lg leading-8 text-slate-600",
                        children: "This preview area demonstrates how agencies can click into staff management, reports, settings, and program dashboards."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1736,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1734,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 1658,
        columnNumber: 5
    }, this);
}
function FeatureGrid({ title, subtitle, items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${shellCard} p-6`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-bold text-slate-900",
                children: title
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1756,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 max-w-3xl text-lg text-slate-600",
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1757,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                        text: item.tip,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-slate-200 bg-white p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-semibold text-slate-900",
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1762,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-base text-slate-600",
                                    children: item.description
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 1763,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                            lineNumber: 1761,
                            columnNumber: 13
                        }, this)
                    }, item.title, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1760,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1758,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 1755,
        columnNumber: 5
    }, this);
}
function SafetyCircleVisuals() {
    const mapPoints = [
        {
            name: "Mary",
            x: "52%",
            y: "42%"
        },
        {
            name: "Neighbor",
            x: "37%",
            y: "48%"
        },
        {
            name: "Daughter",
            x: "70%",
            y: "30%"
        },
        {
            name: "Caregiver",
            x: "68%",
            y: "62%"
        },
        {
            name: "Agency",
            x: "27%",
            y: "24%"
        }
    ];
    const escalationSteps = [
        {
            label: "Check-in missed",
            state: "active"
        },
        {
            label: "Reminder sent",
            state: "active"
        },
        {
            label: "Family alerted",
            state: "active"
        },
        {
            label: "Neighbor dispatched",
            state: "active"
        },
        {
            label: "Caregiver backup",
            state: "idle"
        }
    ];
    const neighborAlerts = [
        {
            title: "Neighbor response requested",
            detail: "Elaine Morris is 0.3 miles away and marked as available for same-day welfare checks.",
            time: "10:18 AM"
        },
        {
            title: "Door knock completed",
            detail: "Neighbor reported lights on and confirmed Mary is safe after a missed phone response.",
            time: "10:29 AM"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl bg-sky-100 p-3 text-sky-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(MapPinned, {
                                            className: "h-6 w-6"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1810,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1809,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: "Community Safety Map"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1813,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-lg text-slate-600",
                                                children: "A simple geographic-style preview showing how one person's support network is distributed."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1814,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1812,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1808,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mt-6 h-80 overflow-hidden rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_50%_30%,rgba(14,165,233,0.14),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 opacity-50",
                                        style: {
                                            backgroundImage: "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
                                            backgroundSize: "32px 32px"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1820,
                                        columnNumber: 13
                                    }, this),
                                    mapPoints.map((point)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                            text: `${point.name} is shown here as part of the community response network.`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -translate-x-1/2 -translate-y-1/2",
                                                style: {
                                                    left: point.x,
                                                    top: point.y
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-4 w-4 rounded-full bg-sky-500 ring-4 ring-sky-200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1838,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm",
                                                            children: point.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1839,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1837,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1833,
                                                columnNumber: 17
                                            }, this)
                                        }, point.name, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1829,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1819,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1807,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl bg-emerald-100 p-3 text-emerald-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Users, {
                                            className: "h-6 w-6"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1852,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1851,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: "Safety Circle Graph"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1855,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-lg text-slate-600",
                                                children: "The care network around one member, visually connecting loved ones, neighbors, and professional support."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1856,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1854,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1850,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mt-6 h-80 rounded-[28px] border border-slate-200 bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "absolute inset-0 h-full w-full",
                                        viewBox: "0 0 600 320",
                                        fill: "none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "300",
                                                y1: "150",
                                                x2: "140",
                                                y2: "90",
                                                stroke: "#cbd5e1",
                                                strokeWidth: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1863,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "300",
                                                y1: "150",
                                                x2: "470",
                                                y2: "90",
                                                stroke: "#cbd5e1",
                                                strokeWidth: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1864,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "300",
                                                y1: "150",
                                                x2: "150",
                                                y2: "245",
                                                stroke: "#cbd5e1",
                                                strokeWidth: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1865,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "300",
                                                y1: "150",
                                                x2: "455",
                                                y2: "235",
                                                stroke: "#cbd5e1",
                                                strokeWidth: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1866,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "300",
                                                y1: "150",
                                                x2: "300",
                                                y2: "38",
                                                stroke: "#cbd5e1",
                                                strokeWidth: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1867,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1862,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "This central member is the person being protected by the Safety Circle.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-[50%] top-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 px-5 py-4 text-base font-bold text-white shadow-lg",
                                            children: "Mary"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1870,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1869,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "Primary family contact receives the first alert after the automated reminder stage.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-[23%] top-[18%] rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800",
                                            children: "Daughter"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1875,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1874,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "Local neighbor can perform a rapid in-person check when appropriate.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-[22%] top-[70%] rounded-full bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800",
                                            children: "Neighbor"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1880,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1879,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "Caregiver is the professional fallback when family or neighbor response is delayed.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-[70%] top-[67%] rounded-full bg-violet-100 px-4 py-3 text-sm font-semibold text-violet-800",
                                            children: "Caregiver"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1885,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1884,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "Agency keeps the broader program informed and can escalate staffing or dispatch decisions.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-[68%] top-[18%] rounded-full bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800",
                                            children: "Agency"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1890,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1889,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "Emergency support remains available as the final escalation tier if contact cannot be made.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-[46%] top-[6%] rounded-full bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-800",
                                            children: "Emergency"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1895,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1894,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1861,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1849,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1806,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl bg-amber-100 p-3 text-amber-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Siren, {
                                            className: "h-6 w-6"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1907,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1906,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: "Escalation Path Animation"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1910,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-lg text-slate-600",
                                                children: "A visual explanation of how LifeSignal moves from automation to human response."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1911,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1909,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1905,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-4",
                                children: escalationSteps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${step.state === "active" ? "bg-amber-500 text-white shadow-lg shadow-amber-200" : "bg-slate-100 text-slate-500"}`,
                                                children: index + 1
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1919,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-lg font-semibold text-slate-900",
                                                    children: step.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1929,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1928,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, step.label, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1918,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1916,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1904,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${shellCard} p-6`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl bg-emerald-100 p-3 text-emerald-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Bell, {
                                            className: "h-6 w-6"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1939,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1938,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: "Neighbor Response Alerts"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1942,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-lg text-slate-600",
                                                children: "How nearby trusted contacts can become part of a calm, fast support response."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 1943,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1941,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1937,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-4",
                                children: neighborAlerts.map((alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                        text: "Neighbor alerts are especially effective in senior communities and close-knit neighborhoods.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-slate-200 bg-white p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg font-semibold text-slate-900",
                                                            children: alert.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1956,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700",
                                                            children: alert.time
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 1957,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1955,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 text-base leading-7 text-slate-600",
                                                    children: alert.detail
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 1961,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 1954,
                                            columnNumber: 17
                                        }, this)
                                    }, alert.title, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 1950,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 1948,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 1936,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 1903,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 1805,
        columnNumber: 5
    }, this);
}
function VerticalShowcase({ role, setRole, setActive }) {
    const verticals = [
        {
            key: "family",
            eyebrow: "For loved ones",
            summary: "Show families how simple daily reassurance, missed check-in visibility, and care-circle coordination all work together.",
            bullets: [
                "Loved one status",
                "Alert acknowledgement",
                "Family messaging"
            ]
        },
        {
            key: "caregiver",
            eyebrow: "For care teams",
            summary: "Demonstrate how professional caregivers manage multiple clients, medication workflows, and urgent escalations from one board.",
            bullets: [
                "Care board",
                "Medication oversight",
                "Escalation tasks"
            ]
        },
        {
            key: "recover",
            eyebrow: "For recovery programs",
            summary: "Let users preview sobriety tracking, sponsor communication, trigger monitoring, and accountability structure in one recovery-focused dashboard.",
            bullets: [
                "Streak chart",
                "Meeting calendar",
                "Sponsor thread"
            ]
        },
        {
            key: "postop",
            eyebrow: "For surgical follow-up",
            summary: "Preview post-op monitoring with pain trends, incision healing, vitals, nurse messaging, and risk prediction during the recovery window.",
            bullets: [
                "Pain trend",
                "Healing timeline",
                "Vitals review"
            ]
        },
        {
            key: "agency",
            eyebrow: "For operators",
            summary: "Show executives and coordinators the portfolio-level view across programs, staff, communities, and performance metrics.",
            bullets: [
                "Program metrics",
                "Reporting",
                "Rollout oversight"
            ]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${shellCard} p-6`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-slate-900",
                                children: "Explore each dashboard by vertical"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 2023,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 max-w-3xl text-lg text-slate-600",
                                children: "Each section below is now wired to open its matching demo dashboard so visitors can immediately see the product experience for that market."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 2024,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 2022,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700",
                        children: [
                            "Active preview: ",
                            roleMeta[role].label
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 2028,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 2021,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5",
                children: verticals.map((item)=>{
                    const meta = roleMeta[item.key];
                    const Icon = meta.icon;
                    const selected = role === item.key;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-3xl border p-5 transition ${selected ? "border-sky-300 bg-sky-50 shadow-sm" : "border-slate-200 bg-white"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `inline-flex rounded-2xl bg-gradient-to-r ${meta.color} p-3 text-white`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: "h-6 w-6"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2048,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 2047,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500",
                                children: item.eyebrow
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 2050,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "mt-2 text-xl font-bold text-slate-900",
                                children: meta.label
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 2053,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-base leading-7 text-slate-600",
                                children: item.summary
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 2054,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-4 space-y-2 text-sm text-slate-500",
                                children: item.bullets.map((bullet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "• ",
                                            bullet
                                        ]
                                    }, bullet, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 2057,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 2055,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setRole(item.key);
                                    setActive("Overview");
                                    const el = document.getElementById("dashboard-preview");
                                    if (el) {
                                        el.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start"
                                        });
                                    }
                                },
                                className: `mt-5 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-base font-semibold transition ${selected ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`,
                                children: "View dashboard"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                lineNumber: 2060,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.key, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 2039,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                lineNumber: 2033,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 2020,
        columnNumber: 5
    }, this);
}
function LifeSignalDemoDashboards() {
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("family");
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("Overview");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("");
    const meta = roleMeta[role];
    const RoleIcon = meta.icon;
    const view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (role === "family") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(FamilyView, {
            active: active
        }, void 0, false, {
            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
            lineNumber: 2094,
            columnNumber: 35
        }, this);
        if (role === "caregiver") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CaregiverView, {
            active: active
        }, void 0, false, {
            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
            lineNumber: 2095,
            columnNumber: 38
        }, this);
        if (role === "recover") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(RecoverView, {
            active: active
        }, void 0, false, {
            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
            lineNumber: 2096,
            columnNumber: 36
        }, this);
        if (role === "postop") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PostOpView, {
            active: active
        }, void 0, false, {
            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
            lineNumber: 2097,
            columnNumber: 35
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(AgencyView, {
            active: active
        }, void 0, false, {
            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
            lineNumber: 2098,
            columnNumber: 12
        }, this);
    }, [
        role,
        active
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-100 p-4 md:p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 overflow-hidden rounded-[32px] border border-slate-200 bg-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `bg-gradient-to-r ${meta.color} p-8 text-white md:p-10`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Sparkles, {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 2109,
                                                    columnNumber: 19
                                                }, this),
                                                "Interactive demo experience"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 2108,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl bg-white/15 p-3 backdrop-blur",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleIcon, {
                                                        className: "h-8 w-8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 2114,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 2113,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-3xl font-bold tracking-tight md:text-5xl",
                                                    children: meta.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 2116,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 2112,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 max-w-3xl text-lg leading-8 text-white/90 md:text-xl",
                                            children: meta.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 2118,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2107,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                            text: "Use the role switcher on the left to experience the product from the perspective of a family, caregiver, recovery, PostOP, or agency user.",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl bg-white/15 px-5 py-4 text-base font-medium backdrop-blur",
                                                children: "Guided role switching built in"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 2125,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 2124,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                            text: "Hover or focus on major cards, rows, and buttons to see explanation balloons describing what that function does.",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl bg-white/15 px-5 py-4 text-base font-medium backdrop-blur",
                                                children: "Balloon help on interactive elements"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 2130,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 2129,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2123,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                            lineNumber: 2106,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                        lineNumber: 2105,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                    lineNumber: 2104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(VerticalShowcase, {
                    role: role,
                    setRole: setRole,
                    setActive: setActive
                }, void 0, false, {
                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                    lineNumber: 2139,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 grid gap-6 lg:grid-cols-[300px_1fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Sidebar, {
                            role: role,
                            setRole: setRole,
                            active: active,
                            setActive: setActive
                        }, void 0, false, {
                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                            lineNumber: 2142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${shellCard} p-5`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-base font-medium text-slate-500",
                                                            children: "Current demo role"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 2148,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: `mt-1 text-3xl font-bold ${darkText}`,
                                                            children: meta.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 2149,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 2147,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-3 sm:flex-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Search, {
                                                                    className: "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 2154,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    value: search,
                                                                    onChange: (e)=>setSearch(e.target.value),
                                                                    placeholder: "Search demo modules",
                                                                    className: "w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-sky-400 sm:w-72"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                    lineNumber: 2155,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 2153,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(HoverExplain, {
                                                            text: "This button would open an onboarding-style walkthrough for first-time visitors exploring the dashboard.",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "rounded-2xl bg-slate-950 px-5 py-3 text-base font-semibold text-white",
                                                                children: "Start guided tour"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                                lineNumber: 2163,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                            lineNumber: 2162,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 2152,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 2146,
                                            columnNumber: 15
                                        }, this),
                                        search ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-base text-amber-800",
                                            children: "Demo search is visual only in this preview. In production, it can jump visitors directly to modules like alerts, medication, reports, or loved one profiles."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 2171,
                                            columnNumber: 17
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2145,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    id: "dashboard-preview",
                                    children: view
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2177,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureGrid, {
                                    title: "AI Safety Intelligence",
                                    subtitle: "LifeSignal includes predictive safety tools designed to identify subtle risks before they become emergencies.",
                                    items: aiCards
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureGrid, {
                                    title: "Platform Visualizations",
                                    subtitle: "These interactive previews help visitors understand how LifeSignal operates across a full safety network.",
                                    items: visualizationCards
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2185,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(SafetyCircleVisuals, {}, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2191,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[28px] border border-dashed border-slate-300 bg-white p-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertTriangle, {
                                                className: "mt-1 h-5 w-5 text-amber-500"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 2195,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-bold text-slate-900",
                                                        children: "Demo note"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 2197,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 max-w-4xl text-base leading-7 text-slate-600",
                                                        children: "This interactive preview is designed to help prospects click through the Family, Caregiver, Recover, PostOP, and Agency experiences before creating an account. The tooltips explain the purpose of each module, while the sections simulate what each customer tier will be able to do inside the finished product."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                        lineNumber: 2198,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                lineNumber: 2196,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                        lineNumber: 2194,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${shellCard} p-6`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-slate-900",
                                            children: "Demo QA checklist"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 2206,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-4 space-y-2 text-base text-slate-600",
                                            children: demoTestCases.map((test)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "• ",
                                                        test
                                                    ]
                                                }, test, true, {
                                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                                    lineNumber: 2209,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                            lineNumber: 2207,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                                    lineNumber: 2205,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                            lineNumber: 2144,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
                    lineNumber: 2141,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
            lineNumber: 2103,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx",
        lineNumber: 2102,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/demo-dashboards/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DemoDashboardsPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$components$2f$demo$2f$LifeSignalDemoDashboards$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/components/demo/LifeSignalDemoDashboards.tsx [app-rsc] (ecmascript)");
;
;
const metadata = {
    title: "LifeSignal Demo Dashboards",
    description: "Interactive Family, Caregiver, Recover, PostOP, and Agency dashboard previews for LifeSignal."
};
function DemoDashboardsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$components$2f$demo$2f$LifeSignalDemoDashboards$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/demo-dashboards/page.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/demo-dashboards/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/demo-dashboards/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__691d3977._.js.map