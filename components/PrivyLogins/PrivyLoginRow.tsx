import { TableRow, TableCell } from "@/components/ui/table";
import type { PrivyUser } from "@/types/privy";
import { getEmail } from "@/lib/privy/getEmail";

interface PrivyLoginRowProps {
  login: PrivyUser;
}

export default function PrivyLoginRow({ login }: PrivyLoginRowProps) {
  const email = getEmail(login);
  return (
    <TableRow key={login.id}>
      <TableCell className="font-medium">
        {email ?? <span className="text-gray-400 italic">No email</span>}
      </TableCell>
      <TableCell className="font-mono text-xs text-gray-500">{login.id}</TableCell>
      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
        {new Date(login.created_at * 1000).toLocaleString()}
      </TableCell>
    </TableRow>
  );
}
