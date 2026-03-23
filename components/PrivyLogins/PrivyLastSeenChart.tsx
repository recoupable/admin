"use client";

import AdminLineChart from "@/components/Admin/AdminLineChart";
import type { PrivyUser } from "@/types/privy";
import { getLastSeenByDate } from "@/lib/privy/getLastSeenByDate";

interface PrivyLastSeenChartProps {
  logins: PrivyUser[];
}

export default function PrivyLastSeenChart({ logins }: PrivyLastSeenChartProps) {
  return (
    <AdminLineChart title="Last Seen Activity" data={getLastSeenByDate(logins)} label="Last Seen" />
  );
}
