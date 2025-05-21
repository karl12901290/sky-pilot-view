
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultCollapsed={isMobile} collapsedWidth={72}>
      <div className="min-h-screen w-full flex flex-col bg-skylog-dark text-white">
        <AppHeader />
        <div className="flex flex-1 w-full">
          <AppSidebar />
          <main className="flex-1 p-4 lg:p-6 overflow-hidden">{children}</main>
        </div>
        <Toaster position="bottom-right" closeButton />
      </div>
    </SidebarProvider>
  );
}
