import { API_BASE_URL } from "@/lib/consts";

/**
 * Full Resend GetEmailResponseSuccess shape.
 * See https://resend.com/docs/api-reference/emails/retrieve-email
 */
export interface PulseEmail {
  id: string;
  from: string;
  to: string[];
  cc: string[] | null;
  bcc: string[] | null;
  reply_to: string[] | null;
  subject: string;
  html: string | null;
  text: string | null;
  created_at: string;
  scheduled_at: string | null;
  last_event: string;
  tags?: { name: string; value: string }[];
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
