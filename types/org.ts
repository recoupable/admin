export interface OrgRepoRow {
  repo_name: string;
  repo_url: string;
  total_commits: number;
  latest_5_commit_messages: string[];
  earliest_commit_at: string;
  latest_commit_at: string;
  account_repos_with_submodule: number;
}

export interface AdminOrgsResponse {
  status: "success" | "error";
  repos: OrgRepoRow[];
}
