
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useCreateFlight } from "@/hooks/useFlights";
import { useDrones } from "@/hooks/useDrones";
import { toast } from "@/components/ui/use-toast";

export function NewFlightDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    drone_id: "",
    location: "",
    start_time: "",
    end_time: "",
    distance_km: "",
    max_altitude: "",
  });

  const createFlight = useCreateFlight();
  const { data: drones = [] } = useDrones();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.drone_id) {
      toast({
        title: "Error",
        description: "Please select a drone",
        variant: "destructive",
      });
      return;
    }

    try {
      await createFlight.mutateAsync({
        drone_id: formData.drone_id,
        location: formData.location || null,
        start_time: formData.start_time || null,
        end_time: formData.end_time || null,
        distance_km: formData.distance_km ? parseFloat(formData.distance_km) : null,
        max_altitude: formData.max_altitude ? parseFloat(formData.max_altitude) : null,
      });
      
      setOpen(false);
      setFormData({
        drone_id: "",
        location: "",
        start_time: "",
        end_time: "",
        distance_km: "",
        max_altitude: "",
      });
    } catch (error) {
      console.error("Error creating flight:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-skylog-primary hover:bg-skylog-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Flight
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-skylog-card border-skylog-border">
        <DialogHeader>
          <DialogTitle className="text-white">Log New Flight</DialogTitle>
          <DialogDescription>
            Record details of your drone flight for tracking and analysis.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="drone">Drone</Label>
            <Select value={formData.drone_id} onValueChange={(value) => setFormData(prev => ({ ...prev, drone_id: value }))}>
              <SelectTrigger className="bg-muted border-skylog-border">
                <SelectValue placeholder="Select a drone" />
              </SelectTrigger>
              <SelectContent className="bg-skylog-card border-skylog-border">
                {drones.map((drone) => (
                  <SelectItem key={drone.drone_id} value={drone.drone_id}>
                    {drone.name || drone.model || `Drone ${drone.serial_number}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Flight location"
              className="bg-muted border-skylog-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                className="bg-muted border-skylog-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_time">End Time</Label>
              <Input
                id="end_time"
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                className="bg-muted border-skylog-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km)</Label>
              <Input
                id="distance"
                type="number"
                step="0.1"
                value={formData.distance_km}
                onChange={(e) => setFormData(prev => ({ ...prev, distance_km: e.target.value }))}
                placeholder="0.0"
                className="bg-muted border-skylog-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="altitude">Max Altitude (m)</Label>
              <Input
                id="altitude"
                type="number"
                step="0.1"
                value={formData.max_altitude}
                onChange={(e) => setFormData(prev => ({ ...prev, max_altitude: e.target.value }))}
                placeholder="0.0"
                className="bg-muted border-skylog-border"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createFlight.isPending} className="bg-skylog-primary hover:bg-skylog-primary/90">
              {createFlight.isPending ? "Logging..." : "Log Flight"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
