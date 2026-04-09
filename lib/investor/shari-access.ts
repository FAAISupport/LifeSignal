export const SHARI_PORTAL_TOKEN = process.env.SHARI_PORTAL_TOKEN || "";

export function isShariPortalAuthorized(token?: string | null) {
  if (!SHARI_PORTAL_TOKEN) return true;
  if (!token) return false;
  return token === SHARI_PORTAL_TOKEN;
}
