"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Search,
  Settings,
  User,
  HamburgerIcon,
  ChartColumnIncreasing,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// import { useSideBar } from "@/store/contexts/sideBarContext";

export function AppSidebar() {
  const router = useRouter();

  // const {activeItem,setActiveItem} = useSideBar()

  const items = [
    {
      title: "Home",
      url: "/Home",
      icon: Home,
    },
    {
      title: "Usuários",
      url: "/Clientes",
      icon: User,
    },
    {
      title: "Produtos",
      url: "/Products",
      icon: HamburgerIcon,
    },
    {
      title: "Relatorios",
      url: "/Relatorios",
      icon: ChartColumnIncreasing,
    },
    {
      title: "Search",
      url: "/",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/Settings",
      icon: Settings,
    },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    router.push("/login");
    router.refresh();
  }

  // const handleItemClick = (title: string) => {
  //   setActiveItem(activeItem === title ? null : title);
  // };

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg">Nutrieat</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`hover:bg-[#48cfad] transition-colors duration-200 `}
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="cursor-pointer text-red-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
