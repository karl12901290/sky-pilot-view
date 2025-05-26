
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useCreateDrone } from "@/hooks/useDrones";
import { toast } from "@/components/ui/use-toast";

export function AddDroneDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    serial_number: "",
    status: "ready",
  });

  const createDrone = useCreateDrone();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.model) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await createDrone.mutateAsync({
        name: formData.name,
        model: formData.model,
        serial_number: formData.serial_number || null,
        status: formData.status as 'ready' | 'maintenance' | 'retired',
      });
      
      setOpen(false);
      setFormData({
        name: "",
        model: "",
        serial_number: "",
        status: "ready",
      });
    } catch (error) {
      console.error("Error creating drone:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Drone
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-skylog-card border-skylog-border">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Drone</DialogTitle>
          <DialogDescription>
            Add a new drone to your fleet for flight tracking.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Drone Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="My Mavic Pro"
              className="bg-muted border-skylog-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model *</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
              placeholder="DJI Mavic 3 Pro"
              className="bg-muted border-skylog-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serial">Serial Number</Label>
            <Input
              id="serial"
              value={formData.serial_number}
              onChange={(e) => setFormData(prev => ({ ...prev, serial_number: e.target.value }))}
              placeholder="1234567890"
              className="bg-muted border-skylog-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger className="bg-muted border-skylog-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-skylog-card border-skylog-border">
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createDrone.isPending} className="bg-skylog-primary hover:bg-skylog-primary/90">
              {createDrone.isPending ? "Adding..." : "Add Drone"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
