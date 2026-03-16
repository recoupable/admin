"use client";

import { useAdminSandboxOrgs } from "@/hooks/useAdminSandboxOrgs";
import SandboxOrgsTable from "@/components/SandboxOrgs/SandboxOrgsTable";
import TableSkeleton from "@/components/Sandboxes/TableSkeleton";

const COLUMNS = ["Repo", "Total Commits", "Recent Commits", "Latest Commit", "Account Repos"];

export default function SandboxOrgsTableContainer() {
  const { data: repos, isLoading, error } = useAdminSandboxOrgs();

  if (isLoading) {
    return <TableSkeleton columns={COLUMNS} />;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
        {error instanceof Error ? error.message : "Failed to load org repos"}
      </div>
    );
  }

  const orgRepos = (repos ?? []).filter((r) => r.repo_name.startsWith("org-"));

  if (orgRepos.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-gray-400">
        No org repo data found.
      </div>
    );
  }

  return <SandboxOrgsTable repos={orgRepos} />;
}
