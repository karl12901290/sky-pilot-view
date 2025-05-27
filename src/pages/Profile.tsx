
import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Camera, Shield, Activity } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";

const Profile = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    job_title: "",
    company: "",
    bio: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        username: profile.username || "",
        job_title: profile.job_title || "",
        company: profile.company || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile.mutateAsync(formData);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        username: profile.username || "",
        job_title: profile.job_title || "",
        company: profile.company || "",
        bio: profile.bio || "",
      });
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="animate-fade-in space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded w-32"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your profile settings and account preferences
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-skylog-card border border-skylog-border">
            <TabsTrigger value="profile" className="data-[state=active]:bg-skylog-primary/20">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-skylog-primary/20">
              <Activity className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-skylog-primary/20">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4 flex flex-col items-center">
                      <div className="h-32 w-32 rounded-full bg-skylog-primary/20 border-2 border-skylog-primary flex items-center justify-center relative mb-4">
                        <User className="h-16 w-16 text-skylog-primary" />
                        <Button variant="ghost" size="icon" className="absolute bottom-0 right-0 bg-skylog-primary text-white rounded-full h-8 w-8">
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full" type="button">
                        Upload Image
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName" 
                            value={formData.full_name}
                            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                            className="bg-skylog-dark border-skylog-border" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            value={user?.email || ""} 
                            className="bg-skylog-dark border-skylog-border" 
                            readOnly 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input 
                            id="username" 
                            value={formData.username}
                            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                            className="bg-skylog-dark border-skylog-border" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="title">Job Title</Label>
                          <Input 
                            id="title" 
                            value={formData.job_title}
                            onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                            className="bg-skylog-dark border-skylog-border" 
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="company">Company</Label>
                          <Input 
                            id="company" 
                            value={formData.company}
                            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                            className="bg-skylog-dark border-skylog-border" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          rows={4}
                          className="w-full rounded-md border border-skylog-border bg-skylog-dark px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.bio}
                          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={updateProfile.isPending}>
                      {updateProfile.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Connected Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold">D</div>
                      <div>
                        <h4 className="font-medium">DJI Account</h4>
                        <p className="text-xs text-muted-foreground">Connect your DJI account to import flight logs</p>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  
                  <Separator className="bg-skylog-border" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-gray-600 flex items-center justify-center text-white font-bold">A</div>
                      <div>
                        <h4 className="font-medium">Airdata UAV</h4>
                        <p className="text-xs text-muted-foreground">Sync your flight data with Airdata account</p>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Uploaded flight log", time: "Today at 2:30 PM", detail: "DJI Mavic 3 - Austin Downtown" },
                    { action: "Updated drone details", time: "Yesterday at 11:45 AM", detail: "Changed battery cycle count" },
                    { action: "Imported 3 flight logs", time: "May 19, 2025 at 4:20 PM", detail: "From DJI Fly App" },
                    { action: "Added new drone", time: "May 18, 2025 at 10:15 AM", detail: "DJI Mini 3 Pro" },
                    { action: "Updated profile information", time: "May 15, 2025 at 9:30 AM", detail: "Changed company name" }
                  ].map((item, i) => (
                    <div key={i} className="border-l-2 border-skylog-primary/50 pl-4 pb-4 relative">
                      <div className="absolute w-3 h-3 bg-skylog-primary rounded-full -left-[7px] top-1" />
                      <h4 className="font-medium">{item.action}</h4>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                      <p className="text-sm">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-skylog-card border-skylog-border mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" className="bg-skylog-dark border-skylog-border" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="bg-skylog-dark border-skylog-border" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="bg-skylog-dark border-skylog-border" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Update Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skylog-card border-skylog-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Authenticator App</h4>
                    <p className="text-xs text-muted-foreground">Use an authenticator app to generate one-time codes</p>
                  </div>
                  <Button>Enable</Button>
                </div>
                
                <Separator className="bg-skylog-border" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Authentication</h4>
                    <p className="text-xs text-muted-foreground">Receive a code via SMS to verify your identity</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
