"use client";
import { Home, Search, Settings, User, HamburgerIcon } from "lucide-react";

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

import { useSideBar } from "@/store/contexts/sideBarContext";

export function AppSidebar() {
  const {activeItem,setActiveItem} = useSideBar()
  
  const items = [
    {
      title: "Home",
      url: "/dash",
      icon: Home,
    },
    {
      title: "Usuários",
      url: "/",
      icon: User,
    },
    {
      title: "Produtos",
      url: "/",
      icon: HamburgerIcon,
    },
    {
      title: "Search",
      url: "/",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/",
      icon: Settings,
    }
  ];

  const handleItemClick = (title: string) => {
    setActiveItem(activeItem === title ? null : title);
  };

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
                    className={`hover:bg-[#48cfad] transition-colors duration-200 ${
                      activeItem === item.title && "bg-[#48cfad]"
                    }`}
                    asChild
                  >
                    <a
                      onClick={() => handleItemClick(item.title)}
                      href={item.url}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}