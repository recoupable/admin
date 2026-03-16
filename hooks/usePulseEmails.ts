"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchAccountPulseEmails } from "@/lib/recoup/fetchAccountPulseEmails";

/**
 * Fetches all Resend emails sent for a specific account.
 * Only runs when enabled is true (i.e., when a task run row is clicked).
 */
export function usePulseEmails(accountId: string, enabled: boolean) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "pulse-emails", accountId],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchAccountPulseEmails(token, accountId);
    },
    enabled: ready && authenticated && !!accountId && enabled,
  });
}
