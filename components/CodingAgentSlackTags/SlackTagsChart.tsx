"use client";

import AdminLineChart from "@/components/Admin/AdminLineChart";
import type { SlackTag } from "@/types/coding-agent";
import { getTagsByDate } from "@/lib/coding-agent/getTagsByDate";

interface SlackTagsChartProps {
  tags: SlackTag[];
}

export default function SlackTagsChart({ tags }: SlackTagsChartProps) {
  return <AdminLineChart title="Tags Over Time" data={getTagsByDate(tags)} label="Tags" />;
}
