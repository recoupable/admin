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
  const res = await fetch(`${API_BASE_URL}/api/admins/sandboxes`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.accounts ?? [];
}
