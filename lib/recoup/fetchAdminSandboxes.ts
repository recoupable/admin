import { requestAdminJson } from "@/lib/recoup/requestAdminJson";
import { API_BASE_URL } from "@/lib/consts";
import type { AccountSandboxRow } from "@/types/sandbox";

/**
 * Fetches account sandbox statistics from GET /api/admins/sandboxes.
 * Authenticates using the caller's Privy access token.
 *
 * @param accessToken - Privy access token from getAccessToken()
 * @returns Array of account sandbox rows
 */
export async function fetchAdminSandboxes(
  accessToken: string,
): Promise<AccountSandboxRow[]> {
  const data = await requestAdminJson<{ accounts?: AccountSandboxRow[] }>(
    `${API_BASE_URL}/api/admins/sandboxes`,
    accessToken,
    ["message"],
  );
  return data.accounts ?? [];
}
