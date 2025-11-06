"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SideBarContextType {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export function SideBarProviderState({ children }: { children: ReactNode }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <SideBarContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </SideBarContext.Provider>
  );
}

// export function useSideBar() {
//   const context = useContext(SideBarContext);
//   if (context === undefined)
//     throw new Error("useSideBar deve ser usado com SideBarProvider");
//   return context;
