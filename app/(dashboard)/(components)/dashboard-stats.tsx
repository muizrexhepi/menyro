"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  CalendarClock,
  QrCode,
  Users,
  TrendingUp,
} from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";
import { useReservations } from "@/hooks/use-reservations";
import { useOrders } from "@/hooks/use-orders";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStats() {
  const { analyticsData, loading: analyticsLoading } = useAnalytics(30);
  const { reservations, loading: reservationsLoading } = useReservations();
  const { orders, loading: ordersLoading } = useOrders();

  // Calculate today's stats
  const today = new Date().toISOString().split("T")[0];
  const todayReservations = reservations.filter(
    (r) => r.date === today && r.status !== "cancelled"
  ).length;
  const todayOrders = orders.filter((o) =>
    o.createdAt.startsWith(today)
  ).length;
  const todayRevenue = orders
    .filter((o) => o.createdAt.startsWith(today) && o.status === "completed")
    .reduce((sum, order) => sum + order.total, 0);

  // Mock percentage changes (in a real app, you'd calculate these from historical data)
  const getRandomChange = () => (Math.random() - 0.5) * 40; // Random change between -20% and +20%

  const stats = [
    {
      title: "Today's Revenue",
      value: `€${todayRevenue.toFixed(2)}`,
      change: getRandomChange(),
      icon: TrendingUp,
      loading: ordersLoading,
    },
    {
      title: "QR Menu Scans",
      value: analyticsData?.qrScans?.toString() || "0",
      change: getRandomChange(),
      icon: QrCode,
      loading: analyticsLoading,
    },
    {
      title: "Today's Reservations",
      value: todayReservations.toString(),
      change: getRandomChange(),
      icon: CalendarClock,
      loading: reservationsLoading,
    },
    {
      title: "Today's Orders",
      value: todayOrders.toString(),
      change: getRandomChange(),
      icon: Users,
      loading: ordersLoading,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {stat.loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change >= 0 ? (
                    <span className="text-emerald-500 inline-flex items-center">
                      <ArrowUpRight className="ml-1 h-3 w-3" />+
                      {stat.change.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="text-red-500 inline-flex items-center">
                      <ArrowDownRight className="ml-1 h-3 w-3" />
                      {stat.change.toFixed(1)}%
                    </span>
                  )}{" "}
                  from last month
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
