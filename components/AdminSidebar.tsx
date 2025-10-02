"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { MapPinned, Home, Newspaper, Blocks } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Beranda",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Berita",
    url: "/admin/news",
    icon: Newspaper,
  },
  {
    title: "Lokasi",
    url: "/admin/location",
    icon: MapPinned,
  },
  {
    title: "Quiz",
    url: "/admin/quiz",
    icon: Blocks,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar className="">
    <SidebarHeader>
        <Image
        src="/DSE Logo 1.png"
        alt="logo"
        className="w-50 py-6 mx-auto object-contain self-centerx"
        width={1920}
        height={1080} />
    </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map((item) => (
                <SidebarMenuItem className="mx-auto" key={item.title}>
                  <SidebarMenuButton className="text-md text-gray-600 font-bold py-6 px-4 w-50" asChild>
                    <a
                      href={item.url}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 transition
                        ${
                          isActive(item.url)
                            ? "bg-primary hover:bg-primary/90 text-white font-medium"
                            : "hover:bg-gray-100"
                        }`}
                    >
                      <item.icon className="h-4 w-4" />
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
