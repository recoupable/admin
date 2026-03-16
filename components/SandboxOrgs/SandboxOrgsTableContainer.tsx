"use client";

import { useAdminSandboxOrgs } from "@/hooks/useAdminSandboxOrgs";
import SandboxOrgsTable from "@/components/SandboxOrgs/SandboxOrgsTable";

export default function SandboxOrgsTableContainer() {
  const { data: repos, isLoading, error } = useAdminSandboxOrgs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
        {error instanceof Error ? error.message : "Failed to load org repos"}
      </div>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-gray-400">
        No org repo data found.
      </div>
    );
  }

  return <SandboxOrgsTable repos={repos} />;
}
