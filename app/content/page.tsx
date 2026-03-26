import type { Metadata } from "next";
import ContentSlackPage from "@/components/ContentSlack/ContentSlackPage";

export const metadata: Metadata = {
  title: "Content Agent — Recoup Admin",
};

export default function Page() {
  return <ContentSlackPage />;
}
