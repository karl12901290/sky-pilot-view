
import React from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, BatteryMedium } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppHeader() {
  const isMobile = useIsMobile();
  
  return (
    <header className="h-16 w-full border-b border-skylog-border bg-skylog-dark/90 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white" />
        {!isMobile && (
          <h1 className="text-xl font-bold text-white flex items-center">
            <span className="text-skylog-primary">Sky</span>Log Pro
          </h1>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="hidden md:flex items-center gap-3 text-sm text-muted-foreground mr-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50">
            <span className="text-skylog-primary">23</span> Total Flights
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50">
            <span className="text-skylog-primary">4.7h</span> Air Time
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50">
            <BatteryMedium size={16} className="text-skylog-primary animate-pulse-subtle" />
            <span>92%</span> Health
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <Bell size={18} />
        </Button>
        
        <Button variant="outline" size="sm" className="ml-2">
          Last Sync: 2h ago
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-skylog-primary text-primary-foreground flex items-center justify-center font-medium">
          JP
        </div>
      </div>
    </header>
  );
}
