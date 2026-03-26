"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchContentSlackTags } from "@/lib/recoup/fetchContentSlackTags";
import type { AdminPeriod } from "@/types/admin";

export function useContentSlackTags(period: AdminPeriod) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "content", "slack", period],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchContentSlackTags(token, period);
    },
    enabled: ready && authenticated,
  });
}
