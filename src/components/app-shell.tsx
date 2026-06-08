"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

interface AppShellProps {
  children: ReactNode;
}

const authRoutes = new Set(["/login", "/cadastro"]);

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname() ?? "";
  const isAuthRoute = authRoutes.has(pathname);

  if (isAuthRoute) {
    return (
      <main className="relative min-h-screen">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        {children}
      </main>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="relative w-full">
          <SidebarTrigger className="absolute top-2 left-2 z-40" />
          <div className="absolute top-2 right-2 z-40">
            <ThemeToggle />
          </div>
          <main className="flex-1 h-full overflow-auto pt-12">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}