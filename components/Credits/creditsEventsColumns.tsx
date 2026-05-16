import { type ColumnDef } from "@tanstack/react-table";
import type { CreditsUsageEvent } from "@/types/credits";

export const creditsEventsColumns: ColumnDef<CreditsUsageEvent>[] = [
  {
    id: "created_at",
    header: "Time",
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-mono text-xs text-gray-700 dark:text-gray-300">
        {new Date(row.original.created_at).toLocaleString()}
      </span>
    ),
  },
  {
    id: "source",
    header: "Source",
    cell: ({ row }) => row.original.source ?? "—",
  },
  {
    id: "agent_type",
    header: "Agent",
    cell: ({ row }) => row.original.agent_type ?? "—",
  },
  {
    id: "model_id",
    header: "Model",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.model_id ?? "—"}</span>
    ),
  },
  {
    id: "input_tokens",
    header: "Input",
    cell: ({ row }) => (
      <span className="font-mono tabular-nums">
        {(row.original.input_tokens ?? 0).toLocaleString()}
      </span>
    ),
  },
  {
    id: "cached_input_tokens",
    header: "Cached",
    cell: ({ row }) => (
      <span className="font-mono tabular-nums text-gray-500">
        {(row.original.cached_input_tokens ?? 0).toLocaleString()}
      </span>
    ),
  },
  {
    id: "output_tokens",
    header: "Output",
    cell: ({ row }) => (
      <span className="font-mono tabular-nums">
        {(row.original.output_tokens ?? 0).toLocaleString()}
      </span>
    ),
  },
  {
    id: "tool_call_count",
    header: "Tools",
    cell: ({ row }) => (
      <span className="font-mono tabular-nums text-gray-500">
        {(row.original.tool_call_count ?? 0).toLocaleString()}
      </span>
    ),
  },
  {
    id: "credits_deducted_cents",
    header: "Credits (¢)",
    cell: ({ row }) => (
      <span className="font-mono tabular-nums font-medium">
        {row.original.credits_deducted_cents.toLocaleString()}
      </span>
    ),
  },
];
