import { API_BASE_URL } from "@/lib/consts";

export interface PulseEmail {
  id: string;
  subject: string | null;
  to: string[];
  from: string | null;
  html: string | null;
  created_at: string;
}

/**
 * Fetches all Resend emails sent for a specific account from GET /api/admins/emails?account_id=<id>.
 * Authenticates using the caller's Privy access token (admin Bearer auth).
 *
 * @param accessToken - Privy access token from getAccessToken()
 * @param accountId - The account ID to fetch emails for
 * @returns Array of pulse emails with HTML content
 */
export async function fetchAccountPulseEmails(
  accessToken: string,
  accountId: string,
): Promise<PulseEmail[]> {
  const url = new URL(`${API_BASE_URL}/api/admins/emails`);
  url.searchParams.set("account_id", accountId);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? body.message ?? `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.emails ?? [];
}
