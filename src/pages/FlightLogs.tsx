
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";

const FlightLogs = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Flight Logs</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all your drone flights
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
            </CardContent>
          </Card>
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Distance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">137.5km</div>
            </CardContent>
          </Card>
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Flight Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12:45</div>
            </CardContent>
          </Card>
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Max Altitude</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120m</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-skylog-card border-skylog-border">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-md font-medium">Search Flight Logs</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filters</Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input 
                placeholder="Search flights by location, drone, or date..." 
                className="pl-4 py-5 bg-muted border-skylog-border" 
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <Button variant="ghost" size="sm" className="h-7 text-xs">Last 7 Days</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">My Drones</Button>
              </div>
            </div>
            
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
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Weather</th>
                    <th className="text-right text-xs font-medium text-muted-foreground p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className="border-b border-skylog-border hover:bg-skylog-primary/5">
                      <td className="p-3 text-sm">
                        {new Date(2025, 4, 20 - i).toISOString().split('T')[0]}
                      </td>
                      <td className="p-3 text-sm">{i % 2 === 0 ? "Mavic 3" : "Mini 3"}</td>
                      <td className="p-3 text-sm">
                        {["Austin, TX", "Lake Travis", "Downtown Austin", "Zilker Park", "Lady Bird Lake"][i % 5]}
                      </td>
                      <td className="p-3 text-sm">
                        {`${Math.floor(Math.random() * 15 + 5)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`}
                      </td>
                      <td className="p-3 text-sm">{Math.floor(Math.random() * 90 + 50)}m</td>
                      <td className="p-3 text-sm">{(Math.random() * 6 + 1).toFixed(1)}km</td>
                      <td className="p-3 text-sm">
                        {["Clear", "Partly Cloudy", "Sunny", "Windy", "Overcast"][i % 5]}
                      </td>
                      <td className="p-3 text-sm text-right">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing 1-10 of 23 flights</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default FlightLogs;
