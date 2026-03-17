import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PrivyLoginRow } from "@/types/privy";

interface PrivyLoginsTableProps {
  logins: PrivyLoginRow[];
}

export default function PrivyLoginsTable({ logins }: PrivyLoginsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Privy DID</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logins.map((login) => (
            <TableRow key={login.privy_did}>
              <TableCell className="font-medium">
                {login.email ?? <span className="text-gray-400 italic">No email</span>}
              </TableCell>
              <TableCell className="font-mono text-xs text-gray-500">{login.privy_did}</TableCell>
              <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(login.created_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
