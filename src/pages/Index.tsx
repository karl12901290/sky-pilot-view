
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp, Battery, MapPin } from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back to your drone flight analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Import Flight Data
            </Button>
            <Button variant="default" size="sm" className="gap-1">
              New Flight <ArrowUp size={14} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Flights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground mt-1">+4 from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Flight Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7h</div>
              <p className="text-xs text-muted-foreground mt-1">+1.2h from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Distance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">137.5km</div>
              <p className="text-xs text-muted-foreground mt-1">Across all flights</p>
            </CardContent>
          </Card>
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-skylog-primary">92%</div>
              <p className="text-xs text-muted-foreground mt-1">Based on 4 drones</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flight Map */}
          <Card className="lg:col-span-2 bg-skylog-card border-skylog-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">Recent Flight Paths</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowRight size={14} />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video lg:aspect-auto lg:h-[350px] bg-skylog-dark/50 flex items-center justify-center overflow-hidden rounded-md">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-skylog-primary/50" />
                </div>
                <div className="p-4 absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-skylog-dark/60">
                  <div className="text-center">
                    <h3 className="font-medium mb-2">Map Explorer</h3>
                    <p className="text-sm text-muted-foreground mb-4">View your flight paths on a 3D map</p>
                    <Button variant="outline" size="sm">Open Map Explorer</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Battery Health */}
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">Battery Health</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Details <ArrowRight size={14} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Mavic 3 - Battery 1", health: 96, cycles: 23 },
                { name: "Mavic 3 - Battery 2", health: 92, cycles: 41 },
                { name: "Mini 3 - Battery 1", health: 87, cycles: 65 }
              ].map((battery, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-skylog-primary/10 flex items-center justify-center">
                    <Battery className={`h-4 w-4 ${battery.health > 90 ? 'text-skylog-primary' : 'text-amber-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium truncate">{battery.name}</p>
                      <span className="text-xs font-medium">{battery.health}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-skylog-primary to-green-400" 
                        style={{ width: `${battery.health}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {battery.cycles} cycles
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Flights */}
        <Card className="bg-skylog-card border-skylog-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Recent Flights</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              View All <ArrowRight size={14} />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-skylog-border">
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Date</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Drone</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Location</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Duration</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Max Alt</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "2025-05-20", drone: "Mavic 3", location: "Austin, TX", duration: "12:25", maxAlt: "120m", distance: "4.3km" },
                    { date: "2025-05-18", drone: "Mini 3", location: "Lake Travis", duration: "08:17", maxAlt: "100m", distance: "2.1km" },
                    { date: "2025-05-18", drone: "Mavic 3", location: "Downtown Austin", duration: "15:42", maxAlt: "110m", distance: "5.7km" },
                    { date: "2025-05-15", drone: "Mavic 3", location: "Zilker Park", duration: "09:58", maxAlt: "90m", distance: "3.2km" },
                  ].map((flight, i) => (
                    <tr key={i} className="border-b border-skylog-border hover:bg-skylog-primary/5">
                      <td className="p-3 text-sm">{flight.date}</td>
                      <td className="p-3 text-sm">{flight.drone}</td>
                      <td className="p-3 text-sm">{flight.location}</td>
                      <td className="p-3 text-sm">{flight.duration}</td>
                      <td className="p-3 text-sm">{flight.maxAlt}</td>
                      <td className="p-3 text-sm">{flight.distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;
