"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchCreditsEvents } from "@/lib/recoup/fetchCreditsEvents";
import type { CreditsPeriod } from "@/types/credits";

interface UseCreditsEventsParams {
  accountId: string;
  period: CreditsPeriod;
  page: number;
  limit: number;
  /** When false, the query is parked — used so events lazy-load only on row expand. */
  enabled: boolean;
}

/**
 * Paginated `usage_events` drilldown for one account from
 * GET /api/admins/credits/events. Disabled until the row is expanded.
 */
export function useCreditsEvents({
  accountId,
  period,
  page,
  limit,
  enabled,
}: UseCreditsEventsParams) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "credits", "events", accountId, period, page, limit],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchCreditsEvents({ accessToken: token, accountId, period, page, limit });
    },
    enabled: enabled && ready && authenticated,
    placeholderData: keepPreviousData,
  });
}
