"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  company: string;
  website: string;
  widgetTitle: string;
  primaryColor: string;
  showRatings: boolean;
  showAvatars: boolean;
  autoRotate: boolean;
  emailNotifications: boolean;
  newTestimonial: boolean;
  weeklyReport: boolean;
}

export default function SettingsPage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: user?.firstName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    company: user?.unsafeMetadata?.company as string || "",
    website: user?.unsafeMetadata?.website as string || "",
    widgetTitle: user?.unsafeMetadata?.widgetTitle as string || "What our customers say",
    primaryColor: user?.unsafeMetadata?.primaryColor as string || "#0ea5e9",
    showRatings: user?.unsafeMetadata?.showRatings as boolean ?? true,
    showAvatars: user?.unsafeMetadata?.showAvatars as boolean ?? true,
    autoRotate: user?.unsafeMetadata?.autoRotate as boolean ?? true,
    emailNotifications: user?.unsafeMetadata?.emailNotifications as boolean ?? true,
    newTestimonial: user?.unsafeMetadata?.newTestimonial as boolean ?? true,
    weeklyReport: user?.unsafeMetadata?.weeklyReport as boolean ?? true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.firstName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        company: user.unsafeMetadata?.company as string || "",
        website: user.unsafeMetadata?.website as string || "",
        widgetTitle:
          user.unsafeMetadata?.widgetTitle as string || "What our customers say",
        primaryColor: user.unsafeMetadata?.primaryColor as string || "#0ea5e9",
        showRatings: user.unsafeMetadata?.showRatings as boolean ?? true,
        showAvatars: user.unsafeMetadata?.showAvatars as boolean ?? true,
        autoRotate: user.unsafeMetadata?.autoRotate as boolean ?? true,
        emailNotifications: user.unsafeMetadata?.emailNotifications as boolean ?? true,
        newTestimonial: user.unsafeMetadata?.newTestimonial as boolean ?? true,
        weeklyReport: user.unsafeMetadata?.weeklyReport as boolean ?? true,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSwitchChange = (name: keyof FormData, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await user?.update({
        firstName: formData.name,
        unsafeMetadata: {
          company: formData.company,
          website: formData.website,
          widgetTitle: formData.widgetTitle,
          primaryColor: formData.primaryColor,
          showRatings: formData.showRatings,
          showAvatars: formData.showAvatars,
          autoRotate: formData.autoRotate,
          emailNotifications: formData.emailNotifications,
          newTestimonial: formData.newTestimonial,
          weeklyReport: formData.weeklyReport,
        }
      });
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and widget settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="widget">Widget Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="widget" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="widget-title">Widget Title</Label>
              <Input
                id="widget-title"
                name="widgetTitle"
                value={formData.widgetTitle}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <Input
                id="primary-color"
                name="primaryColor"
                type="color"
                value={formData.primaryColor}
                onChange={handleInputChange}
                className="h-10 w-20 p-1"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-ratings"
                name="showRatings"
                checked={formData.showRatings}
                onCheckedChange={(checked) => handleSwitchChange('showRatings', checked)}
                disabled={isLoading}
              />
              <Label htmlFor="show-ratings">Show Ratings</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-avatars"
                name="showAvatars"
                checked={formData.showAvatars}
                onCheckedChange={(checked) => handleSwitchChange('showAvatars', checked)}
                disabled={isLoading}
              />
              <Label htmlFor="show-avatars">Show Avatars</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-rotate"
                name="autoRotate"
                checked={formData.autoRotate}
                onCheckedChange={(checked) => handleSwitchChange('autoRotate', checked)}
                disabled={isLoading}
              />
              <Label htmlFor="auto-rotate">Auto-rotate Testimonials</Label>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Widget Settings"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="email-notifications"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked)}
                disabled={isLoading}
              />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="new-testimonial"
                name="newTestimonial"
                checked={formData.newTestimonial}
                onCheckedChange={(checked) => handleSwitchChange('newTestimonial', checked)}
                disabled={isLoading}
              />
              <Label htmlFor="new-testimonial">New Testimonial Alerts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="weekly-report"
                name="weeklyReport"
                checked={formData.weeklyReport}
                onCheckedChange={(checked) => handleSwitchChange('weeklyReport', checked)}
                disabled={isLoading}
              />
              <Label htmlFor="weekly-report">Weekly Analytics Report</Label>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Notification Settings"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-lg font-medium">Current Plan</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You are currently on the Pro plan
            </p>
            <div className="mt-4">
              <Button variant="outline">Manage Subscription</Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Visa ending in 4242
            </p>
            <div className="mt-4">
              <Button variant="outline">Update Payment Method</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
