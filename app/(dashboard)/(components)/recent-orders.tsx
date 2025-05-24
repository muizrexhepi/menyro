"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShoppingBag, ChevronRight, Loader2 } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import Link from "next/link";

export function RecentOrders() {
  const { orders, loading, editOrder } = useOrders();

  const recentOrders = orders
    .filter((order) => order.status !== "cancelled")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await editOrder(orderId, { status: status as any });
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "preparing":
        return "secondary";
      case "ready":
        return "outline";
      case "pending":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Recent Orders
          </CardTitle>
          <CardDescription>Latest orders from your restaurant</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/orders">
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {order.customerName
                        ? order.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "G"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{order.orderNumber}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.customerName || "Guest"} • {order.items.length}{" "}
                      items • €{order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{order.type}</Badge>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  {order.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(order.id, "preparing")}
                    >
                      Start
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(order.id, "ready")}
                    >
                      Ready
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No recent orders</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              New orders will appear here when customers place them.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
