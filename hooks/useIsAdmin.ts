"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { API_BASE_URL } from "@/lib/consts";

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

      const res = await fetch(`${API_BASE_URL}/api/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return false;

      const data = await res.json();
      return data.isAdmin ?? false;
    },
    enabled: ready && authenticated,
  });
}
