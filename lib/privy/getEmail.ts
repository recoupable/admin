import type { PrivyUser } from "@/types/privy";

/**
 * Extracts the email address from a Privy user's linked accounts.
 */
export function getEmail(user: PrivyUser): string | null {
  const emailAccount = user.linked_accounts.find((a) => a.type === "email");
  return (emailAccount?.address as string) ?? null;
}
