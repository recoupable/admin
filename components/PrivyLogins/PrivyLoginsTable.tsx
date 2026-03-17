import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PrivyUser } from "@/types/privy";
import PrivyLoginRow from "@/components/PrivyLogins/PrivyLoginRow";

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
            <TableHead>Last Seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logins.map((login) => (
            <PrivyLoginRow key={login.id} login={login} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
