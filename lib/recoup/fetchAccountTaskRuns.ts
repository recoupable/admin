import { API_BASE_URL } from "@/lib/consts";
import type { TaskRun } from "@/types/sandbox";

/**
 * Fetches recent task runs for a specific account from GET /api/tasks/runs?account_id=<id>.
 * Authenticates using the caller's Privy access token (admin Bearer auth).
 *
 * @param accessToken - Privy access token from getAccessToken()
 * @param accountId - The account ID to fetch task runs for
 * @param limit - Maximum number of runs to return (default 20)
 * @returns Array of task runs for the account
 */
export async function fetchAccountTaskRuns(
  accessToken: string,
  accountId: string,
  limit = 20,
): Promise<TaskRun[]> {
  const url = new URL(`${API_BASE_URL}/api/tasks/runs`);
  url.searchParams.set("account_id", accountId);
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? body.message ?? `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.runs ?? [];
}
