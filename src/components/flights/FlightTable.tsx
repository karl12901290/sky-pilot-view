
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download } from "lucide-react";
import { useFlights } from "@/hooks/useFlights";
import { useDrones } from "@/hooks/useDrones";
import { format } from "date-fns";

export function FlightTable() {
  const { data: flights = [], isLoading } = useFlights();
  const { data: drones = [] } = useDrones();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  const getDroneName = (droneId: string) => {
    const drone = drones.find(d => d.drone_id === droneId);
    return drone?.name || drone?.model || "Unknown Drone";
  };

  const formatDuration = (start: string | null, end: string | null) => {
    if (!start || !end) return "N/A";
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime.getTime() - startTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${Math.floor(diffMins / 60)}:${(diffMins % 60).toString().padStart(2, '0')}`;
  };

  if (flights.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No flights found</p>
        <p className="text-sm mt-2">Start logging flights to see them here</p>
      </div>
    );
  }

  return (
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
            <th className="text-left text-xs font-medium text-muted-foreground p-3">Status</th>
            <th className="text-right text-xs font-medium text-muted-foreground p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.flight_id} className="border-b border-skylog-border hover:bg-skylog-primary/5">
              <td className="p-3 text-sm">
                {flight.start_time ? format(new Date(flight.start_time), "MMM dd, yyyy") : "N/A"}
              </td>
              <td className="p-3 text-sm">{getDroneName(flight.drone_id)}</td>
              <td className="p-3 text-sm">{flight.location || "N/A"}</td>
              <td className="p-3 text-sm">{formatDuration(flight.start_time, flight.end_time)}</td>
              <td className="p-3 text-sm">
                {flight.max_altitude ? `${flight.max_altitude.toFixed(1)}m` : "N/A"}
              </td>
              <td className="p-3 text-sm">
                {flight.distance_km ? `${flight.distance_km.toFixed(1)}km` : "N/A"}
              </td>
              <td className="p-3 text-sm">
                <Badge variant={flight.end_time ? "default" : "secondary"}>
                  {flight.end_time ? "Completed" : "In Progress"}
                </Badge>
              </td>
              <td className="p-3 text-sm text-right">
                <div className="flex gap-1 justify-end">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  {flight.raw_log_url && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Download className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
