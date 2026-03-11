import type { AccountSandboxRow } from "@/types/sandbox";

interface SandboxesTableProps {
  accounts: AccountSandboxRow[];
}

/**
 * Renders a table of accounts and their sandbox statistics.
 * Columns: Account Email, Total Sandboxes, Last Created.
 *
 * @param accounts - Array of account sandbox rows from the admin API
 */
export default function SandboxesTable({ accounts }: SandboxesTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              Account Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              Total Sandboxes
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              Last Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {accounts.map(row => (
            <tr key={row.account_id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                {row.account_email ?? (
                  <span className="text-gray-400 dark:text-gray-500">
                    {row.account_id}
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                {row.total_sandboxes}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {new Date(row.last_created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
