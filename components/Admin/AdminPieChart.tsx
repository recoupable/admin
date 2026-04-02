"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const COLORS = [
  "#345A5D",
  "#6B8E93",
  "#4A90A4",
  "#8FBCC4",
  "#2A4648",
  "#5BA3B5",
  "#3D7A7E",
  "#97C4CC",
];

export interface PieChartSlice {
  name: string;
  value: number;
}

interface AdminPieChartProps {
  title: string;
  data: PieChartSlice[];
}

export default function AdminPieChart({ title, data }: AdminPieChartProps) {
  if (data.length === 0) return null;

  const chartConfig = Object.fromEntries(
    data.map((slice, i) => [
      slice.name,
      { label: slice.name, color: COLORS[i % COLORS.length] },
    ]),
  ) satisfies ChartConfig;

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        {title}
      </h2>
      <ChartContainer config={chartConfig} className="mx-auto h-[250px] w-full">
        <PieChart accessibilityLayer>
          <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((slice, i) => (
              <Cell
                key={slice.name}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="name" />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
