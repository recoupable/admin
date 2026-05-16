import { API_BASE_URL } from "@/lib/consts";
import type { CreditsPeriod, CreditsEventsResponse } from "@/types/credits";

interface FetchCreditsEventsParams {
  accessToken: string;
  accountId: string;
  period: CreditsPeriod;
  page: number;
  limit: number;
}

/**
 * Fetches a paginated slice of `usage_events` for one account over the selected
 * period from GET /api/admins/credits/events.
 *
 * @param params - Auth token + account + period + page/limit pagination.
 * @returns Events response (page slice + total_count).
 */
export async function fetchCreditsEvents({
  accessToken,
  accountId,
  period,
  page,
  limit,
}: FetchCreditsEventsParams): Promise<CreditsEventsResponse> {
  const url = new URL(`${API_BASE_URL}/api/admins/credits/events`);
  url.searchParams.set("account_id", accountId);
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
