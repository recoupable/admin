export interface SlackTag {
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  prompt: string;
  timestamp: string;
  channel_id: string;
  channel_name: string;
}

export type SlackTagsPeriod = "all" | "daily" | "weekly" | "monthly";

export interface SlackTagsResponse {
  status: "success";
  total: number;
  tags: SlackTag[];
}
