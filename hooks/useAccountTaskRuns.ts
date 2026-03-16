"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchAccountTaskRuns } from "@/lib/recoup/fetchAccountTaskRuns";

/**
 * Fetches recent task runs for a specific account from GET /api/tasks/runs?account_id=<id>.
 * Authenticates with the Privy access token (admin Bearer auth).
 */
export function useAccountTaskRuns(accountId: string) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "tasks", "runs", accountId],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchAccountTaskRuns(token, accountId);
    },
    enabled: ready && authenticated && !!accountId,
    refetchInterval: 10_000,
  });
}
