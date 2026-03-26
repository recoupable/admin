"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchCodingPrStatus } from "@/lib/recoup/fetchCodingPrStatus";
import type { SlackTag } from "@/types/coding-agent";

/**
 * Fetches the merged status for all PR URLs found in the given Slack tags.
 * Returns a Set of merged PR URLs for fast lookup.
 */
export function useCodingPrStatus(tags: SlackTag[] | undefined) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  const allPrUrls = [...new Set(tags?.flatMap((tag) => tag.pull_requests ?? []) ?? [])];

  return useQuery({
    queryKey: ["admin", "coding-agent", "pr-status", allPrUrls],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      const res = await fetchCodingPrStatus(token, allPrUrls);
      return new Set(res.pull_requests.filter((pr) => pr.status === "merged").map((pr) => pr.url));
    },
    enabled: ready && authenticated && allPrUrls.length > 0,
  });
}
