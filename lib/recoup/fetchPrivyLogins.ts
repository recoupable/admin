import { requestAdminJson } from "@/lib/recoup/requestAdminJson";
import { API_BASE_URL } from "@/lib/consts";
import type { PrivyLoginsPeriod, PrivyLoginsResponse } from "@/types/privy";

/**
 * Fetches Privy login statistics from GET /api/admins/privy.
 * Authenticates using the caller's Privy access token (admin Bearer auth).
 *
 * @param accessToken - Privy access token from getAccessToken()
 * @param period - Time period: "all", "daily", "weekly", or "monthly"
 * @returns PrivyLoginsResponse with counts and full Privy user objects
 */
export async function fetchPrivyLogins(
  accessToken: string,
  period: PrivyLoginsPeriod,
): Promise<PrivyLoginsResponse> {
  const url = new URL(`${API_BASE_URL}/api/admins/privy`);
  url.searchParams.set("period", period);

  return requestAdminJson<PrivyLoginsResponse>(url.toString(), accessToken);
}
