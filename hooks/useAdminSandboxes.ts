"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchAdminSandboxes } from "@/lib/fetchAdminSandboxes";

/**
 * Fetches account sandbox statistics from GET /api/admins/sandboxes
 * using TanStack Query. Authenticates with the Privy access token.
 */
export function useAdminSandboxes() {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "sandboxes"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchAdminSandboxes(token);
    },
    enabled: ready && authenticated,
  });
}
