export type ContentSlackTag = {
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  prompt: string;
  timestamp: string;
  channel_id: string;
  channel_name: string;
  video_links: string[];
};

export type ContentSlackPeriod = "all" | "daily" | "weekly" | "monthly";

export type ContentSlackResponse = {
  status: "success" | "error";
  total: number;
  total_videos: number;
  tags_with_videos: number;
  tags: ContentSlackTag[];
};
