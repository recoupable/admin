import { API_BASE_URL } from "@/lib/consts";
import type { CreditsPeriod, CreditsRollupResponse } from "@/types/credits";

interface FetchCreditsRollupParams {
  accessToken: string;
  period: CreditsPeriod;
  page: number;
  limit: number;
}

/**
 * Fetches the per-account credits rollup from GET /api/admins/credits/rollup.
 *
 * @param params - Auth token + period selector + page/limit pagination.
 * @returns Rollup response (page slice + total_count).
 */
export async function fetchCreditsRollup({
  accessToken,
  period,
  page,
  limit,
}: FetchCreditsRollupParams): Promise<CreditsRollupResponse> {
  const url = new URL(`${API_BASE_URL}/api/admins/credits/rollup`);
  url.searchParams.set("period", period);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? body.message ?? `HTTP ${res.status}`);
  }

  return res.json();
}
