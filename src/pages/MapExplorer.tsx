
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Search, 
  Layers, 
  AlertTriangle, 
  FileText, 
  Calendar,
  ChevronDown,
  Clock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MapExplorer = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Map Explorer</h1>
            <p className="text-muted-foreground mt-1">
              Visualize your flights and explore drone flight paths
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="satellite">
              <SelectTrigger className="w-[120px] bg-skylog-dark border-skylog-border">
                <SelectValue placeholder="Map Style" />
              </SelectTrigger>
              <SelectContent className="bg-skylog-card border-skylog-border">
                <SelectItem value="satellite">Satellite</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
                <SelectItem value="streets">Streets</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="bg-skylog-card border-skylog-border lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Flights</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search locations or flights..."
                  className="pl-9 bg-skylog-dark border-skylog-border"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 max-h-[calc(100vh-250px)] overflow-y-auto">
              <div className="border-b border-skylog-border p-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Filter by:</span>
                <Select defaultValue="recent">
                  <SelectTrigger className="h-7 text-xs w-[100px] bg-skylog-dark border-skylog-border">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent className="bg-skylog-card border-skylog-border">
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="divide-y divide-skylog-border">
                {[
                  { 
                    location: "Austin Downtown", 
                    date: "May 20, 2025", 
                    drone: "Mavic 3",
                    duration: "12:25",
                    distance: "4.3km",
                    altitude: "120m",
                    status: "normal"
                  },
                  { 
                    location: "Lake Travis", 
                    date: "May 18, 2025", 
                    drone: "Mini 3",
                    duration: "08:17",
                    distance: "2.1km",
                    altitude: "100m",
                    status: "normal"
                  },
                  { 
                    location: "Downtown Austin", 
                    date: "May 18, 2025", 
                    drone: "Mavic 3",
                    duration: "15:42",
                    distance: "5.7km",
                    altitude: "110m",
                    status: "warning"
                  },
                  { 
                    location: "Zilker Park", 
                    date: "May 15, 2025", 
                    drone: "Mavic 3",
                    duration: "09:58",
                    distance: "3.2km",
                    altitude: "90m",
                    status: "normal"
                  },
                  { 
                    location: "Lady Bird Lake", 
                    date: "May 12, 2025", 
                    drone: "Mini 3",
                    duration: "14:33",
                    distance: "3.8km",
                    altitude: "80m",
                    status: "normal"
                  },
                ].map((flight, index) => (
                  <div 
                    key={index} 
                    className={`p-3 cursor-pointer hover:bg-skylog-primary/5 ${index === 0 ? 'bg-skylog-primary/10' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium flex items-center gap-1">
                        {flight.location}
                        {flight.status === "warning" && (
                          <AlertTriangle className="h-3 w-3 text-amber-500" />
                        )}
                      </h4>
                      {index === 0 && (
                        <Badge variant="outline" className="bg-skylog-primary/20 border-skylog-primary/50 text-xs">Active</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>{flight.date}</span>
                      <span>•</span>
                      <span>{flight.drone}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{flight.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Distance</p>
                        <p className="font-medium">{flight.distance}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Max Alt</p>
                        <p className="font-medium">{flight.altitude}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 bg-skylog-card border-skylog-border overflow-hidden">
            <div className="relative h-[calc(100vh-250px)]">
              {/* Map placeholder - This would be replaced with an actual map component */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809')] opacity-50 bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-skylog-dark/50"></div>
              
              {/* Flight path visualization - This is a placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-3/4 h-3/4">
                  <div className="absolute left-1/4 top-1/4 h-3 w-3 bg-skylog-primary rounded-full animate-ping opacity-75"></div>
                  <div className="absolute left-1/4 top-1/4 h-3 w-3 bg-skylog-primary rounded-full"></div>
                  
                  <div className="absolute right-1/3 bottom-1/3 h-3 w-3 bg-skylog-primary rounded-full animate-ping opacity-75"></div>
                  <div className="absolute right-1/3 bottom-1/3 h-3 w-3 bg-skylog-primary rounded-full"></div>
                  
                  <svg className="absolute inset-0 w-full h-full">
                    <path 
                      d="M200,150 C300,100 400,300 500,200" 
                      stroke="rgba(0, 163, 255, 0.8)" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Map controls */}
              <div className="absolute top-4 left-4 space-y-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-skylog-dark/80 border-skylog-border backdrop-blur-sm">
                  <span className="font-bold text-lg">+</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-skylog-dark/80 border-skylog-border backdrop-blur-sm">
                  <span className="font-bold text-lg">-</span>
                </Button>
              </div>
              
              {/* Flight information overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <Card className="bg-skylog-dark/80 border-skylog-border backdrop-blur-sm">
                  <CardHeader className="py-3">
                    <CardTitle className="text-md font-medium flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-skylog-primary" />
                        Austin Downtown
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Drone</p>
                        <p className="text-sm">Mavic 3</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="text-sm">May 20, 2025</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-skylog-primary" />
                          <p className="text-sm">12:25</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Log</p>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-skylog-primary" />
                          <p className="text-sm">View</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default MapExplorer;
