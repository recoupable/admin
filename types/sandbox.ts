export interface AccountSandboxRow {
  account_id: string;
  account_name: string | null;
  total_sandboxes: number;
  last_created_at: string;
}

export interface AdminSandboxesResponse {
  status: "success" | "error";
  accounts: AccountSandboxRow[];
}
