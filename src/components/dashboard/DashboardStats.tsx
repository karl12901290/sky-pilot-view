
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, MapPin, Zap } from "lucide-react";
import { useDrones } from "@/hooks/useDrones";
import { useFlights } from "@/hooks/useFlights";

export function DashboardStats() {
  const { data: drones = [], isLoading: dronesLoading } = useDrones();
  const { data: flights = [], isLoading: flightsLoading } = useFlights();

  if (dronesLoading || flightsLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-skylog-card border-skylog-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Calculate statistics
  const totalFlights = flights.length;
  const activeDrones = drones.filter(drone => drone.status === 'ready').length;
  const totalDistance = flights.reduce((acc, flight) => acc + (flight.distance_km || 0), 0);
  const avgHealthScore = drones.length > 0 
    ? Math.round(drones.reduce((acc, drone) => acc + (drone.health_score || 0), 0) / drones.length)
    : 0;

  const stats = [
    {
      title: "Total Flights",
      value: totalFlights,
      icon: Activity,
      description: "Completed flights",
    },
    {
      title: "Active Drones",
      value: activeDrones,
      icon: Zap,
      description: "Ready for flight",
    },
    {
      title: "Total Distance",
      value: `${totalDistance.toFixed(1)} km`,
      icon: MapPin,
      description: "Distance covered",
    },
    {
      title: "Fleet Health",
      value: `${avgHealthScore}%`,
      icon: Clock,
      description: "Average health score",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-skylog-card border-skylog-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-skylog-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
