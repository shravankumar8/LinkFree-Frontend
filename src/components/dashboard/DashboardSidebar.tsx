import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Link as LinkIcon,
  BarChart,
  Palette,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardSidebar: React.FC = () => {
  const location = useLocation();

  const mainMenuItems = [
    { title: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { title: "Pages", path: "/dashboard/pages", icon: LinkIcon },

    { title: "Profile", path: "/dashboard/profile", icon: User },
  ];

  const helpMenuItems = [
    { title: "Help Center", path: "/dashboard/help", icon: HelpCircle },
  ];

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarRail />
      <SidebarHeader>
        <div className="flex items-center px-4 py-2">
          <div className="font-semibold text-xl bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
            LinkFree
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isLinkActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {helpMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isLinkActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sign Out">
              <Link to="/" className="text-red-500 hover:text-red-600">
                <LogOut />
                <span>Sign Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
