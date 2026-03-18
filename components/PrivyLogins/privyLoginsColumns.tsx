import { type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/SandboxOrgs/SortableHeader";
import { getEmail } from "@/lib/privy/getEmail";
import { getLastSeen } from "@/lib/privy/getLastSeen";
import EmailCell from "@/components/PrivyLogins/EmailCell";
import LastSeenCell from "@/components/PrivyLogins/LastSeenCell";
import type { PrivyUser } from "@/types/privy";

export const privyLoginsColumns: ColumnDef<PrivyUser>[] = [
  {
    id: "email",
    accessorFn: (row) => getEmail(row),
    header: "Email",
    cell: ({ getValue }) => (
      <EmailCell getValue={() => getValue<string | null>()} />
    ),
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: ({ column }) => <SortableHeader column={column} label="Created At" />,
    cell: ({ getValue }) => new Date(getValue<number>() * 1000).toLocaleString(),
    sortingFn: "basic",
  },
  {
    id: "last_seen",
    accessorFn: (row) => getLastSeen(row),
    header: ({ column }) => <SortableHeader column={column} label="Last Seen" />,
    cell: ({ getValue }) => (
      <LastSeenCell getValue={() => getValue<number | null>()} />
    ),
    sortingFn: "basic",
  },
];
