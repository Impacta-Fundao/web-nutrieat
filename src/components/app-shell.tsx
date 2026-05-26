"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface AppShellProps {
  children: ReactNode;
}

const authRoutes = new Set(["/login", "/cadastro"]);

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname() ?? "";
  const isAuthRoute = authRoutes.has(pathname);

  if (isAuthRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="w-full">
          <SidebarTrigger className="absolute" />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}