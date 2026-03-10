export default function AccountsTableSkeleton() {
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
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              <td className="px-4 py-3">
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                <div className="mt-1 h-3 w-48 animate-pulse rounded bg-muted" />
              </td>
              <td className="px-4 py-3 text-right">
                <div className="ml-auto h-4 w-8 animate-pulse rounded bg-muted" />
              </td>
              <td className="px-4 py-3 text-right">
                <div className="ml-auto h-4 w-24 animate-pulse rounded bg-muted" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
