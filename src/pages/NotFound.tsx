
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <h1 className="text-7xl font-bold text-skylog-primary mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved.
          Return to dashboard to continue exploring your flight data.
        </p>
        <Button onClick={() => navigate("/")} className="gap-2">
          Return to Dashboard <ArrowRight size={16} />
        </Button>
      </div>
    </AppLayout>
  );
};

export default NotFound;
