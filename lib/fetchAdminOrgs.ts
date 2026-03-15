import { API_BASE_URL } from "@/lib/consts";
import type { OrgRepoRow } from "@/types/org";

/**
 * Fetches org repo statistics from GET /api/admins/sandboxes/orgs.
 * Authenticates using the caller's Privy access token.
 *
 * @param accessToken - Privy access token from getAccessToken()
 * @returns Array of org repo rows
 */
export async function fetchAdminOrgs(accessToken: string): Promise<OrgRepoRow[]> {
  const res = await fetch(`${API_BASE_URL}/api/admins/sandboxes/orgs`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.repos ?? [];
}
