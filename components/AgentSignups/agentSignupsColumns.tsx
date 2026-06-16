import { type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/SandboxOrgs/SortableHeader";
import type { AgentSignup } from "@/types/agentSignups";

export const agentSignupsColumns: ColumnDef<AgentSignup>[] = [
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} label="Email" />,
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue<string>()}</span>
    ),
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Key Name",
    cell: ({ getValue }) => (
      <span className="max-w-xs truncate" title={getValue<string>()}>
        {getValue<string>()}
      </span>
    ),
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: ({ column }) => <SortableHeader column={column} label="Created At" />,
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleString(),
    sortingFn: "datetime",
  },
];
