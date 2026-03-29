export type OrgRole = 'owner' | 'admin' | 'pastor' | 'care_manager' | 'volunteer' | 'viewer';

export interface TeamMember {
  user_id: string;
  email: string;
  full_name: string | null;
  role: OrgRole;
  created_at: string;
}
