"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchCreditsRollup } from "@/lib/recoup/fetchCreditsRollup";
import type { CreditsPeriod } from "@/types/credits";

interface UseCreditsRollupParams {
  period: CreditsPeriod;
  page: number;
  limit: number;
}

/**
 * Paginated per-account credits rollup from GET /api/admins/credits/rollup.
 */
export function useCreditsRollup({ period, page, limit }: UseCreditsRollupParams) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "credits", "rollup", period, page, limit],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchCreditsRollup({ accessToken: token, period, page, limit });
    },
    enabled: ready && authenticated,
    placeholderData: keepPreviousData,
  });
}
