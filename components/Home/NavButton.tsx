import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavButtonProps {
  href: string;
  label: string;
}

export default function NavButton({ href, label }: NavButtonProps) {
  return (
    <Button asChild>
      <Link href={href}>{label} →</Link>
    </Button>
  );
}
