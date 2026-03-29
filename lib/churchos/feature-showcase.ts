export interface FeatureShowcase {
  category: 'Care' | 'Safety' | 'Engagement' | 'Intelligence' | 'Volunteer coordination' | 'Communication';
  feature: string;
  trigger: string;
  automation: string;
  outcome: string;
  status: 'working';
}

export const featureShowcase: FeatureShowcase[] = [
  {
    category: 'Care',
    feature: 'Pastoral care rounds',
    trigger: 'Member tagged as homebound with weekly cadence.',
    automation: 'Creates pastoral follow-up task every Monday and tracks completion SLA.',
    outcome: 'Care lead dashboard shows completed rounds + overdue follow-ups.',
    status: 'working',
  },
  {
    category: 'Care',
    feature: 'Bereavement support',
    trigger: 'Family loss event recorded in member notes.',
    automation: 'Launches 12-week bereavement workflow with prayer + check-in milestones.',
    outcome: 'Pastors receive milestone reminders and family receives consistent care touches.',
    status: 'working',
  },
  {
    category: 'Care',
    feature: 'Hospital discharge follow up',
    trigger: 'Hospital discharge date entered for member.',
    automation: 'Schedules 24h call, 72h medication check, and 7-day recovery follow-up.',
    outcome: 'Missed post-discharge tasks are escalated to care manager.',
    status: 'working',
  },
  {
    category: 'Safety',
    feature: 'Daily safety check in',
    trigger: 'Member has active LifeSignal schedule.',
    automation: 'Sends SMS/voice check-in, retries if unanswered, escalates on miss.',
    outcome: 'Dashboard displays confirmed/missed/escalated state in near real-time.',
    status: 'working',
  },
  {
    category: 'Safety',
    feature: 'Severe weather welfare checks',
    trigger: 'Weather alert impacts configured ZIP clusters.',
    automation: 'Broadcasts welfare prompt and opens incident queue for non-responders.',
    outcome: 'Response map highlights households needing urgent contact.',
    status: 'working',
  },
  {
    category: 'Engagement',
    feature: 'Absence recovery',
    trigger: 'Attendance drops below threshold for two consecutive weeks.',
    automation: 'Starts reconnect workflow with SMS, call task, and pastoral assignment.',
    outcome: 'Recovered vs unrecovered absences tracked in engagement analytics.',
    status: 'working',
  },
  {
    category: 'Engagement',
    feature: 'First-time guest',
    trigger: 'New guest check-in recorded.',
    automation: 'Creates 30-day guest journey with welcome, invite, and next-step touchpoints.',
    outcome: 'Guest conversion metrics update in Growth dashboards.',
    status: 'working',
  },
  {
    category: 'Engagement',
    feature: 'Small group match',
    trigger: 'Member requests group placement.',
    automation: 'Suggests groups by life-stage, geography, and availability fit score.',
    outcome: 'Placement recommendation is saved and assigned to group coordinator.',
    status: 'working',
  },
  {
    category: 'Engagement',
    feature: 'Volunteer re-engagement',
    trigger: 'Volunteer has no serving activity for 45 days.',
    automation: 'Sends re-engagement sequence and offers open service opportunities.',
    outcome: 'Volunteer status moves to reactivated or follow-up-needed.',
    status: 'working',
  },
  {
    category: 'Intelligence',
    feature: 'Spiritual drop off detection',
    trigger: 'Combined decline across attendance, groups, and serving signals.',
    automation: 'Flags member risk band and queues pastoral retention outreach.',
    outcome: 'Leadership view shows at-risk members with explainable drivers.',
    status: 'working',
  },
  {
    category: 'Volunteer coordination',
    feature: 'Volunteer training paths',
    trigger: 'Volunteer assigned to a role requiring certification.',
    automation: 'Assigns required training modules and blocks role activation until complete.',
    outcome: 'Team table shows training completion and readiness state.',
    status: 'working',
  },
  {
    category: 'Volunteer coordination',
    feature: 'Volunteer appreciation cycles',
    trigger: 'Volunteer reaches service milestone.',
    automation: 'Schedules personalized appreciation touchpoint for team lead.',
    outcome: 'Retention dashboard logs recognition completion and volunteer sentiment trend.',
    status: 'working',
  },
  {
    category: 'Communication',
    feature: 'Voice broadcast',
    trigger: 'Church admin launches a voice outreach campaign.',
    automation: 'Delivers scripted voice message and logs delivery + response outcomes.',
    outcome: 'Communication logs show completed calls, misses, and callback requests.',
    status: 'working',
  },
];
