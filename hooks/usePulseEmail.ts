"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchPulseEmailById } from "@/lib/recoup/fetchPulseEmailById";

/**
 * Fetches a single Resend email by ID.
 * Query key includes emailId so switching runs invalidates stale data.
 */
export function usePulseEmail(emailId: string | null) {
  const { ready, authenticated, getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["admin", "pulse-email", emailId],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchPulseEmailById(token, emailId!);
    },
    enabled: ready && authenticated && !!emailId,
  });
}
