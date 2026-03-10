"use client";

import { useAccountsWithSandboxes } from "@/hooks/useAccountsWithSandboxes";
import AccountsTableSkeleton from "./AccountsTableSkeleton";

/**
 * Formats a timestamp string to a readable date/time.
 */
function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AccountsTable() {
  const { data: accounts, isLoading, error } = useAccountsWithSandboxes();

  if (isLoading) {
    return <AccountsTableSkeleton />;
  }

  if (error) {
    return (
      <p className="text-sm text-red-500">
        Failed to load accounts.
      </p>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No accounts with sandboxes found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 font-medium">Account Name</th>
            <th className="px-4 py-3 font-medium text-right">Total Sandboxes</th>
            <th className="px-4 py-3 font-medium text-right">Last Created</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {accounts.map((account) => (
            <tr key={account.account_id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <div>
                  <span className="font-medium">
                    {account.account_name || "Unnamed"}
                  </span>
                  <p className="text-xs text-muted-foreground font-mono">
                    {account.account_id}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                {account.total_sandboxes}
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground">
                {formatDate(account.last_created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
