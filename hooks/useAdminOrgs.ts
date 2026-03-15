"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchAdminOrgs } from "@/lib/fetchAdminOrgs";

/**
 * Fetches org repo statistics from GET /api/admins/sandboxes/orgs
 * using TanStack Query. Authenticates with the Privy access token.
 */
export function useAdminOrgs() {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "orgs"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchAdminOrgs(token);
    },
    enabled: ready && authenticated,
  });
}
