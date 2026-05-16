"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchCreditsRollup } from "@/lib/recoup/fetchCreditsRollup";
import type { CreditsPeriod } from "@/types/credits";

/**
 * Per-account credits rollup from GET /api/admins/credits/rollup. Fetched in
 * one shot so the table can sort client-side; the API maxes out at 500 rows,
 * which is well above current/foreseeable account counts.
 */
export function useCreditsRollup(period: CreditsPeriod) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "credits", "rollup", period],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchCreditsRollup({ accessToken: token, period });
    },
    enabled: ready && authenticated,
  });
}
