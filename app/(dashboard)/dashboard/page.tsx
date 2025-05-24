"use client";

import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { DashboardStats } from "../(components)/dashboard-stats";
import { ActionCards } from "../(components)/action-cards";
import { UpcomingReservations } from "../(components)/upcoming-reservations";
import { RecentOrders } from "../(components)/recent-orders";
import { PopularItems } from "../(components)/popular-items";
import { RestaurantProfile } from "../(components)/restaurant-profile";

export default function DashboardPage() {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userProfile?.displayName || "Restaurant Owner"}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening at{" "}
          {userProfile?.restaurant?.name || "your restaurant"} today.
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-full lg:col-span-4">
          <ActionCards />
        </div>
        <div className="col-span-full lg:col-span-3">
          <UpcomingReservations />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentOrders />
        <PopularItems />
      </div>

      <RestaurantProfile />
    </div>
  );
}
