"use client";

import { useQuery } from "@tanstack/react-query";
import type { AccountSandboxRow } from "@/types/sandbox";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://recoup-api.vercel.app";

async function fetchAdminSandboxes(): Promise<AccountSandboxRow[]> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const res = await fetch(`${API_BASE}/api/admins/sandboxes`, {
    headers: {
      ...(apiKey ? { "x-api-key": apiKey } : {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.accounts ?? [];
}

/**
 * Fetches account sandbox statistics from GET /api/admins/sandboxes
 * using TanStack Query for caching and background refresh.
 */
export function useAdminSandboxes() {
  return useQuery({
    queryKey: ["admin", "sandboxes"],
    queryFn: fetchAdminSandboxes,
  });
}
