import type { Metadata } from "next";
import AgentSignupsPage from "@/components/AgentSignups/AgentSignupsPage";

export const metadata: Metadata = {
  title: "Agent Sign-Ups — Recoup Admin",
};

export default function Page() {
  return <AgentSignupsPage />;
}
