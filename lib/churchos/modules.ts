export type ChurchPlan = 'core' | 'growth' | 'care';
export type ChurchAddon = 'giving' | 'sms';

export type ChurchModuleKey =
  | 'members'
  | 'events'
  | 'communications'
  | 'volunteers'
  | 'groups'
  | 'care'
  | 'lifesignal'
  | 'analytics'
  | 'public_engagement'
  | 'automations'
  | 'giving';

export interface ChurchModuleDefinition {
  key: ChurchModuleKey;
  name: string;
  subtitle: string;
  description: string;
  benefits: string[];
  availableIn: ChurchPlan[];
  addonRequired?: ChurchAddon;
}

export const planPricing: Record<ChurchPlan, { amountMonthly: number; label: string }> = {
  core: { amountMonthly: 149, label: 'Core' },
  growth: { amountMonthly: 299, label: 'Growth' },
  care: { amountMonthly: 499, label: 'Care' },
};

export const addonPricing: Record<ChurchAddon, { amountMonthly: number; label: string }> = {
  giving: { amountMonthly: 79, label: 'Giving Add-on' },
  sms: { amountMonthly: 39, label: 'SMS Add-on' },
};

export const planModuleMap: Record<ChurchPlan, ChurchModuleKey[]> = {
  core: ['members', 'events', 'communications', 'volunteers', 'groups', 'public_engagement'],
  growth: ['members', 'events', 'communications', 'volunteers', 'groups', 'public_engagement', 'analytics', 'automations'],
  care: [
    'members',
    'events',
    'communications',
    'volunteers',
    'groups',
    'public_engagement',
    'analytics',
    'automations',
    'care',
    'lifesignal',
  ],
};

export const moduleCatalog: ChurchModuleDefinition[] = [
  {
    key: 'members',
    name: 'Members',
    subtitle: 'Central member records and households',
    description: 'Track member profiles, household relationships, tags, and ministry notes.',
    benefits: ['Unified member profile', 'Tag-driven segmentation', 'Pastoral history visibility'],
    availableIn: ['core', 'growth', 'care'],
  },
  {
    key: 'events',
    name: 'Events',
    subtitle: 'Church events and attendance',
    description: 'Plan events, track registrations, and monitor attendance trends over time.',
    benefits: ['Simple event operations', 'Attendance visibility', 'Volunteer coordination'],
    availableIn: ['core', 'growth', 'care'],
  },
  {
    key: 'communications',
    name: 'Communications',
    subtitle: 'Targeted church communications',
    description: 'Send and log outreach messages with templates and communication history.',
    benefits: ['Message templates', 'Delivery history', 'Segmented messaging'],
    availableIn: ['core', 'growth', 'care'],
  },
  {
    key: 'volunteers',
    name: 'Volunteers',
    subtitle: 'Serve team coordination',
    description: 'Assign and organize volunteer roles to ensure ministry coverage.',
    benefits: ['Role assignment', 'Capacity planning', 'Service continuity'],
    availableIn: ['core', 'growth', 'care'],
  },
  {
    key: 'groups',
    name: 'Groups',
    subtitle: 'Small group engagement',
    description: 'Organize groups and track member participation in discipleship pathways.',
    benefits: ['Group participation insights', 'Leader visibility', 'Belonging metrics'],
    availableIn: ['core', 'growth', 'care'],
  },
  {
    key: 'care',
    name: 'Care',
    subtitle: 'Proactive pastoral care workflows',
    description: 'Manage care cases, assignments, and case notes for at-risk members.',
    benefits: ['Case ownership', 'Care timeline', 'Escalation readiness'],
    availableIn: ['care'],
  },
  {
    key: 'lifesignal',
    name: 'LifeSignal',
    subtitle: 'Daily check-ins and missed-check alerts',
    description: 'Monitor daily safety check-ins and trigger alerts when members miss responses.',
    benefits: ['Missed-check tracking', 'Risk-aware alerts', 'Senior safety confidence'],
    availableIn: ['care'],
  },
  {
    key: 'analytics',
    name: 'Analytics',
    subtitle: 'Retention and engagement insights',
    description: 'Measure member engagement, volunteer gaps, and retention risk trends.',
    benefits: ['Health metrics', 'Trend dashboards', 'Leadership insights'],
    availableIn: ['growth', 'care'],
  },
  {
    key: 'public_engagement',
    name: 'Public Engagement',
    subtitle: 'Guest follow-up and outreach',
    description: 'Capture first-time guest activity and automate follow-up journeys.',
    benefits: ['Visitor conversion', 'Follow-up discipline', 'Outreach consistency'],
    availableIn: ['core', 'growth', 'care'],
  },
  {
    key: 'automations',
    name: 'Automations',
    subtitle: 'Workflow automation engine',
    description: 'Build automations that trigger outreach or care tasks from behavior signals.',
    benefits: ['Operational consistency', 'Reduced manual work', 'Faster response times'],
    availableIn: ['growth', 'care'],
  },
  {
    key: 'giving',
    name: 'Giving',
    subtitle: 'Giving analytics and workflows',
    description: 'Track giving health and automate follow-up for generosity and donor care.',
    benefits: ['Giving trend visibility', 'Donor journeys', 'Financial health forecasting'],
    availableIn: ['core', 'growth', 'care'],
    addonRequired: 'giving',
  },
];

export function getModulesForPlan(plan: ChurchPlan) {
  return planModuleMap[plan];
}

export function calculateSubscriptionTotal(plan: ChurchPlan, addons: ChurchAddon[]) {
  const base = planPricing[plan].amountMonthly;
  const addonTotal = addons.reduce((sum, addon) => sum + addonPricing[addon].amountMonthly, 0);

  return {
    base,
    addonTotal,
    total: base + addonTotal,
  };
}

export function hasAccess(input: {
  plan: ChurchPlan;
  moduleKey: ChurchModuleKey;
  addons?: ChurchAddon[];
  enabledModules?: ChurchModuleKey[];
}) {
  const addons = input.addons ?? [];
  const enabledModules = input.enabledModules ?? [];
  const moduleDefinition = moduleCatalog.find((item) => item.key === input.moduleKey);

  if (!moduleDefinition) {
    return false;
  }

  if (enabledModules.includes(input.moduleKey)) {
    return true;
  }

  const planHasModule = planModuleMap[input.plan].includes(input.moduleKey);
  if (!planHasModule && input.moduleKey !== 'giving') {
    return false;
  }

  if (!moduleDefinition.addonRequired) {
    return planHasModule;
  }

  return addons.includes(moduleDefinition.addonRequired);
}
