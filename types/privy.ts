export type PrivyLoginsPeriod = "daily" | "weekly" | "monthly";

export type PrivyLoginRow = {
  privy_did: string;
  email: string | null;
  created_at: string;
};

export type PrivyLoginsResponse = {
  status: "success" | "error";
  total: number;
  logins: PrivyLoginRow[];
};
