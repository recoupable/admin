"use client";

import { useEffect, useState } from "react";
import type { AccountSandboxRow } from "@/types/sandbox";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://recoup-api.vercel.app";

interface UseAdminSandboxesResult {
  accounts: AccountSandboxRow[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Fetches account sandbox statistics from GET /api/admins/sandboxes.
 * Requires NEXT_PUBLIC_API_KEY to be set for authentication.
 *
 * @returns accounts list, loading state, and error string
 */
export function useAdminSandboxes(): UseAdminSandboxesResult {
  const [accounts, setAccounts] = useState<AccountSandboxRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    fetch(`${API_BASE}/api/admins/sandboxes`, {
      headers: {
        ...(apiKey ? { "x-api-key": apiKey } : {}),
      },
    })
      .then(async res => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message ?? `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setAccounts(data.accounts ?? []);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : "Failed to load sandboxes");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { accounts, isLoading, error };
}
