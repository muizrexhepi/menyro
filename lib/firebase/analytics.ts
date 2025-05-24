import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { AnalyticsData, RevenueData } from "@/types/analytics";

// Type for Firestore order data
interface FirestoreOrder {
  restaurantId: string;
  total: number;
  type: "dine-in" | "takeaway" | "delivery";
  status: string;
  items?: Array<{
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  createdAt: {
    toDate: () => Date;
  };
}

export const getAnalyticsData = async (
  restaurantId: string,
  days = 30
): Promise<AnalyticsData> => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get orders for the period
    const ordersQuery = query(
      collection(db, "orders"),
      where("restaurantId", "==", restaurantId),
      where("createdAt", ">=", Timestamp.fromDate(startDate)),
      where("createdAt", "<=", Timestamp.fromDate(endDate)),
      where("status", "==", "completed")
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    const orders = ordersSnapshot.docs.map(
      (doc) => doc.data() as FirestoreOrder
    );

    // Calculate metrics
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Get QR scans (mock data for now)
    const qrScans = Math.floor(Math.random() * 1000) + 500;

    // Calculate popular items
    const itemCounts: Record<
      string,
      { name: string; orders: number; revenue: number }
    > = {};
    orders.forEach((order) => {
      if (order.items) {
        order.items.forEach((item) => {
          if (!itemCounts[item.menuItemId]) {
            itemCounts[item.menuItemId] = {
              name: item.name,
              orders: 0,
              revenue: 0,
            };
          }
          itemCounts[item.menuItemId].orders += item.quantity;
          itemCounts[item.menuItemId].revenue += item.price * item.quantity;
        });
      }
    });

    const popularItems = Object.entries(itemCounts)
      .map(([itemId, data]) => ({ itemId, ...data }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 10);

    // Calculate order types with proper typing
    const orderTypes = orders.reduce(
      (acc, order) => {
        const orderType = order.type;
        if (orderType === "dine-in") {
          acc.dineIn++;
        } else if (orderType === "takeaway") {
          acc.takeaway++;
        } else if (orderType === "delivery") {
          acc.delivery++;
        }
        return acc;
      },
      { dineIn: 0, takeaway: 0, delivery: 0 }
    );

    // Calculate hourly data
    const hourlyData = Array.from({ length: 24 }, (_, hour) => {
      const hourOrders = orders.filter((order) => {
        if (order.createdAt && typeof order.createdAt.toDate === "function") {
          const orderHour = order.createdAt.toDate().getHours();
          return orderHour === hour;
        }
        return false;
      });
      return {
        hour,
        orders: hourOrders.length,
        revenue: hourOrders.reduce((sum, order) => sum + (order.total || 0), 0),
      };
    });

    return {
      restaurantId,
      date: endDate.toISOString().split("T")[0],
      revenue: totalRevenue,
      orders: totalOrders,
      qrScans,
      averageOrderValue,
      popularItems,
      orderTypes,
      hourlyData,
    };
  } catch (error) {
    console.error("Error getting analytics data:", error);
    throw new Error("Failed to get analytics data");
  }
};

export const getRevenueData = async (
  restaurantId: string,
  days = 30
): Promise<RevenueData[]> => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const ordersQuery = query(
      collection(db, "orders"),
      where("restaurantId", "==", restaurantId),
      where("createdAt", ">=", Timestamp.fromDate(startDate)),
      where("createdAt", "<=", Timestamp.fromDate(endDate)),
      where("status", "==", "completed"),
      orderBy("createdAt")
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    const orders = ordersSnapshot.docs.map(
      (doc) => doc.data() as FirestoreOrder
    );

    // Group orders by date
    const dailyData: Record<string, { revenue: number; orders: number }> = {};

    orders.forEach((order) => {
      if (order.createdAt && typeof order.createdAt.toDate === "function") {
        const date = order.createdAt.toDate().toISOString().split("T")[0];
        if (!dailyData[date]) {
          dailyData[date] = { revenue: 0, orders: 0 };
        }
        dailyData[date].revenue += order.total || 0;
        dailyData[date].orders += 1;
      }
    });

    // Fill in missing dates with zero values
    const result: RevenueData[] = [];
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];
      result.push({
        date: dateStr,
        revenue: dailyData[dateStr]?.revenue || 0,
        orders: dailyData[dateStr]?.orders || 0,
      });
    }

    return result;
  } catch (error) {
    console.error("Error getting revenue data:", error);
    throw new Error("Failed to get revenue data");
  }
};
