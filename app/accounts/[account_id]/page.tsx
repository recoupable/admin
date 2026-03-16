import type { Metadata } from "next";
import AccountDetailPage from "@/components/AccountDetail/AccountDetailPage";

interface Props {
  params: Promise<{ account_id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { account_id } = await params;
  return {
    title: `Account ${account_id} — Recoup Admin`,
  };
}

export default async function Page({ params }: Props) {
  const { account_id } = await params;
  return <AccountDetailPage accountId={account_id} />;
}
