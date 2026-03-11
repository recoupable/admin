"use client";

import { useAdminSandboxes } from "@/hooks/useAdminSandboxes";
import SandboxesTable from "./SandboxesTable";

/**
 * Client component that fetches and renders the account sandboxes table.
 */
export default function SandboxesTableContainer() {
  const { accounts, isLoading, error } = useAdminSandboxes();

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
        {error}
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-gray-400">
        No sandbox data found.
      </div>
    );
  }

  return <SandboxesTable accounts={accounts} />;
}
