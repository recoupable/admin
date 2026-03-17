import type { User } from "@privy-io/react-auth";

export type PrivyUser = User;

export type PrivyLoginsPeriod = "all" | "daily" | "weekly" | "monthly";

export type PrivyLoginsResponse = {
  status: "success" | "error";
  total: number;
  total_new: number;
  total_active: number;
  total_privy_users: number;
  logins: PrivyUser[];
};
