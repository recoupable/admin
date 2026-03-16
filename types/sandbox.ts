export interface AccountSandboxRow {
  account_id: string;
  account_email: string | null;
  total_sandboxes: number;
  last_created_at: string;
}

export interface AdminSandboxesResponse {
  status: "success" | "error";
  accounts: AccountSandboxRow[];
}

export interface OrgRepoRow {
  repo_name: string;
  repo_url: string;
  total_commits: number;
  latest_commit_messages: string[];
  earliest_committed_at: string;
  latest_committed_at: string;
  account_repos: string[];
}

export interface AdminSandboxOrgsResponse {
  status: "success" | "error";
  repos: OrgRepoRow[];
}
