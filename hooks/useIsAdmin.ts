"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

interface UseIsAdminResult {
  isAdmin: boolean | null;
  isLoading: boolean;
}

/**
 * Checks if the authenticated user is a Recoup admin
 * by calling GET /api/admins with their access token.
 */
export function useIsAdmin(): UseIsAdminResult {
  const { ready, authenticated, getAccessToken } = usePrivy();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;

    if (!authenticated) {
      setIsAdmin(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const check = async () => {
      try {
        const token = await getAccessToken();
        if (!token || cancelled) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${apiUrl}/api/admins`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (!cancelled) setIsAdmin(false);
          return;
        }

        const data = await res.json();
        if (!cancelled) setIsAdmin(data.isAdmin ?? false);
      } catch {
        if (!cancelled) setIsAdmin(false);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void check();

    return () => {
      cancelled = true;
    };
  }, [ready, authenticated, getAccessToken]);

  return { isAdmin, isLoading };
}
