"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { PrivyUser } from "@/types/privy";
import { getLastSeenByDate } from "@/lib/privy/getLastSeenByDate";

const chartConfig = {
  count: {
    label: "Last Seen",
    color: "#345A5D",
  },
} satisfies ChartConfig;

interface PrivyLastSeenChartProps {
  logins: PrivyUser[];
}

export default function PrivyLastSeenChart({ logins }: PrivyLastSeenChartProps) {
  const data = getLastSeenByDate(logins);

  if (data.length === 0) return null;

  return (
    <div className="mb-6 rounded-lg border p-4">
      <h2 className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        Last Seen Activity
      </h2>
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <LineChart data={data} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value: string) => {
              const d = new Date(value + "T00:00:00");
              return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            }}
          />
          <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  const d = new Date(String(value) + "T00:00:00");
                  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
                }}
              />
            }
          />
          <Line
            dataKey="count"
            type="monotone"
            stroke="var(--color-count)"
            strokeWidth={2}
            dot={{ fill: "var(--color-count)", r: 4 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
