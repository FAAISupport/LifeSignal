import type {
  AlertItem,
  MemberCareItem,
  PrayerItem,
  Stat,
  TimelineEvent,
  VolunteerTask,
} from "@/components/faithsignal-demo/types";

export const stats: Stat[] = [
  { label: "Active Care Plans", value: "148", change: "+12 this month", tone: "blue" },
  { label: "Members Requiring Follow-Up", value: "23", change: "-5 from last week", tone: "amber" },
  { label: "Prayer Requests Open", value: "41", change: "9 urgent", tone: "purple" },
  { label: "Volunteer Tasks Completed", value: "86%", change: "+14% completion rate", tone: "green" },
  { label: "Hospital / Crisis Cases", value: "6", change: "2 need same-day action", tone: "red" },
  { label: "Average Response Time", value: "3.2h", change: "Down from 5.1h", tone: "green" },
];

export const alertsSeed: AlertItem[] = [
  {
    id: "a1",
    title: "Missed check-ins from 2 senior members",
    detail: "Both missed two consecutive touchpoints and have no logged pastoral contact yet.",
    severity: "high",
    age: "14 min ago",
  },
  {
    id: "a2",
    title: "Hospital discharge follow-up overdue",
    detail: "Meal train and medication confirmation not yet assigned for the Ramirez family.",
    severity: "high",
    age: "31 min ago",
  },
  {
    id: "a3",
    title: "Prayer request marked urgent",
    detail: "Confidential marriage crisis request awaiting owner assignment.",
    severity: "medium",
    age: "52 min ago",
  },
  {
    id: "a4",
    title: "Volunteer transportation gap",
    detail: "No driver assigned for Thursday oncology appointment.",
    severity: "medium",
    age: "1 hr ago",
  },
];

export const careQueueSeed: MemberCareItem[] = [
  {
    id: "c1",
    name: "Martha Jenkins",
    lane: "Urgent Care",
    reason: "Missed two daily member check-ins",
    lastTouch: "Yesterday, 8:14 AM",
    status: "Escalated",
  },
  {
    id: "c2",
    name: "James Holloway",
    lane: "Pastoral Follow-Up",
    reason: "Recent bereavement, week 2 pathway touchpoint due",
    lastTouch: "2 days ago",
    status: "Needs contact",
  },
  {
    id: "c3",
    name: "Tina Ramirez",
    lane: "Volunteer Help",
    reason: "Post-discharge meal delivery and transportation needed",
    lastTouch: "Today, 9:05 AM",
    status: "In progress",
  },
  {
    id: "c4",
    name: "Samuel Brooks",
    lane: "Prayer Team",
    reason: "Surgery Friday, family asked for coordinated prayer coverage",
    lastTouch: "Today, 7:42 AM",
    status: "Covered",
  },
  {
    id: "c5",
    name: "Elaine Morris",
    lane: "Pastoral Follow-Up",
    reason: "Absence detection triggered after 3 missed Sundays",
    lastTouch: "5 days ago",
    status: "Needs contact",
  },
];

export const prayerSeed: PrayerItem[] = [
  { id: "p1", name: "Anonymous couple", category: "Marriage crisis", confidentiality: "Private", urgency: "High", owner: "Pastor Reed" },
  { id: "p2", name: "Lopez family", category: "Cancer treatment", confidentiality: "Team", urgency: "High", owner: "Care Team A" },
  { id: "p3", name: "Megan Carter", category: "Job loss", confidentiality: "Church", urgency: "Normal", owner: "Prayer Team" },
  { id: "p4", name: "Harold Tate", category: "Recovery / rehab", confidentiality: "Team", urgency: "Normal", owner: "Deacon Hall" },
];

export const volunteerSeed: VolunteerTask[] = [
  { id: "v1", task: "Drive member to cardiology appointment", owner: "Unassigned", due: "Today 3:30 PM", status: "Unassigned" },
  { id: "v2", task: "Deliver meal train dinner", owner: "Angela P.", due: "Today 6:00 PM", status: "Assigned" },
  { id: "v3", task: "Home visit with communion", owner: "Ben H.", due: "Tomorrow 11:00 AM", status: "Assigned" },
  { id: "v4", task: "Call-back for grief support intake", owner: "Dana T.", due: "Tomorrow 1:00 PM", status: "Done" },
];

export const timelineSeed: TimelineEvent[] = [
  { id: "t1", title: "Urgent care case escalated", time: "10:08 AM", note: "Guardian and pastoral lead notified for missed check-ins.", tone: "red" },
  { id: "t2", title: "Prayer request triaged", time: "9:44 AM", note: "Marked private and assigned to Pastor Reed.", tone: "purple" },
  { id: "t3", title: "Volunteer ride assigned", time: "9:12 AM", note: "Transportation request matched with approved driver.", tone: "green" },
  { id: "t4", title: "Absence detection triggered", time: "8:31 AM", note: "Three-week attendance drop opened follow-up workflow.", tone: "amber" },
  { id: "t5", title: "Pastoral round completed", time: "8:02 AM", note: "Six households touched during morning care sweep.", tone: "blue" },
];
