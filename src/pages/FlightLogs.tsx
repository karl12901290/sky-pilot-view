
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download } from "lucide-react";
import { NewFlightDialog } from "@/components/flights/NewFlightDialog";
import { FlightImportDialog } from "@/components/flights/FlightImportDialog";
import { FlightTable } from "@/components/flights/FlightTable";
import { useFlights } from "@/hooks/useFlights";

const FlightLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: flights = [] } = useFlights();

  const completedFlights = flights.filter(f => f.end_time);
  const totalDistance = flights.reduce((acc, flight) => acc + (flight.distance_km || 0), 0);
  const avgFlightTime = completedFlights.length > 0 
    ? completedFlights.reduce((acc, flight) => {
        if (flight.start_time && flight.end_time) {
          const duration = new Date(flight.end_time).getTime() - new Date(flight.start_time).getTime();
          return acc + duration;
        }
        return acc;
      }, 0) / completedFlights.length / (1000 * 60) // convert to minutes
    : 0;
  const maxAltitude = Math.max(...flights.map(f => f.max_altitude || 0), 0);

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Flight Logs</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all your drone flights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FlightImportDialog />
            <NewFlightDialog />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Flights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{flights.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Distance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalDistance.toFixed(1)}km</div>
            </CardContent>
          </Card>
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Flight Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {avgFlightTime > 0 ? `${Math.floor(avgFlightTime)}:${Math.floor((avgFlightTime % 1) * 60).toString().padStart(2, '0')}` : "0:00"}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Max Altitude</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{maxAltitude}m</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-skylog-card border-skylog-border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg font-medium text-white">Flight History</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search flights by location, drone, or date..." 
                  className="pl-10 bg-muted border-skylog-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-muted border-skylog-border">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-skylog-card border-skylog-border">
                  <SelectItem value="all">All Flights</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <FlightTable />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default FlightLogs;
