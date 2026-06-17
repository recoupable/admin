"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchSlackTagOptions } from "@/lib/recoup/fetchSlackTagOptions";

/**
 * Fetches the distinct Slack user tags (filter options) for the coding agent page.
 * Authenticates with the Privy access token (admin Bearer auth).
 */
export function useSlackTagOptions() {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "coding-agent", "slack-tag-options"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchSlackTagOptions(token);
    },
    enabled: ready && authenticated,
  });
}
