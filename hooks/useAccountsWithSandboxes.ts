"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { API_BASE_URL } from "@/lib/consts";

export interface AccountSandboxSummary {
  account_id: string;
  account_name: string | null;
  total_sandboxes: number;
  last_created_at: string | null;
}

/**
 * Fetches all accounts with sandbox summaries from the admin endpoint.
 * Requires admin authentication.
 */
export function useAccountsWithSandboxes() {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery<AccountSandboxSummary[]>({
    queryKey: ["accountsWithSandboxes"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) return [];

      const res = await fetch(
        `${API_BASE_URL}/api/admins/accounts-with-sandboxes`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!res.ok) return [];

      const data = await res.json();
      return data.accounts ?? [];
    },
    enabled: ready && authenticated,
  });
}
