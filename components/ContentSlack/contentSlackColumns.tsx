import { type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/SandboxOrgs/SortableHeader";
import type { ContentSlackTag } from "@/types/contentSlack";

export const contentSlackColumns: ColumnDef<ContentSlackTag>[] = [
  {
    id: "user_name",
    accessorKey: "user_name",
    header: "User",
  },
  {
    id: "timestamp",
    accessorKey: "timestamp",
    header: ({ column }) => <SortableHeader column={column} label="Timestamp" />,
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleString(),
    sortingFn: "datetime",
  },
  {
    id: "prompt",
    accessorKey: "prompt",
    header: "Prompt",
    cell: ({ getValue }) => {
      const text = getValue<string>();
      return (
        <span className="line-clamp-2 max-w-xs" title={text}>
          {text}
        </span>
      );
    },
  },
  {
    id: "video_links",
    accessorFn: (row) => row.video_links.length,
    header: ({ column }) => (
      <SortableHeader column={column} label="Video Links" />
    ),
    cell: ({ row }) => {
      const links = row.original.video_links;
      if (links.length === 0) {
        return <span className="text-gray-400">—</span>;
      }
      return (
        <div className="flex flex-col gap-1">
          {links.map((link, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400 truncate max-w-xs"
            >
              {link}
            </a>
          ))}
        </div>
      );
    },
    sortingFn: "basic",
  },
];
