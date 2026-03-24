import { type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/SandboxOrgs/SortableHeader";
import type { SlackTag } from "@/types/coding-agent";

export function createSlackTagsColumns(mergedPrUrls?: Set<string>): ColumnDef<SlackTag>[] {
  return [
    {
      id: "user_name",
      accessorKey: "user_name",
      header: "Tagged By",
      cell: ({ row }) => {
        const tag = row.original;
        return (
          <div className="flex items-center gap-2">
            {tag.user_avatar && (
              <img
                src={tag.user_avatar}
                alt={tag.user_name}
                className="h-6 w-6 rounded-full"
              />
            )}
            <span className="font-medium">{tag.user_name}</span>
          </div>
        );
      },
    },
    {
      id: "prompt",
      accessorKey: "prompt",
      header: "Prompt",
      cell: ({ getValue }) => (
        <span className="max-w-md truncate block text-sm text-gray-700 dark:text-gray-300">
          {getValue<string>()}
        </span>
      ),
    },
    {
      id: "channel_name",
      accessorKey: "channel_name",
      header: "Channel",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">#{getValue<string>()}</span>
      ),
    },
    {
      id: "pull_requests",
      accessorKey: "pull_requests",
      header: "Pull Requests",
      cell: ({ getValue }) => {
        const prs = getValue<string[]>();
        if (!prs?.length) return <span className="text-sm text-gray-400">—</span>;
        return (
          <div className="flex flex-col gap-1">
            {prs.map((url) => {
              const isMerged = mergedPrUrls?.has(url);
              return (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  {isMerged ? "🚢 " : ""}
                  {url.match(/github\.com\/[^/]+\/([^/]+)\/pull\/(\d+)/)?.slice(1).join("#")}
                </a>
              );
            })}
          </div>
        );
      },
    },
    {
      id: "timestamp",
      accessorKey: "timestamp",
      header: ({ column }) => <SortableHeader column={column} label="Timestamp" />,
      cell: ({ getValue }) => new Date(getValue<string>()).toLocaleString(),
      sortingFn: "basic",
    },
  ];
}