
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export function FlightImportDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to import",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement actual file import logic
    toast({
      title: "Import functionality",
      description: "Flight log import feature will be implemented soon",
    });
    
    setOpen(false);
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Import Flight Log
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-skylog-card border-skylog-border">
        <DialogHeader>
          <DialogTitle className="text-white">Import Flight Log</DialogTitle>
          <DialogDescription>
            Upload flight log files from your drone to automatically populate flight data.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Flight Log File</Label>
            <Input
              id="file"
              type="file"
              accept=".csv,.log,.txt,.json"
              onChange={handleFileChange}
              className="bg-muted border-skylog-border"
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: CSV, LOG, TXT, JSON
            </p>
          </div>
          
          {file && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium">Selected file:</p>
              <p className="text-sm text-muted-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                Size: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} className="bg-skylog-primary hover:bg-skylog-primary/90">
            Import Flight Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
