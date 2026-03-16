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

export interface AccountRepo {
  account_id: string;
  email: string | null;
  repo_url: string;
}

export interface OrgRepoRow {
  repo_name: string;
  repo_url: string;
  total_commits: number;
  latest_commit_messages: string[];
  earliest_committed_at: string;
  latest_committed_at: string;
  account_repos: AccountRepo[];
}

export interface AdminSandboxOrgsResponse {
  status: "success" | "error";
  repos: OrgRepoRow[];
}

export interface TaskRun {
  id: string;
  taskIdentifier: string;
  status: string;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  tags: string[];
}

export interface AccountTaskRunsResponse {
  status: "success" | "error";
  runs: TaskRun[];
}
