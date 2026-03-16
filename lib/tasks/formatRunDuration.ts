import type { TaskRun } from "@/types/sandbox";

export function formatRunDuration(run: TaskRun): string {
  if (!run.startedAt) return "—";
  const end = run.finishedAt ? new Date(run.finishedAt) : new Date();
  const ms = end.getTime() - new Date(run.startedAt).getTime();
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60_000)}m ${Math.floor((ms % 60_000) / 1000)}s`;
}
