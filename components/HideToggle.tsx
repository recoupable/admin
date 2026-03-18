"use client";

import { Eye, EyeOff } from "lucide-react";
import { useHide } from "@/providers/HideProvider";

export function HideToggle() {
  const { isHidden, toggle } = useHide();

  return (
    <button
      onClick={toggle}
      title={isHidden ? "Show sensitive info" : "Hide sensitive info"}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}
