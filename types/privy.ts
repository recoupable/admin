export type PrivyLinkedAccount = Record<string, unknown> & {
  type: string;
  address?: string;
  verified_at?: number;
  first_verified_at?: number | null;
  latest_verified_at?: number | null;
};

/**
 * Raw Privy user object as returned by the Management API (snake_case).
 * Differs from @privy-io/react-auth's User type which uses camelCase.
 */
export type PrivyUser = {
  id: string;
  created_at: number;
  linked_accounts: PrivyLinkedAccount[];
  mfa_methods: unknown[];
  has_accepted_terms: boolean;
  is_guest: boolean;
};

export type { AdminPeriod as PrivyLoginsPeriod } from "./admin";

export type PrivyLoginsResponse = {
  status: "success" | "error";
  total: number;
  total_new: number;
  total_active: number;
  logins: PrivyUser[];
};
