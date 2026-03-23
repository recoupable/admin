"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { SlackTag } from "@/types/coding-agent";
import { getTagsByDate } from "@/lib/coding-agent/getTagsByDate";

const chartConfig = {
  count: {
    label: "Tags",
    color: "#345A5D",
  },
} satisfies ChartConfig;

interface SlackTagsChartProps {
  tags: SlackTag[];
}

export default function SlackTagsChart({ tags }: SlackTagsChartProps) {
  const data = getTagsByDate(tags);

  if (data.length === 0) return null;

  return (
    <div className="mb-6 rounded-lg border p-4">
      <h2 className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        Tags Over Time
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
                  return d.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  });
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
