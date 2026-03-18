"use client";

import { createContext, useContext, useState } from "react";

interface HideContextValue {
  isHidden: boolean;
  toggle: () => void;
}

const HideContext = createContext<HideContextValue>({
  isHidden: false,
  toggle: () => {},
});

export function HideProvider({ children }: { children: React.ReactNode }) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <HideContext.Provider
      value={{ isHidden, toggle: () => setIsHidden((h) => !h) }}
    >
      {children}
    </HideContext.Provider>
  );
}

export function useHide() {
  return useContext(HideContext);
}
