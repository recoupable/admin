"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchAgentSignups } from "@/lib/recoup/fetchAgentSignups";
import type { AdminPeriod } from "@/types/admin";

export function useAgentSignups(period: AdminPeriod) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "agent-signups", period],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchAgentSignups(token, period);
    },
    enabled: ready && authenticated,
  });
}
