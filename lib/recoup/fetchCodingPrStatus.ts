import { API_BASE_URL } from "@/lib/consts";
import type { CodingPrStatusResponse } from "@/types/coding-agent";

/**
 * Fetches the merged status for an array of GitHub PR URLs from GET /api/admins/coding/pr.
 * Authenticates using the caller's Privy access token (admin Bearer auth).
 *
 * @param accessToken - Privy access token from getAccessToken()
 * @param pullRequests - Array of GitHub PR URLs to check
 * @returns CodingPrStatusResponse with merged status for each PR
 */
export async function fetchCodingPrStatus(
  accessToken: string,
  pullRequests: string[],
): Promise<CodingPrStatusResponse> {
  if (pullRequests.length === 0) {
    return { status: "success", pull_requests: [] };
  }

  const url = new URL(`${API_BASE_URL}/api/admins/coding/pr`);
  pullRequests.forEach((pr) => url.searchParams.append("pull_requests", pr));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? body.message ?? `HTTP ${res.status}`);
  }

  return res.json();
}
