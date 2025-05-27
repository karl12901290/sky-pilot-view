
import React from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Activity, Clock, Heart, LogOut, User, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useDrones } from "@/hooks/useDrones";
import { useFlights } from "@/hooks/useFlights";
import { useProfile } from "@/hooks/useProfile";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppHeader() {
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const { data: drones = [] } = useDrones();
  const { data: flights = [] } = useFlights();
  const { data: profile } = useProfile();
  
  // Calculate statistics
  const totalFlights = flights.length;
  const totalFlightTime = flights.reduce((acc, flight) => {
    if (flight.start_time && flight.end_time) {
      const start = new Date(flight.start_time);
      const end = new Date(flight.end_time);
      return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Convert to hours
    }
    return acc;
  }, 0);

  const avgHealthScore = drones.length > 0 
    ? Math.round(drones.reduce((acc, drone) => acc + (drone.health_score || 0), 0) / drones.length)
    : 0;

  const userInitials = profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 
                      user?.email?.substring(0, 2).toUpperCase() || "U";
  
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
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
                <Activity size={16} className="text-skylog-primary" />
                <span className="text-skylog-primary">{totalFlights}</span> Total Flights
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-skylog-card border-skylog-border">
              <div className="flex justify-between space-x-4">
                <div>
                  <h4 className="text-sm font-semibold">Flight Statistics</h4>
                  <p className="text-xs text-muted-foreground">
                    You've completed {totalFlights} flights across your drone fleet.
                  </p>
                </div>
                <Activity className="h-12 w-12 text-skylog-primary opacity-50" />
              </div>
              <div className="mt-2">
                <div className="text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Total flights:</span>
                    <span>{totalFlights}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active drones:</span>
                    <span>{drones.filter(d => d.status === 'ready').length}</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
                <Clock size={16} className="text-skylog-primary" />
                <span className="text-skylog-primary">{totalFlightTime.toFixed(1)}h</span> Air Time
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-skylog-card border-skylog-border">
              <div className="flex justify-between space-x-4">
                <div>
                  <h4 className="text-sm font-semibold">Flight Duration</h4>
                  <p className="text-xs text-muted-foreground">
                    Total of {totalFlightTime.toFixed(1)} hours of flight time recorded.
                  </p>
                </div>
                <Clock className="h-12 w-12 text-skylog-primary opacity-50" />
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
                <Heart size={16} className="text-skylog-primary animate-pulse-subtle" />
                <span>{avgHealthScore}%</span> Health
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-skylog-card border-skylog-border">
              <div className="flex justify-between space-x-4">
                <div>
                  <h4 className="text-sm font-semibold">Fleet Health</h4>
                  <p className="text-xs text-muted-foreground">
                    Your drone fleet has an overall health score of {avgHealthScore}%.
                  </p>
                </div>
                <Heart className="h-12 w-12 text-skylog-primary opacity-50" />
              </div>
              <div className="mt-2">
                <div className="text-xs space-y-1">
                  {drones.slice(0, 3).map((drone) => (
                    <div key={drone.drone_id} className="flex items-center justify-between">
                      <span>{drone.name || `Drone ${drone.drone_id.substring(0, 8)}`}:</span>
                      <span className={drone.health_score && drone.health_score > 80 ? "text-green-400" : "text-amber-400"}>
                        {drone.health_score || 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                <Bell size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button variant="outline" size="sm" className="ml-2">
          Last Sync: 2h ago
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "User"} />
                <AvatarFallback className="bg-skylog-primary text-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-skylog-card border-skylog-border" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">
                  {profile?.full_name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-skylog-border" />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-skylog-border" />
            <DropdownMenuItem 
              className="cursor-pointer text-red-400 focus:text-red-400"
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
