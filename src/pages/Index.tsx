
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

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
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Flight Log
            </Button>
            <Button size="sm" className="bg-skylog-primary hover:bg-skylog-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Flight
            </Button>
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
              <div className="text-center py-8 text-muted-foreground">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent flights found</p>
                <p className="text-sm">Start logging flights to see them here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-skylog-card border-skylog-border">
            <CardHeader>
              <CardTitle className="text-white">Fleet Status</CardTitle>
              <CardDescription>Current status of your drones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No drones in your fleet</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Add Your First Drone
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
