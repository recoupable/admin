export interface SlackTag {
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  prompt: string;
  timestamp: string;
  channel_id: string;
  channel_name: string;
  pull_requests: string[];
}

export type { AdminPeriod as SlackTagsPeriod } from "./admin";

export interface SlackTagsResponse {
  status: "success";
  total: number;
  total_pull_requests: number;
  tags_with_pull_requests: number;
  tags: SlackTag[];
}

export interface CodingPrStatus {
  url: string;
  merged: boolean;
}

export interface CodingPrStatusResponse {
  status: "success";
  pull_requests: CodingPrStatus[];
}
