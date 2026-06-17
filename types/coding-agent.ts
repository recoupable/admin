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
  status: "open" | "closed" | "merged";
}

export interface CodingPrStatusResponse {
  status: "success";
  pull_requests: CodingPrStatus[];
}

export interface SlackTagOption {
  id: string;
  name: string;
  avatar: string | null;
}

export interface SlackTagOptionsResponse {
  status: "success";
  total: number;
  tags: SlackTagOption[];
}
