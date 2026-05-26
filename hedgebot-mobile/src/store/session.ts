import { create } from 'zustand';

export type UserRole = 'owner' | 'office_admin' | 'dispatcher' | 'crew_lead' | 'crew_member' | 'sales_rep' | 'customer';

type SessionState = {
  tenantId: string | null;
  userId: string | null;
  role: UserRole | null;
  setSession: (payload: { tenantId: string; userId: string; role: UserRole }) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  tenantId: null,
  userId: null,
  role: null,
  setSession: ({ tenantId, userId, role }) => set({ tenantId, userId, role }),
  clearSession: () => set({ tenantId: null, userId: null, role: null })
}));
