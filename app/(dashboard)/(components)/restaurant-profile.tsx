"use client";

import { useAuth } from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Globe, Edit, Clock, Users } from "lucide-react";
import Link from "next/link";

export function RestaurantProfile() {
  const { userProfile } = useAuth();

  const restaurant = userProfile?.restaurant;

  if (!restaurant) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">Restaurant Profile</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Complete your restaurant setup to see profile information.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/settings">Complete Setup</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Restaurant Profile</CardTitle>
          <CardDescription>
            Your restaurant information and settings
          </CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/settings">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <p className="text-sm text-muted-foreground">
                {restaurant.restaurantType || "Restaurant"}
              </p>
              {userProfile.restaurant?.isPremium && (
                <Badge className="mt-2">Premium Plan</Badge>
              )}
            </div>

            <div className="space-y-3">
              {restaurant.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="text-sm">
                    <p>{restaurant.location.address}</p>
                    <p>
                      {restaurant.location.city}, {restaurant.location.country}
                    </p>
                  </div>
                </div>
              )}

              {restaurant.contact?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{restaurant.contact.phone}</p>
                </div>
              )}

              {restaurant.contact?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{restaurant.contact.email}</p>
                </div>
              )}

              {restaurant.contact?.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{restaurant.contact.website}</p>
                </div>
              )}
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <h4 className="font-medium">Working Hours</h4>
            </div>
            <div className="space-y-2 text-sm">
              {restaurant.workingHours ? (
                restaurant.workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {schedule.day}
                    </span>
                    <span>
                      {schedule.closed
                        ? "Closed"
                        : `${schedule.open} - ${schedule.close}`}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Working hours not set</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h4 className="font-medium">Quick Stats</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Owner</span>
                <span>{userProfile.displayName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(restaurant.createdAt || "").toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Restaurant ID</span>
                <span className="font-mono text-xs">{restaurant.slug}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
