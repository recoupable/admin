export type PrivyLoginsPeriod = "all" | "daily" | "weekly" | "monthly";

export type PrivyLinkedAccount = {
  type: string;
  address?: string;
  verified_at?: number;
  first_verified_at?: number | null;
  latest_verified_at?: number | null;
  [key: string]: unknown;
};

export type PrivyUser = {
  id: string;
  created_at: number;
  linked_accounts: PrivyLinkedAccount[];
  mfa_methods: unknown[];
  has_accepted_terms: boolean;
  is_guest: boolean;
};

export type PrivyLoginsResponse = {
  status: "success" | "error";
  total: number;
  total_new: number;
  total_active: number;
  total_privy_users: number;
  logins: PrivyUser[];
};
