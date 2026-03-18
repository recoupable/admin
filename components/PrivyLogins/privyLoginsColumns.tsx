import { type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/SandboxOrgs/SortableHeader";
import { getEmail } from "@/lib/privy/getEmail";
import { getLastSeen } from "@/lib/privy/getLastSeen";
import { useHide } from "@/providers/HideProvider";
import { maskEmail } from "@/lib/maskEmail";
import type { PrivyUser } from "@/types/privy";

function EmailCell({ getValue }: { getValue: () => string | null }) {
  const { isHidden } = useHide();
  const email = getValue();
  if (!email) return <span className="text-gray-400 italic">No email</span>;
  return <span>{isHidden ? maskEmail(email) : email}</span>;
}

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
    cell: ({ getValue }) => {
      const ts = getValue<number | null>();
      return ts ? new Date(ts * 1000).toLocaleString() : <span className="text-gray-400 italic">Never</span>;
    },
    sortingFn: "basic",
  },
];
