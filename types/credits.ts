import type { AdminPeriod } from "./admin";

export type CreditsPeriod = AdminPeriod;

export interface CreditsRollupRow {
  account_id: string;
  account_name: string | null;
  account_email: string | null;
  total_credits_deducted_cents: number;
  event_count: number;
}

export interface CreditsRollupResponse {
  status: "success";
  period: CreditsPeriod;
  page: number;
  limit: number;
  total_count: number;
  rows: CreditsRollupRow[];
}

export interface CreditsUsageEvent {
  id: string;
  account_id: string;
  source: string | null;
  agent_type: string | null;
  provider: string | null;
  model_id: string | null;
  input_tokens: number | null;
  cached_input_tokens: number | null;
  output_tokens: number | null;
  tool_call_count: number | null;
  credits_deducted_cents: number;
  created_at: string;
}

export interface CreditsEventsResponse {
  status: "success";
  account_id: string;
  period: CreditsPeriod;
  page: number;
  limit: number;
  total_count: number;
  events: CreditsUsageEvent[];
}
