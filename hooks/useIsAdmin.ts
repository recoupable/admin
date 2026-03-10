"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";

/**
 * Checks if the authenticated user is a Recoup admin
 * by calling GET /api/admins with their access token.
 */
export function useIsAdmin() {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) return false;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/api/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return false;

      const data = await res.json();
      return data.isAdmin ?? false;
    },
    enabled: ready && authenticated,
  });
}
