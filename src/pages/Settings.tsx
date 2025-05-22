
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, Eye, Globe, Moon, Sun } from "lucide-react";

const Settings = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your application preferences and display options
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5 text-skylog-primary" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Default Units</Label>
                      <p className="text-xs text-muted-foreground">Choose your preferred measurement system</p>
                    </div>
                    <Select defaultValue="metric">
                      <SelectTrigger className="w-36 bg-skylog-dark border-skylog-border">
                        <SelectValue placeholder="Select units" />
                      </SelectTrigger>
                      <SelectContent className="bg-skylog-card border-skylog-border">
                        <SelectItem value="metric">Metric (m, km/h)</SelectItem>
                        <SelectItem value="imperial">Imperial (ft, mph)</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Time Zone</Label>
                      <p className="text-xs text-muted-foreground">Set your local time zone for flight logs</p>
                    </div>
                    <Select defaultValue="auto">
                      <SelectTrigger className="w-36 bg-skylog-dark border-skylog-border">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-skylog-card border-skylog-border">
                        <SelectItem value="auto">Auto Detect</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="america/new_york">Eastern Time</SelectItem>
                        <SelectItem value="america/chicago">Central Time</SelectItem>
                        <SelectItem value="america/denver">Mountain Time</SelectItem>
                        <SelectItem value="america/los_angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Language</Label>
                      <p className="text-xs text-muted-foreground">Select your preferred language</p>
                    </div>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-36 bg-skylog-dark border-skylog-border">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-skylog-card border-skylog-border">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Date Format</Label>
                      <p className="text-xs text-muted-foreground">Choose how dates are displayed</p>
                    </div>
                    <Select defaultValue="mdy">
                      <SelectTrigger className="w-36 bg-skylog-dark border-skylog-border">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-skylog-card border-skylog-border">
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Eye className="h-5 w-5 text-skylog-primary" />
                  Display Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Theme</Label>
                      <p className="text-xs text-muted-foreground">Choose your interface color theme</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1 border-skylog-border">
                        <Sun className="h-4 w-4" /> Light
                      </Button>
                      <Button variant="default" size="sm" className="flex items-center gap-1 bg-skylog-primary">
                        <Moon className="h-4 w-4" /> Dark
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Sidebar Mode</Label>
                      <p className="text-xs text-muted-foreground">Control sidebar collapse behavior</p>
                    </div>
                    <Select defaultValue="responsive">
                      <SelectTrigger className="w-36 bg-skylog-dark border-skylog-border">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent className="bg-skylog-card border-skylog-border">
                        <SelectItem value="responsive">Auto (Responsive)</SelectItem>
                        <SelectItem value="expanded">Always Expanded</SelectItem>
                        <SelectItem value="collapsed">Always Collapsed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Accent Color</Label>
                      <p className="text-xs text-muted-foreground">Choose app highlight color</p>
                    </div>
                    <div className="flex gap-2">
                      {["#00A3FF", "#FF4E50", "#38D86C", "#FFB800", "#9747FF"].map((color) => (
                        <div 
                          key={color}
                          className={`h-6 w-6 rounded-full cursor-pointer ${color === "#00A3FF" ? "ring-2 ring-offset-2 ring-white/50" : ""}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Enable Animations</Label>
                      <p className="text-xs text-muted-foreground">Toggle UI animations and transitions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Globe className="h-5 w-5 text-skylog-primary" />
                  Map Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Default Map Style</Label>
                      <p className="text-xs text-muted-foreground">Choose the default map appearance</p>
                    </div>
                    <Select defaultValue="satellite">
                      <SelectTrigger className="w-36 bg-skylog-dark border-skylog-border">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent className="bg-skylog-card border-skylog-border">
                        <SelectItem value="satellite">Satellite</SelectItem>
                        <SelectItem value="terrain">Terrain</SelectItem>
                        <SelectItem value="streets">Streets</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Show Airspace Restrictions</Label>
                      <p className="text-xs text-muted-foreground">Display no-fly zones and restricted areas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Show Weather Data</Label>
                      <p className="text-xs text-muted-foreground">Display weather conditions on map</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Bell className="h-5 w-5 text-skylog-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive important updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Flight Summaries</Label>
                      <p className="text-xs text-muted-foreground">Get summaries after each flight</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Battery Alerts</Label>
                      <p className="text-xs text-muted-foreground">Warnings for low battery health</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">System Updates</Label>
                      <p className="text-xs text-muted-foreground">Notifications about new features</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Marketing</Label>
                      <p className="text-xs text-muted-foreground">Promotions and special offers</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Data & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Data Sharing</Label>
                      <p className="text-xs text-muted-foreground">Share anonymous usage data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">Cookies</Label>
                      <p className="text-xs text-muted-foreground">Manage cookie preferences</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <Button variant="destructive" size="sm" className="w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
