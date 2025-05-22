
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Battery, 
  Plus, 
  Edit2, 
  Trash2, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  BatteryMedium,
  BatteryCharging,
  Clock,
  Calendar
} from "lucide-react";

const DroneFleet = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Drone Fleet</h1>
            <p className="text-muted-foreground mt-1">
              Manage your drones and monitor equipment health
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Import Drones
            </Button>
            <Button variant="default" size="sm" className="gap-1">
              Add Drone <Plus size={14} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="drones" className="space-y-6">
          <TabsList className="bg-skylog-card border border-skylog-border">
            <TabsTrigger value="drones" className="data-[state=active]:bg-skylog-primary/20">
              Drones
            </TabsTrigger>
            <TabsTrigger value="batteries" className="data-[state=active]:bg-skylog-primary/20">
              Batteries
            </TabsTrigger>
            <TabsTrigger value="equipment" className="data-[state=active]:bg-skylog-primary/20">
              Equipment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drones" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  name: "Mavic 3", 
                  model: "DJI Mavic 3", 
                  serial: "MAV9283742", 
                  health: 95, 
                  flights: 23,
                  lastFlight: "2 days ago",
                  status: "ready"
                },
                { 
                  name: "Mini 3", 
                  model: "DJI Mini 3 Pro", 
                  serial: "MINI2834561", 
                  health: 92, 
                  flights: 14,
                  lastFlight: "1 week ago",
                  status: "ready"
                },
                { 
                  name: "Air 2S", 
                  model: "DJI Air 2S", 
                  serial: "AIR7284561", 
                  health: 87, 
                  flights: 45,
                  lastFlight: "3 days ago",
                  status: "maintenance"
                },
              ].map((drone, index) => (
                <Card key={index} className="bg-skylog-card border-skylog-border">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {drone.name}
                          {drone.status === "ready" ? (
                            <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Ready</Badge>
                          ) : (
                            <Badge variant="outline" className="border-amber-500/50 text-amber-500">Maintenance</Badge>
                          )}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">{drone.model}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Serial Number</p>
                          <p className="font-mono">{drone.serial}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total Flights</p>
                          <p>{drone.flights}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`h-2 flex-1 rounded-full overflow-hidden bg-skylog-dark`}>
                          <div 
                            className={`h-full ${drone.health > 90 ? 'bg-green-500' : 'bg-amber-500'}`}
                            style={{ width: `${drone.health}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${drone.health > 90 ? 'text-green-500' : 'text-amber-500'}`}>
                          {drone.health}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Last flight: {drone.lastFlight}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Flight History
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 text-skylog-primary">
                        Details <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Drone Card */}
              <Card className="bg-skylog-card border-skylog-border border-dashed flex items-center justify-center h-[200px] cursor-pointer hover:bg-skylog-primary/5">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-skylog-primary/10 flex items-center justify-center mx-auto">
                    <Plus className="h-6 w-6 text-skylog-primary" />
                  </div>
                  <p className="mt-2 font-medium">Add New Drone</p>
                  <p className="text-xs text-muted-foreground">Register a new drone to your fleet</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="batteries" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  name: "Mavic 3 - Battery 1", 
                  model: "DJI Intelligent Flight Battery", 
                  health: 96, 
                  cycles: 23,
                  status: "charged",
                  lastCharge: "Today"
                },
                { 
                  name: "Mavic 3 - Battery 2", 
                  model: "DJI Intelligent Flight Battery", 
                  health: 92, 
                  cycles: 41,
                  status: "charged",
                  lastCharge: "Yesterday"
                },
                { 
                  name: "Mini 3 - Battery 1", 
                  model: "DJI Intelligent Flight Battery", 
                  health: 87, 
                  cycles: 65,
                  status: "charging",
                  lastCharge: "2 days ago"
                },
              ].map((battery, index) => (
                <Card key={index} className="bg-skylog-card border-skylog-border">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${battery.status === 'charged' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                          {battery.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">{battery.model}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-skylog-primary/10 flex items-center justify-center">
                        {battery.status === 'charged' ? (
                          <BatteryMedium className="h-6 w-6 text-green-500" />
                        ) : (
                          <BatteryCharging className="h-6 w-6 text-amber-500" />
                        )}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between text-xs">
                          <span>Health Score</span>
                          <span className={battery.health > 90 ? "text-green-500" : "text-amber-500"}>
                            {battery.health}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${battery.health > 90 ? 'bg-green-500' : 'bg-amber-500'}`}
                            style={{ width: `${battery.health}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground flex justify-between">
                          <span>Charge Cycles: {battery.cycles}</span>
                          <span>Last Charge: {battery.lastCharge}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Charge History
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 text-skylog-primary">
                        Details <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add Battery Card */}
              <Card className="bg-skylog-card border-skylog-border border-dashed flex items-center justify-center h-[200px] cursor-pointer hover:bg-skylog-primary/5">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-skylog-primary/10 flex items-center justify-center mx-auto">
                    <Battery className="h-6 w-6 text-skylog-primary" />
                  </div>
                  <p className="mt-2 font-medium">Add New Battery</p>
                  <p className="text-xs text-muted-foreground">Track battery health and usage</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  name: "ND Filter Set", 
                  type: "Filters", 
                  drone: "Mavic 3", 
                  status: "good"
                },
                { 
                  name: "Prop Guards", 
                  type: "Propellers", 
                  drone: "Mini 3 Pro", 
                  status: "good"
                },
                { 
                  name: "Extra Props", 
                  type: "Propellers", 
                  drone: "Air 2S", 
                  status: "warning"
                },
              ].map((equipment, index) => (
                <Card key={index} className="bg-skylog-card border-skylog-border">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{equipment.name}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">{equipment.type}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Compatible With</p>
                        <p>{equipment.drone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <div className="flex items-center gap-1">
                          {equipment.status === "good" ? (
                            <>
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-green-500">Good</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-3 w-3 text-amber-500" />
                              <span className="text-amber-500">Replace Soon</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Maintenance
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 text-skylog-primary">
                        Details <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add Equipment Card */}
              <Card className="bg-skylog-card border-skylog-border border-dashed flex items-center justify-center h-[200px] cursor-pointer hover:bg-skylog-primary/5">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-skylog-primary/10 flex items-center justify-center mx-auto">
                    <Plus className="h-6 w-6 text-skylog-primary" />
                  </div>
                  <p className="mt-2 font-medium">Add Equipment</p>
                  <p className="text-xs text-muted-foreground">Register accessories and parts</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default DroneFleet;
