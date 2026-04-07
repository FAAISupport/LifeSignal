export type ChurchLeadStatus =
  | "new"
  | "contacted"
  | "demo_scheduled"
  | "demo_completed"
  | "closed_won"
  | "closed_lost";

export interface ChurchLead {
  id: string;
  churchName: string;
  city: string;
  state: string;
  phone?: string;
  email?: string;
  pastorName?: string;
  status: ChurchLeadStatus;
  notes?: string;
  lastContactedAt?: string;
}

export function nextStatus(status: ChurchLeadStatus): ChurchLeadStatus {
  const flow: ChurchLeadStatus[] = [
    "new",
    "contacted",
    "demo_scheduled",
    "demo_completed",
    "closed_won",
  ];

  const index = flow.indexOf(status);
  return flow[Math.min(index + 1, flow.length - 1)];
}

