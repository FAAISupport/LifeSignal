import type { OrgRole } from '@/types/team';

const roleMatrix: Record<OrgRole, string[]> = {
  owner: ['members:read', 'members:write', 'incidents:read', 'incidents:write', 'billing:manage', 'team:invite', 'settings:manage'],
  admin: ['members:read', 'members:write', 'incidents:read', 'incidents:write', 'billing:manage', 'team:invite', 'settings:manage'],
  pastor: ['members:read', 'members:write', 'incidents:read', 'incidents:write'],
  care_manager: ['members:read', 'members:write', 'incidents:read', 'incidents:write', 'team:invite'],
  volunteer: ['members:read', 'incidents:read'],
  viewer: ['members:read', 'incidents:read'],
};

export function hasPermission(role: OrgRole, permission: string) {
  return roleMatrix[role]?.includes(permission) ?? false;
}
