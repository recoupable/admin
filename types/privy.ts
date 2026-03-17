export type { User as PrivyUser } from "@privy-io/react-auth";

export type PrivyLoginsPeriod = "all" | "daily" | "weekly" | "monthly";

export type PrivyLoginsResponse = {
  status: "success" | "error";
  total: number;
  total_new: number;
  total_active: number;
  total_privy_users: number;
  logins: import("@privy-io/react-auth").User[];
};
