"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, ShoppingBag, Loader2 } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function OrdersPage() {
  const { orders, loading, error, editOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesType = typeFilter === "all" || order.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const dineInOrders = filteredOrders.filter(
    (order) => order.type === "dine-in"
  );
  const takeawayOrders = filteredOrders.filter(
    (order) => order.type === "takeaway"
  );
  const deliveryOrders = filteredOrders.filter(
    (order) => order.type === "delivery"
  );

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await editOrder(orderId, { status: status as any });
      toast("Success", {
        description: "Order status updated",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to update order status",
      });
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
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "preparing":
        return "Preparing";
      case "ready":
        return "Ready";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage your restaurant's orders and deliveries.
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Orders ({filteredOrders.length})
          </TabsTrigger>
          <TabsTrigger value="dine-in">
            Dine-in ({dineInOrders.length})
          </TabsTrigger>
          <TabsTrigger value="takeaway">
            Takeaway ({takeawayOrders.length})
          </TabsTrigger>
          <TabsTrigger value="delivery">
            Delivery ({deliveryOrders.length})
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="w-full md:w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dine-in">Dine-in</SelectItem>
                <SelectItem value="takeaway">Takeaway</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-2">Order ID</div>
                  <div className="col-span-2">Customer</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Items</div>
                  <div className="col-span-1">Total</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Status</div>
                </div>
                <div className="divide-y">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="grid grid-cols-12 px-4 py-4">
                      <div className="col-span-2 flex items-center font-medium">
                        {order.orderNumber}
                      </div>
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {order.customerName
                              ? order.customerName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "G"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">
                          {order.customerName || "Guest"}
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}{" "}
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="col-span-1 flex items-center">
                        {order.items.length}
                      </div>
                      <div className="col-span-1 flex items-center">
                        €{order.total.toFixed(2)}
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Badge variant="outline">{order.type}</Badge>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Badge variant={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                        {order.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, "preparing")
                            }
                          >
                            Start
                          </Button>
                        )}
                        {order.status === "preparing" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, "ready")
                            }
                          >
                            Ready
                          </Button>
                        )}
                        {order.status === "ready" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, "completed")
                            }
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredOrders.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No orders found.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dine-in" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-2">Order ID</div>
                  <div className="col-span-2">Customer</div>
                  <div className="col-span-2">Table</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Items</div>
                  <div className="col-span-1">Total</div>
                  <div className="col-span-2">Status</div>
                </div>
                <div className="divide-y">
                  {dineInOrders.map((order) => (
                    <div key={order.id} className="grid grid-cols-12 px-4 py-4">
                      <div className="col-span-2 flex items-center font-medium">
                        {order.orderNumber}
                      </div>
                      <div className="col-span-2 flex items-center">
                        {order.customerName || "Guest"}
                      </div>
                      <div className="col-span-2 flex items-center">
                        {order.tableId || "No table"}
                      </div>
                      <div className="col-span-2 flex items-center text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}{" "}
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="col-span-1 flex items-center">
                        {order.items.length}
                      </div>
                      <div className="col-span-1 flex items-center">
                        €{order.total.toFixed(2)}
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Badge variant={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {dineInOrders.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No dine-in orders found.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="takeaway" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Takeaway Orders ({takeawayOrders.length})
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  View and manage orders for customer pickup.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Delivery Orders ({deliveryOrders.length})
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  View and manage orders for delivery to customers.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
