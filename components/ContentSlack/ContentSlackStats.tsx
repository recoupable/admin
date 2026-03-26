import type { ContentSlackResponse } from "@/types/contentSlack";

interface ContentSlackStatsProps {
  data: ContentSlackResponse;
}

export default function ContentSlackStats({ data }: ContentSlackStatsProps) {
  return (
    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
      <span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total}</span> tags
      </span>
      <span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{data.total_video_links}</span> video links
      </span>
      <span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{data.tags_with_video_links}</span> with videos
      </span>
    </div>
  );
}
