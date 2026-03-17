import type { PrivyUser } from "@/types/privy";

/**
 * Returns the most recent latest_verified_at (in seconds) across all linked accounts.
 * Returns null if no linked account has a latest_verified_at.
 */
export function getLastSeen(user: PrivyUser): number | null {
  let latest: number | null = null;

  for (const account of user.linked_accounts) {
    const verifiedAt = account.latest_verified_at;
    if (typeof verifiedAt === "number" && (latest === null || verifiedAt > latest)) {
      latest = verifiedAt;
    }
  }

  return latest;
}
