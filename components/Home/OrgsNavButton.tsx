import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrgsNavButton() {
  return (
    <Button asChild variant="outline">
      <Link href="/orgs">View Org Repos →</Link>
    </Button>
  );
}
