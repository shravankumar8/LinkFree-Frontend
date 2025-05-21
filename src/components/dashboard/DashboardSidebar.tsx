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
import { useAuth } from "@/context/AuthContext";
const DashboardSidebar: React.FC = () => {
  const location = useLocation();
const { user, logout } = useAuth();
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
      <SidebarHeader className="flex h-14 items-center border-b px-4 lg:h-[60px]">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-semibold">
            <span className="text-gradient">Link</span>
            <span>Free</span>
          </span>
        </Link>
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
      <SidebarFooter className="border-t p-4">
        <Link to="/">
          <Button
            onClick={logout}
            variant="outline"
            className="w-full text-red-500 justify-start"
            size="sm"
          >
            <LogOut className="mr-2  h-4 w-4" />
            Sign Out
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
