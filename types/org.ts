export interface OrgRepoRow {
  repo_name: string;
  repo_url: string;
  total_commits: number;
  latest_commit_messages: string[];
  earliest_committed_at: string;
  latest_committed_at: string;
  account_repo_count: number;
}

export interface AdminSandboxOrgsResponse {
  status: "success" | "error";
  repos: OrgRepoRow[];
}
