import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { FadeIn } from "@/components/Animations";
import { SidebarProvider, SidebarInset, SidebarTrigger, } from "@/components/ui/sidebar";

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <span className="text-lg font-semibold md:hidden">LinkFree</span>
            </div>
          </div>
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
