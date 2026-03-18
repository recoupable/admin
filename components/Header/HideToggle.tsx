"use client";

import { useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useHide } from "@/providers/HideProvider";

const BLINK_MS = 150;

export function HideToggle() {
  const { isHidden, toggle } = useHide();
  const [isBlinking, setIsBlinking] = useState(false);

  const handleClick = useCallback(() => {
    setIsBlinking(true);
    setTimeout(() => {
      toggle();
      setIsBlinking(false);
    }, BLINK_MS);
  }, [toggle]);

  const Icon = isHidden ? EyeOff : Eye;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isHidden ? "Show sensitive info" : "Hide sensitive info"}
      aria-pressed={isHidden}
      title={isHidden ? "Show sensitive info" : "Hide sensitive info"}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      <Icon
        className="h-4 w-4 transition-transform"
        style={{
          transform: isBlinking ? "scaleY(0)" : "scaleY(1)",
          transitionDuration: `${BLINK_MS}ms`,
        }}
      />
    </button>
  );
}
