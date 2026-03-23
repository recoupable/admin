"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchSlackTags } from "@/lib/recoup/fetchSlackTags";
import type { SlackTagsPeriod } from "@/types/coding-agent";

/**
 * Fetches Slack tagging analytics for the Recoup Coding Agent for the given period.
 * Authenticates with the Privy access token (admin Bearer auth).
 */
export function useSlackTags(period: SlackTagsPeriod) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "coding-agent", "slack-tags", period],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchSlackTags(token, period);
    },
    enabled: ready && authenticated,
  });
}
