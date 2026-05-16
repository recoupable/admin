import type { Metadata } from "next";
import CreditsPage from "@/components/Credits/CreditsPage";

export const metadata: Metadata = {
  title: "Credits — Recoup Admin",
};

export default function Page() {
  return <CreditsPage />;
}
