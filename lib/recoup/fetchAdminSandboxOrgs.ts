import { requestAdminJson } from "@/lib/recoup/requestAdminJson";
import { API_BASE_URL } from "@/lib/consts";
import type { OrgRepoRow } from "@/types/sandbox";

/**
 * Fetches org repo commit statistics from GET /api/admins/sandboxes/orgs.
 * Authenticates using the caller's Privy access token.
 *
 * @param accessToken - Privy access token from getAccessToken()
 * @returns Array of org repo rows ordered by total commits descending
 */
export async function fetchAdminSandboxOrgs(
  accessToken: string,
): Promise<OrgRepoRow[]> {
  const data = await requestAdminJson<{ repos?: OrgRepoRow[] }>(
    `${API_BASE_URL}/api/admins/sandboxes/orgs`,
    accessToken,
    ["message"],
  );
  return data.repos ?? [];
}
