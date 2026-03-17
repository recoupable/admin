import { API_BASE_URL } from "@/lib/consts";
import type { PulseEmail } from "./fetchAccountPulseEmails";

/**
 * Fetches a single Resend email by ID from GET /api/admins/emails?email_id=<id>.
 *
 * @param accessToken - Privy access token
 * @param emailId - The Resend email ID
 * @returns The email object or null if not found
 */
export async function fetchPulseEmailById(
  accessToken: string,
  emailId: string,
): Promise<PulseEmail | null> {
  const url = new URL(`${API_BASE_URL}/api/admins/emails`);
  url.searchParams.set("email_id", emailId);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? body.message ?? `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.emails?.[0] ?? null;
}
