"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchPrivyLogins } from "@/lib/recoup/fetchPrivyLogins";
import type { PrivyLoginsPeriod } from "@/types/privy";

/**
 * Fetches Privy login statistics for the given period from GET /api/admins/privy.
 * Authenticates with the Privy access token (admin Bearer auth).
 */
export function usePrivyLogins(period: PrivyLoginsPeriod) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "privy", "logins", period],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchPrivyLogins(token, period);
    },
    enabled: ready && authenticated,
  });
}
