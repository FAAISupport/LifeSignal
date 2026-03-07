export type Vertical = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  hero: string;
  bullets: string[];
  outcomes: string[];
  cta: string;
};

export const site = {
  name: 'LifeSignal',
  domain: 'lifesignal.app',
  email: 'support@lifesignal.app',
  tagline: 'Peace of mind for the people you love most.',
};

export const verticals: Vertical[] = [
  {
    slug: 'families',
    label: 'Families',
    title: 'Protect the people you love.',
    summary: 'Simple daily check-ins and fast escalation when someone misses a response.',
    hero: 'LifeSignal helps families stay connected to parents, grandparents, spouses, and loved ones living independently. A daily check-in confirms everything is okay. If something goes wrong, trusted contacts are alerted quickly.',
    bullets: [
      'Daily text-based wellness check-ins',
      'Multiple guardians on one profile',
      'Shared visibility for siblings and relatives',
      'Fast escalation when no response is received'
    ],
    outcomes: [
      'Less daily worry',
      'Faster awareness',
      'Better family coordination'
    ],
    cta: 'Join the beta for families'
  },
  {
    slug: 'caregivers',
    label: 'Caregivers',
    title: 'Support the people you care for.',
    summary: 'A lightweight remote monitoring layer for family caregivers and professional support teams.',
    hero: 'Caregivers already carry enough stress. LifeSignal adds a calm, automated layer of oversight with check-ins, alerting, and status visibility that does not feel invasive or clinical.',
    bullets: [
      'Client monitoring dashboard',
      'Missed check-in alerts',
      'Medication reminder support',
      'Recovery and routine tracking'
    ],
    outcomes: [
      'More confidence',
      'Better routine compliance',
      'Lower communication friction'
    ],
    cta: 'Request caregiver early access'
  },
  {
    slug: 'senior-living',
    label: 'Senior Living',
    title: 'Enhance safety for independent residents.',
    summary: 'Wellness checks that add reassurance without removing independence.',
    hero: 'Independent living communities want the right balance of freedom, dignity, and oversight. LifeSignal gives staff and families a simple safety layer for residents who want independence with added reassurance.',
    bullets: [
      'Resident check-in scheduling',
      'Staff awareness for missed responses',
      'Family reassurance layer',
      'Scalable monitoring across locations'
    ],
    outcomes: [
      'Safer communities',
      'Stronger family trust',
      'Operational peace of mind'
    ],
    cta: 'Talk with us about a pilot'
  },
  {
    slug: 'healthcare',
    label: 'Healthcare',
    title: 'Extend care beyond the hospital.',
    summary: 'Support post-discharge safety with remote recovery and wellness monitoring.',
    hero: 'The highest-risk period often starts after the patient goes home. LifeSignal gives providers a structured way to support recovery, monitor routine check-ins, and escalate concerns earlier.',
    bullets: [
      'Post-discharge check-ins',
      'Recovery monitoring',
      'Care team notification workflows',
      'Potential readmission reduction support'
    ],
    outcomes: [
      'Improved continuity of care',
      'Better patient reassurance',
      'More visibility between visits'
    ],
    cta: 'Explore healthcare partnerships'
  },
  {
    slug: 'recovery',
    label: 'Recovery',
    title: 'Recovery should never happen alone.',
    summary: 'For patients going home after surgery, illness, or a difficult health event.',
    hero: 'People recovering at home often need a simple safety net. LifeSignal makes it easy for families and caregivers to know whether a loved one is staying responsive, following the plan, and getting through the vulnerable first days safely.',
    bullets: [
      'Daily recovery check-ins',
      'Medication reminder support',
      'Guardian alerting',
      'Short-term monitoring plans'
    ],
    outcomes: [
      'Safer first days home',
      'More family visibility',
      'Less recovery uncertainty'
    ],
    cta: 'Start a recovery monitoring workflow'
  },
  {
    slug: 'community',
    label: 'Community Safety',
    title: 'Build safer communities together.',
    summary: 'Create trusted response networks with neighbors, loved ones, and community partners.',
    hero: 'LifeSignal is not just a check-in app. It can become a human safety network. When someone misses a check-in, trusted contacts nearby can be looped in quickly so support reaches people faster.',
    bullets: [
      'Trusted contact networks',
      'Neighborhood awareness models',
      'Family-plus-community coordination',
      'Dignity-first safety workflows'
    ],
    outcomes: [
      'Stronger support systems',
      'Faster local response',
      'More connected communities'
    ],
    cta: 'Learn about community deployments'
  }
];

export const features = [
  {
    title: 'Daily safety check-ins',
    body: 'Automated text-based check-ins that feel simple, friendly, and easy to answer.'
  },
  {
    title: 'Guardian alert network',
    body: 'If no response arrives, LifeSignal escalates to trusted contacts so someone knows quickly.'
  },
  {
    title: 'Recovery monitoring',
    body: 'Use short-term or ongoing monitoring plans for patients returning home after a health event.'
  },
  {
    title: 'Medication support',
    body: 'Pair wellness check-ins with routine reminders to reinforce consistency and reassurance.'
  },
  {
    title: 'Family dashboards',
    body: 'Give siblings, relatives, and caregivers a shared view of status, history, and alerts.'
  },
  {
    title: 'Multi-tenant ready',
    body: 'Built to support families, communities, providers, and future partner deployments.'
  }
];

export const pricing = [
  {
    name: 'Family',
    price: '$9',
    period: '/month',
    description: 'For families monitoring a loved one living alone.',
    items: ['Daily check-ins', 'Guardian alerts', 'Basic dashboard', 'Email support']
  },
  {
    name: 'Caregiver',
    price: '$29',
    period: '/month',
    description: 'For caregivers supporting multiple people.',
    items: ['Multi-profile monitoring', 'Escalation workflows', 'Recovery tracking', 'Priority support']
  },
  {
    name: 'Community',
    price: 'Custom',
    period: '',
    description: 'For senior communities, clinics, and partner organizations.',
    items: ['Resident or patient monitoring', 'Team dashboards', 'Pilot planning', 'Implementation support']
  }
];
