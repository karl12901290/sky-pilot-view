
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { NewFlightDialog } from "@/components/flights/NewFlightDialog";
import { FlightImportDialog } from "@/components/flights/FlightImportDialog";
import { AddDroneDialog } from "@/components/drones/AddDroneDialog";
import { useFlights } from "@/hooks/useFlights";
import { useDrones } from "@/hooks/useDrones";
import { format } from "date-fns";
import { ArrowUp, Zap } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const { data: flights = [] } = useFlights();
  const { data: drones = [] } = useDrones();

  const recentFlights = flights.slice(0, 5);
  const activeDrones = drones.filter(drone => drone.status === 'ready');

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.email?.split('@')[0] || 'Pilot'}! Here's your flight overview.
            </p>
          </div>
          <div className="flex gap-3">
            <FlightImportDialog />
            <NewFlightDialog />
          </div>
        </div>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader>
              <CardTitle className="text-white">Recent Flights</CardTitle>
              <CardDescription>Your latest flight activities</CardDescription>
            </CardHeader>
            <CardContent>
              {recentFlights.length > 0 ? (
                <div className="space-y-3">
                  {recentFlights.map((flight) => {
                    const drone = drones.find(d => d.drone_id === flight.drone_id);
                    return (
                      <div key={flight.flight_id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium text-white">
                            {drone?.name || drone?.model || "Unknown Drone"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {flight.location || "Unknown location"} • {flight.start_time ? format(new Date(flight.start_time), "MMM dd, HH:mm") : "No date"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">
                            {flight.distance_km ? `${flight.distance_km.toFixed(1)} km` : "N/A"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {flight.max_altitude ? `${flight.max_altitude.toFixed(0)}m max` : "No altitude data"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ArrowUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent flights found</p>
                  <p className="text-sm">Start logging flights to see them here</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader>
              <CardTitle className="text-white">Fleet Status</CardTitle>
              <CardDescription>Current status of your drones</CardDescription>
            </CardHeader>
            <CardContent>
              {drones.length > 0 ? (
                <div className="space-y-3">
                  {drones.slice(0, 5).map((drone) => (
                    <div key={drone.drone_id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium text-white">
                          {drone.name || drone.model || `Drone ${drone.serial_number}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {drone.model} • Health: {drone.health_score || 100}%
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          drone.status === 'ready' ? 'bg-green-500' : 
                          drone.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="text-sm capitalize text-muted-foreground">
                          {drone.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {drones.length > 5 && (
                    <div className="text-center text-sm text-muted-foreground">
                      +{drones.length - 5} more drones
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No drones in your fleet</p>
                  <div className="mt-4">
                    <AddDroneDialog />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
