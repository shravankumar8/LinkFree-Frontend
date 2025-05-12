import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { FadeIn } from "@/components/Animations";
import { SidebarProvider, SidebarInset, } from "@/components/ui/sidebar";

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <SidebarInset>
          <FadeIn>
            <div className="container max-w-7xl mx-auto py-8 px-4">
              <Outlet />
            </div>
          </FadeIn>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
