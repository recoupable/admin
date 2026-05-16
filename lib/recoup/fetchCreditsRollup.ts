import { API_BASE_URL } from "@/lib/consts";
import type { CreditsPeriod, CreditsRollupResponse } from "@/types/credits";

interface FetchCreditsRollupParams {
  accessToken: string;
  period: CreditsPeriod;
}

/**
 * Fetches the per-account credits rollup from GET /api/admins/credits/rollup.
 * Requests the API's maximum page size so the admin UI can sort client-side
 * across the full result (matches the PrivyLogins / Sandboxes pattern).
 *
 * @param params - Auth token + period selector.
 * @returns Rollup response.
 */
export async function fetchCreditsRollup({
  accessToken,
  period,
}: FetchCreditsRollupParams): Promise<CreditsRollupResponse> {
  const url = new URL(`${API_BASE_URL}/api/admins/credits/rollup`);
  url.searchParams.set("period", period);
  url.searchParams.set("page", "1");
  url.searchParams.set("limit", "500");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? body.message ?? `HTTP ${res.status}`);
  }

  return res.json();
}
