export type Stat = {
  label: string;
  value: string;
  change: string;
  tone: "blue" | "green" | "amber" | "red" | "purple";
};

export type AlertItem = {
  id: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
  age: string;
};

export type MemberCareItem = {
  id: string;
  name: string;
  lane: "Urgent Care" | "Pastoral Follow-Up" | "Prayer Team" | "Volunteer Help";
  reason: string;
  lastTouch: string;
  status: "Needs contact" | "In progress" | "Covered" | "Escalated";
};

export type PrayerItem = {
  id: string;
  name: string;
  category: string;
  confidentiality: "Private" | "Team" | "Church";
  urgency: "High" | "Normal";
  owner: string;
};

export type VolunteerTask = {
  id: string;
  task: string;
  owner: string;
  due: string;
  status: "Unassigned" | "Assigned" | "Done";
};

export type TimelineEvent = {
  id: string;
  title: string;
  time: string;
  note: string;
  tone: "blue" | "green" | "amber" | "red" | "purple";
};
