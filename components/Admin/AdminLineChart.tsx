"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface ExtraLine {
  data: Array<{ date: string; count: number }>;
  label: string;
  color?: string;
}

interface AdminLineChartProps {
  title: string;
  data: Array<{ date: string; count: number }>;
  label?: string;
  secondLine?: ExtraLine;
  thirdLine?: ExtraLine;
}

export default function AdminLineChart({
  title,
  data,
  label = "Count",
  secondLine,
  thirdLine,
}: AdminLineChartProps) {
  if (data.length === 0) return null;

  const chartConfig = {
    count: { label, color: "#345A5D" },
    ...(secondLine
      ? { count2: { label: secondLine.label, color: secondLine.color ?? "#6B8E93" } }
      : {}),
    ...(thirdLine
      ? { count3: { label: thirdLine.label, color: thirdLine.color ?? "#4A90A4" } }
      : {}),
  } satisfies ChartConfig;

  // Merge primary, secondary, and tertiary data by date
  const secondMap = new Map(secondLine?.data.map((d) => [d.date, d.count]) ?? []);
  const thirdMap = new Map(thirdLine?.data.map((d) => [d.date, d.count]) ?? []);
  const mergedData = data.map((d) => ({
    date: d.date,
    count: d.count,
    ...(secondLine ? { count2: secondMap.get(d.date) ?? 0 } : {}),
    ...(thirdLine ? { count3: thirdMap.get(d.date) ?? 0 } : {}),
  }));

  return (
    <div className="mb-6 rounded-lg border p-4">
      <h2 className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h2>
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <LineChart data={mergedData} accessibilityLayer>
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
          {(secondLine || thirdLine) && <ChartLegend content={<ChartLegendContent />} />}
          <Line
            dataKey="count"
            type="monotone"
            stroke="var(--color-count)"
            strokeWidth={2}
            dot={{ fill: "var(--color-count)", r: 4 }}
          />
          {secondLine && (
            <Line
              dataKey="count2"
              type="monotone"
              stroke="var(--color-count2)"
              strokeWidth={2}
              dot={{ fill: "var(--color-count2)", r: 4 }}
            />
          )}
          {thirdLine && (
            <Line
              dataKey="count3"
              type="monotone"
              stroke="var(--color-count3)"
              strokeWidth={2}
              dot={{ fill: "var(--color-count3)", r: 4 }}
            />
          )}
        </LineChart>
      </ChartContainer>
    </div>
  );
}
