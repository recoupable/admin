"use client";

import { useAdminSandboxes } from "@/hooks/useAdminSandboxes";
import SandboxesTable from "@/components/Sandboxes/SandboxesTable";
import TableSkeleton from "@/components/Sandboxes/TableSkeleton";

const COLUMNS = ["Account", "Email", "Total Sandboxes", "Last Created"];

export default function SandboxesTableContainer() {
  const { data: accounts, isLoading, error } = useAdminSandboxes();

  if (isLoading) {
    return <TableSkeleton columns={COLUMNS} />;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
        {error instanceof Error ? error.message : "Failed to load sandboxes"}
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-gray-400">
        No sandbox data found.
      </div>
    );
  }

  return <SandboxesTable accounts={accounts} />;
}
