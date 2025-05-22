
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  CheckCircle2,
  Battery,
  AlertTriangle,
  Info,
  Clock,
  X,
  Settings,
  CheckCheck
} from "lucide-react";

const Notifications = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your system alerts and notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <CheckCheck className="h-4 w-4" />
              Mark All as Read
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Notification Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-skylog-card border border-skylog-border">
            <TabsTrigger value="all" className="data-[state=active]:bg-skylog-primary/20">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-skylog-primary/20">
              Unread
              <Badge className="ml-2 bg-skylog-primary text-xs">3</Badge>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-skylog-primary/20">
              System Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex items-center gap-2">
                  <Bell className="h-4 w-4 text-skylog-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-skylog-border">
                  {[
                    { 
                      title: "Battery Health Warning", 
                      message: "Mini 3 - Battery 1 has dropped below 90% health. Consider replacing after 80%.", 
                      time: "2 hours ago",
                      type: "warning",
                      read: false
                    },
                    { 
                      title: "Flight Log Processing Complete", 
                      message: "Your flight log from Austin Downtown has been processed and analyzed.", 
                      time: "1 day ago",
                      type: "info",
                      read: false
                    },
                    { 
                      title: "Firmware Update Available", 
                      message: "A new firmware update is available for your Mavic 3 drone.", 
                      time: "2 days ago",
                      type: "info",
                      read: false
                    },
                    { 
                      title: "Airspace Alert", 
                      message: "Temporary flight restriction detected near your recent flight location (Austin Downtown).", 
                      time: "3 days ago",
                      type: "alert",
                      read: true
                    },
                    { 
                      title: "Weather Alert", 
                      message: "High winds forecasted for your scheduled flight tomorrow.", 
                      time: "4 days ago",
                      type: "warning",
                      read: true
                    },
                    { 
                      title: "Maintenance Reminder", 
                      message: "Your Mavic 3 drone is due for propeller inspection based on flight hours.", 
                      time: "1 week ago",
                      type: "info",
                      read: true
                    },
                    { 
                      title: "Account Security", 
                      message: "Your account password was changed successfully.", 
                      time: "2 weeks ago",
                      type: "success",
                      read: true
                    },
                  ].map((notification, index) => (
                    <div 
                      key={index} 
                      className={`p-4 flex items-start gap-3 ${!notification.read ? 'bg-skylog-primary/5' : ''}`}
                    >
                      <div className="shrink-0 mt-1">
                        {notification.type === "warning" && (
                          <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          </div>
                        )}
                        {notification.type === "info" && (
                          <div className="h-8 w-8 rounded-full bg-skylog-primary/20 flex items-center justify-center">
                            <Info className="h-4 w-4 text-skylog-primary" />
                          </div>
                        )}
                        {notification.type === "alert" && (
                          <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                        {notification.type === "success" && (
                          <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-medium leading-none pt-1">
                            {notification.title}
                            {!notification.read && (
                              <Badge className="ml-2 bg-skylog-primary text-[10px] py-0">New</Badge>
                            )}
                          </h4>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 text-center">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Load More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread">
            <Card className="bg-skylog-card border-skylog-border">
              <CardContent className="p-0">
                <div className="divide-y divide-skylog-border">
                  {[
                    { 
                      title: "Battery Health Warning", 
                      message: "Mini 3 - Battery 1 has dropped below 90% health. Consider replacing after 80%.", 
                      time: "2 hours ago",
                      type: "warning",
                    },
                    { 
                      title: "Flight Log Processing Complete", 
                      message: "Your flight log from Austin Downtown has been processed and analyzed.", 
                      time: "1 day ago",
                      type: "info",
                    },
                    { 
                      title: "Firmware Update Available", 
                      message: "A new firmware update is available for your Mavic 3 drone.", 
                      time: "2 days ago",
                      type: "info",
                    },
                  ].map((notification, index) => (
                    <div 
                      key={index} 
                      className="p-4 flex items-start gap-3 bg-skylog-primary/5"
                    >
                      <div className="shrink-0 mt-1">
                        {notification.type === "warning" && (
                          <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          </div>
                        )}
                        {notification.type === "info" && (
                          <div className="h-8 w-8 rounded-full bg-skylog-primary/20 flex items-center justify-center">
                            <Info className="h-4 w-4 text-skylog-primary" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-medium leading-none pt-1">
                            {notification.title}
                            <Badge className="ml-2 bg-skylog-primary text-[10px] py-0">New</Badge>
                          </h4>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="bg-skylog-card border-skylog-border">
              <CardContent className="p-0">
                <div className="divide-y divide-skylog-border">
                  {[
                    { 
                      title: "Battery Health Warning", 
                      message: "Mini 3 - Battery 1 has dropped below 90% health. Consider replacing after 80%.", 
                      time: "2 hours ago",
                      type: "warning",
                      read: false
                    },
                    { 
                      title: "Airspace Alert", 
                      message: "Temporary flight restriction detected near your recent flight location (Austin Downtown).", 
                      time: "3 days ago",
                      type: "alert",
                      read: true
                    },
                    { 
                      title: "Weather Alert", 
                      message: "High winds forecasted for your scheduled flight tomorrow.", 
                      time: "4 days ago",
                      type: "warning",
                      read: true
                    },
                  ].map((notification, index) => (
                    <div 
                      key={index} 
                      className={`p-4 flex items-start gap-3 ${!notification.read ? 'bg-skylog-primary/5' : ''}`}
                    >
                      <div className="shrink-0 mt-1">
                        {notification.type === "warning" && (
                          <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          </div>
                        )}
                        {notification.type === "alert" && (
                          <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-medium leading-none pt-1">
                            {notification.title}
                            {!notification.read && (
                              <Badge className="ml-2 bg-skylog-primary text-[10px] py-0">New</Badge>
                            )}
                          </h4>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Notifications;
