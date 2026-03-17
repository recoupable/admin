import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PrivyUser } from "@/types/privy";
import { getEmail } from "@/lib/privy/getEmail";

interface PrivyLoginsTableProps {
  logins: PrivyUser[];
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
          {logins.map((login) => {
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
          })}
        </TableBody>
      </Table>
    </div>
  );
}
