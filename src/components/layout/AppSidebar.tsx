
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import {
  ArrowUp,
  BatteryMedium,
  MapPin,
  LayoutDashboard
} from "lucide-react";

interface AppSidebarProps {
  collapsed?: boolean;
}

export function AppSidebar({ collapsed = false }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper functions
  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-skylog-primary/20 text-skylog-primary font-medium"
      : "hover:bg-skylog-primary/10 text-muted-foreground hover:text-foreground transition-colors";

  return (
    <Sidebar
      className={`${collapsed ? "w-[72px]" : "w-[240px]"} transition-all duration-300 pb-4 bg-sidebar border-r border-skylog-border`}
      collapsible="icon"
    >
      <SidebarContent>
        <div className={`flex justify-center pt-3 pb-6 ${collapsed ? "" : "px-4"}`}>
          {collapsed ? (
            <div className="h-10 w-10 rounded-lg bg-skylog-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
          ) : (
            <div className="w-full h-12 rounded-lg bg-skylog-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold">
                <span className="text-skylog-primary">Sky</span>Log Pro
              </span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
            {collapsed ? "" : "Main Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" className={getNavClass}>
                    <LayoutDashboard className="h-5 w-5 mr-2" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/flights" className={getNavClass}>
                    <ArrowUp className="h-5 w-5 mr-2" />
                    {!collapsed && <span>Flight Logs</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/fleet" className={getNavClass}>
                    <BatteryMedium className="h-5 w-5 mr-2" />
                    {!collapsed && <span>Drone Fleet</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/map" className={getNavClass}>
                    <MapPin className="h-5 w-5 mr-2" />
                    {!collapsed && <span>Map Explorer</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto mx-4 mb-4">
            <div className="rounded-lg p-3 bg-skylog-primary/10 border border-skylog-primary/20">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-skylog-primary/20 flex items-center justify-center">
                  <BatteryMedium size={16} className="text-skylog-primary" />
                </div>
                <div className="text-xs">
                  <p className="text-muted-foreground">Last Battery Check</p>
                  <p className="font-medium text-white">Today, 2:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
