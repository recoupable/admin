import type { AgentSignupsResponse } from "@/types/agentSignups";

interface AgentSignupsStatsProps {
  data: AgentSignupsResponse;
}

export default function AgentSignupsStats({ data }: AgentSignupsStatsProps) {
  return (
    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
      <span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total}</span> sign-ups
      </span>
    </div>
  );
}
