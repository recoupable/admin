import type { Metadata } from "next";
import CodingAgentSlackTagsPage from "@/components/CodingAgentSlackTags/CodingAgentSlackTagsPage";

export const metadata: Metadata = {
  title: "Coding Agent Slack Tags — Recoup Admin",
};

export default function Page() {
  return <CodingAgentSlackTagsPage />;
}
