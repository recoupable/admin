"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchAdminSandboxOrgs } from "@/lib/fetchAdminSandboxOrgs";

/**
 * Fetches org repo commit statistics from GET /api/admins/sandboxes/orgs
 * using TanStack Query. Authenticates with the Privy access token.
 */
export function useAdminSandboxOrgs() {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "sandboxes", "orgs"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchAdminSandboxOrgs(token);
    },
    enabled: ready && authenticated,
  });
}
