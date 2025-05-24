export interface AnalyticsData {
  restaurantId: string;
  date: string;
  revenue: number;
  orders: number;
  qrScans: number;
  averageOrderValue: number;
  popularItems: {
    itemId: string;
    name: string;
    orders: number;
    revenue: number;
  }[];
  orderTypes: {
    dineIn: number;
    takeaway: number;
    delivery: number;
  };
  hourlyData: {
    hour: number;
    orders: number;
    revenue: number;
  }[];
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}
